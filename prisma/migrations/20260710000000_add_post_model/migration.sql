-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "headline" VARCHAR(200) NOT NULL,
    "caption" VARCHAR(500) NOT NULL,
    "imageUrls" TEXT[] NOT NULL DEFAULT '{}',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
