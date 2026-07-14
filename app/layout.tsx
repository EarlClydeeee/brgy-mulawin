import type { Metadata } from "next";
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
