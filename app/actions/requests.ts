"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { syncUserToDatabase } from "@/lib/sync-user";
import { documentTypes } from "@/lib/request-constants";
import { createClient } from "@/utils/supabase/server";

const requestSchema = z.object({
  type: z.enum(documentTypes),
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  birthday: z.coerce
    .date()
    .max(new Date(), "Birthday cannot be in the future."),
  address: z.string().min(5, "Address must be at least 5 characters."),
  purpose: z.string().min(5, "Purpose must be at least 5 characters."),
  details: z.string().optional(),
});

export type RequestActionState = {
  error?: string;
};

export async function createRequest(
  _prevState: RequestActionState,
  formData: FormData,
): Promise<RequestActionState> {
  const parsed = requestSchema.safeParse({
    type: formData.get("type"),
    fullName: formData.get("fullName"),
    birthday: formData.get("birthday"),
    address: formData.get("address"),
    purpose: formData.get("purpose"),
    details: formData.get("details") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid request." };
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
    await prisma.documentRequest.create({
      data: {
        type: parsed.data.type,
        fullName: parsed.data.fullName,
        birthday: parsed.data.birthday,
        address: parsed.data.address,
        purpose: parsed.data.purpose,
        details: parsed.data.details,
        userId: user.id,
        statusLogs: {
          create: {
            status: "SUBMITTED",
          },
        },
      },
    });
  } catch (error) {
    console.error("Failed to create document request:", error);
    return {
      error:
        "Something went wrong while saving your request. Please try again in a moment.",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
