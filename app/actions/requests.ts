"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
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

  // #region agent log
  await fetch("http://127.0.0.1:7387/ingest/0ed8b2e6-04c5-407d-a29a-bbbcb7a124af", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "b653de",
    },
    body: JSON.stringify({
      sessionId: "b653de",
      runId: "initial",
      hypothesisId: "H3,H4",
      location: "app/actions/requests.ts:40",
      message: "request schema parsed before auth",
      data: {
        type: parsed.data.type,
        hasFullName: parsed.data.fullName.length > 0,
        hasBirthday: parsed.data.birthday instanceof Date,
        hasAddress: parsed.data.address.length > 0,
        hasPurpose: parsed.data.purpose.length > 0,
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/login");
  }

  await prisma.user.upsert({
    where: { id: user.id },
    update: {
      email: user.email,
      name:
        typeof user.user_metadata.name === "string"
          ? user.user_metadata.name
          : user.email,
    },
    create: {
      id: user.id,
      email: user.email,
      name:
        typeof user.user_metadata.name === "string"
          ? user.user_metadata.name
          : user.email,
    },
  });

  // #region agent log
  await fetch("http://127.0.0.1:7387/ingest/0ed8b2e6-04c5-407d-a29a-bbbcb7a124af", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "b653de",
    },
    body: JSON.stringify({
      sessionId: "b653de",
      runId: "initial",
      hypothesisId: "H1,H2,H4",
      location: "app/actions/requests.ts:70",
      message: "prisma runtime model fields before documentRequest.create",
      data: {
        documentRequestFields:
          Prisma.dmmf.datamodel.models
            .find((model) => model.name === "DocumentRequest")
            ?.fields.map((field) => field.name) ?? [],
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

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

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
