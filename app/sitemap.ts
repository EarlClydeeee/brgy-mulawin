import type { MetadataRoute } from "next";
import { publicRoutes, siteUrl } from "@/lib/site";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static public routes
  const staticRoutes: MetadataRoute.Sitemap = publicRoutes.map((route) => ({
    url: `${siteUrl}${route === "/" ? "" : route}`,
    lastModified: now,
    changeFrequency:
      route === "/" || route === "/news" ? "daily" : "weekly",
    priority:
      route === "/"
        ? 1.0
        : route === "/services"
          ? 0.9
          : route === "/news"
            ? 0.8
            : 0.7,
  }));

  // Dynamic news posts from database
  let dbPosts: { slug: string; updatedAt: Date }[] = [];
  try {
    dbPosts = await prisma.post.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  } catch {
    // Database may not be available during build
  }

  const dynamicDbRoutes: MetadataRoute.Sitemap = dbPosts.map((post) => ({
    url: `${siteUrl}/news/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicDbRoutes];
}
