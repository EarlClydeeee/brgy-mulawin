"use client";

import Link from "next/link";
import { useActionState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  updateRequestStatus,
  type AdminRequestActionState,
} from "@/app/actions/adminRequests";
import { getAllowedNextStatuses } from "@/lib/request-constants";
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
  SUBMITTED:
    "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300",
  UNDER_REVIEW:
    "border-yellow-200 bg-yellow-50 text-yellow-800 hover:border-yellow-300",
  FOR_PICKUP:
    "border-blue-200 bg-blue-50 text-blue-800 hover:border-blue-300",
  RELEASED:
    "border-green-200 bg-green-50 text-green-800 hover:border-green-300",
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
  const router = useRouter();
  const nextStatuses = getAllowedNextStatuses(currentStatus);

  const submit = (formData: FormData) => {
    startTransition(async () => {
      await formAction(formData);
      router.refresh();
    });
  };

  return (
    <div className="space-y-3">
      <form action={submit} className="space-y-3">
        <input type="hidden" name="requestId" value={requestId} />
        <div className="flex flex-col gap-2">
          {nextStatuses.map((status) => (
            <button
              key={status}
              type="submit"
              name="status"
              value={status}
              disabled={isPending}
              className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${buttonStyles[status]}`}
            >
              {getStatusLabel(status)}
            </button>
          ))}
          {nextStatuses.length === 0 && (
            <p className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
              This request has been released.
            </p>
          )}
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
