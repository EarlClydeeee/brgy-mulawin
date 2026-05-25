import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
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
      <body className={`${inter.variable} ${bebasNeue.variable} font-[family-name:var(--font-inter)] bg-background text-foreground antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
