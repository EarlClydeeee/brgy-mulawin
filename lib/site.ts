export const siteConfig = {
  name: "Barangay Mulawin",
  shortName: "Mulawin",
  description:
    "Official website of Barangay Mulawin, Tanza, Cavite. Request barangay clearances and certificates, read news, and contact barangay officials.",
  locale: "en_PH",
  location: {
    locality: "Tanza",
    region: "Cavite",
    country: "Philippines",
    address: "Barangay Hall, Mulawin St., Tanza, Cavite, Philippines",
  },
  contact: {
    email: "brgy.mulawin@rodriguez.gov.ph",
    facebook: "https://www.facebook.com/profile.php?id=100088351642520",
  },
  keywords: [
    "Barangay Mulawin",
    "Tanza Cavite",
    "barangay clearance",
    "certificate of residency",
    "certificate of indigency",
    "business permit",
    "LGU",
    "barangay services",
  ],
} as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://brgy-mulawin.vercel.app";

export const publicRoutes = [
  "/",
  "/about",
  "/services",
  "/news",
  "/officials",
  "/contact",
] as const;

export const privateRoutePrefixes = [
  "/admin",
  "/dashboard",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/auth/callback",
  "/services/request",
] as const;
