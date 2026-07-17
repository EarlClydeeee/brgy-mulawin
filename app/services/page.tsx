import Link from "next/link";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { createPageMetadata, getBreadcrumbJsonLd, getFaqJsonLd, getGovernmentServiceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata = createPageMetadata({
  title: "Barangay Services",
  description:
    "Barangay clearance, certificate of residency, certificate of indigency, and business permit services at Barangay Mulawin, Tanza, Cavite. All listed services are free. View requirements and processing times.",
  path: "/services",
  keywords: [
    "barangay clearance Tanza",
    "certificate of residency Cavite",
    "certificate of indigency",
    "business permit barangay",
    "barangay services online",
    "LGU services Tanza Cavite",
  ],
});

const services = [
  {
    id: 1,
    title: "Barangay Clearance",
    desc: "An official certificate attesting that the applicant has no pending criminal or civil complaints in the barangay. Required for employment, business applications, and legal transactions.",
    requirements: [
      "Valid government-issued ID (photocopy & original)",
      "Proof of residency (utility bill or rental contract)",
      "Accomplished application form",
      "1 piece 1×1 ID photo",
    ],
    fee: "Free",
    processingTime: "Same day (30–60 mins)",
    color: "pink",
    requestType: "BARANGAY_CLEARANCE",
  },
  {
    id: 2,
    title: "Certificate of Residency",
    desc: "Official proof that the applicant is a bonafide resident of Barangay Mulawin. Required for scholarship applications, school enrollment, and government assistance.",
    requirements: [
      "Valid government-issued ID (photocopy & original)",
      "Utility bill or rental contract",
      "Accomplished application form",
    ],
    fee: "Free",
    processingTime: "Same day",
    color: "green",
    requestType: "CERTIFICATE_OF_RESIDENCY",
  },
  {
    id: 3,
    title: "Certificate of Indigency",
    desc: "For qualified low-income residents seeking financial or medical assistance from government agencies. Free of charge for qualified applicants.",
    requirements: [
      "Valid ID",
      "Proof of low-income status (if available)",
      "Referral from DSWD or social worker (if applicable)",
    ],
    fee: "Free",
    processingTime: "Same day",
    color: "pink",
    requestType: "CERTIFICATE_OF_INDIGENCY",
  },
  {
    id: 4,
    title: "Barangay Business Permit",
    desc: "Required for micro and small enterprises operating within Barangay Mulawin. Must be renewed annually.",
    requirements: [
      "DTI or SEC registration",
      "Lease contract or proof of business address",
      "Valid ID of the business owner",
      "Accomplished application form",
      "Previous year's permit (for renewals)",
    ],
    fee: "Free",
    processingTime: "1–2 business days",
    color: "green",
    requestType: "BUSINESS_PERMIT",
  },
  {
    id: 5,
    title: "Blotter Report",
    desc: "Official recording of incidents or disputes filed with the barangay. Necessary for police reports and legal proceedings.",
    requirements: [
      "Valid ID of complainant",
      "Written complaint or incident narrative",
      "Witness(es) if available",
    ],
    fee: "Free",
    processingTime: "Immediate (walk-in)",
    color: "pink",
  },
  {
    id: 6,
    title: "Cedula (Community Tax Certificate / CTC)",
    desc: "A community tax certificate issued to individuals and corporations residing or operating in the barangay.",
    requirements: [
      "Valid government-issued ID",
      "Previous year's Cedula (for renewals)",
    ],
    fee: "Free",
    processingTime: "Same day",
    color: "green",
  },
];

const steps = [
  {
    step: "01",
    title: "Visit the Barangay Hall",
    desc: "Go to the Barangay Mulawin Hall during office hours.",
    color: "pink",
  },
  {
    step: "02",
    title: "Request & Fill Out Form",
    desc: "Get the appropriate application form and fill it out completely.",
    color: "green",
  },
  {
    step: "03",
    title: "Submit Requirements",
    desc: "Submit your completed form and all required documents to the desk officer.",
    color: "pink",
  },
  {
    step: "04",
    title: "No Fee Required",
    desc: "All listed barangay services are free of charge for residents.",
    color: "green",
  },
  {
    step: "05",
    title: "Receive Document",
    desc: "Claim your signed and sealed certificate or clearance.",
    color: "pink",
  },
];

export default function ServicesPage() {
  const breadcrumbData = getBreadcrumbJsonLd([
    { name: "Services", path: "/services" },
  ]);

  const faqData = getFaqJsonLd([
    {
      question: "How do I get a Barangay Clearance in Mulawin, Tanza?",
      answer:
        "Visit the Barangay Mulawin Hall with a valid government-issued ID, proof of residency (utility bill or rental contract), accomplished application form, and 1 piece 1x1 ID photo. The service is free and processing takes 30-60 minutes. You may also request online.",
    },
    {
      question: "What are the requirements for a Certificate of Residency?",
      answer:
        "You need a valid government-issued ID (photocopy and original), utility bill or rental contract, and an accomplished application form. The service is free and is processed the same day.",
    },
    {
      question: "Are barangay services free?",
      answer:
        "Yes. All listed Barangay Mulawin services — including clearance, residency, indigency, business permit, blotter, and Cedula — are free of charge for residents.",
    },
    {
      question: "What are the office hours of Barangay Mulawin Hall?",
      answer:
        "The Barangay Hall is open Monday to Friday from 8:00 AM to 5:00 PM, and Saturday from 8:00 AM to 12:00 PM. It is closed on Sundays and public holidays.",
    },
    {
      question: "How do I apply for a Barangay Business Permit?",
      answer:
        "Bring your DTI or SEC registration, lease contract or proof of business address, valid ID, accomplished application form, and previous year's permit (for renewals). The service is free. Processing takes 1-2 business days.",
    },
  ]);

  const serviceSchemas = getGovernmentServiceJsonLd([
    {
      name: "Barangay Clearance",
      description:
        "Official certificate attesting no pending criminal or civil complaints. Required for employment, business applications, and legal transactions.",
      fee: "Free",
      processingTime: "Same day (30-60 mins)",
    },
    {
      name: "Certificate of Residency",
      description:
        "Official proof that the applicant is a bonafide resident of Barangay Mulawin. Required for scholarship applications, school enrollment, and government assistance.",
      fee: "Free",
      processingTime: "Same day",
    },
    {
      name: "Certificate of Indigency",
      description:
        "For qualified low-income residents seeking financial or medical assistance from government agencies.",
      fee: "Free",
      processingTime: "Same day",
    },
    {
      name: "Barangay Business Permit",
      description:
        "Required for micro and small enterprises operating within Barangay Mulawin. Must be renewed annually.",
      fee: "Free",
      processingTime: "1-2 business days",
    },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumbData, faqData, ...serviceSchemas]} />
      {/* Page Header */}
      <section className="gradient-hero py-14 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-white/70 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4 shadow-sm">
            <FileText className="w-4 h-4" />
            Barangay Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-green-500">
              Services
            </span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            We provide essential barangay documents and services to all
            residents of Barangay Mulawin.
          </p>
        </div>
      </section>

      {/* Office Hours Banner */}
      <section className="bg-gradient-to-r from-green-500 to-green-600 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 text-white text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              <strong>Mon – Fri:</strong> 8:00 AM – 5:00 PM
            </span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/50 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              <strong>Saturday:</strong> 8:00 AM – 12:00 PM
            </span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/50 hidden sm:block" />
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>Closed on Sundays & public holidays</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              Available Documents
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              All Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.id}
                className={`rounded-2xl border overflow-hidden card-hover ${
                  s.color === "pink"
                    ? "border-pink-100"
                    : "border-green-100"
                }`}
              >
                <div
                  className={`p-5 ${
                    s.color === "pink"
                      ? "bg-pink-50"
                      : "bg-green-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">
                        {s.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {s.processingTime}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            s.fee === "Free"
                              ? "bg-green-100 text-green-700"
                              : "bg-pink-100 text-pink-600"
                          }`}
                        >
                          {s.fee}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        s.color === "pink"
                          ? "bg-pink-200 text-pink-600"
                          : "bg-green-200 text-green-700"
                      }`}
                    >
                      <FileText className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-white">
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {s.desc}
                  </p>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-2">
                      Requirements
                    </p>
                    <ul className="space-y-1.5">
                      {s.requirements.map((req) => (
                        <li
                          key={req}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle
                            className={`w-4 h-4 mt-0.5 shrink-0 ${
                              s.color === "pink"
                                ? "text-pink-400"
                                : "text-green-500"
                            }`}
                          />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {s.requestType ? (
                    <Link
                      href={`/services/request?type=${s.requestType}`}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-green-500 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:opacity-95"
                    >
                      Request Online
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  ) : (
                    <p className="mt-5 rounded-2xl bg-gray-50 px-4 py-3 text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
                      Walk-in only
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-14 px-4 gradient-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">
              Step-by-Step
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              How to Apply
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {steps.map((s) => (
              <div
                key={s.step}
                className={`rounded-2xl p-5 text-center border ${
                  s.color === "pink"
                    ? "bg-pink-50 border-pink-100"
                    : "bg-green-50 border-green-100"
                }`}
              >
                <div
                  className={`text-3xl font-black mb-3 ${
                    s.color === "pink" ? "text-pink-300" : "text-green-300"
                  }`}
                >
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note Banner */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-pink-50 to-green-50 rounded-2xl p-6 border border-pink-100 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-pink-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-800 mb-1">
              Important Reminder
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              All requirements must be original or certified true copies.
              Processing times may vary depending on volume. All listed
              services are free of charge. For emergencies or special requests,
              please coordinate with the Barangay Secretary directly.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
