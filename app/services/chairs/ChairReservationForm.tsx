"use client";

import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  createChairReservation,
  type ChairReservationActionState,
} from "@/app/actions/chairReservations";

type ChairReservationValues = {
  quantity: number;
  eventName: string;
  venue: string;
  borrowFrom: string;
  borrowUntil: string;
  contactName: string;
  contactPhone: string;
  notes?: string;
};

export default function ChairReservationForm() {
  const [state, formAction] = useActionState<
    ChairReservationActionState,
    FormData
  >(createChairReservation, {});
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChairReservationValues>({
    defaultValues: {
      quantity: 1,
    },
  });

  const onSubmit = (values: ChairReservationValues) => {
    const formData = new FormData();
    formData.set("quantity", String(values.quantity));
    formData.set("eventName", values.eventName);
    formData.set("venue", values.venue);
    formData.set("borrowFrom", values.borrowFrom);
    formData.set("borrowUntil", values.borrowUntil);
    formData.set("contactName", values.contactName);
    formData.set("contactPhone", values.contactPhone);
    formData.set("notes", values.notes ?? "");
    startTransition(() => formAction(formData));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8"
    >
      <div className="space-y-6">
        <div>
          <label
            htmlFor="quantity"
            className="text-sm font-semibold text-gray-700"
          >
            How many chairs
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            step={1}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            {...register("quantity", {
              required: "Quantity is required.",
              valueAsNumber: true,
              min: { value: 1, message: "Request at least 1 chair." },
            })}
          />
          {errors.quantity && (
            <p className="mt-1 text-xs text-red-500">
              {errors.quantity.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="eventName"
            className="text-sm font-semibold text-gray-700"
          >
            Event
          </label>
          <input
            id="eventName"
            placeholder="e.g. Birthday celebration, barangay meeting"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            {...register("eventName", {
              required: "Event name is required.",
              minLength: {
                value: 2,
                message: "Event name must be at least 2 characters.",
              },
            })}
          />
          {errors.eventName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.eventName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="venue"
            className="text-sm font-semibold text-gray-700"
          >
            Where (venue / address)
          </label>
          <input
            id="venue"
            placeholder="Delivery or event location"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            {...register("venue", {
              required: "Venue is required.",
              minLength: {
                value: 2,
                message: "Venue must be at least 2 characters.",
              },
            })}
          />
          {errors.venue && (
            <p className="mt-1 text-xs text-red-500">{errors.venue.message}</p>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="borrowFrom"
              className="text-sm font-semibold text-gray-700"
            >
              When (borrow start)
            </label>
            <input
              id="borrowFrom"
              type="datetime-local"
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
              {...register("borrowFrom", {
                required: "Borrow start date is required.",
              })}
            />
            {errors.borrowFrom && (
              <p className="mt-1 text-xs text-red-500">
                {errors.borrowFrom.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="borrowUntil"
              className="text-sm font-semibold text-gray-700"
            >
              Until when (return)
            </label>
            <input
              id="borrowUntil"
              type="datetime-local"
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
              {...register("borrowUntil", {
                required: "Return date is required.",
              })}
            />
            {errors.borrowUntil && (
              <p className="mt-1 text-xs text-red-500">
                {errors.borrowUntil.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contactName"
              className="text-sm font-semibold text-gray-700"
            >
              Contact person
            </label>
            <input
              id="contactName"
              autoComplete="name"
              placeholder="Name of contact person"
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
              {...register("contactName", {
                required: "Contact person is required.",
                minLength: {
                  value: 2,
                  message: "Contact name must be at least 2 characters.",
                },
              })}
            />
            {errors.contactName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.contactName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="contactPhone"
              className="text-sm font-semibold text-gray-700"
            >
              Contact phone
            </label>
            <input
              id="contactPhone"
              type="tel"
              autoComplete="tel"
              placeholder="09XXXXXXXXX"
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
              {...register("contactPhone", {
                required: "Contact phone is required.",
                minLength: {
                  value: 7,
                  message: "Contact phone must be at least 7 characters.",
                },
              })}
            />
            {errors.contactPhone && (
              <p className="mt-1 text-xs text-red-500">
                {errors.contactPhone.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="notes"
            className="text-sm font-semibold text-gray-700"
          >
            Additional notes{" "}
            <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <textarea
            id="notes"
            rows={3}
            placeholder="Any special instructions for delivery or pickup"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            {...register("notes")}
          />
        </div>

        {state.error && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-gradient-to-r from-pink-500 to-green-500 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Submitting..." : "Submit chair reservation"}
        </button>

        <p className="text-center text-xs text-gray-400">
          Barangay staff will review your request and confirm availability.
          Stock levels are not shown to residents.
        </p>
      </div>
    </form>
  );
}
