import type { MetadataRoute } from "next";
import { publicRoutes, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route === "/" ? "" : route}`,
    lastModified,
    changeFrequency: route === "/" || route === "/news" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/services" ? 0.9 : 0.8,
  }));
}
