"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Menu from "lucide-react/dist/esm/icons/menu";
import X from "lucide-react/dist/esm/icons/x";
import Leaf from "lucide-react/dist/esm/icons/leaf";

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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Barangay Mulawin Home">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500 to-green-500 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-[10px] text-pink-600 font-bold uppercase tracking-[0.2em]">
                Barangay
              </p>
              <p className="text-xl font-heading font-bold text-gray-900 -mt-0.5">
                Mulawin
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-tight transition-all duration-300 ${
                  pathname === link.href
                    ? "bg-gray-900 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
              className="bg-green-600 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-100 active:scale-95"
            >
              Request Document
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-2xl animate-in slide-in-from-top duration-300">
          <nav className="px-4 pt-4 pb-8 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-5 py-4 rounded-2xl text-base font-bold transition-all ${
                  pathname === link.href
                    ? "bg-pink-50 text-pink-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/services"
              onClick={() => setMenuOpen(false)}
              className="mt-4 text-center bg-gray-900 text-white px-6 py-4 rounded-2xl text-base font-bold shadow-xl active:scale-95"
            >
              Request Document
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
