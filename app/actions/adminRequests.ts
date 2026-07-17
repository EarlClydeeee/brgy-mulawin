"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import {
  createDraftDownloadUrl,
  generateAndUploadDraft,
} from "@/lib/document-drafts";
import { prisma } from "@/lib/prisma";
import {
  getAllowedNextStatuses,
  requestStatuses,
  type RequestStatus,
} from "@/lib/request-constants";

const updateStatusSchema = z.object({
  requestId: z.string().min(1, "Request ID is required."),
  status: z.enum(requestStatuses),
});

export type AdminRequestActionState = {
  error?: string;
  success?: string;
};

export type DraftDownloadActionState = {
  error?: string;
  url?: string;
};

export type DraftGenerationActionState = {
  error?: string;
  success?: string;
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

  if (!getAllowedNextStatuses(existing.status).includes(parsed.data.status)) {
    return {
      error: "That status change is not allowed for this request.",
    };
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

  const successMessages: Partial<Record<RequestStatus, string>> = {
    UNDER_REVIEW: "Request marked as under review.",
    FOR_PICKUP: "Request marked as ready for pickup.",
    RELEASED: "Request marked as released.",
  };

  return {
    success: successMessages[parsed.data.status] ?? "Request status updated.",
  };
}

export async function getDraftDownloadUrl(
  requestId: string,
): Promise<DraftDownloadActionState> {
  await requireAdmin();

  const request = await prisma.documentRequest.findUnique({
    where: { id: requestId },
    select: { draftDocPath: true },
  });

  if (!request) {
    return { error: "Request not found." };
  }

  if (!request.draftDocPath) {
    return {
      error:
        "A document draft is not available yet. Try submitting or regenerating the request later.",
    };
  }

  try {
    return { url: await createDraftDownloadUrl(request.draftDocPath) };
  } catch (error) {
    console.error(
      `Failed to create DOCX download link for request ${requestId}:`,
      error,
    );
    return {
      error: "Unable to prepare the document download. Please try again.",
    };
  }
}

export async function generateRequestDraft(
  requestId: string,
): Promise<DraftGenerationActionState> {
  await requireAdmin();

  const request = await prisma.documentRequest.findUnique({
    where: { id: requestId },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  if (!request) {
    return { error: "Request not found." };
  }

  try {
    const draftDocPath = await generateAndUploadDraft(request);
    await prisma.documentRequest.update({
      where: { id: request.id },
      data: { draftDocPath },
    });

    revalidatePath("/admin/requests");
    revalidatePath(`/admin/requests/${request.id}`);

    return { success: "DOCX draft generated successfully." };
  } catch (error) {
    console.error(
      `Failed to generate DOCX draft for request ${request.id}:`,
      error,
    );
    return {
      error:
        "Unable to generate the DOCX draft. Check the private request-drafts bucket and SUPABASE_SERVICE_ROLE_KEY.",
    };
  }
}
