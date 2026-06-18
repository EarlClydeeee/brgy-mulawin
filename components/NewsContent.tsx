"use client";

import { useState } from "react";
import { CalendarDays, Tag, ArrowRight } from "lucide-react";
import { newsArticles, type Announcement } from "@/lib/announcements";
import AnnouncementModal from "@/components/AnnouncementModal";

const categoryColors: Record<string, string> = {
  pink: "bg-pink-50 text-pink-700",
  green: "bg-green-50 text-green-700",
};

export default function NewsContent() {
  const [selected, setSelected] = useState<Announcement | null>(null);

  const featured = newsArticles[0];
  const articles = newsArticles.slice(1);

  return (
    <>
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Featured */}
          <div className="mb-20">
            <span className="text-pink-600 font-bold text-xs uppercase tracking-[0.3em]">
              Featured Announcement
            </span>
            <div className="mt-6 bg-gray-50 rounded-[2.5rem] p-10 sm:p-16 border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100/50 rounded-bl-full -mr-20 -mt-20 blur-3xl" />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <span
                    className={`text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest ${
                      categoryColors[featured.color]
                    }`}
                  >
                    <Tag className="w-3.5 h-3.5 inline mr-2" />
                    {featured.category}
                  </span>
                  <span className="text-xs font-medium text-gray-400 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    {featured.date}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-heading font-bold text-gray-900 mb-6 leading-tight max-w-4xl tracking-tight group-hover:text-pink-600 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg max-w-3xl mb-10 font-medium">
                  {featured.excerpt}
                </p>
                <button
                  type="button"
                  onClick={() => setSelected(featured)}
                  className="inline-flex items-center gap-3 bg-gray-900 text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-pink-600 transition-all shadow-xl active:scale-95"
                >
                  Read full update <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* All articles */}
          <div>
            <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-6">
              <span className="text-green-600 font-bold text-xs uppercase tracking-[0.3em]">
                Community Feed
              </span>
              <span className="text-sm font-bold text-gray-400">
                {articles.length + 1} Updates Total
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {articles.map((a) => (
                <article
                  key={a.id}
                  className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm card-hover flex flex-col p-8"
                >
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-6">
                      <span
                        className={`text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest ${
                          categoryColors[a.color]
                        }`}
                      >
                        {a.category}
                      </span>
                      <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5 ml-auto">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {a.date}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-gray-900 text-xl mb-4 leading-snug group-hover:text-pink-600 transition-colors">
                      {a.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1 mb-8 font-medium">
                      {a.excerpt}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelected(a)}
                      className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all hover:translate-x-1 ${
                        a.color === "pink" ? "text-pink-600" : "text-green-600"
                      }`}
                    >
                      Learn more <ArrowRight className="w-4 h-4" />
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
