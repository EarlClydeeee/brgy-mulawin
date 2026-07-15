import type { Metadata } from "next";
import { createPageMetadata, getBreadcrumbJsonLd, getContactPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Contact Barangay Mulawin in Tanza, Cavite. Find office hours, phone numbers, email address, location map, and send a message directly to barangay staff.",
  path: "/contact",
  keywords: [
    "barangay contact",
    "Barangay Mulawin office hours",
    "barangay hall Tanza Cavite",
    "barangay phone number",
    "LGU contact information",
  ],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbData = getBreadcrumbJsonLd([
    { name: "Contact Us", path: "/contact" },
  ]);
  const contactPageData = getContactPageJsonLd();

  return (
    <>
      <JsonLd data={[breadcrumbData, contactPageData]} />
      {children}
    </>
  );
}
