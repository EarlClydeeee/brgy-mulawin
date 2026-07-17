import {
  Target,
  Eye,
  Leaf,
  MapPin,
  CalendarDays,
  Users,
  Handshake,
  Search,
  ClipboardList,
} from "lucide-react";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata = createPageMetadata({
  title: "About Us",
  description:
    "Learn about the history, mission, vision, and core values of Barangay Mulawin in Tanza, Cavite. Established in 1975, serving 12,500+ residents.",
  path: "/about",
  keywords: [
    "Barangay Mulawin history",
    "Tanza Cavite community",
    "barangay mission vision",
    "Mulawin established 1975",
  ],
});

const milestones = [
  {
    year: "1975",
    title: "Barangay Established",
    desc: "Barangay Mulawin was officially established as a distinct barangay under the municipality of Tanza.",
  },
  {
    year: "1986",
    title: "Barangay Hall Construction",
    desc: "The first permanent Barangay Hall was constructed, providing a formal center for community governance.",
  },
  {
    year: "2000",
    title: "Health Center Inaugurated",
    desc: "A fully operational Barangay Health Center was inaugurated to serve the primary health needs of residents.",
  },
  {
    year: "2010",
    title: "Livelihood Programs Launched",
    desc: "Several livelihood training programs were introduced to uplift the economic conditions of barangay residents.",
  },
  {
    year: "2024",
    title: "Digital Services Initiative",
    desc: "Barangay Mulawin launched its online information portal to better serve the community in the digital age.",
  },
];

export default function AboutPage() {
  const breadcrumbData = getBreadcrumbJsonLd([
    { name: "About Us", path: "/about" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbData} />
      {/* Page Header */}
      <section className="gradient-hero py-14 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-white/70 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4 shadow-sm">
            <Leaf className="w-4 h-4" />
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-green-500">
              Barangay Mulawin
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            A proud community in Tanza, Cavite — rooted in
            history, growing with purpose.
          </p>
        </div>
      </section>

      {/* Profile Cards */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: MapPin,
              label: "Location",
              value: "Tanza, Cavite",
              color: "pink",
            },
            {
              icon: Users,
              label: "Population",
              value: "Approx. 12,500 Residents",
              color: "green",
            },
            {
              icon: CalendarDays,
              label: "Year Established",
              value: "1975",
              color: "pink",
            },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-2xl p-6 flex items-center gap-5 border ${
                item.color === "pink"
                  ? "bg-pink-50 border-pink-100"
                  : "bg-green-50 border-green-100"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                  item.color === "pink"
                    ? "bg-pink-200 text-pink-600"
                    : "bg-green-200 text-green-700"
                }`}
              >
                <item.icon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                  {item.label}
                </p>
                <p className="font-bold text-gray-800 mt-0.5">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* History */}
      <section className="bg-gray-50 px-4 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
                Our Roots
              </span>
              <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-5">
                History of Barangay Mulawin
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Barangay Mulawin takes its name from the <em>mulawin</em>{" "}
                  tree — a hardwood tree native to the Philippines known for its
                  strength, resilience, and beauty. Like its namesake, the
                  community has grown deep roots and stands firm through
                  challenges.
                </p>
                <p>
                  Formally established in 1975, Barangay Mulawin is one of the
                  barangays of Tanza, a municipality in Cavite province. The
                  barangay&apos;s landscape includes coastal areas, open fields,
                  and growing residential communities.
                </p>
                <p>
                  Over the decades, the barangay has grown from a small
                  agrarian community to a thriving residential and
                  semi-commercial area, with continued investment in education,
                  health, livelihood, and infrastructure.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">
                Key Milestones
              </span>
              <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-5">
                Our Timeline
              </h2>
              <div className="relative pl-6 border-l-2 border-pink-200 space-y-6">
                {milestones.map((m, i) => (
                  <div key={m.year} className="relative">
                    <div className="absolute -left-[29px] w-5 h-5 rounded-full border-2 border-pink-300 bg-white flex items-center justify-center">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          i % 2 === 0 ? "bg-pink-400" : "bg-green-400"
                        }`}
                      />
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm ml-2">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          i % 2 === 0
                            ? "bg-pink-100 text-pink-600"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {m.year}
                      </span>
                      <h3 className="font-semibold text-gray-800 mt-2 mb-1">
                        {m.title}
                      </h3>
                      <p className="text-sm text-gray-500">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">
              Our Foundation
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              Mission & Vision
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="rounded-2xl p-8 bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200">
              <div className="w-14 h-14 rounded-2xl bg-pink-200 flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To deliver efficient, transparent, and responsive local
                governance services that uplift the living conditions of every
                resident in Barangay Mulawin — ensuring that no household is
                left behind in accessing basic needs, social services, and
                community programs.
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-2xl p-8 bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
              <div className="w-14 h-14 rounded-2xl bg-green-200 flex items-center justify-center mb-5">
                <Eye className="w-7 h-7 text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                A peaceful, progressive, and self-sustaining Barangay Mulawin
                where every resident enjoys a safe environment, quality
                education, accessible health care, livelihood opportunities, and
                a community rooted in unity, integrity, and respect.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="text-sm font-semibold text-green-700">
              What we stand for
            </span>
            <h2 className="mt-2 text-3xl font-semibold text-gray-900">
              Core values
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { value: "Integrity", Icon: Handshake },
              { value: "Transparency", Icon: Search },
              { value: "Service", Icon: Leaf },
              { value: "Unity", Icon: Users },
              { value: "Accountability", Icon: ClipboardList },
            ].map((cv) => (
              <div
                key={cv.value}
                className="border border-gray-200 bg-white p-5 text-center"
              >
                <cv.Icon
                  className="mx-auto mb-3 h-7 w-7 text-green-700"
                  aria-hidden
                />
                <p className="font-semibold text-gray-900">{cv.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
