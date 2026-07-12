"use client";

import Link from "next/link";
import { useActionState, useTransition } from "react";
import {
  updateRequestStatus,
  type AdminRequestActionState,
} from "@/app/actions/adminRequests";
import { requestStatuses } from "@/lib/request-constants";
import {
  statusClasses,
  statusLabels,
  type RequestStatusKey,
} from "./_constants";

export function StatusBadge({ status }: { status: RequestStatusKey }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${statusClasses[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

export function StatusUpdateForm({
  requestId,
  currentStatus,
}: {
  requestId: string;
  currentStatus: RequestStatusKey;
}) {
  const [state, formAction] = useActionState<
    AdminRequestActionState,
    FormData
  >(updateRequestStatus, {});
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => startTransition(() => formAction(formData))}
      className="flex flex-col gap-2 sm:flex-row sm:items-center"
    >
      <input type="hidden" name="requestId" value={requestId} />
      <select
        name="status"
        defaultValue={currentStatus}
        className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
      >
        {requestStatuses.map((status) => (
          <option key={status} value={status}>
            {statusLabels[status]}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-gradient-to-r from-pink-500 to-green-500 px-4 py-2 text-sm font-bold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Updating..." : "Update"}
      </button>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
    </form>
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
