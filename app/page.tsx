import Image from "next/image";
import Link from "next/link";
import AnnouncementsSection from "@/components/AnnouncementsSection";
import { JsonLd } from "@/components/JsonLd";
import { createPageMetadata, getOrganizationJsonLd, getWebsiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import {
  FileText,
  Users,
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

export const metadata = {
  ...createPageMetadata({
    title: `${siteConfig.name}, Tanza Cavite — Official Website`,
    description:
      "Official barangay website of Mulawin, Tanza, Cavite. Request clearances and certificates online, read announcements, and contact barangay officials.",
    path: "/",
    keywords: ["barangay Mulawin Tanza", "official LGU website"],
  }),
  verification: {
    google: "djXzJ-4o4nAieRe9BQvV-TaA-S7EEJ9cDKg0sulchQg",
  },
};

export const dynamic = "force-dynamic";

/* ─── Section label ──────────────────────────────────────────── */
function SectionLabel({ text, color = "pink" }: { text: string; color?: "pink" | "green" }) {
  return (
    <span className={`inline-block text-xs font-bold uppercase tracking-[0.3em] mb-3 ${color === "pink" ? "text-pink-600" : "text-green-600"}`}>
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
      <JsonLd data={[getOrganizationJsonLd(), getWebsiteJsonLd()]} />
      {/* 1. HERO */}
      <section
        className="relative flex min-h-[34rem] items-center justify-center overflow-hidden sm:min-h-[38rem]"
        style={{ height: "calc(100svh - var(--header-height))" }}
      >
        <Image 
          src="/bg.jpg" 
          alt="Aerial view of Barangay Mulawin landscape" 
          fill 
          className="object-cover object-center" 
          priority 
          quality={90} 
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-brightness-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
          {/* Location pill */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs px-5 py-2 rounded-full mb-8 uppercase tracking-[0.2em]">
            <Leaf className="w-3.5 h-3.5 text-green-400 shrink-0" />
            Tanza, Cavite
          </div>

          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-white/90 sm:text-sm sm:tracking-[0.5em]">Official Portal of Barangay</p>

          <h1
            className="font-heading leading-tight text-white mb-6 select-none"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 10rem)",
              letterSpacing: "-0.02em",
              textShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
            MULAWIN
          </h1>

          {/* Est. divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-white/40" />
            <span className="text-white/70 text-xs uppercase tracking-[0.4em] font-medium">Est. 1975</span>
            <div className="h-px w-16 bg-white/40" />
          </div>

          <p className="text-white/95 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-10 [text-wrap:balance]">
            Rooted in strength. Growing together for a progressive community.
          </p>

          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link 
              href="/about" 
              className="rounded-full bg-white px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-green-700 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-green-50 active:scale-95 sm:px-10"
              aria-label="Discover more about Barangay Mulawin"
            >
              Discover Our Story
            </Link>
            <Link 
              href="/services" 
              className="flex items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 active:scale-95 sm:px-10"
              aria-label="View our barangay services"
            >
              Our Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll Down</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* 2. STATS RIBBON */}
      <section className="bg-white border-y border-gray-100 py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-gray-600 text-sm font-semibold">
          {[
            { icon: Users, label: "12,500+ Residents", color: "text-pink-500" },
            { icon: Heart, label: "18 Active Programs", color: "text-green-500" },
            { icon: Shield, label: "9 Barangay Officials", color: "text-pink-500" },
            { icon: CalendarDays, label: "50+ Years of Service", color: "text-green-500" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <s.icon className={`w-5 h-5 ${s.color}`} />
              <span className="tracking-tight">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ANNOUNCEMENTS */}
      <AnnouncementsSection />

      {/* 4. MISSION & VISION */}
      <section className="py-24 px-4 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel text="Our Foundation" color="pink" />
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Mission &amp; Vision
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
              The guiding principles behind every program, service, and decision made for Barangay Mulawin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Mission */}
            <div className="group relative rounded-[2rem] overflow-hidden shadow-sm border border-pink-100 bg-white p-10 sm:p-12 hover:shadow-xl transition-shadow duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-pink-600 flex items-center justify-center mb-8 shadow-lg shadow-pink-200">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <p className="text-pink-600 text-xs font-bold uppercase tracking-[0.2em] mb-4">Our Mission</p>
                <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                  Serve with Integrity &amp; Compassion
                </h3>
                <p className="text-gray-600 text-base leading-relaxed mb-10">
                  To deliver efficient, transparent, and responsive local governance services that uplift the living conditions of every resident in Barangay Mulawin — ensuring that no household is left behind in accessing basic needs, social services, and community programs.
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 sm:gap-x-8">
                  {["Transparency", "Integrity", "Service"].map((v) => (
                    <div key={v}>
                      <p className="text-sm font-bold text-pink-600">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="group relative rounded-[2rem] overflow-hidden shadow-sm border border-green-100 bg-white p-10 sm:p-12 hover:shadow-xl transition-shadow duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center mb-8 shadow-lg shadow-green-200">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <p className="text-green-600 text-xs font-bold uppercase tracking-[0.2em] mb-4">Our Vision</p>
                <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                  A Peaceful &amp; Progressive Barangay
                </h3>
                <p className="text-gray-600 text-base leading-relaxed mb-10">
                  A peaceful, progressive, and self-sustaining Barangay Mulawin where every resident enjoys a safe environment, quality education, accessible health care, livelihood opportunities, and a community rooted in unity, integrity, and respect.
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 sm:gap-x-8">
                  {["Progress", "Unity", "Growth"].map((v) => (
                    <div key={v}>
                      <p className="text-sm font-bold text-green-600">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PUNONG BARANGAY SPOTLIGHT */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col md:flex-row bg-white">
            {/* Photo side */}
            <div className="relative min-h-72 shrink-0 bg-gray-50 sm:min-h-[24rem] md:w-96 md:min-h-[450px]">
              <Image
                src="/brgy_officers/brgycaptain/KapitanaTriciaLubigan.png"
                alt="Hon. Tricia Lubigan — Punong Barangay"
                fill
                className="object-cover object-top"
                sizes="(max-width: 767px) 100vw, 24rem"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <span className="inline-block bg-white text-gray-900 text-xs font-bold px-5 py-2 rounded-full uppercase tracking-widest shadow-xl">
                  Punong Barangay
                </span>
              </div>
            </div>

            {/* Text side */}
            <div className="flex-1 p-10 sm:p-16 flex flex-col justify-center">
              <SectionLabel text="The Leadership" color="pink" />
              <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-2">
                Hon. Tricia Lubigan
              </h2>
              <p className="text-green-600 font-bold text-lg mb-8 tracking-tight">Punong Barangay, Barangay Mulawin</p>

              <blockquote className="border-l-4 border-pink-500 pl-8 text-gray-700 italic text-lg leading-relaxed mb-10">
                &ldquo;My commitment to Barangay Mulawin is unwavering — to serve every resident with transparency, compassion, and purpose. Together, we will build a community where every family thrives.&rdquo;
              </blockquote>

              <div className="flex flex-wrap gap-3 mb-10">
                {["Community Development", "Health Advocacy", "Youth Programs", "Livelihood"].map((tag) => (
                  <span key={tag} className="text-xs bg-gray-50 text-gray-600 border border-gray-200 px-4 py-1.5 rounded-full font-semibold">
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href="/officials"
                className="self-start inline-flex items-center gap-3 bg-gray-900 text-white font-bold text-sm px-8 py-4 rounded-full hover:bg-pink-600 transition-all shadow-xl active:scale-95"
              >
                Meet the Officials <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SERVICES */}
      <section className="py-24 px-4 bg-gray-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel text="Citizen Services" color="green" />
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">Barangay Services</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
              Empowering our residents with accessible, fast, and transparent community services.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <Link
                href="/services"
                key={s.title}
                className={`group rounded-3xl p-8 border card-hover flex flex-col bg-white transition-all duration-300 ${
                  s.color === "pink" ? "border-pink-50 hover:border-pink-200" : "border-green-50 hover:border-green-200"
                }`}
                aria-label={`Learn more about ${s.title}`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${s.color === "pink" ? "bg-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white" : "bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white"} transition-all duration-300`}>
                  <s.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{s.desc}</p>
                <div className={`mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${s.color === "pink" ? "text-pink-600" : "text-green-600"}`}>
                  Requirements <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="inline-flex items-center gap-3 bg-white border-2 border-gray-200 text-gray-900 px-10 py-4 rounded-full font-bold hover:border-green-500 hover:text-green-600 transition-all shadow-sm active:scale-95">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CORE VALUES */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel text="Our Values" color="pink" />
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Committed to Serving You</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Transparency", desc: "We keep residents informed about barangay activities, finances, and decisions.", color: "pink" },
              { icon: Heart, title: "Community First", desc: "Every program is designed with the welfare of every Mulawin resident in mind.", color: "green" },
              { icon: CheckCircle, title: "Efficient Service", desc: "Fast, accurate, and hassle-free processing of all barangay documents and requests.", color: "pink" },
            ].map((v) => (
              <div key={v.title} className="rounded-3xl p-10 text-center border border-gray-100 bg-gray-50/30">
                <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg ${v.color === "pink" ? "bg-pink-600 text-white shadow-pink-100" : "bg-green-600 text-white shadow-green-100"}`}>
                  <v.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-4 tracking-tight">{v.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. QUICK CONTACT STRIP */}
      <section className="py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p className="text-pink-400 text-xs font-bold uppercase tracking-[0.3em]">Quick Contact</p>
            <p className="text-xl font-bold tracking-tight">Need immediate assistance?</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { label: "Barangay Hall", value: "(046) 234-5678" },
              { label: "Emergency", value: "911 / 8-911" },
              { label: "BHW Hotline", value: "0917-234-5678" },
            ].map((c) => (
              <div key={c.label} className="flex flex-col items-center md:items-start gap-1">
                <span className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">{c.label}</span>
                <span className="font-bold text-base tracking-tight">{c.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA BANNER */}
      <section className="relative py-24 px-4 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-40">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-600/20 via-transparent to-transparent" />
           <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-600/20 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Star className="w-8 h-8 text-pink-400" />
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            Seamless Barangay Services
          </h2>
          <p className="text-gray-300 mb-12 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Access requirements, fees, and processing times online before visiting the Barangay Hall.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              href="/services" 
              className="bg-white text-gray-900 px-12 py-5 rounded-full font-bold hover:bg-green-50 transition-all shadow-2xl hover:scale-105 active:scale-95"
            >
              See Requirements
            </Link>
            <Link 
              href="/contact" 
              className="bg-white/10 text-white border-2 border-white/20 px-12 py-5 rounded-full font-bold hover:bg-white/20 transition-all backdrop-blur-md active:scale-95"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
