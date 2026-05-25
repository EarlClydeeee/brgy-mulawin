"use client";

import { useState } from "react";
import { Megaphone, CalendarDays, Tag, ArrowRight } from "lucide-react";
import { newsArticles, type Announcement } from "@/lib/announcements";
import AnnouncementModal from "@/components/AnnouncementModal";

const categoryColors: Record<string, string> = {
  pink: "bg-pink-100 text-pink-600",
  green: "bg-green-100 text-green-700",
};

export default function NewsContent() {
  const [selected, setSelected] = useState<Announcement | null>(null);

  const featured = newsArticles[0];
  const articles = newsArticles.slice(1);

  return (
    <>
      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Featured */}
          <div className="mb-12">
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              Featured
            </span>
            <div className="mt-3 bg-gradient-to-br from-pink-50 to-green-50 rounded-3xl p-8 border border-pink-100 shadow-sm">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    categoryColors[featured.color]
                  }`}
                >
                  <Tag className="w-3 h-3 inline mr-1" />
                  {featured.category}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" />
                  {featured.date}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                {featured.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-base max-w-3xl">
                {featured.excerpt}
              </p>
              <button
                type="button"
                onClick={() => setSelected(featured)}
                className="mt-5 inline-flex items-center gap-2 text-pink-500 font-semibold hover:text-pink-600 transition-colors"
              >
                Read more <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* All articles */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">
                All Updates
              </span>
              <span className="text-sm text-gray-400">
                {articles.length} articles
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((a) => (
                <article
                  key={a.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm card-hover overflow-hidden flex flex-col"
                >
                  <div
                    className={`h-2 ${
                      a.color === "pink"
                        ? "bg-gradient-to-r from-pink-300 to-pink-400"
                        : "bg-gradient-to-r from-green-300 to-green-400"
                    }`}
                  />
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`text-xs font-semibold px-3 py-0.5 rounded-full ${
                          categoryColors[a.color]
                        }`}
                      >
                        {a.category}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        {a.date}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2 leading-snug">
                      {a.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
                      {a.excerpt}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelected(a)}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
                    >
                      Read more <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnnouncementModal
        announcement={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
