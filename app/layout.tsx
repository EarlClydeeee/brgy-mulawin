import type { Metadata, Viewport } from "next";
import { Inter, Lexend, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig, siteUrl } from "@/lib/site";

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
  metadataBase: new URL(siteUrl),
  ...createPageMetadata({
    title: `${siteConfig.name} — Official Website`,
    description: siteConfig.description,
    path: "/",
  }),
  title: {
    default: `${siteConfig.name} — Official Website`,
    template: `%s | ${siteConfig.name}`,
  },
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  generator: "Next.js",
  category: "Government",
  classification: "Government Website",
  other: {
    "geo.region": "PH-CAV",
    "geo.placename": "Tanza, Cavite",
    "geo.position": "14.4;120.85",
    "ICBM": "14.4, 120.85",
    "revisit-after": "3 days",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-PH">
      <body className={`${inter.variable} ${lexend.variable} ${sourceSans.variable} font-sans bg-background text-foreground antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
