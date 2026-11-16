"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { syncUserToDatabase } from "@/lib/sync-user";
import { createClient } from "@/utils/supabase/server";

const reservationSchema = z
  .object({
    quantity: z.coerce
      .number()
      .int("Quantity must be a whole number.")
      .min(1, "Request at least 1 chair."),
    eventName: z.string().min(2, "Event name must be at least 2 characters."),
    venue: z.string().min(2, "Venue / location must be at least 2 characters."),
    borrowFrom: z.coerce.date(),
    borrowUntil: z.coerce.date(),
    contactName: z
      .string()
      .min(2, "Contact person name must be at least 2 characters."),
    contactPhone: z
      .string()
      .min(7, "Contact phone must be at least 7 characters."),
    notes: z.string().optional(),
  })
  .refine((data) => data.borrowUntil > data.borrowFrom, {
    message: "Return date must be after the borrow start date.",
    path: ["borrowUntil"],
  });

export type ChairReservationActionState = {
  error?: string;
};

export async function createChairReservation(
  _prevState: ChairReservationActionState,
  formData: FormData,
): Promise<ChairReservationActionState> {
  const parsed = reservationSchema.safeParse({
    quantity: formData.get("quantity"),
    eventName: formData.get("eventName"),
    venue: formData.get("venue"),
    borrowFrom: formData.get("borrowFrom"),
    borrowUntil: formData.get("borrowUntil"),
    contactName: formData.get("contactName"),
    contactPhone: formData.get("contactPhone"),
    notes: formData.get("notes") || undefined,
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid reservation request.",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/login");
  }

  const synced = await syncUserToDatabase({
    id: user.id,
    email: user.email,
    name:
      typeof user.user_metadata.name === "string"
        ? user.user_metadata.name
        : user.email,
  });

  if (!synced) {
    return {
      error:
        "Your account could not be linked to our records. Please try again or contact the barangay office.",
    };
  }

  try {
    await prisma.chairReservation.create({
      data: {
        quantity: parsed.data.quantity,
        eventName: parsed.data.eventName,
        venue: parsed.data.venue,
        borrowFrom: parsed.data.borrowFrom,
        borrowUntil: parsed.data.borrowUntil,
        contactName: parsed.data.contactName,
        contactPhone: parsed.data.contactPhone,
        notes: parsed.data.notes,
        userId: user.id,
        statusLogs: {
          create: {
            status: "PENDING",
          },
        },
      },
    });
  } catch (error) {
    console.error("Failed to create chair reservation:", error);
    return {
      error:
        "Something went wrong while saving your reservation. Please try again in a moment.",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard?chairSubmitted=1");
}
