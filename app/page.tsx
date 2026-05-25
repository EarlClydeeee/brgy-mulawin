import Image from "next/image";
import Link from "next/link";
import AnnouncementsSection from "@/components/AnnouncementsSection";
import {
  FileText,
  Users,
  Phone,
  ArrowRight,
  Shield,
  Heart,
  CheckCircle,
  CalendarDays,
  ChevronDown,
  Leaf,
  Target,
  Eye,
  Star,
} from "lucide-react";

/* ─── Sparkle ────────────────────────────────────────────────── */
function Sparkle({ size = 20, color = "#ffd700", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 2L13.8 10.2L22 12L13.8 13.8L12 22L10.2 13.8L2 12L10.2 10.2Z" fill={color} />
    </svg>
  );
}

/* ─── Section label ──────────────────────────────────────────── */
function SectionLabel({ text, color = "pink" }: { text: string; color?: "pink" | "green" }) {
  return (
    <span className={`inline-block text-xs font-bold uppercase tracking-[0.35em] mb-2 ${color === "pink" ? "text-pink-500" : "text-green-600"}`}>
      {text}
    </span>
  );
}

const services = [
  { icon: FileText, title: "Barangay Clearance", desc: "Official document for legal and employment purposes.", color: "pink" },
  { icon: Shield, title: "Certificate of Residency", desc: "Proof that you are a resident of Barangay Mulawin.", color: "green" },
  { icon: Heart, title: "Certificate of Indigency", desc: "For qualified low-income residents needing assistance.", color: "pink" },
  { icon: FileText, title: "Business Permit", desc: "Barangay business permit for micro & small businesses.", color: "green" },
];

