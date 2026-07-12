"use client";

import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  createRequest,
  type RequestActionState,
} from "@/app/actions/requests";

const documentOptions = [
  { value: "BARANGAY_CLEARANCE", label: "Barangay Clearance" },
  { value: "CERTIFICATE_OF_RESIDENCY", label: "Certificate of Residency" },
  { value: "CERTIFICATE_OF_INDIGENCY", label: "Certificate of Indigency" },
  { value: "BUSINESS_PERMIT", label: "Barangay Business Permit" },
] as const;

type RequestValues = {
  type: string;
  fullName: string;
  birthday: string;
  address: string;
  purpose: string;
  details?: string;
};

export default function RequestForm({ defaultType }: { defaultType?: string }) {
  const [state, formAction] = useActionState<RequestActionState, FormData>(
    createRequest,
    {},
  );
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestValues>({
    defaultValues: {
      type:
        documentOptions.find((option) => option.value === defaultType)?.value ??
        "BARANGAY_CLEARANCE",
    },
  });

  const onSubmit = (values: RequestValues) => {
    const formData = new FormData();
    formData.set("type", values.type);
    formData.set("fullName", values.fullName);
    formData.set("birthday", values.birthday);
    formData.set("address", values.address);
    formData.set("purpose", values.purpose);
    formData.set("details", values.details ?? "");
    startTransition(() => formAction(formData));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8"
    >
      <div className="space-y-6">
        <div>
          <label htmlFor="type" className="text-sm font-semibold text-gray-700">
            Document type
          </label>
          <select
            id="type"
            className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            {...register("type", { required: "Document type is required." })}
          >
            {documentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.type && (
            <p className="mt-1 text-xs text-red-500">{errors.type.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="fullName"
            className="text-sm font-semibold text-gray-700"
          >
            Full name
          </label>
          <input
            id="fullName"
            autoComplete="name"
            placeholder="Enter the applicant's full legal name"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            {...register("fullName", {
              required: "Full name is required.",
              minLength: {
                value: 2,
                message: "Full name must be at least 2 characters.",
              },
            })}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="birthday"
            className="text-sm font-semibold text-gray-700"
          >
            Birthday
          </label>
          <input
            id="birthday"
            type="date"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            {...register("birthday", {
              required: "Birthday is required.",
            })}
          />
          {errors.birthday && (
            <p className="mt-1 text-xs text-red-500">
              {errors.birthday.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            className="text-sm font-semibold text-gray-700"
          >
            Address
          </label>
          <textarea
            id="address"
            rows={3}
            autoComplete="street-address"
            placeholder="House number, street, purok/subdivision, barangay"
            className="mt-2 w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            {...register("address", {
              required: "Address is required.",
              minLength: {
                value: 5,
                message: "Address must be at least 5 characters.",
              },
            })}
          />
          {errors.address && (
            <p className="mt-1 text-xs text-red-500">
              {errors.address.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="purpose"
            className="text-sm font-semibold text-gray-700"
          >
            Purpose
          </label>
          <input
            id="purpose"
            placeholder="Example: Employment requirement"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            {...register("purpose", {
              required: "Purpose is required.",
              minLength: {
                value: 5,
                message: "Purpose must be at least 5 characters.",
              },
            })}
          />
          {errors.purpose && (
            <p className="mt-1 text-xs text-red-500">
              {errors.purpose.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="details"
            className="text-sm font-semibold text-gray-700"
          >
            Additional details
          </label>
          <textarea
            id="details"
            rows={5}
            placeholder="Add notes that may help barangay staff review your request."
            className="mt-2 w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            {...register("details")}
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
          className="w-full rounded-full bg-gradient-to-r from-pink-500 to-green-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Submitting request..." : "Submit request"}
        </button>
      </div>
    </form>
  );
}
