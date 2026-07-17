"use client";

import { useActionState } from "react";
import { updatePassword, type AuthActionState } from "@/app/actions/auth";

export default function ResetPasswordForm() {
  const [state, formAction, isPending] = useActionState<
    AuthActionState,
    FormData
  >(updatePassword, {});

  return (
    <div className="rounded-3xl border border-pink-100 bg-white p-8 shadow-xl shadow-pink-100/60">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Choose a new password</h1>
        <p className="mt-2 text-sm text-gray-500">
          Use at least 8 characters and keep your password private.
        </p>
      </div>
      <form action={formAction} className="space-y-5">
        <div>
          <label htmlFor="password" className="text-sm font-semibold text-gray-700">
            New password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
          />
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="text-sm font-semibold text-gray-700"
          >
            Confirm new password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
          />
        </div>
        {state.error && (
          <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {state.error}
          </p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-gradient-to-r from-pink-500 to-green-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Updating password..." : "Update password"}
        </button>
      </form>
    </div>
  );
}
