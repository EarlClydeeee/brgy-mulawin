import { prisma } from "@/lib/prisma";
import { toPostDisplayItem } from "@/lib/posts";
import AnnouncementsSectionClient from "@/components/AnnouncementsSectionClient";

export default async function AnnouncementsSection() {
  const posts = await prisma.post.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <AnnouncementsSectionClient
      posts={posts.map((post, index) => toPostDisplayItem(post, index))}
    />
  );
}
