CREATE TABLE "ContactRateLimit" (
    "id" TEXT NOT NULL,
    "keyHash" TEXT NOT NULL,
    "windowStart" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactRateLimit_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ContactRateLimit_keyHash_windowStart_key"
ON "ContactRateLimit"("keyHash", "windowStart");

CREATE INDEX "ContactRateLimit_expiresAt_idx"
ON "ContactRateLimit"("expiresAt");
