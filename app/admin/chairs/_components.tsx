"use client";

import Link from "next/link";
import { useActionState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  assignReservationFacilitator,
  updateChairInventory,
  updateChairReservationStatus,
  type AdminChairActionState,
} from "@/app/actions/adminChairReservations";
import { getAllowedNextChairStatuses } from "@/lib/chair-reservation-constants";
import { getChairStatusClass, getChairStatusLabel } from "./_constants";

export function ChairStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${getChairStatusClass(status)}`}
    >
      {getChairStatusLabel(status)}
    </span>
  );
}

const buttonStyles = {
  APPROVED:
    "border-yellow-200 bg-yellow-50 text-yellow-800 hover:border-yellow-300",
  DELIVERED:
    "border-blue-200 bg-blue-50 text-blue-800 hover:border-blue-300",
  RETURNED:
    "border-green-200 bg-green-50 text-green-800 hover:border-green-300",
  CANCELLED: "border-red-200 bg-red-50 text-red-700 hover:border-red-300",
} as const;

export function ChairStatusUpdateForm({
  reservationId,
  currentStatus,
}: {
  reservationId: string;
  currentStatus: string;
}) {
  const [state, formAction] = useActionState<AdminChairActionState, FormData>(
    updateChairReservationStatus,
    {},
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const nextStatuses = getAllowedNextChairStatuses(currentStatus);

  const submit = (formData: FormData) => {
    startTransition(async () => {
      await formAction(formData);
      router.refresh();
    });
  };

  return (
    <div className="space-y-3">
      <form action={submit} className="space-y-3">
        <input type="hidden" name="reservationId" value={reservationId} />

        {nextStatuses.includes("DELIVERED") && (
          <div>
            <label
              htmlFor="deliveredByNote"
              className="text-xs font-semibold uppercase tracking-widest text-gray-400"
            >
              Who delivered
            </label>
            <input
              id="deliveredByNote"
              name="deliveredByNote"
              placeholder="Name of person who delivered"
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          {nextStatuses.map((status) => (
            <button
              key={status}
              type="submit"
              name="status"
              value={status}
              disabled={isPending}
              className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${buttonStyles[status as keyof typeof buttonStyles]}`}
            >
              {getChairStatusLabel(status)}
            </button>
          ))}
          {nextStatuses.length === 0 && (
            <p className="rounded-2xl bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-600">
              This reservation is closed.
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

export function InventoryUpdateForm({ totalQty }: { totalQty: number }) {
  const [state, formAction] = useActionState<AdminChairActionState, FormData>(
    updateChairInventory,
    {},
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const submit = (formData: FormData) => {
    startTransition(async () => {
      await formAction(formData);
      router.refresh();
    });
  };

  return (
    <form action={submit} className="space-y-3">
      <label
        htmlFor="totalQty"
        className="text-xs font-semibold uppercase tracking-widest text-gray-400"
      >
        Total chairs in inventory
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="totalQty"
          name="totalQty"
          type="number"
          min={0}
          step={1}
          defaultValue={totalQty}
          className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100 sm:max-w-[180px]"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Update inventory"}
        </button>
      </div>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.success && (
        <p className="text-sm font-semibold text-green-700">{state.success}</p>
      )}
    </form>
  );
}

export function AssignFacilitatorForm({
  reservationId,
  currentFacilitatorId,
  facilitators,
}: {
  reservationId: string;
  currentFacilitatorId: string | null;
  facilitators: { id: string; name: string; phone: string }[];
}) {
  const [state, formAction] = useActionState<AdminChairActionState, FormData>(
    assignReservationFacilitator,
    {},
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const submit = (formData: FormData) => {
    startTransition(async () => {
      await formAction(formData);
      router.refresh();
    });
  };

  return (
    <form action={submit} className="space-y-3">
      <input type="hidden" name="reservationId" value={reservationId} />
      <label
        htmlFor="facilitatorId"
        className="text-xs font-semibold uppercase tracking-widest text-gray-400"
      >
        Delivery facilitator
      </label>
      <select
        id="facilitatorId"
        name="facilitatorId"
        defaultValue={currentFacilitatorId ?? ""}
        className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
      >
        <option value="">Unassigned</option>
        {facilitators.map((facilitator) => (
          <option key={facilitator.id} value={facilitator.id}>
            {facilitator.name} — {facilitator.phone}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save facilitator"}
      </button>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.success && (
        <p className="text-sm font-semibold text-green-700">{state.success}</p>
      )}
    </form>
  );
}

export function ChairReservationDetailLink({
  reservationId,
}: {
  reservationId: string;
}) {
  return (
    <Link
      href={`/admin/chairs/${reservationId}`}
      className="text-sm font-semibold text-pink-500 transition hover:text-pink-600"
    >
      View details
    </Link>
  );
}
