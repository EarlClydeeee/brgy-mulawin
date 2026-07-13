import { prisma } from "@/lib/prisma";
import { toPostDisplayItem } from "@/lib/posts";
import NewsContentClient from "@/components/NewsContentClient";

export default async function NewsContent() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  const featuredPost = posts.find((post) => post.isFeatured) ?? null;
  const restPosts = posts.filter((post) => post.id !== featuredPost?.id);

  return (
    <NewsContentClient
      featured={featuredPost ? toPostDisplayItem(featuredPost, 0) : null}
      posts={restPosts.map((post, index) => toPostDisplayItem(post, index + 1))}
    />
  );
}
