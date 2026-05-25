"use client";

import { useEffect } from "react";
import {
  X,
  CalendarDays,
  Clock,
  MapPin,
  Phone,
  CheckCircle,
} from "lucide-react";
import type { Announcement } from "@/lib/announcements";

type AnnouncementModalProps = {
  announcement: Announcement | null;
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
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="announcement-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div
        className={`relative w-full sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl shadow-2xl border ${
          isPink ? "border-pink-100 bg-white" : "border-green-100 bg-white"
        }`}
      >
        {/* Top bar */}
        <div
          className={`h-1.5 ${
            isPink
              ? "bg-gradient-to-r from-pink-400 to-pink-300"
              : "bg-gradient-to-r from-green-400 to-green-300"
          }`}
        />

        <div className="p-6 sm:p-8">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ${
                  isPink
                    ? "bg-pink-100 text-pink-700"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {announcement.category}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <CalendarDays className="w-3 h-3" />
                {announcement.date}
              </span>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2
            id="announcement-modal-title"
            className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 leading-snug"
          >
            {announcement.title}
          </h2>

          {/* Full content */}
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            {announcement.fullContent.split("\n\n").map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          {/* Details box */}
          {announcement.details && (
            <div
              className={`mt-6 rounded-2xl p-5 border ${
                isPink
                  ? "bg-pink-50/80 border-pink-100"
                  : "bg-green-50/80 border-green-100"
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                Event Details
              </p>
              <ul className="space-y-3">
                {announcement.details.time && (
                  <li className="flex items-start gap-3 text-sm text-gray-700">
                    <Clock
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        isPink ? "text-pink-500" : "text-green-600"
                      }`}
                    />
                    <span>{announcement.details.time}</span>
                  </li>
                )}
                {announcement.details.location && (
                  <li className="flex items-start gap-3 text-sm text-gray-700">
                    <MapPin
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        isPink ? "text-pink-500" : "text-green-600"
                      }`}
                    />
                    <span>{announcement.details.location}</span>
                  </li>
                )}
                {announcement.details.contact && (
                  <li className="flex items-start gap-3 text-sm text-gray-700">
                    <Phone
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        isPink ? "text-pink-500" : "text-green-600"
                      }`}
                    />
                    <span>{announcement.details.contact}</span>
                  </li>
                )}
              </ul>

              {announcement.details.requirements &&
                announcement.details.requirements.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200/60">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                      What to Bring
                    </p>
                    <ul className="space-y-2">
                      {announcement.details.requirements.map((req) => (
                        <li
                          key={req}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <CheckCircle
                            className={`w-4 h-4 mt-0.5 shrink-0 ${
                              isPink ? "text-pink-400" : "text-green-500"
                            }`}
                          />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          )}

          <button
            onClick={onClose}
            className={`mt-6 w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
              isPink
                ? "bg-pink-100 text-pink-700 hover:bg-pink-200"
                : "bg-green-100 text-green-800 hover:bg-green-200"
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
