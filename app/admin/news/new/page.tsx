import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PostForm } from "../_components";

export const metadata = {
  title: "New Post — Admin News",
  description: "Create a new barangay announcement.",
};

export const dynamic = "force-dynamic";

export default function AdminNewPostPage() {
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
            Create
          </p>
          <h1 className="mt-2 text-4xl font-bold text-gray-800">New Post</h1>
          <p className="mt-2 text-gray-500">
            Publish a new announcement for residents.
          </p>
        </div>
        <PostForm mode="create" />
      </div>
    </main>
  );
}
