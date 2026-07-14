-- Add rejection reason and status log notes for admin updates.
ALTER TABLE "DocumentRequest" ADD COLUMN "rejectionReason" TEXT;

ALTER TABLE "RequestStatusLog" ADD COLUMN "note" TEXT;
