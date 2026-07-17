import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import {
  createPageMetadata,
  getBreadcrumbJsonLd,
  getNewsArticleJsonLd,
} from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import { formatPostDate } from "@/lib/posts";
import { siteUrl } from "@/lib/site";
import { notFound } from "next/navigation";

async function getPost(slug: string) {
  return prisma.post.findUnique({ where: { slug } });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {};
  }

  return createPageMetadata({
    title: post.headline,
    description: post.caption,
    path: `/news/${post.slug}`,
    type: "article",
    publishedTime: post.createdAt.toISOString(),
    modifiedTime: post.updatedAt.toISOString(),
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const articleUrl = `${siteUrl}/news/${post.slug}`;
  const imageUrl = post.imageUrls[0];
  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "News", path: "/news" },
    { name: post.headline, path: `/news/${post.slug}` },
  ]);
  const articleData = getNewsArticleJsonLd({
    headline: post.headline,
    description: post.caption,
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    image: imageUrl,
    url: articleUrl,
  });

  return (
    <>
      <JsonLd data={[breadcrumbs, articleData]} />
      <article className="bg-gradient-to-b from-pink-50/70 to-white px-4 py-12 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-pink-600 transition hover:text-pink-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to news
          </Link>

          <header className="mt-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
              <CalendarDays className="h-4 w-4" />
              {formatPostDate(post.createdAt)}
            </div>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-gray-900 sm:text-5xl">
              {post.headline}
            </h1>
          </header>

          {imageUrl && (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
              <Image
                src={imageUrl}
                alt={post.headline}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 48rem"
                className="object-cover"
              />
            </div>
          )}

          <div className="mt-8 whitespace-pre-wrap text-lg leading-relaxed text-gray-700">
            {post.caption}
          </div>
        </div>
      </article>
    </>
  );
}
