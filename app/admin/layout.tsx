import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { getAuthNavState } from "@/lib/auth-nav";
import { IconLogin, IconLogout, IconShieldCheck } from "@/components/icons";

const navLinkClass =
  "rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-pink-200 hover:text-pink-500";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await getAuthNavState();

  return (
    <section className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/admin/requests"
              className="inline-flex items-center gap-2 text-lg font-bold text-gray-800"
            >
              <IconShieldCheck className="h-5 w-5 text-pink-500" />
              Admin — Barangay Mulawin
            </Link>
            <p className="mt-1 text-sm text-gray-500">
              Manage document requests and community announcements.
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-3">
            <Link href="/admin/requests" className={navLinkClass}>
              Requests
            </Link>
            <Link href="/admin/news" className={navLinkClass}>
              News
            </Link>
            <Link href="/" className={navLinkClass}>
              Public site
            </Link>
            {auth.isAuthenticated ? (
              <form action={logout}>
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
                className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
              >
                <IconLogin className="h-4 w-4" />
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      {children}
    </section>
  );
}