/* ─── Page ────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      {/* ══════════════════════════════════
          1. HERO
      ══════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ height: "calc(100svh - 64px)", minHeight: "580px", maxHeight: "960px" }}
      >
        <Image src="/bg.jpg" alt="Barangay Mulawin" fill className="object-cover object-center" priority quality={90} />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-transparent to-green-900/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/70" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pb-10">
          {/* Location pill */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-[11px] sm:text-xs px-5 py-2 rounded-full mb-6 uppercase tracking-[0.3em]">
            <Leaf className="w-3 h-3 text-green-300 shrink-0" />
            Tanza, Cavite
          </div>

          <p className="text-white/70 uppercase tracking-[0.55em] text-xs sm:text-sm font-light mb-2">Barangay</p>

          {/* Title + sparkles */}
          <div className="relative inline-block">
            <span className="absolute -top-7 left-2 sm:-top-9 sm:left-4 animate-pulse"><Sparkle size={26} color="#ffd040" /></span>
            <span className="absolute -top-4 right-0 sm:-top-5 animate-pulse" style={{ animationDelay: "0.4s" }}><Sparkle size={16} color="#ffffff" /></span>
            <span className="absolute top-1/3 -right-5 sm:-right-7 animate-pulse" style={{ animationDelay: "0.2s" }}><Sparkle size={20} color="#ffd040" /></span>
            <span className="absolute bottom-1/4 -left-4 animate-pulse" style={{ animationDelay: "0.65s" }}><Sparkle size={13} color="#ffffff" /></span>
            <h1
              className="leading-none text-center select-none"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(5.5rem, 19vw, 17rem)",
                color: "#fffdf5",
                letterSpacing: "0.05em",
                textShadow: "0 4px 24px rgba(0,0,0,0.35), 0 1px 0 rgba(0,0,0,0.2)",
              }}
            >
              MULAWIN
            </h1>
          </div>

          {/* Est. divider */}
          <div className="flex items-center gap-3 sm:gap-4 mt-4 mb-5">
            <div className="h-px w-12 sm:w-20 bg-white/35" />
            <span className="text-white/50 text-[10px] sm:text-xs uppercase tracking-[0.35em]">Est. 1975</span>
            <div className="h-px w-12 sm:w-20 bg-white/35" />
          </div>

          <p className="text-white/80 text-sm sm:text-base font-light italic max-w-xs sm:max-w-sm leading-relaxed mb-8">
            Rooted in strength. Growing together.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link href="/about" className="bg-white text-green-700 font-bold uppercase tracking-[0.2em] text-xs sm:text-sm px-8 sm:px-12 py-3 sm:py-3.5 rounded-full shadow-2xl hover:bg-green-50 hover:scale-105 transition-all duration-200">
              Discover
            </Link>
            <Link href="/services" className="flex items-center gap-2 border-2 border-white/70 text-white font-semibold uppercase tracking-[0.18em] text-xs sm:text-sm px-7 sm:px-10 py-3 sm:py-3.5 rounded-full hover:bg-white/15 backdrop-blur-sm transition-all duration-200">
              Our Services <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/40 pointer-events-none">
          <span className="text-[9px] uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* ══════════════════════════════════
          2. STATS RIBBON
      ══════════════════════════════════ */}
      <section className="bg-gradient-to-r from-pink-400 via-pink-300 to-green-400 py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-white text-sm font-medium">
          {[
            { icon: Users, label: "12,500+ Residents" },
            { icon: Heart, label: "18 Active Programs" },
            { icon: Shield, label: "9 Barangay Officials" },
            { icon: CalendarDays, label: "50+ Years of Service" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <s.icon className="w-4 h-4 text-white/80" />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          3. ANNOUNCEMENTS
      ══════════════════════════════════ */}
      <AnnouncementsSection />

      {/* ══════════════════════════════════
          4. MISSION & VISION
      ══════════════════════════════════ */}
      <section className="py-20 px-4 bg-gradient-to-b from-pink-50 to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <SectionLabel text="Our Foundation" color="pink" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Mission &amp; Vision
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm leading-relaxed">
              The guiding principles behind every program, service, and decision made for Barangay Mulawin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="relative rounded-3xl overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-600" />
              <div className="relative p-8 sm:p-10">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <p className="text-pink-100 text-xs font-bold uppercase tracking-[0.3em] mb-3">Mission</p>
                <h3 className="text-2xl font-bold text-white mb-5 leading-snug">
                  Serve with Integrity &amp; Compassion
                </h3>
                <p className="text-pink-100 text-sm leading-relaxed">
                  To deliver efficient, transparent, and responsive local governance services that uplift the living conditions of every resident in Barangay Mulawin — ensuring that no household is left behind in accessing basic needs, social services, and community programs.
                </p>
                <div className="mt-8 flex gap-6">
                  {["Transparency", "Integrity", "Service"].map((v) => (
                    <div key={v} className="text-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-200 mx-auto mb-1.5" />
                      <p className="text-xs text-pink-200 font-medium">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="relative rounded-3xl overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-700" />
              <div className="relative p-8 sm:p-10">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <p className="text-green-100 text-xs font-bold uppercase tracking-[0.3em] mb-3">Vision</p>
                <h3 className="text-2xl font-bold text-white mb-5 leading-snug">
                  A Peaceful &amp; Progressive Barangay
                </h3>
                <p className="text-green-100 text-sm leading-relaxed">
                  A peaceful, progressive, and self-sustaining Barangay Mulawin where every resident enjoys a safe environment, quality education, accessible health care, livelihood opportunities, and a community rooted in unity, integrity, and respect.
                </p>
                <div className="mt-8 flex gap-6">
                  {["Progress", "Unity", "Growth"].map((v) => (
                    <div key={v} className="text-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-200 mx-auto mb-1.5" />
                      <p className="text-xs text-green-200 font-medium">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          5. PUNONG BARANGAY SPOTLIGHT
      ══════════════════════════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col md:flex-row">
            {/* Photo side */}
            <div className="relative md:w-80 shrink-0 bg-gradient-to-b from-pink-100 to-green-100" style={{ minHeight: "340px" }}>
              <Image
                src="/brgy_officers/KapitanaTriciaLubigan.png"
                alt="Hon. Tricia Lubigan — Punong Barangay"
                fill
                className="object-cover object-top"
              />
              {/* Overlay gradient at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <span className="inline-block bg-gradient-to-r from-pink-500 to-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                  Punong Barangay
                </span>
              </div>
            </div>

            {/* Text side */}
            <div className="flex-1 p-8 sm:p-10 flex flex-col justify-center bg-gradient-to-br from-white to-pink-50/40">
              <SectionLabel text="Leadership" color="pink" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1 mb-1">
                Hon. Tricia Lubigan
              </h2>
              <p className="text-green-600 font-semibold text-sm mb-5">Punong Barangay, Barangay Mulawin</p>

              <blockquote className="border-l-4 border-pink-300 pl-5 text-gray-600 italic text-sm leading-relaxed mb-6">
                &ldquo;My commitment to Barangay Mulawin is unwavering — to serve every resident with transparency, compassion, and purpose. Together, we will build a community where every family thrives.&rdquo;
              </blockquote>

              <div className="flex flex-wrap gap-3 mb-6">
                {["Community Development", "Health Advocacy", "Youth Programs", "Livelihood"].map((tag) => (
                  <span key={tag} className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href="/officials"
                className="self-start inline-flex items-center gap-2 bg-gradient-to-r from-pink-400 to-green-400 text-white font-semibold text-sm px-6 py-2.5 rounded-full hover:opacity-90 hover:scale-105 transition-all shadow-md"
              >
                Meet All Officials <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          6. SERVICES
      ══════════════════════════════════ */}
      <section className="py-20 px-4 bg-gradient-to-b from-green-50/60 to-pink-50/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel text="What We Offer" color="green" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-1">Barangay Services</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
              We provide essential community services to all residents of Barangay Mulawin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => (
              <Link
                href="/services"
                key={s.title}
                className={`group rounded-2xl p-6 border card-hover flex flex-col ${
                  s.color === "pink" ? "border-pink-100 bg-white hover:bg-pink-50" : "border-green-100 bg-white hover:bg-green-50"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${s.color === "pink" ? "bg-pink-100 text-pink-600 group-hover:bg-pink-200" : "bg-green-100 text-green-700 group-hover:bg-green-200"} transition-colors`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{s.desc}</p>
                <div className={`mt-4 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide ${s.color === "pink" ? "text-pink-500" : "text-green-600"}`}>
                  Learn more <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services" className="inline-flex items-center gap-2 bg-white border-2 border-green-300 text-green-700 px-7 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors shadow-sm">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          7. CORE VALUES
      ══════════════════════════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel text="Our Values" color="pink" />
            <h2 className="text-3xl font-bold text-gray-800 mt-1">Committed to Serving You</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Transparency", desc: "We keep residents informed about barangay activities, finances, and decisions.", color: "pink" },
              { icon: Heart, title: "Community First", desc: "Every program is designed with the welfare of every Mulawin resident in mind.", color: "green" },
              { icon: CheckCircle, title: "Efficient Service", desc: "Fast, accurate, and hassle-free processing of all barangay documents and requests.", color: "pink" },
            ].map((v) => (
              <div key={v.title} className={`rounded-2xl p-8 text-center border ${v.color === "pink" ? "bg-pink-50 border-pink-100" : "bg-green-50 border-green-100"}`}>
                <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-5 ${v.color === "pink" ? "bg-pink-200 text-pink-600" : "bg-green-200 text-green-700"}`}>
                  <v.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-3">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          8. QUICK CONTACT STRIP
      ══════════════════════════════════ */}
      <section className="py-8 px-4 bg-gradient-to-r from-pink-50 to-green-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-widest">Quick Contact</p>
          {[
            { label: "Barangay Hall", value: "(046) 234-5678" },
            { label: "Emergency", value: "911 / 8-911" },
            { label: "BHW Hotline", value: "0917-234-5678" },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-2 text-sm">
              <Phone className="w-3.5 h-3.5 text-pink-400" />
              <span className="text-gray-400">{c.label}:</span>
              <span className="font-semibold text-gray-700">{c.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          9. CTA BANNER
      ══════════════════════════════════ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-green-500" />
        {/* Decorative circles */}
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-20 -right-10 w-80 h-80 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <Star className="w-8 h-8 text-white/40 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            Need a Barangay Document?
          </h2>
          <p className="text-white/85 mb-8 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Learn about requirements, fees, and processing times — or visit us at the Barangay Hall during office hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services" className="bg-white text-green-600 px-8 py-3.5 rounded-full font-bold hover:bg-green-50 transition-colors shadow-lg hover:scale-105 transition-transform">
              See Requirements
            </Link>
            <Link href="/contact" className="bg-white/20 text-white border-2 border-white/80 px-8 py-3.5 rounded-full font-bold hover:bg-white/30 transition-colors backdrop-blur-sm">
              Get Directions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
