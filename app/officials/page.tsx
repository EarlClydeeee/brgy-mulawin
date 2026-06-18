import Image from "next/image";
import { Mail, Phone, Users, Award, Star } from "lucide-react";

export const metadata = {
  title: "Officials — Barangay Mulawin",
  description:
    "Meet the elected and appointed officials of Barangay Mulawin, Tanza, Cavite.",
};

const SHARED_EMAIL = "BARANGAYMULAWIN@YAHOO.COM";
const SHARED_PHONE = "(046) 418-2082";

const punongBarangay = {
  name: "Hon. Tricia L. Gutierrez",
  title: "Punong Barangay",
  term: "2023 – 2026",
  photo: "/brgy_officers/brgycaptain/KapitanaTriciaLubigan.png",
  email: SHARED_EMAIL,
  phone: SHARED_PHONE,
  initials: "TG",
  message:
    "Dedicated to transparent, compassionate, and people-centered governance for every resident of Barangay Mulawin.",
};

const sangguniangBarangay = [
  {
    name: "Hon. Jonas Edward P. Armintia",
    photo: "/brgy_officers/BrgyCouncilor/JONASEDWARDPARMINTIA.jpg",
    initials: "JA",
    email: SHARED_EMAIL,
    phone: SHARED_PHONE,
  },
  {
    name: "Hon. Benito A. Arbues",
    photo: "/brgy_officers/BrgyCouncilor/BENITOAARBUES.jpg",
    initials: "BA",
    email: SHARED_EMAIL,
    phone: SHARED_PHONE,
  },
  {
    name: "Hon. Juancho C. Pareja",
    photo: "/brgy_officers/BrgyCouncilor/JUANCHOCPAREJA.jpg",
    initials: "JP",
    email: SHARED_EMAIL,
    phone: SHARED_PHONE,
  },
  {
    name: "Hon. Khey Cee Arbues",
    photo: "/brgy_officers/BrgyCouncilor/KHEY CEE ARBUES.jpg",
    initials: "KA",
    email: SHARED_EMAIL,
    phone: SHARED_PHONE,
  },
  {
    name: "Hon. Jullian A. Bataclan",
    photo: "/brgy_officers/BrgyCouncilor/JULLIANABATACLAN.jpg",
    initials: "JB",
    phone: SHARED_PHONE,
  },
  {
    name: "Hon. Matias P. Arbues",
    photo: "/brgy_officers/BrgyCouncilor/MATIASPARBUES.jpg",
    initials: "MA",
    email: SHARED_EMAIL,
    phone: SHARED_PHONE,
  },
  {
    name: "Hon. Kurt T. Dignos",
    photo: "/brgy_officers/BrgyCouncilor/KURT T. DIGNOS.jpg",
    initials: "KD",
    email: SHARED_EMAIL,
    phone: SHARED_PHONE,
  },
];

const skOfficials = [
  {
    name: "Camila Marie B. Perez",
    title: "SK Chairperson",
    photo: null,
    initials: "CP",
    email: "camilamarie.perez.26@gmail.com",
    phone: "(046) 418-2082",
  },
];

const appointedOfficials = [
  {
    name: "Remil D. Sosa",
    title: "Barangay Secretary",
    photo: "/brgy_officers/BrgyCouncilor/REMILDSOSA.jpg",
    initials: "RS",
    email: "remsosa1996@gmail.com",
    phone: "0917-144-4710",
  },
  {
    name: "Judith",
    title: "Barangay Coordinator",
    photo: "/brgy_officers/BrgyCoordinator/Judith.jpg",
    initials: "JD",
    email: SHARED_EMAIL,
    phone: SHARED_PHONE,
  },
];

/* ─── Sub-components ─────────────────────────────────────────── */

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
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <Icon
        className={`w-4 h-4 shrink-0 ${
          color === "pink" ? "text-pink-400" : "text-green-500"
        }`}
      />
      <span className="truncate">{value}</span>
    </div>
  );
}

function MemberCard({
  name,
  title,
  photo,
  initials,
  email,
  phone,
  accent = "pink",
}: {
  name: string;
  title?: string;
  photo: string | null;
  initials: string;
  email?: string;
  phone?: string;
  accent?: "pink" | "green";
}) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Photo */}
      <div className="relative h-52 bg-gradient-to-br from-pink-50 to-green-50 overflow-hidden">
        {photo ? (
          <Image
            src={photo}
            alt={name}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`text-5xl font-bold ${
                accent === "pink" ? "text-pink-200" : "text-green-200"
              }`}
            >
              {initials}
            </span>
          </div>
        )}
        {/* subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <div
          className={`inline-block self-start text-[10px] font-bold uppercase tracking-[0.25em] px-2.5 py-1 rounded-full mb-3 ${
            accent === "pink"
              ? "bg-pink-100 text-pink-600"
              : "bg-green-100 text-green-700"
          }`}
        >
          {title ?? "Sangguniang Barangay Member"}
        </div>
        <p className="font-bold text-gray-800 text-sm leading-snug mb-3">
          {name}
        </p>
        <div className="mt-auto space-y-1.5">
          {phone && <ContactRow icon={Phone} value={phone} color="green" />}
          {email && <ContactRow icon={Mail} value={email} color="pink" />}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */

export default function OfficialsPage() {
  return (
    <>
      {/* ── Hero Banner ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-600 via-pink-500 to-green-500 py-20 px-4">
        {/* Decorative rings */}
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

      {/* ── Punong Barangay ─────────────────────────────────── */}
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
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row">
              {/* Photo */}
              <div
                className="relative md:w-72 shrink-0 bg-gradient-to-b from-pink-100 to-green-100"
                style={{ minHeight: "360px" }}
              >
                <Image
                  src={punongBarangay.photo}
                  alt={punongBarangay.name}
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="inline-block bg-gradient-to-r from-pink-500 to-green-500 text-white text-xs font-bold px-5 py-1.5 rounded-full uppercase tracking-widest shadow">
                    Punong Barangay
                  </span>
                </div>
              </div>

              {/* Details */}
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
                    value={punongBarangay.phone}
                    color="green"
                  />
                  <ContactRow
                    icon={Mail}
                    value={punongBarangay.email}
                    color="pink"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sangguniang Barangay ─────────────────────────────── */}
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
              Seven dedicated legislators serving the communities and programs
              of Barangay Mulawin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sangguniangBarangay.map((m, i) => (
              <MemberCard
                key={m.name}
                {...m}
                title="Sangguniang Barangay Member"
                accent={i % 2 === 0 ? "pink" : "green"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SK Officials ─────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.35em] text-pink-500 mb-2">
              <Star className="w-3 h-3" /> Youth Council
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Sangguniang Kabataan
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm">
              Championing the voice and welfare of Barangay Mulawin&apos;s youth.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {skOfficials.map((sk) => (
              <div key={sk.name} className="w-full max-w-xs">
                <MemberCard {...sk} accent="pink" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Appointed Officials ──────────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-b from-green-50/60 to-pink-50/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.35em] text-green-600 mb-2">
              <Award className="w-3 h-3" /> Administration
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Appointed Officials
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm">
              The administrative backbone keeping Barangay Mulawin running day
              to day.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {appointedOfficials.map((o, i) => (
              <div key={o.name} className="w-full max-w-xs">
                <MemberCard
                  {...o}
                  title={o.title}
                  accent={i % 2 === 0 ? "green" : "pink"}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Commitment Strip ─────────────────────────────────── */}
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
