"use client";

import { useState } from "react";
import Link from "next/link";
import { Megaphone, CalendarDays, ArrowRight } from "lucide-react";
import AnnouncementModal from "@/components/AnnouncementModal";
import type { PostDisplayItem } from "@/lib/posts";

function SectionLabel({
  text,
  color = "pink",
}: {
  text: string;
  color?: "pink" | "green";
}) {
  return (
    <span
      className={`mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] ${
        color === "pink" ? "text-pink-600" : "text-green-600"
      }`}
    >
      {text}
    </span>
  );
}

export default function AnnouncementsSectionClient({
  posts,
}: {
  posts: PostDisplayItem[];
}) {
  const [selected, setSelected] = useState<PostDisplayItem | null>(null);

  return (
    <>
      <section className="bg-white px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <SectionLabel text="Stay Informed" color="green" />
              <h2 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
                Community <span className="text-pink-600">Updates</span>
              </h2>
            </div>
            <Link
              href="/news"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-gray-100 px-6 py-3 text-sm font-bold text-gray-900 transition-all hover:border-green-200 hover:bg-green-50 hover:text-green-600 active:scale-95"
            >
              View all news <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-[2.5rem] border border-dashed border-gray-200 bg-gray-50 p-12 text-center">
              <Megaphone className="mx-auto h-10 w-10 text-gray-300" />
              <p className="mt-4 text-lg font-semibold text-gray-700">
                No announcements yet
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Check back soon for the latest barangay updates.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className={`card-hover group relative flex flex-col overflow-hidden rounded-[2.5rem] border bg-white ${
                    post.color === "pink" ? "border-pink-50" : "border-green-50"
                  }`}
                >
                  <div className="flex flex-1 flex-col p-8">
                    <div className="mb-6 flex items-center gap-2">
                      <span
                        className={`rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest ${
                          post.color === "pink"
                            ? "bg-pink-50 text-pink-700"
                            : "bg-green-50 text-green-700"
                        }`}
                      >
                        Announcement
                      </span>
                      <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-gray-400">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {post.date}
                      </span>
                    </div>
                    <h3 className="mb-4 text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-pink-600">
                      {post.title}
                    </h3>
                    <p className="mb-8 flex-1 text-sm leading-relaxed text-gray-500">
                      {post.excerpt}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelected(post)}
                      className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all hover:translate-x-1 ${
                        post.color === "pink"
                          ? "text-pink-600"
                          : "text-green-600"
                      }`}
                    >
                      <Megaphone className="h-4 w-4" />
                      Read full story
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnnouncementModal
        announcement={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
