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
      className={`inline-block text-xs font-bold uppercase tracking-[0.2em] mb-3 ${
        color === "pink" ? "text-pink-600" : "text-green-600"
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
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <SectionLabel text="Stay Informed" color="green" />
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                Community{" "}
                <span className="text-pink-600">
                  Updates
                </span>
              </h2>
            </div>
            <Link
              href="/news"
              className="shrink-0 inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-green-600 border-2 border-gray-100 hover:border-green-200 px-6 py-3 rounded-full hover:bg-green-50 transition-all active:scale-95"
            >
              View all news <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {announcements.map((a) => (
              <article
                key={a.id}
                className={`group relative rounded-[2.5rem] overflow-hidden border card-hover flex flex-col bg-white ${
                  a.color === "pink" ? "border-pink-50" : "border-green-50"
                }`}
              >
                <div
                  className={`p-8 flex flex-col flex-1`}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <span
                      className={`text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest ${
                        a.color === "pink"
                          ? "bg-pink-50 text-pink-700"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      {a.category}
                    </span>
                    <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5 ml-auto">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {a.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-xl mb-4 leading-snug group-hover:text-pink-600 transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-8">
                    {a.excerpt}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelected(a)}
                    className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all hover:translate-x-1 ${
                      a.color === "pink" ? "text-pink-600" : "text-green-600"
                    }`}
                  >
                    <Megaphone className="w-4 h-4" />
                    Read full story
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
