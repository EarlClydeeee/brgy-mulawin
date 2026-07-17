"use client";

import { useActionState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Share2,
} from "lucide-react";
import {
  submitContactMessage,
  type ContactActionState,
} from "@/app/actions/contact";

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "Barangay Hall, Mulawin St., Tanza, Cavite",
    color: "pink",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(02) 8234-5678 / 0917-234-5678",
    color: "green",
  },
  {
    icon: Mail,
    label: "Email",
    value: "brgy.mulawin@rodriguez.gov.ph",
    color: "pink",
  },
  {
    icon: Share2,
    label: "Facebook",
    value: "facebook.com/brgymulawin",
    color: "green",
  },
];

const officeHours = [
  { day: "Monday – Friday", hours: "8:00 AM – 5:00 PM" },
  { day: "Saturday", hours: "8:00 AM – 12:00 PM" },
  { day: "Sunday", hours: "Closed" },
  { day: "Public Holidays", hours: "Closed" },
];

export default function ContactPage() {
  const [state, formAction] = useActionState<ContactActionState, FormData>(
    submitContactMessage,
    {},
  );

  return (
    <>
      {/* Page Header */}
      <section className="gradient-hero py-14 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-white/70 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4 shadow-sm">
            <Phone className="w-4 h-4" />
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-green-500">
              Us
            </span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Have a concern or inquiry? Reach us through any of the channels
            below or send a message directly.
          </p>
        </div>
      </section>

      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest">
              Send a Message
            </span>
            <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-6">
              We&apos;d Love to Hear From You
            </h2>

            {state.success ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-500">
                  Thank you for reaching out. Our team will get back to you
                  within 1–2 business days.
                </p>
                <a
                  href="/contact"
                  className="mt-5 inline-block text-sm font-medium text-green-600 hover:text-green-700"
                >
                  Send another message
                </a>
              </div>
            ) : (
              <form action={formAction} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-pink-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Juan dela Cruz"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="09XX-XXX-XXXX"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-pink-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject <span className="text-pink-400">*</span>
                  </label>
                  <select
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition bg-white"
                  >
                    <option value="">Select a subject</option>
                    <option>Barangay Clearance Inquiry</option>
                    <option>Certificate Request</option>
                    <option>Blotter / Complaint</option>
                    <option>Community Program</option>
                    <option>General Inquiry</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-pink-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Type your message or concern here..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition resize-none"
                  />
                </div>

                {state.error && (
                  <p
                    role="alert"
                    className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    {state.error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-400 to-green-400 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info & Map */}
          <div>
            <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">
              Find Us
            </span>
            <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-6">
              Contact Information
            </h2>

            <div className="space-y-4 mb-8">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className={`flex items-start gap-4 p-4 rounded-xl border ${
                    info.color === "pink"
                      ? "bg-pink-50 border-pink-100"
                      : "bg-green-50 border-green-100"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      info.color === "pink"
                        ? "bg-pink-200 text-pink-600"
                        : "bg-green-200 text-green-700"
                    }`}
                  >
                    <info.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
                      {info.label}
                    </p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Office Hours */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-pink-400 to-green-400 px-5 py-3">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Clock className="w-4 h-4" />
                  Office Hours
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {officeHours.map((h) => (
                  <div
                    key={h.day}
                    className="flex items-center justify-between px-5 py-3"
                  >
                    <span className="text-sm text-gray-600">{h.day}</span>
                    <span
                      className={`text-sm font-medium ${
                        h.hours === "Closed"
                          ? "text-red-400"
                          : "text-green-700"
                      }`}
                    >
                      {h.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Embed Placeholder */}
            <div className="mt-6 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <iframe
                title="Barangay Mulawin Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3857.8225!2d121.13!3d14.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQ1JzAwLjAiTiAxMjHCsDA3JzQ4LjAiRQ!5e0!3m2!1sen!2sph!4v1620000000000!5m2!1sen!2sph"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
