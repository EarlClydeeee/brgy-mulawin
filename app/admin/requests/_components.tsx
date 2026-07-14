"use client";

import Link from "next/link";
import { useActionState, useTransition } from "react";
import {
  updateRequestStatus,
  type AdminRequestActionState,
} from "@/app/actions/adminRequests";
import { adminUpdateStatuses } from "@/lib/request-constants";
import {
  getStatusClass,
  getStatusLabel,
} from "./_constants";

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${getStatusClass(status)}`}
    >
      {getStatusLabel(status)}
    </span>
  );
}

const buttonStyles = {
  UNDER_REVIEW:
    "border-yellow-200 bg-yellow-50 text-yellow-800 hover:border-yellow-300",
  FOR_PICKUP:
    "border-blue-200 bg-blue-50 text-blue-800 hover:border-blue-300",
} as const;

export function StatusUpdateForm({
  requestId,
  currentStatus,
}: {
  requestId: string;
  currentStatus: string;
}) {
  const [state, formAction] = useActionState<
    AdminRequestActionState,
    FormData
  >(updateRequestStatus, {});
  const [isPending, startTransition] = useTransition();

  const submit = (formData: FormData) => {
    startTransition(() => formAction(formData));
  };

  return (
    <div className="space-y-3">
      <form action={submit} className="space-y-3">
        <input type="hidden" name="requestId" value={requestId} />
        <div className="flex flex-col gap-2">
          {adminUpdateStatuses.map((status) => (
            <button
              key={status}
              type="submit"
              name="status"
              value={status}
              disabled={isPending || currentStatus === status}
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${buttonStyles[status]}`}
            >
              {getStatusLabel(status)}
            </button>
          ))}
        </div>
      </form>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.success && (
        <p className="text-sm font-semibold text-green-700">{state.success}</p>
      )}
    </div>
  );
}

export function RequestDetailLink({ requestId }: { requestId: string }) {
  return (
    <Link
      href={`/admin/requests/${requestId}`}
      className="text-sm font-semibold text-pink-500 transition hover:text-pink-600"
    >
      View details
    </Link>
  );
}
