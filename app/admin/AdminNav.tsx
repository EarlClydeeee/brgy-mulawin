"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { logout } from "@/app/actions/auth";
import { IconLogin, IconLogout } from "@/components/icons";

const links = [
  { href: "/admin/requests", label: "Requests" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export function AdminNav({ isAuthenticated }: { isAuthenticated: boolean }) {
  const pathname = usePathname();

  return (
    <nav
      className="flex items-center gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-end sm:overflow-visible sm:pb-0"
      aria-label="Admin navigation"
    >
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              active
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-200 text-gray-600 hover:border-pink-200 hover:text-pink-500"
            }`}
          >
            {Icon && <Icon className="h-4 w-4" />}
            {label}
          </Link>
        );
      })}
      <Link
        href="/"
        className="inline-flex shrink-0 items-center rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-pink-200 hover:text-pink-500"
      >
        Public site
      </Link>
      {isAuthenticated ? (
        <form action={logout} className="shrink-0">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            <IconLogout className="h-4 w-4" />
            Logout
          </button>
        </form>
      ) : (
        <Link
          href="/login"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
        >
          <IconLogin className="h-4 w-4" />
          Login
        </Link>
      )}
    </nav>
  );
}
