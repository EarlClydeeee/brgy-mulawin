import type { Metadata } from "next";
import { siteConfig, siteUrl } from "@/lib/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: "/bg.jpg",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — Official Website`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/bg.jpg"],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: siteConfig.name,
    url: siteUrl,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Barangay Hall, Mulawin St.",
      addressLocality: siteConfig.location.locality,
      addressRegion: siteConfig.location.region,
      addressCountry: "PH",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: siteConfig.name,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      contactType: "customer service",
      areaServed: "PH",
      availableLanguage: ["English", "Filipino"],
    },
    sameAs: [siteConfig.contact.facebook],
  };
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteUrl,
    description: siteConfig.description,
    inLanguage: "en-PH",
    publisher: {
      "@type": "GovernmentOrganization",
      name: siteConfig.name,
      url: siteUrl,
    },
  };
}
