import Link from "next/link";
import type { Metadata } from "next";
import { getAuthNavState } from "@/lib/auth-nav";
import { IconShieldCheck } from "@/components/icons";
import { AdminNav } from "./AdminNav";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await getAuthNavState();

  return (
    <section className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
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
          <AdminNav isAuthenticated={auth.isAuthenticated} />
        </div>
      </header>
      {children}
    </section>
  );
}
