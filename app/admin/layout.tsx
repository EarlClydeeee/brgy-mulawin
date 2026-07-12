import Link from "next/link";
import { LogOut, ShieldCheck } from "lucide-react";
import { logout } from "@/app/actions/auth";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/admin/requests"
              className="inline-flex items-center gap-2 text-lg font-bold text-gray-800"
            >
              <ShieldCheck className="h-5 w-5 text-pink-500" />
              Admin — Barangay Mulawin
            </Link>
            <p className="mt-1 text-sm text-gray-500">
              Manage online document requests.
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-pink-200 hover:text-pink-500"
            >
              Public site
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </form>
          </nav>
        </div>
      </header>
      {children}
    </section>
  );
}
