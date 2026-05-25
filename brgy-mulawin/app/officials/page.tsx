import Image from "next/image";
import { Users, Mail, Phone } from "lucide-react";

export const metadata = {
  title: "Officials — Barangay Mulawin",
  description: "Meet the elected and appointed officials of Barangay Mulawin.",
};

const pungungBrgy = {
  name: "Hon. Tricia Lubigan",
  position: "Punong Barangay",
  term: "2023–2026",
  contact: "0917-234-5678",
  email: "punong@brgymulawin.gov.ph",
  photo: "/brgy_officers/KapitanaTriciaLubigan.png",
  initials: "TL",
};

const kagawads = [
  {
    name: "Hon. Maria Theresa Santos",
    position: "Barangay Kagawad",
    committee: "Health & Sanitation",
    initials: "MT",
  },
  {
    name: "Hon. Roberto Gomez Jr.",
    position: "Barangay Kagawad",
    committee: "Education & Youth",
    initials: "RG",
  },
  {
    name: "Hon. Lourdes Villanueva",
    position: "Barangay Kagawad",
    committee: "Peace & Order",
    initials: "LV",
  },
  {
    name: "Hon. Arturo Ramos",
    position: "Barangay Kagawad",
    committee: "Infrastructure",
    initials: "AR",
  },
  {
    name: "Hon. Consuelo Bautista",
    position: "Barangay Kagawad",
    committee: "Social Welfare",
    initials: "CB",
  },
  {
    name: "Hon. Felix Cruz",
    position: "Barangay Kagawad",
    committee: "Livelihood & Environment",
    initials: "FC",
  },
  {
    name: "Hon. Remedios Ocampo",
    position: "Barangay Kagawad",
    committee: "Sports & Cultural Affairs",
    initials: "RO",
  },
];

const skOfficials = [
  {
    name: "Jomari Dela Rosa",
    position: "SK Chairperson",
    initials: "JD",
  },
  {
    name: "Kristine Lim",
    position: "SK Kagawad",
    initials: "KL",
  },
  {
    name: "Andrei Santos",
    position: "SK Kagawad",
    initials: "AS",
  },
];

const appointedOfficials = [
  { name: "Nena Resurreccion", position: "Barangay Secretary" },
  { name: "Danilo Flores", position: "Barangay Treasurer" },
  { name: "Dr. Rowena Aguilar", position: "BHW Coordinator" },
  { name: "Sgt. Vicente Reyes", position: "BCPC Focal Person" },
];

export default function OfficialsPage() {
  return (
    <>
      {/* Page Header */}
      <section className="gradient-hero py-14 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-white/70 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4 shadow-sm">
            <Users className="w-4 h-4" />
            Leadership
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Barangay{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-green-500">
              Officials
            </span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Meet the dedicated public servants elected and appointed to lead
            Barangay Mulawin.
          </p>
        </div>
      </section>

      {/* Punong Barangay */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              Chief Executive
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              Punong Barangay
            </h2>
          </div>

          <div className="max-w-sm mx-auto">
            <div className="bg-gradient-to-br from-pink-50 to-green-50 rounded-3xl overflow-hidden border border-pink-100 shadow-md card-hover">
              <div className="relative w-full h-72">
                <Image
                  src={pungungBrgy.photo}
                  alt={pungungBrgy.name}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <span className="inline-block bg-gradient-to-r from-pink-500 to-green-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                    Punong Barangay
                  </span>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800">{pungungBrgy.name}</h3>
                <p className="text-xs text-gray-400 mt-1 mb-4">Term: {pungungBrgy.term}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-green-500" />
                    {pungungBrgy.contact}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-pink-400" />
                    {pungungBrgy.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kagawads */}
      <section className="py-14 px-4 gradient-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">
              Legislative Council
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              Barangay Kagawads
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {kagawads.map((k, i) => (
              <div
                key={k.name}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm card-hover"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 font-bold text-lg ${
                      i % 2 === 0
                        ? "bg-pink-100 text-pink-600"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {k.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm leading-tight">
                      {k.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{k.position}</p>
                  </div>
                </div>
                <div
                  className={`mt-4 text-xs font-medium px-3 py-1.5 rounded-full inline-block ${
                    i % 2 === 0
                      ? "bg-pink-50 text-pink-600"
                      : "bg-green-50 text-green-700"
                  }`}
                >
                  Committee on {k.committee}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SK Officials */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              Youth Council
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              Sangguniang Kabataan (SK)
            </h2>
            <p className="text-gray-500 mt-2 max-w-xl mx-auto">
              Representing and advocating for the youth of Barangay Mulawin.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {skOfficials.map((sk, i) => (
              <div
                key={sk.name}
                className={`rounded-2xl p-6 border text-center min-w-[180px] card-hover ${
                  i === 0
                    ? "bg-gradient-to-br from-pink-50 to-green-50 border-pink-200"
                    : "bg-white border-gray-100"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center font-bold text-xl mb-3 ${
                    i === 0
                      ? "bg-gradient-to-br from-pink-300 to-green-300 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {sk.initials}
                </div>
                <p className="font-semibold text-gray-800">{sk.name}</p>
                <p className="text-xs text-gray-400 mt-1">{sk.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointed Officials */}
      <section className="py-14 px-4 gradient-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">
              Administration
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              Appointed Officials
            </h2>
          </div>
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {appointedOfficials.map((o, i) => (
              <div
                key={o.name}
                className={`rounded-2xl p-5 flex items-center gap-4 border ${
                  i % 2 === 0
                    ? "bg-pink-50 border-pink-100"
                    : "bg-green-50 border-green-100"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shrink-0 ${
                    i % 2 === 0
                      ? "bg-pink-200 text-pink-700"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {o.name
                    .split(" ")
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{o.name}</p>
                  <p className="text-sm text-gray-500">{o.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
