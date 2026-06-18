import { Award } from "lucide-react";
import OfficialsDirectory from "@/components/OfficialsDirectory";

export const metadata = {
  title: "Officials — Barangay Mulawin",
  description:
    "Meet the elected and appointed officials of Barangay Mulawin, Tanza, Cavite.",
};

export default function OfficialsPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-600 via-pink-500 to-green-500 py-20 px-4">
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-32 -right-16 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/10 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white/90 text-xs font-semibold uppercase tracking-[0.3em] px-5 py-2 rounded-full mb-6">
            <Award className="w-3.5 h-3.5" />
            Public Servants
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Barangay <span className="text-white/70">Officials</span>
          </h1>
          <p className="text-white/75 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Elected and appointed leaders committed to serving every resident of
            Barangay Mulawin, Tanza, Cavite with integrity and compassion.
          </p>
        </div>
      </section>

      <OfficialsDirectory />

      {/* Commitment Strip */}
      <section className="py-12 px-4 bg-gradient-to-r from-pink-500 to-green-500">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white/60 text-xs uppercase tracking-[0.4em] mb-3">
            Our Pledge
          </p>
          <p className="text-white text-lg sm:text-xl font-light italic leading-relaxed">
            &ldquo;We, the officials of Barangay Mulawin, pledge to serve with
            honesty, diligence, and unwavering commitment to the people of this
            community.&rdquo;
          </p>
        </div>
      </section>
    </>
  );
}
