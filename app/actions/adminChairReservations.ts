"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getAvailableQuantityForRange, ensureChairInventory } from "@/lib/chair-inventory";
import {
  chairReservationStatuses,
  getAllowedNextChairStatuses,
  type ChairReservationStatus,
} from "@/lib/chair-reservation-constants";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export type AdminChairActionState = {
  error?: string;
  success?: string;
};

const updateStatusSchema = z.object({
  reservationId: z.string().min(1, "Reservation ID is required."),
  status: z.enum(chairReservationStatuses),
  deliveredByNote: z.string().optional(),
});

const inventorySchema = z.object({
  totalQty: z.coerce
    .number()
    .int("Inventory must be a whole number.")
    .min(0, "Inventory cannot be negative."),
});

const facilitatorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().min(7, "Phone must be at least 7 characters."),
  notes: z.string().optional(),
});

const assignFacilitatorSchema = z.object({
  reservationId: z.string().min(1),
  facilitatorId: z.string().optional(),
});

function revalidateChairPaths(reservationId?: string) {
  revalidatePath("/admin/chairs");
  revalidatePath("/admin/chairs/facilitators");
  revalidatePath("/dashboard");
  if (reservationId) {
    revalidatePath(`/admin/chairs/${reservationId}`);
  }
}

export async function updateChairReservationStatus(
  _prevState: AdminChairActionState,
  formData: FormData,
): Promise<AdminChairActionState> {
  await requireAdmin();

  const parsed = updateStatusSchema.safeParse({
    reservationId: formData.get("reservationId"),
    status: formData.get("status"),
    deliveredByNote: formData.get("deliveredByNote") || undefined,
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid status update.",
    };
  }

  const existing = await prisma.chairReservation.findUnique({
    where: { id: parsed.data.reservationId },
  });

  if (!existing) {
    return { error: "Reservation not found." };
  }

  if (
    !getAllowedNextChairStatuses(existing.status).includes(parsed.data.status)
  ) {
    return {
      error: "That status change is not allowed for this reservation.",
    };
  }

  if (parsed.data.status === "APPROVED") {
    const { availableQty } = await getAvailableQuantityForRange(
      existing.borrowFrom,
      existing.borrowUntil,
      existing.id,
    );

    if (existing.quantity > availableQty) {
      return {
        error: `Not enough chairs available for these dates. Only ${availableQty} left in inventory for the requested period.`,
      };
    }
  }

  if (parsed.data.status === "DELIVERED" && !parsed.data.deliveredByNote?.trim()) {
    return {
      error: "Please enter who delivered the chairs.",
    };
  }

  await prisma.$transaction([
    prisma.chairReservation.update({
      where: { id: parsed.data.reservationId },
      data: {
        status: parsed.data.status,
        ...(parsed.data.status === "DELIVERED"
          ? { deliveredByNote: parsed.data.deliveredByNote?.trim() }
          : {}),
      },
    }),
    prisma.chairReservationStatusLog.create({
      data: {
        chairReservationId: parsed.data.reservationId,
        status: parsed.data.status,
        note:
          parsed.data.status === "DELIVERED"
            ? parsed.data.deliveredByNote?.trim()
            : undefined,
      },
    }),
  ]);

  revalidateChairPaths(parsed.data.reservationId);

  const successMessages: Partial<Record<ChairReservationStatus, string>> = {
    APPROVED: "Reservation approved. Chairs are now held for these dates.",
    DELIVERED: "Marked as delivered.",
    RETURNED: "Chairs marked as returned.",
    CANCELLED: "Reservation cancelled.",
  };

  return {
    success:
      successMessages[parsed.data.status] ?? "Reservation status updated.",
  };
}

export async function updateChairInventory(
  _prevState: AdminChairActionState,
  formData: FormData,
): Promise<AdminChairActionState> {
  await requireAdmin();

  const parsed = inventorySchema.safeParse({
    totalQty: formData.get("totalQty"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid inventory value.",
    };
  }

  const inventory = await ensureChairInventory();

  await prisma.chairInventory.update({
    where: { id: inventory.id },
    data: { totalQty: parsed.data.totalQty },
  });

  revalidateChairPaths();

  return {
    success: `Inventory updated to ${parsed.data.totalQty} chairs.`,
  };
}

export async function createDeliveryFacilitator(
  _prevState: AdminChairActionState,
  formData: FormData,
): Promise<AdminChairActionState> {
  await requireAdmin();

  const parsed = facilitatorSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    notes: formData.get("notes") || undefined,
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid facilitator details.",
    };
  }

  await prisma.deliveryFacilitator.create({
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone,
      notes: parsed.data.notes,
    },
  });

  revalidateChairPaths();

  return { success: "Facilitator added." };
}

export async function updateDeliveryFacilitator(
  _prevState: AdminChairActionState,
  formData: FormData,
): Promise<AdminChairActionState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) {
    return { error: "Facilitator ID is required." };
  }

  const parsed = facilitatorSchema
    .extend({
      isActive: z
        .enum(["true", "false"])
        .optional()
        .transform((value) => (value === undefined ? undefined : value === "true")),
    })
    .safeParse({
      name: formData.get("name"),
      phone: formData.get("phone"),
      notes: formData.get("notes") || undefined,
      isActive: formData.get("isActive") || undefined,
    });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid facilitator details.",
    };
  }

  await prisma.deliveryFacilitator.update({
    where: { id },
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone,
      notes: parsed.data.notes,
      ...(parsed.data.isActive !== undefined
        ? { isActive: parsed.data.isActive }
        : {}),
    },
  });

  revalidateChairPaths();

  return { success: "Facilitator updated." };
}

export async function setFacilitatorActive(
  _prevState: AdminChairActionState,
  formData: FormData,
): Promise<AdminChairActionState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const isActive = formData.get("isActive") === "true";

  if (!id) {
    return { error: "Facilitator ID is required." };
  }

  await prisma.deliveryFacilitator.update({
    where: { id },
    data: { isActive },
  });

  revalidateChairPaths();

  return {
    success: isActive ? "Facilitator reactivated." : "Facilitator deactivated.",
  };
}

export async function assignReservationFacilitator(
  _prevState: AdminChairActionState,
  formData: FormData,
): Promise<AdminChairActionState> {
  await requireAdmin();

  const parsed = assignFacilitatorSchema.safeParse({
    reservationId: formData.get("reservationId"),
    facilitatorId: formData.get("facilitatorId") || undefined,
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid facilitator assignment.",
    };
  }

  const facilitatorId =
    parsed.data.facilitatorId && parsed.data.facilitatorId.length > 0
      ? parsed.data.facilitatorId
      : null;

  if (facilitatorId) {
    const facilitator = await prisma.deliveryFacilitator.findUnique({
      where: { id: facilitatorId },
      select: { id: true, isActive: true },
    });

    if (!facilitator || !facilitator.isActive) {
      return { error: "Selected facilitator is not available." };
    }
  }

  await prisma.chairReservation.update({
    where: { id: parsed.data.reservationId },
    data: { facilitatorId },
  });

  revalidateChairPaths(parsed.data.reservationId);

  return {
    success: facilitatorId
      ? "Delivery facilitator assigned."
      : "Delivery facilitator cleared.",
  };
}
