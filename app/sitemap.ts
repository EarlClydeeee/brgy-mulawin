import type { MetadataRoute } from "next";
import { publicRoutes, siteUrl } from "@/lib/site";
import { newsArticles } from "@/lib/announcements";
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
  let dbPosts: { id: string; updatedAt: Date }[] = [];
  try {
    dbPosts = await prisma.post.findMany({
      select: { id: true, updatedAt: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  } catch {
    // Database may not be available during build
  }

  const dynamicDbRoutes: MetadataRoute.Sitemap = dbPosts.map((post) => ({
    url: `${siteUrl}/news/${post.id}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Static news articles from announcements
  const staticNewsRoutes: MetadataRoute.Sitemap = newsArticles.map(
    (article) => ({
      url: `${siteUrl}/news#${article.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }),
  );

  return [...staticRoutes, ...dynamicDbRoutes, ...staticNewsRoutes];
}
