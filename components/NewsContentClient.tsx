import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";
import type { PostDisplayItem } from "@/lib/posts";

export default function NewsContentClient({
  featured,
  posts,
}: {
  featured: PostDisplayItem | null;
  posts: PostDisplayItem[];
}) {
  const totalCount = posts.length + (featured ? 1 : 0);

  return (
    <>
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          {featured && (
            <div className="mb-20">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-pink-600">
                Featured Announcement
              </span>
              <div className="group relative mt-6 overflow-hidden rounded-[2.5rem] border border-gray-100 bg-gray-50 p-10 shadow-sm sm:p-16">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-bl-full bg-pink-100/50 blur-3xl" />
                <div className="relative">
                  <div className="mb-8 flex flex-wrap items-center gap-4">
                    <span className="rounded-full bg-pink-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-pink-700">
                      Featured
                    </span>
                    <span className="flex items-center gap-2 text-xs font-medium text-gray-400">
                      <CalendarDays className="h-4 w-4" />
                      {featured.date}
                    </span>
                  </div>
                  {featured.imageUrl && (
                    <div className="relative mb-8 h-56 w-full overflow-hidden rounded-[2rem] sm:h-72">
                      <Image
                        src={featured.imageUrl}
                        alt={featured.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h2 className="font-heading mb-6 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-gray-900 transition-colors group-hover:text-pink-600 sm:text-5xl">
                    {featured.title}
                  </h2>
                  <p className="mb-10 max-w-3xl text-lg font-medium leading-relaxed text-gray-600">
                    {featured.excerpt}
                  </p>
                  <Link
                    href={`/news/${featured.slug}`}
                    className="inline-flex items-center gap-3 rounded-full bg-gray-900 px-10 py-4 text-sm font-bold text-white shadow-xl transition-all hover:bg-pink-600 active:scale-95"
                  >
                    Read full update <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div>
            <div className="mb-10 flex items-center justify-between border-b border-gray-100 pb-6">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-green-600">
                Community Feed
              </span>
              <span className="text-sm font-bold text-gray-400">
                {totalCount} {totalCount === 1 ? "Update" : "Updates"} Total
              </span>
            </div>

            {posts.length === 0 && !featured ? (
              <div className="rounded-[2rem] border border-dashed border-gray-200 bg-gray-50 p-12 text-center">
                <p className="text-lg font-semibold text-gray-700">
                  No announcements yet
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  New barangay updates will appear here when published.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="card-hover group flex flex-col rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm"
                  >
                    <div className="flex flex-1 flex-col">
                      <div className="mb-6 flex items-center gap-3">
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
                      {post.imageUrl && (
                        <div className="relative mb-6 h-40 w-full overflow-hidden rounded-2xl">
                          <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <h3 className="font-heading mb-4 text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-pink-600">
                        {post.title}
                      </h3>
                      <p className="mb-8 line-clamp-3 flex-1 text-sm font-medium leading-relaxed text-gray-500">
                        {post.excerpt}
                      </p>
                      <Link
                        href={`/news/${post.slug}`}
                        className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all hover:translate-x-1 ${
                          post.color === "pink"
                            ? "text-pink-600"
                            : "text-green-600"
                        }`}
                      >
                        Learn more <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

    </>
  );
}
