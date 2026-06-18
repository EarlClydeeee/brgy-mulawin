import Link from "next/link";
import { Phone, Mail, MapPin, Leaf, Share2, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Branding */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-green-500 flex items-center justify-center shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-pink-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                  Official Website
                </p>
                <p className="text-2xl font-heading font-bold">Mulawin</p>
              </div>
            </div>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Serving the community with integrity, transparency, and dedication
              for a better, more progressive Mulawin.
            </p>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all px-6 py-3 rounded-full text-sm font-bold active:scale-95"
              aria-label="Follow Barangay Mulawin on Facebook"
            >
              <Share2 className="w-4 h-4 text-pink-400" />
              Follow on Facebook
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-white mb-6 uppercase text-xs tracking-[0.2em]">
              Navigation
            </h3>
            <ul className="space-y-4">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Barangay" },
                { href: "/officials", label: "Officials" },
                { href: "/services", label: "Services" },
                { href: "/news", label: "News & Updates" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-pink-400 text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-white mb-6 uppercase text-xs tracking-[0.2em]">
              Barangay Services
            </h3>
            <ul className="space-y-4">
              {[
                "Barangay Clearance",
                "Certificate of Residency",
                "Certificate of Indigency",
                "Business Permit",
                "Blotter Report",
                "Cedula (CTC)",
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-gray-400 hover:text-green-400 text-sm font-medium transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-white mb-6 uppercase text-xs tracking-[0.2em]">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-pink-500 mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  Barangay Mulawin, Tanza, Cavite, Philippines
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-gray-400 text-sm font-medium">(02) 8234-5678</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-pink-500 shrink-0" />
                <span className="text-gray-400 text-sm font-medium">
                  brgy.mulawin@rodriguez.gov.ph
                </span>
              </li>
              <li className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  Mon – Fri: 8:00 AM – 5:00 PM
                  <br />
                  Sat: 8:00 AM – 12:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Barangay Mulawin. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">
              Tanza, Cavite · LGU
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
