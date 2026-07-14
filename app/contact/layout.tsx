import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Contact Barangay Mulawin in Tanza, Cavite. Find office hours, phone, email, and send a message to barangay staff.",
  path: "/contact",
  keywords: ["barangay contact", "Barangay Mulawin office hours"],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
