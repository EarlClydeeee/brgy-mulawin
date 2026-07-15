import type { Metadata } from "next";
import { siteConfig, siteUrl } from "@/lib/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  noIndex = false,
  publishedTime,
  modifiedTime,
  type = "website",
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
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      images: [
        {
          url: `${siteUrl}/bg.jpg`,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${title}`,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/bg.jpg`],
      site: "@brgymulawin",
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large" as const,
          "max-snippet": -1,
          "max-video-preview": -1,
        },
  };
}

/* ─── Organization JSON-LD ──────────────────────────────────── */
export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "@id": `${siteUrl}/#organization`,
    name: siteConfig.name,
    url: siteUrl,
    description: siteConfig.description,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/bg.jpg`,
      width: 1200,
      height: 630,
    },
    image: `${siteUrl}/bg.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Barangay Hall, Mulawin St.",
      addressLocality: siteConfig.location.locality,
      addressRegion: siteConfig.location.region,
      postalCode: "4108",
      addressCountry: "PH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 14.4,
      longitude: 120.85,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${siteConfig.name}, ${siteConfig.location.locality}, ${siteConfig.location.region}`,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        contactType: "customer service",
        areaServed: "PH",
        availableLanguage: ["English", "Filipino"],
      },
    ],
    sameAs: [siteConfig.contact.facebook],
    foundingDate: "1975",
    knowsLanguage: ["en", "fil"],
  };
}

/* ─── WebSite JSON-LD ──────────────────────────────────────── */
export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteConfig.name,
    url: siteUrl,
    description: siteConfig.description,
    inLanguage: "en-PH",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/news?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/* ─── BreadcrumbList JSON-LD ──────────────────────────────── */
export function getBreadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: `${siteUrl}${item.path}`,
      })),
    ],
  };
}

/* ─── FAQPage JSON-LD ──────────────────────────────────────── */
export function getFaqJsonLd(
  faqs: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/* ─── GovernmentService JSON-LD ────────────────────────────── */
export function getGovernmentServiceJsonLd(services: {
  name: string;
  description: string;
  fee?: string;
  processingTime?: string;
}[]) {
  return services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    name: service.name,
    description: service.description,
    serviceType: "Barangay Certificate/Clearance",
    provider: {
      "@id": `${siteUrl}/#organization`,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${siteConfig.name}, ${siteConfig.location.locality}, ${siteConfig.location.region}`,
    },
    ...(service.fee && {
      offers: {
        "@type": "Offer",
        price: service.fee.replace(/[^0-9.]/g, "") || "0",
        priceCurrency: "PHP",
        description: service.fee,
      },
    }),
    ...(service.processingTime && {
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        description: service.processingTime,
      },
    }),
  }));
}

/* ─── ContactPage JSON-LD ──────────────────────────────────── */
export function getContactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteUrl}/contact`,
    name: "Contact Barangay Mulawin",
    description:
      "Contact Barangay Mulawin in Tanza, Cavite. Find office hours, phone, email, and send a message.",
    url: `${siteUrl}/contact`,
    mainEntity: {
      "@type": "GovernmentOffice",
      name: `${siteConfig.name} Hall`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Barangay Hall, Mulawin St.",
        addressLocality: siteConfig.location.locality,
        addressRegion: siteConfig.location.region,
        postalCode: "4108",
        addressCountry: "PH",
      },
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "08:00",
          closes: "12:00",
        },
      ],
      geo: {
        "@type": "GeoCoordinates",
        latitude: 14.4,
        longitude: 120.85,
      },
      sameAs: [siteConfig.contact.facebook],
    },
  };
}

/* ─── NewsArticle JSON-LD ──────────────────────────────────── */
export function getNewsArticleJsonLd(article: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.headline,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    image: article.image ?? `${siteUrl}/bg.jpg`,
    url: article.url,
    author: {
      "@id": `${siteUrl}/#organization`,
    },
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
    inLanguage: "en-PH",
  };
}

/* ─── ItemList JSON-LD (for listing pages) ─────────────────── */
export function getItemListJsonLd(items: { name: string; url: string; position: number }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: item.url,
    })),
  };
}

/* ─── Person JSON-LD (for officials) ───────────────────────── */
export function getPersonJsonLd(person: {
  name: string;
  jobTitle: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.jobTitle,
    worksFor: {
      "@id": `${siteUrl}/#organization`,
    },
    ...(person.image && { image: person.image }),
  };
}
