import type { Post } from "@prisma/client";

export type PostDisplayItem = {
  id: string;
  title: string;
  excerpt: string;
  fullContent: string;
  date: string;
  imageUrl?: string;
  color: "pink" | "green";
};

export const formatPostDate = (date: Date): string =>
  date.toLocaleDateString("en-PH", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export const toPostDisplayItem = (
  post: Post,
  index = 0,
): PostDisplayItem => ({
  id: post.id,
  title: post.headline,
  excerpt: post.caption,
  fullContent: post.caption,
  date: formatPostDate(post.createdAt),
  imageUrl: post.imageUrls[0],
  color: index % 2 === 0 ? "pink" : "green",
});
