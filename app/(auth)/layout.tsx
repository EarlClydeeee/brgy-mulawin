import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50 px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md flex-col justify-center">
        <Link
          href="/"
          className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.3em] text-pink-500"
        >
          Barangay Mulawin
        </Link>
        {children}
      </div>
    </div>
  );
}
