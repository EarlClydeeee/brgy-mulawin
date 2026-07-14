"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { isAdminUser } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { adminUpdateStatuses } from "@/lib/request-constants";
import { createClient } from "@/utils/supabase/server";

const updateStatusSchema = z.object({
  requestId: z.string().min(1, "Request ID is required."),
  status: z.enum(adminUpdateStatuses),
});

export type AdminRequestActionState = {
  error?: string;
  success?: string;
};

const requireAdmin = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (!isAdminUser(user)) {
    redirect("/");
  }

  return user;
};

export async function updateRequestStatus(
  _prevState: AdminRequestActionState,
  formData: FormData,
): Promise<AdminRequestActionState> {
  await requireAdmin();

  const parsed = updateStatusSchema.safeParse({
    requestId: formData.get("requestId"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid status update.",
    };
  }

  const existing = await prisma.documentRequest.findUnique({
    where: { id: parsed.data.requestId },
    select: { status: true },
  });

  if (!existing) {
    return { error: "Request not found." };
  }

  if (existing.status === parsed.data.status) {
    return { error: "This request already has that status." };
  }

  await prisma.$transaction([
    prisma.documentRequest.update({
      where: { id: parsed.data.requestId },
      data: { status: parsed.data.status },
    }),
    prisma.requestStatusLog.create({
      data: {
        documentRequestId: parsed.data.requestId,
        status: parsed.data.status,
      },
    }),
  ]);

  revalidatePath("/admin/requests");
  revalidatePath(`/admin/requests/${parsed.data.requestId}`);
  revalidatePath("/dashboard");

  const successMessages = {
    UNDER_REVIEW: "Request marked as under review.",
    FOR_PICKUP: "Request marked as ready for pickup.",
  } as const;

  return {
    success: successMessages[parsed.data.status],
  };
}
