"use client";

import { useState } from "react";
import Link from "next/link";
import { Megaphone, CalendarDays, ArrowRight } from "lucide-react";
import { announcements, type Announcement } from "@/lib/announcements";
import AnnouncementModal from "@/components/AnnouncementModal";

function SectionLabel({
  text,
  color = "pink",
}: {
  text: string;
  color?: "pink" | "green";
}) {
  return (
    <span
      className={`inline-block text-xs font-bold uppercase tracking-[0.35em] mb-2 ${
        color === "pink" ? "text-pink-500" : "text-green-600"
      }`}
    >
      {text}
    </span>
  );
}

export default function AnnouncementsSection() {
  const [selected, setSelected] = useState<Announcement | null>(null);

  return (
    <>
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <SectionLabel text="Stay Informed" color="green" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-tight">
                Latest{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-green-500">
                  Announcements
                </span>
              </h2>
            </div>
            <Link
              href="/news"
              className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 border border-green-200 px-4 py-2 rounded-full hover:bg-green-50 transition-colors"
            >
              View all news <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {announcements.map((a) => (
              <article
                key={a.id}
                className={`group rounded-3xl overflow-hidden border card-hover shadow-sm flex flex-col ${
                  a.color === "pink" ? "border-pink-100" : "border-green-100"
                }`}
              >
                <div
                  className={`h-1.5 ${
                    a.color === "pink"
                      ? "bg-gradient-to-r from-pink-400 to-pink-300"
                      : "bg-gradient-to-r from-green-400 to-green-300"
                  }`}
                />
                <div
                  className={`p-6 flex flex-col flex-1 ${
                    a.color === "pink" ? "bg-pink-50/60" : "bg-green-50/60"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ${
                        a.color === "pink"
                          ? "bg-pink-200 text-pink-700"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {a.category}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1 ml-auto">
                      <CalendarDays className="w-3 h-3" />
                      {a.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-base mb-3 leading-snug">
                    {a.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">
                    {a.excerpt}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelected(a)}
                    className={`mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide transition-opacity hover:opacity-80 ${
                      a.color === "pink" ? "text-pink-500" : "text-green-600"
                    }`}
                  >
                    <Megaphone className="w-3.5 h-3.5" />
                    Read more
                  </button>
                </div>
              </article>
            ))}
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
