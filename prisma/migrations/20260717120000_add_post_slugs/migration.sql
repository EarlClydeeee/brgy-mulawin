ALTER TABLE "Post" ADD COLUMN "slug" TEXT;

UPDATE "Post"
SET "slug" =
  COALESCE(
    NULLIF(
      trim(
        both '-'
        from regexp_replace(lower("headline"), '[^a-z0-9]+', '-', 'g')
      ),
      ''
    ),
    'news'
  ) || '-' || left("id", 8);

ALTER TABLE "Post" ALTER COLUMN "slug" SET NOT NULL;

CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");
