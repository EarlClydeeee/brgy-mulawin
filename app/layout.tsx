import type { Metadata } from "next";
import { Inter, Lexend, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  title: "Barangay Mulawin — Official Website",
  description:
    "The official website of Barangay Mulawin, Tanza, Cavite. Access barangay services, news, and announcements.",
  keywords: "Barangay Mulawin, Tanza, Cavite, LGU, barangay services",
  openGraph: {
    title: "Barangay Mulawin — Official Website",
    description:
      "Access barangay services, news, and community information for Barangay Mulawin.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lexend.variable} ${sourceSans.variable} font-sans bg-background text-foreground antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
