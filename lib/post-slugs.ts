import { prisma } from "@/lib/prisma";

export function slugifyPostHeadline(headline: string) {
  return (
    headline
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 120) || "news"
  );
}

export async function createUniquePostSlug(
  headline: string,
  currentPostId?: string,
) {
  const baseSlug = slugifyPostHeadline(headline);

  for (let suffix = 1; ; suffix += 1) {
    const slug = suffix === 1 ? baseSlug : `${baseSlug}-${suffix}`;
    const existing = await prisma.post.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existing || existing.id === currentPostId) {
      return slug;
    }
  }
}
