"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";

const messageStateSchema = z.object({
  messageId: z.string().uuid("Invalid message ID."),
  isRead: z.boolean(),
});

export async function setContactMessageRead(messageId: string, isRead: boolean) {
  await requireAdmin();

  const parsed = messageStateSchema.safeParse({ messageId, isRead });
  if (!parsed.success) {
    return { success: false, error: "Invalid message update." };
  }

  const result = await prisma.contactMessage.updateMany({
    where: { id: parsed.data.messageId },
    data: { isRead: parsed.data.isRead },
  });

  if (result.count === 0) {
    return { success: false, error: "Message not found." };
  }

  revalidatePath("/admin/messages");
  return { success: true };
}
