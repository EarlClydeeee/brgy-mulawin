"use client";

import { useEffect, useId, useRef, useState } from "react";
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
  "inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:border-gray-900 hover:text-gray-900";

const logoutButtonClass =
  "inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:border-gray-900 hover:text-gray-900";

const panelLinkClass =
  "inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-800";

export default function HeaderClient({ auth }: { auth: AuthNavState }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuRendered, setMenuRendered] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      setMenuRendered(true);
      const frame = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setMenuVisible(true));
      });
      return () => window.cancelAnimationFrame(frame);
    }

    setMenuVisible(false);
    if (!menuRendered) return;

    const timeout = window.setTimeout(() => setMenuRendered(false), 220);
    return () => window.clearTimeout(timeout);
  }, [menuOpen, menuRendered]);

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (menuRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
      setMenuOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const closeMenu = () => setMenuOpen(false);

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
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Barangay Mulawin Home"
          >
            <div className="flex h-10 w-10 items-center justify-center bg-green-700 text-white">
              <IconLeaf className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-medium text-gray-500">Barangay</p>
              <p className="-mt-0.5 font-heading text-lg font-semibold text-gray-900">
                Mulawin
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`cursor-pointer rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200 xl:px-4 ${
                  pathname === link.href
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
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
              className="cursor-pointer rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-green-600"
            >
              Request Document
            </Link>
          </div>

          <div className="lg:hidden">
            <button
              ref={buttonRef}
              type="button"
              className="cursor-pointer rounded-xl p-2.5 text-gray-700 transition-colors duration-200 hover:bg-gray-100"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-haspopup="menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <IconClose className="h-6 w-6" />
              ) : (
                <IconMenu className="h-6 w-6" />
              )}
            </button>

            {menuRendered && (
              <div
                ref={menuRef}
                id={menuId}
                role="menu"
                aria-hidden={!menuVisible}
                className={`burger-dropdown fixed top-[var(--header-height)] right-0 left-0 z-50 max-h-[min(75svh,32rem)] overflow-y-auto overscroll-contain border-b border-gray-200 bg-white shadow-lg ${
                  menuVisible ? "is-open" : ""
                }`}
              >
                <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      role="menuitem"
                      onClick={closeMenu}
                      tabIndex={menuVisible ? 0 : -1}
                      className={`cursor-pointer rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200 ${
                        pathname === link.href
                          ? "bg-gray-900 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="my-2 border-t border-gray-200" />

                  {auth.isAuthenticated ? (
                    <>
                      <Link
                        href={auth.isAdmin ? "/admin/requests" : "/dashboard"}
                        role="menuitem"
                        onClick={closeMenu}
                        tabIndex={menuVisible ? 0 : -1}
                        className="cursor-pointer rounded-xl bg-gray-900 px-4 py-3 text-center text-sm font-semibold text-white"
                      >
                        {auth.isAdmin ? "Admin Panel" : "My Dashboard"}
                      </Link>
                      <LogoutButton className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700" />
                    </>
                  ) : (
                    !isAuthPage && (
                      <Link
                        href="/login"
                        role="menuitem"
                        onClick={closeMenu}
                        tabIndex={menuVisible ? 0 : -1}
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700"
                      >
                        <IconLogin className="h-4 w-4" />
                        Login
                      </Link>
                    )
                  )}

                  <Link
                    href="/services"
                    role="menuitem"
                    onClick={closeMenu}
                    tabIndex={menuVisible ? 0 : -1}
                    className="cursor-pointer rounded-xl bg-green-700 px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    Request Document
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
