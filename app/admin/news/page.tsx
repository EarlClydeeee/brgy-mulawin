import Link from "next/link";
import { CalendarDays, Inbox, Megaphone, Plus, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { DeleteButton, FeatureButton } from "./_components";

export const metadata = {
  title: "Admin News — Barangay Mulawin",
  description: "Manage barangay news and announcements.",
};

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
              Content Management
            </p>
            <h1 className="mt-2 text-4xl font-bold text-gray-800">
              News & Announcements
            </h1>
            <p className="mt-2 text-gray-500">
              Create and manage posts shown on the homepage and news page.
            </p>
          </div>
          <Link
            href="/admin/news/new"
            className="inline-flex items-center gap-2 self-start rounded-full bg-gradient-to-r from-pink-500 to-green-500 px-5 py-3 text-sm font-bold text-white transition hover:opacity-95"
          >
            <Plus className="h-4 w-4" />
            New Post
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-12 text-center shadow-sm">
            <Inbox className="mx-auto h-12 w-12 text-gray-300" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              No posts yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-gray-500">
              Create your first announcement to show updates on the public site.
            </p>
            <Link
              href="/admin/news/new"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-gray-700"
            >
              <Plus className="h-4 w-4" />
              Create post
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                        <Megaphone className="h-3.5 w-3.5" />
                        Announcement
                      </span>
                      {post.isFeatured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-700">
                          <Star className="h-3.5 w-3.5" />
                          Featured
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {post.headline}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      {post.caption}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4" />
                        {post.createdAt.toLocaleDateString("en-PH", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <Link
                        href={`/admin/news/${post.id}/edit`}
                        className="text-sm font-semibold text-pink-500 transition hover:text-pink-600"
                      >
                        Edit post
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-gray-50 p-4">
                    <FeatureButton
                      postId={post.id}
                      isFeatured={post.isFeatured}
                    />
                    <DeleteButton postId={post.id} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
