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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div
        className={`relative w-full sm:max-w-xl max-h-[90vh] overflow-y-auto rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl bg-white animate-in fade-in zoom-in duration-300`}
      >
        <div className="p-8 sm:p-12">
          {/* Header row */}
          <div className="flex items-start justify-between gap-6 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest ${
                  isPink
                    ? "bg-pink-50 text-pink-700"
                    : "bg-green-50 text-green-700"
                }`}
              >
                {announcement.category}
              </span>
              <span className="text-xs font-medium text-gray-400 flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                {announcement.date}
              </span>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 p-3 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-all active:scale-90"
              aria-label="Close Announcement"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <h2
            id="announcement-modal-title"
            className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-6 leading-tight"
          >
            {announcement.title}
          </h2>

          {/* Full content */}
          <div className="space-y-6 text-base text-gray-600 leading-relaxed font-medium">
            {announcement.fullContent.split("\n\n").map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          {/* Details box */}
          {announcement.details && (
            <div
              className={`mt-10 rounded-[1.5rem] p-6 sm:p-8 border ${
                isPink
                  ? "bg-pink-50/40 border-pink-100"
                  : "bg-green-50/40 border-green-100"
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                Event Details
              </p>
              <ul className="space-y-4">
                {announcement.details.time && (
                  <li className="flex items-start gap-4 text-gray-800 font-bold">
                    <Clock
                      className={`w-5 h-5 mt-0.5 shrink-0 ${
                        isPink ? "text-pink-600" : "text-green-600"
                      }`}
                    />
                    <span>{announcement.details.time}</span>
                  </li>
                )}
                {announcement.details.location && (
                  <li className="flex items-start gap-4 text-gray-800 font-bold">
                    <MapPin
                      className={`w-5 h-5 mt-0.5 shrink-0 ${
                        isPink ? "text-pink-600" : "text-green-600"
                      }`}
                    />
                    <span>{announcement.details.location}</span>
                  </li>
                )}
                {announcement.details.contact && (
                  <li className="flex items-start gap-4 text-gray-800 font-bold">
                    <Phone
                      className={`w-5 h-5 mt-0.5 shrink-0 ${
                        isPink ? "text-pink-600" : "text-green-600"
                      }`}
                    />
                    <span>{announcement.details.contact}</span>
                  </li>
                )}
              </ul>

              {announcement.details.requirements &&
                announcement.details.requirements.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                      Requirements
                    </p>
                    <ul className="space-y-3">
                      {announcement.details.requirements.map((req) => (
                        <li
                          key={req}
                          className="flex items-start gap-3 text-gray-700 font-medium"
                        >
                          <CheckCircle
                            className={`w-5 h-5 mt-0.5 shrink-0 ${
                              isPink ? "text-pink-600" : "text-green-600"
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
            className={`mt-10 w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-95 shadow-lg ${
              isPink
                ? "bg-pink-600 text-white hover:bg-pink-700 shadow-pink-100"
                : "bg-green-600 text-white hover:bg-green-700 shadow-green-100"
            }`}
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
