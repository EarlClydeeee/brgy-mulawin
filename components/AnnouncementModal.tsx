"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, CalendarDays } from "lucide-react";
import type { PostDisplayItem } from "@/lib/posts";

type AnnouncementModalProps = {
  announcement: PostDisplayItem | null;
  onClose: () => void;
};

export default function AnnouncementModal({
  announcement,
  onClose,
}: AnnouncementModalProps) {
  useEffect(() => {
    if (!announcement) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [announcement, onClose]);

  if (!announcement) return null;

  const isPink = announcement.color === "pink";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="announcement-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div className="animate-in fade-in zoom-in relative max-h-[90vh] w-full overflow-y-auto rounded-t-[2rem] bg-white shadow-2xl duration-300 sm:max-w-xl sm:rounded-[2rem]">
        <div className="p-8 sm:p-12">
          <div className="mb-8 flex items-start justify-between gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest ${
                  isPink
                    ? "bg-pink-50 text-pink-700"
                    : "bg-green-50 text-green-700"
                }`}
              >
                Announcement
              </span>
              <span className="flex items-center gap-2 text-xs font-medium text-gray-400">
                <CalendarDays className="h-4 w-4" />
                {announcement.date}
              </span>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 rounded-full p-3 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-900 active:scale-90"
              aria-label="Close Announcement"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {announcement.imageUrl && (
            <div className="relative mb-8 h-56 w-full overflow-hidden rounded-[1.5rem]">
              <Image
                src={announcement.imageUrl}
                alt={announcement.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <h2
            id="announcement-modal-title"
            className="font-heading mb-6 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl"
          >
            {announcement.title}
          </h2>

          <div className="space-y-6 text-base leading-relaxed font-medium text-gray-600">
            {announcement.fullContent.split("\n\n").map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <button
            onClick={onClose}
            className={`mt-10 w-full rounded-2xl py-4 text-base font-bold shadow-lg transition-all active:scale-95 ${
              isPink
                ? "bg-pink-600 text-white shadow-pink-100 hover:bg-pink-700"
                : "bg-green-600 text-white shadow-green-100 hover:bg-green-700"
            }`}
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
