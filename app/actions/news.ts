"use server";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { createUniquePostSlug } from "@/lib/post-slugs";
import { prisma } from "@/lib/prisma";

const BUCKET = "post-images";
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const postSchema = z.object({
  headline: z
    .string()
    .trim()
    .min(1, "Headline is required.")
    .max(200, "Headline must be 200 characters or fewer."),
  caption: z
    .string()
    .trim()
    .min(1, "Caption is required.")
    .max(500, "Caption must be 500 characters or fewer."),
});

export type PostActionState = {
  error?: string;
};

const createServiceClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase storage is not configured.");
  }

  return createSupabaseClient(url, key);
};

const extractStoragePath = (url: string): string | null => {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length));
};

const deleteImageBestEffort = async (url: string) => {
  try {
    const path = extractStoragePath(url);
    if (!path) return;
    const supabase = createServiceClient();
    await supabase.storage.from(BUCKET).remove([path]);
  } catch {
    // Best-effort cleanup only.
  }
};

const uploadImage = async (
  file: File,
): Promise<{ url: string } | { error: string }> => {
  if (file.size > MAX_IMAGE_SIZE) {
    return { error: "Image must be 5 MB or smaller." };
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { error: "Only JPEG, PNG, or WebP images are allowed." };
  }

  const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${crypto.randomUUID()}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const supabase = createServiceClient();

  const { error } = await supabase.storage.from(BUCKET).upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    return { error: "Failed to upload image. Please try again." };
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl };
};

const revalidateNewsPaths = (...slugs: string[]) => {
  revalidatePath("/admin/news");
  revalidatePath("/");
  revalidatePath("/news");
  slugs.forEach((slug) => revalidatePath(`/news/${slug}`));
};

export async function createPost(
  _prevState: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  await requireAdmin();

  const parsed = postSchema.safeParse({
    headline: formData.get("headline"),
    caption: formData.get("caption"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid post data.",
    };
  }

  const imageUrls: string[] = [];
  const image = formData.get("image");

  if (image instanceof File && image.size > 0) {
    const uploaded = await uploadImage(image);
    if ("error" in uploaded) {
      return { error: uploaded.error };
    }
    imageUrls.push(uploaded.url);
  }

  const slug = await createUniquePostSlug(parsed.data.headline);
  await prisma.post.create({
    data: {
      slug,
      headline: parsed.data.headline,
      caption: parsed.data.caption,
      imageUrls,
    },
  });

  revalidateNewsPaths(slug);
  redirect("/admin/news");
}

export async function updatePost(
  id: string,
  _prevState: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  await requireAdmin();

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) {
    return { error: "Post not found." };
  }

  const parsed = postSchema.safeParse({
    headline: formData.get("headline"),
    caption: formData.get("caption"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid post data.",
    };
  }

  const removeImage = formData.get("removeImage") === "true";
  const image = formData.get("image");
  let imageUrls = [...existing.imageUrls];
  const slug =
    existing.headline === parsed.data.headline
      ? existing.slug
      : await createUniquePostSlug(parsed.data.headline, existing.id);

  if (removeImage) {
    if (imageUrls[0]) {
      await deleteImageBestEffort(imageUrls[0]);
    }
    imageUrls = [];
  } else if (image instanceof File && image.size > 0) {
    const uploaded = await uploadImage(image);
    if ("error" in uploaded) {
      return { error: uploaded.error };
    }
    if (imageUrls[0]) {
      await deleteImageBestEffort(imageUrls[0]);
    }
    imageUrls = [uploaded.url];
  }

  await prisma.post.update({
    where: { id },
    data: {
      slug,
      headline: parsed.data.headline,
      caption: parsed.data.caption,
      imageUrls,
    },
  });

  revalidateNewsPaths(existing.slug, slug);
  redirect("/admin/news");
}

export async function deletePost(id: string): Promise<void> {
  await requireAdmin();

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return;

  if (existing.imageUrls[0]) {
    await deleteImageBestEffort(existing.imageUrls[0]);
  }

  await prisma.post.delete({ where: { id } });
  revalidateNewsPaths(existing.slug);
}

export async function toggleFeatured(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  await requireAdmin();

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) {
    return { success: false, error: "Post not found." };
  }

  try {
    if (existing.isFeatured) {
      await prisma.post.update({
        where: { id },
        data: { isFeatured: false },
      });
    } else {
      await prisma.$transaction([
        prisma.post.updateMany({
          data: { isFeatured: false },
        }),
        prisma.post.update({
          where: { id },
          data: { isFeatured: true },
        }),
      ]);
    }

    revalidateNewsPaths(existing.slug);
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update featured status." };
  }
}
