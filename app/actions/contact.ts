"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
  consumeContactRateLimit,
  getClientIp,
  hasInvalidBotFields,
} from "@/lib/contact-rate-limit";

const contactMessageSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  phone: z.string().trim().max(30).optional(),
  subject: z.string().trim().min(1, "Select a subject.").max(100),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2_000, "Message must be 2,000 characters or fewer."),
});

export type ContactActionState = {
  error?: string;
  success?: boolean;
};

export async function submitContactMessage(
  _previousState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const parsed = contactMessageSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Please review your message.",
    };
  }

  if (
    hasInvalidBotFields(
      formData.get("website"),
      formData.get("formStartedAt"),
    )
  ) {
    return {
      error: "We could not send your message. Please try again shortly.",
    };
  }

  try {
    const requestHeaders = await headers();
    const isAllowed = await consumeContactRateLimit({
      email: parsed.data.email,
      clientIp: getClientIp(requestHeaders),
    });

    if (!isAllowed) {
      return {
        error: "We could not send your message. Please try again shortly.",
      };
    }

    await prisma.contactMessage.create({
      data: parsed.data,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to save contact message:", error);
    return {
      error: "We could not send your message. Please try again shortly.",
    };
  }
}
