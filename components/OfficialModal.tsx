"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Mail, Phone, Award } from "lucide-react";
import type { Official } from "@/lib/officials";

type OfficialModalProps = {
  official: Official | null;
  onClose: () => void;
};

export default function OfficialModal({ official, onClose }: OfficialModalProps) {
  useEffect(() => {
    if (!official) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [official, onClose]);

  if (!official) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="official-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative w-full sm:max-w-md max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl shadow-2xl border border-gray-100 bg-white animate-slide-up">
        <div className="h-1.5 bg-gradient-to-r from-pink-400 to-green-400" />

        {/* Photo header */}
        <div className="relative h-72 sm:h-80 bg-gradient-to-br from-pink-50 to-green-50">
          {official.photo ? (
            <Image
              src={official.photo}
              alt={official.name}
              fill
              className="object-cover object-top"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl font-bold text-pink-200">
                {official.initials}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors backdrop-blur-sm"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full mb-2">
              <Award className="w-3 h-3" />
              {official.title}
            </span>
            <h2
              id="official-modal-title"
              className="text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow"
            >
              {official.name}
            </h2>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 sm:p-8">
          {official.term && (
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink-500 mb-4">
              Term {official.term}
            </p>
          )}

          {official.message && (
            <blockquote className="border-l-4 border-pink-300 pl-4 text-gray-500 italic text-sm leading-relaxed mb-6">
              &ldquo;{official.message}&rdquo;
            </blockquote>
          )}

          <div className="rounded-2xl bg-gradient-to-br from-pink-50/80 to-green-50/80 border border-gray-100 p-5 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Contact Information
            </p>
            {official.phone && (
              <a
                href={`tel:${official.phone.replace(/[^\d+]/g, "")}`}
                className="flex items-center gap-3 text-sm text-gray-700 hover:text-green-600 transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center shrink-0 group-hover:bg-green-200 transition-colors">
                  <Phone className="w-4 h-4 text-green-600" />
                </div>
                <span>{official.phone}</span>
              </a>
            )}
            {official.email && (
              <a
                href={`mailto:${official.email}`}
                className="flex items-center gap-3 text-sm text-gray-700 hover:text-pink-600 transition-colors group break-all"
              >
                <div className="w-9 h-9 rounded-xl bg-pink-100 flex items-center justify-center shrink-0 group-hover:bg-pink-200 transition-colors">
                  <Mail className="w-4 h-4 text-pink-600" />
                </div>
                <span>{official.email}</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-pink-100 to-green-100 text-gray-700 hover:from-pink-200 hover:to-green-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
