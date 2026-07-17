"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, Users, Award, Star } from "lucide-react";
import OfficialModal from "@/components/OfficialModal";
import type { Official } from "@/lib/officials";
import {
  punongBarangay,
  sangguniangBarangay,
  skOfficials,
  appointedOfficials,
} from "@/lib/officials";

function ContactRow({
  icon: Icon,
  value,
  color,
}: {
  icon: React.ElementType;
  value: string;
  color: "pink" | "green";
}) {
  return (
    <div className="flex min-w-0 items-start gap-2 text-sm text-gray-600">
      <Icon
        className={`w-4 h-4 shrink-0 ${
          color === "pink" ? "text-pink-400" : "text-green-500"
        }`}
      />
      <span className="break-all">{value}</span>
    </div>
  );
}

function MemberCard({
  official,
  accent = "pink",
  onSelect,
}: {
  official: Official;
  accent?: "pink" | "green";
  onSelect: (official: Official) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(official)}
      className="group w-full text-left bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2"
    >
      <div className="relative h-52 bg-gradient-to-br from-pink-50 to-green-50 overflow-hidden">
        {official.photo ? (
          <Image
            src={official.photo}
            alt={official.name}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`text-5xl font-bold ${
                accent === "pink" ? "text-pink-200" : "text-green-200"
              }`}
            >
              {official.initials}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/90 text-gray-600 px-2.5 py-1 rounded-full shadow">
            View profile
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div
          className={`inline-block self-start text-[10px] font-bold uppercase tracking-[0.25em] px-2.5 py-1 rounded-full mb-3 ${
            accent === "pink"
              ? "bg-pink-100 text-pink-600"
              : "bg-green-100 text-green-700"
          }`}
        >
          {official.title}
        </div>
        <p className="font-bold text-gray-800 text-sm leading-snug mb-3">
          {official.name}
        </p>
        <div className="mt-auto space-y-1.5">
          {official.phone && (
            <ContactRow icon={Phone} value={official.phone} color="green" />
          )}
          {official.email && (
            <ContactRow icon={Mail} value={official.email} color="pink" />
          )}
        </div>
      </div>
    </button>
  );
}

export default function OfficialsDirectory() {
  const [selected, setSelected] = useState<Official | null>(null);

  return (
    <>
      {/* Punong Barangay */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.35em] text-pink-500 mb-2">
              <Star className="w-3 h-3" /> Chief Executive
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Punong Barangay
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <button
              type="button"
              onClick={() => setSelected(punongBarangay)}
              className="w-full text-left rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 group"
            >
              <div
                className="relative min-h-72 shrink-0 bg-gradient-to-b from-pink-100 to-green-100 sm:min-h-[22.5rem] md:w-72"
              >
                <Image
                  src={punongBarangay.photo!}
                  alt={punongBarangay.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  priority
                  sizes="(max-width: 767px) 100vw, 18rem"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="inline-block bg-gradient-to-r from-pink-500 to-green-500 text-white text-xs font-bold px-5 py-1.5 rounded-full uppercase tracking-widest shadow">
                    Punong Barangay
                  </span>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/90 text-gray-600 px-2.5 py-1 rounded-full shadow">
                    View profile
                  </span>
                </div>
              </div>

              <div className="flex-1 p-8 sm:p-10 bg-gradient-to-br from-white to-pink-50/40 flex flex-col justify-center">
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-pink-500 mb-1">
                  Term {punongBarangay.term}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                  {punongBarangay.name}
                </h3>
                <blockquote className="border-l-4 border-pink-300 pl-4 text-gray-500 italic text-sm leading-relaxed mb-6">
                  &ldquo;{punongBarangay.message}&rdquo;
                </blockquote>
                <div className="space-y-2.5">
                  <ContactRow
                    icon={Phone}
                    value={punongBarangay.phone!}
                    color="green"
                  />
                  <ContactRow
                    icon={Mail}
                    value={punongBarangay.email!}
                    color="pink"
                  />
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Sangguniang Barangay */}
      <section className="py-20 px-4 bg-gradient-to-b from-pink-50/60 to-green-50/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.35em] text-green-600 mb-2">
              <Users className="w-3 h-3" /> Legislative Council
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Sangguniang Barangay Members
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm">
              Tap any official to view their full profile and contact details.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sangguniangBarangay.map((m, i) => (
              <MemberCard
                key={m.name}
                official={m}
                accent={i % 2 === 0 ? "pink" : "green"}
                onSelect={setSelected}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SK Officials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.35em] text-pink-500 mb-2">
              <Star className="w-3 h-3" /> Youth Council
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Sangguniang Kabataan
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {skOfficials.map((sk) => (
              <div key={sk.name} className="w-full max-w-xs">
                <MemberCard official={sk} accent="pink" onSelect={setSelected} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointed Officials */}
      <section className="py-20 px-4 bg-gradient-to-b from-green-50/60 to-pink-50/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.35em] text-green-600 mb-2">
              <Award className="w-3 h-3" /> Administration
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Appointed Officials
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {appointedOfficials.map((o, i) => (
              <div key={o.name} className="w-full max-w-xs">
                <MemberCard
                  official={o}
                  accent={i % 2 === 0 ? "green" : "pink"}
                  onSelect={setSelected}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <OfficialModal official={selected} onClose={() => setSelected(null)} />
    </>
  );
}
