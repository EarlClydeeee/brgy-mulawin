-- CreateEnum
CREATE TYPE "ChairReservationStatus" AS ENUM ('PENDING', 'APPROVED', 'DELIVERED', 'RETURNED', 'CANCELLED');

-- CreateTable
CREATE TABLE "ChairInventory" (
    "id" TEXT NOT NULL,
    "totalQty" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChairInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryFacilitator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeliveryFacilitator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChairReservation" (
    "id" TEXT NOT NULL,
    "status" "ChairReservationStatus" NOT NULL DEFAULT 'PENDING',
    "quantity" INTEGER NOT NULL,
    "eventName" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "borrowFrom" TIMESTAMP(3) NOT NULL,
    "borrowUntil" TIMESTAMP(3) NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "notes" TEXT,
    "deliveredByNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "facilitatorId" TEXT,

    CONSTRAINT "ChairReservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChairReservationStatusLog" (
    "id" TEXT NOT NULL,
    "status" "ChairReservationStatus" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "chairReservationId" TEXT NOT NULL,

    CONSTRAINT "ChairReservationStatusLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChairReservation_status_idx" ON "ChairReservation"("status");

-- CreateIndex
CREATE INDEX "ChairReservation_borrowFrom_borrowUntil_idx" ON "ChairReservation"("borrowFrom", "borrowUntil");

-- CreateIndex
CREATE INDEX "ChairReservation_userId_idx" ON "ChairReservation"("userId");

-- CreateIndex
CREATE INDEX "ChairReservationStatusLog_chairReservationId_idx" ON "ChairReservationStatusLog"("chairReservationId");

-- AddForeignKey
ALTER TABLE "ChairReservation" ADD CONSTRAINT "ChairReservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChairReservation" ADD CONSTRAINT "ChairReservation_facilitatorId_fkey" FOREIGN KEY ("facilitatorId") REFERENCES "DeliveryFacilitator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChairReservationStatusLog" ADD CONSTRAINT "ChairReservationStatusLog_chairReservationId_fkey" FOREIGN KEY ("chairReservationId") REFERENCES "ChairReservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Seed a single inventory row (totalQty starts at 0 until admin sets it)
INSERT INTO "ChairInventory" ("id", "totalQty", "createdAt", "updatedAt")
VALUES (gen_random_uuid()::text, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
