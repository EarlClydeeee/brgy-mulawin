"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Leaf } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/officials", label: "Officials" },
  { href: "/services", label: "Services" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-pink-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-green-300 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-xs text-pink-500 font-medium uppercase tracking-widest">
                Barangay
              </p>
              <p className="text-lg font-bold text-green-600 -mt-0.5">
                Mulawin
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-pink-100 text-pink-600 shadow-sm"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/services"
              className="bg-gradient-to-r from-pink-400 to-green-400 text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity shadow-md"
            >
              Request a Certificate
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-pink-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-pink-100 shadow-lg">
          <nav className="px-4 pt-3 pb-5 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  pathname === link.href
                    ? "bg-pink-100 text-pink-600"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/services"
              onClick={() => setMenuOpen(false)}
              className="mt-3 text-center bg-gradient-to-r from-pink-400 to-green-400 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-md"
            >
              Request a Certificate
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
