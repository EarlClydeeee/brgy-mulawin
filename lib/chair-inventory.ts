import { prisma } from "@/lib/prisma";
import { stockHoldingStatuses } from "@/lib/chair-reservation-constants";

export async function ensureChairInventory() {
  const existing = await prisma.chairInventory.findFirst({
    orderBy: { createdAt: "asc" },
  });

  if (existing) {
    return existing;
  }

  return prisma.chairInventory.create({
    data: { totalQty: 0 },
  });
}

export async function getReservedQuantityInRange(
  borrowFrom: Date,
  borrowUntil: Date,
  excludeReservationId?: string,
) {
  const active = await prisma.chairReservation.findMany({
    where: {
      status: { in: stockHoldingStatuses },
      borrowFrom: { lt: borrowUntil },
      borrowUntil: { gt: borrowFrom },
      ...(excludeReservationId
        ? { id: { not: excludeReservationId } }
        : {}),
    },
    select: { quantity: true },
  });

  return active.reduce((sum, row) => sum + row.quantity, 0);
}

export async function getAvailableQuantityForRange(
  borrowFrom: Date,
  borrowUntil: Date,
  excludeReservationId?: string,
) {
  const inventory = await ensureChairInventory();
  const reserved = await getReservedQuantityInRange(
    borrowFrom,
    borrowUntil,
    excludeReservationId,
  );

  return {
    totalQty: inventory.totalQty,
    reservedQty: reserved,
    availableQty: Math.max(inventory.totalQty - reserved, 0),
    inventoryId: inventory.id,
  };
}

export async function getCurrentlyOutQuantity(asOf = new Date()) {
  const active = await prisma.chairReservation.findMany({
    where: {
      status: { in: stockHoldingStatuses },
      borrowFrom: { lte: asOf },
      borrowUntil: { gt: asOf },
    },
    select: { quantity: true },
  });

  return active.reduce((sum, row) => sum + row.quantity, 0);
}
