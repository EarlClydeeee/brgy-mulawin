import { Megaphone } from "lucide-react";
import NewsContent from "@/components/NewsContent";
import { createPageMetadata, getBreadcrumbJsonLd, getItemListJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig, siteUrl } from "@/lib/site";
import { prisma } from "@/lib/prisma";

export const metadata = createPageMetadata({
  title: "News & Announcements",
  description:
    "Latest news, events, programs, and barangay announcements from Barangay Mulawin, Tanza, Cavite. Stay updated on community activities and government services.",
  path: "/news",
  keywords: [
    "barangay announcements",
    "Mulawin community news",
    "Tanza Cavite events",
    "barangay programs",
    "community updates",
  ],
});

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  let posts: Awaited<ReturnType<typeof prisma.post.findMany>> = [];
  try {
    posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to load news posts:", error);
  }

  const breadcrumbData = getBreadcrumbJsonLd([
    { name: "News & Announcements", path: "/news" },
  ]);

  const newsListData = getItemListJsonLd(
    posts.slice(0, 10).map((post, index) => ({
      name: post.headline,
      url: `${siteUrl}/news/${post.slug}`,
      position: index + 1,
    })),
  );

  return (
    <>
      <JsonLd data={[breadcrumbData, newsListData]} />
      <section className="gradient-hero py-14 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-white/70 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4 shadow-sm">
            <Megaphone className="w-4 h-4" />
            Community Updates
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            News &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-green-500">
              Announcements
            </span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Stay informed on the latest events, programs, and updates from
            Barangay Mulawin.
          </p>
        </div>
      </section>

      <NewsContent posts={posts} />

      <section className="py-12 px-4 gradient-section">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Stay in the Loop
          </h2>
          <p className="text-gray-500 mb-6">
            Follow our official Facebook page for real-time barangay updates.
          </p>
          <a
            href={siteConfig.contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-400 to-green-400 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-md"
          >
            Follow on Facebook
          </a>
        </div>
      </section>
    </>
  );
}
