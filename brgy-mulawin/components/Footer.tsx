import Link from "next/link";
import { Phone, Mail, MapPin, Leaf, Share2, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-green-600 to-green-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-green-200 text-xs uppercase tracking-widest">
                  Official Website
                </p>
                <p className="text-xl font-bold">Barangay Mulawin</p>
              </div>
            </div>
            <p className="text-green-100 text-sm leading-relaxed">
              Serving the community with integrity, transparency, and dedication
              for a better Mulawin.
            </p>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-full text-sm"
            >
              <Share2 className="w-4 h-4" />
              Follow on Facebook
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-green-200 mb-4 uppercase text-xs tracking-widest">
              Quick Links
            </h3>
            <ul className="space-y-2">
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
                    className="text-green-100 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-green-200 mb-4 uppercase text-xs tracking-widest">
              Services
            </h3>
            <ul className="space-y-2">
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
                    className="text-green-100 hover:text-white text-sm transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-green-200 mb-4 uppercase text-xs tracking-widest">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-pink-300 mt-0.5 shrink-0" />
                <span className="text-green-100 text-sm">
                  Barangay Mulawin, Tanza, Cavite, Philippines
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-pink-300 shrink-0" />
                <span className="text-green-100 text-sm">(02) 8234-5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-pink-300 shrink-0" />
                <span className="text-green-100 text-sm">
                  brgy.mulawin@rodriguez.gov.ph
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-pink-300 mt-0.5 shrink-0" />
                <span className="text-green-100 text-sm">
                  Mon – Fri: 8:00 AM – 5:00 PM
                  <br />
                  Sat: 8:00 AM – 12:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-500/50 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-green-200 text-sm">
            © {new Date().getFullYear()} Barangay Mulawin. All rights reserved.
          </p>
          <p className="text-green-300 text-xs">
            Tanza, Cavite · Local Government Unit
          </p>
        </div>
      </div>
    </footer>
  );
}
