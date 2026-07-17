"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AuthNavState } from "@/lib/auth-nav";
import { LogoutButton } from "@/components/LogoutButton";
import {
  IconClose,
  IconLeaf,
  IconLogin,
  IconMenu,
} from "@/components/icons";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/officials", label: "Officials" },
  { href: "/services", label: "Services" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

const loginButtonClass =
  "inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-700 transition hover:border-pink-200 hover:text-pink-500";

const logoutButtonClass =
  "inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-700 transition hover:border-pink-200 hover:text-pink-500";

const panelLinkClass =
  "inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-gray-700";

export default function HeaderClient({ auth }: { auth: AuthNavState }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const authActions = auth.isAuthenticated ? (
    <>
      <Link
        href={auth.isAdmin ? "/admin/requests" : "/dashboard"}
        className={panelLinkClass}
      >
        {auth.isAdmin ? "Admin" : "Dashboard"}
      </Link>
      <LogoutButton className={logoutButtonClass} />
    </>
  ) : (
    !isAuthPage && (
      <Link href="/login" className={loginButtonClass}>
        <IconLogin className="h-4 w-4" />
        Login
      </Link>
    )
  );

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Barangay Mulawin Home"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-green-500 shadow-lg transition-transform duration-300 group-hover:rotate-12">
              <IconLeaf className="h-6 w-6 text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-600">
                Barangay
              </p>
              <p className="-mt-0.5 font-heading text-xl font-bold text-gray-900">
                Mulawin
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2.5 text-sm font-bold tracking-tight transition-all duration-300 xl:px-5 ${
                  pathname === link.href
                    ? "bg-gray-900 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            {authActions}
            <Link
              href="/services"
              className="rounded-full bg-green-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-green-100 transition-colors hover:bg-green-700 active:scale-95 xl:px-6"
            >
              Request Document
            </Link>
          </div>

          <button
            className="rounded-xl p-2.5 text-gray-600 transition-colors hover:bg-gray-100 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <IconClose className="h-6 w-6" />
            ) : (
              <IconMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="animate-menu-in max-h-[calc(100svh-var(--header-height))] overflow-y-auto border-t border-gray-100 bg-white shadow-2xl lg:hidden">
          <nav className="flex flex-col gap-2 px-4 pb-[calc(env(safe-area-inset-bottom)+2rem)] pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-2xl px-5 py-4 text-base font-bold transition-all ${
                  pathname === link.href
                    ? "bg-pink-50 text-pink-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              {auth.isAuthenticated ? (
                <>
                  <Link
                    href={auth.isAdmin ? "/admin/requests" : "/dashboard"}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl bg-gray-900 px-6 py-4 text-center text-base font-bold text-white shadow-xl active:scale-95"
                  >
                    {auth.isAdmin ? "Admin Panel" : "My Dashboard"}
                  </Link>
                  <LogoutButton
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 px-6 py-4 text-base font-bold text-gray-700"
                  />
                </>
              ) : (
                !isAuthPage && (
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 px-6 py-4 text-base font-bold text-gray-700"
                  >
                    <IconLogin className="h-4 w-4" />
                    Login
                  </Link>
                )
              )}
              <Link
                href="/services"
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl bg-green-600 px-6 py-4 text-center text-base font-bold text-white shadow-xl active:scale-95"
              >
                Request Document
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
