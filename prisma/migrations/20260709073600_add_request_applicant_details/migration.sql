-- Add applicant details needed for barangay document preparation.
ALTER TABLE "DocumentRequest" ADD COLUMN "fullName" TEXT NOT NULL DEFAULT 'Unknown applicant';
ALTER TABLE "DocumentRequest" ADD COLUMN "birthday" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "DocumentRequest" ADD COLUMN "address" TEXT NOT NULL DEFAULT 'Unknown address';

ALTER TABLE "DocumentRequest" ALTER COLUMN "fullName" DROP DEFAULT;
ALTER TABLE "DocumentRequest" ALTER COLUMN "birthday" DROP DEFAULT;
ALTER TABLE "DocumentRequest" ALTER COLUMN "address" DROP DEFAULT;
