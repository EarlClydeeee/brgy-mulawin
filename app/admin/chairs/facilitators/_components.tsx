"use client";

import { useActionState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createDeliveryFacilitator,
  setFacilitatorActive,
  updateDeliveryFacilitator,
  type AdminChairActionState,
} from "@/app/actions/adminChairReservations";

type Facilitator = {
  id: string;
  name: string;
  phone: string;
  notes: string | null;
  isActive: boolean;
};

function ActionFeedback({ state }: { state: AdminChairActionState }) {
  return (
    <>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.success && (
        <p className="text-sm font-semibold text-green-700">{state.success}</p>
      )}
    </>
  );
}

export function FacilitatorForms({
  facilitators,
}: {
  facilitators: Facilitator[];
}) {
  const router = useRouter();
  const [createState, createAction] = useActionState<
    AdminChairActionState,
    FormData
  >(createDeliveryFacilitator, {});
  const [updateState, updateAction] = useActionState<
    AdminChairActionState,
    FormData
  >(updateDeliveryFacilitator, {});
  const [toggleState, toggleAction] = useActionState<
    AdminChairActionState,
    FormData
  >(setFacilitatorActive, {});
  const [isPending, startTransition] = useTransition();

  const run = (
    action: (payload: FormData) => void | Promise<void>,
    formData: FormData,
  ) => {
    startTransition(async () => {
      await action(formData);
      router.refresh();
    });
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800">Add facilitator</h2>
        <form
          action={(formData) => run(createAction, formData)}
          className="mt-4 grid gap-4 sm:grid-cols-2"
        >
          <div className="sm:col-span-1">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            />
          </div>
          <div className="sm:col-span-1">
            <label
              htmlFor="phone"
              className="text-sm font-semibold text-gray-700"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              required
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="notes"
              className="text-sm font-semibold text-gray-700"
            >
              Notes{" "}
              <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <input
              id="notes"
              name="notes"
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Add facilitator"}
            </button>
          </div>
          <div className="sm:col-span-2">
            <ActionFeedback state={createState} />
          </div>
        </form>
      </section>

      <section className="space-y-4">
        {facilitators.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-500">
            No facilitators yet. Add the first contact person above.
          </div>
        ) : (
          facilitators.map((facilitator) => (
            <article
              key={facilitator.id}
              className={`rounded-3xl border bg-white p-6 shadow-sm ${
                facilitator.isActive
                  ? "border-gray-100"
                  : "border-dashed border-gray-200 opacity-80"
              }`}
            >
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-bold text-gray-800">
                  {facilitator.name}
                </h3>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${
                    facilitator.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {facilitator.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <form
                action={(formData) => run(updateAction, formData)}
                className="grid gap-4 sm:grid-cols-2"
              >
                <input type="hidden" name="id" value={facilitator.id} />
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Name
                  </label>
                  <input
                    name="name"
                    defaultValue={facilitator.name}
                    required
                    className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Phone
                  </label>
                  <input
                    name="phone"
                    defaultValue={facilitator.phone}
                    required
                    className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Notes
                  </label>
                  <input
                    name="notes"
                    defaultValue={facilitator.notes ?? ""}
                    className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
                  />
                </div>
                <div className="flex flex-wrap gap-3 sm:col-span-2">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:opacity-50"
                  >
                    Save changes
                  </button>
                </div>
              </form>

              <form
                action={(formData) => run(toggleAction, formData)}
                className="mt-3"
              >
                <input type="hidden" name="id" value={facilitator.id} />
                <input
                  type="hidden"
                  name="isActive"
                  value={facilitator.isActive ? "false" : "true"}
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-pink-200 hover:text-pink-500 disabled:opacity-50"
                >
                  {facilitator.isActive ? "Deactivate" : "Reactivate"}
                </button>
              </form>
            </article>
          ))
        )}
        <ActionFeedback state={updateState} />
        <ActionFeedback state={toggleState} />
      </section>
    </div>
  );
}
