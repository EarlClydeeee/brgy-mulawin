import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PostForm } from "../../_components";

export const metadata = {
  title: "Edit Post — Admin News",
  description: "Edit a barangay announcement.",
};

export const dynamic = "force-dynamic";

export default async function AdminEditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) {
    notFound();
  }

  return (
    <main className="px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/admin/news"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-pink-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to posts
        </Link>
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
            Edit
          </p>
          <h1 className="mt-2 text-4xl font-bold text-gray-800">Edit Post</h1>
          <p className="mt-2 text-gray-500">
            Update the headline, caption, or image for this announcement.
          </p>
        </div>
        <PostForm
          mode="edit"
          initialValues={{
            id: post.id,
            headline: post.headline,
            caption: post.caption,
            imageUrls: post.imageUrls,
          }}
        />
      </div>
    </main>
  );
}
