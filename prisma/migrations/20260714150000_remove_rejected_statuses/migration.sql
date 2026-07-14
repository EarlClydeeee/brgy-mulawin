-- Remove rejected and needs revision statuses.
UPDATE "DocumentRequest"
SET status = 'UNDER_REVIEW'
WHERE status::text IN ('REJECTED', 'NEEDS_REVISION');

UPDATE "RequestStatusLog"
SET status = 'UNDER_REVIEW'
WHERE status::text IN ('REJECTED', 'NEEDS_REVISION');

ALTER TABLE "DocumentRequest" DROP COLUMN IF EXISTS "rejectionReason";

ALTER TYPE "RequestStatus" RENAME TO "RequestStatus_old";

CREATE TYPE "RequestStatus" AS ENUM (
  'SUBMITTED',
  'UNDER_REVIEW',
  'FOR_PICKUP',
  'RELEASED'
);

ALTER TABLE "DocumentRequest" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "DocumentRequest"
  ALTER COLUMN "status" TYPE "RequestStatus"
  USING ("status"::text::"RequestStatus");
ALTER TABLE "DocumentRequest" ALTER COLUMN "status" SET DEFAULT 'SUBMITTED';

ALTER TABLE "RequestStatusLog"
  ALTER COLUMN "status" TYPE "RequestStatus"
  USING ("status"::text::"RequestStatus");

DROP TYPE "RequestStatus_old";
