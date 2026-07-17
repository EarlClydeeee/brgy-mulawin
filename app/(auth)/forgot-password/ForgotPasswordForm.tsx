"use client";

import Link from "next/link";
import { useActionState } from "react";
import { requestPasswordReset, type AuthActionState } from "@/app/actions/auth";

export default function ForgotPasswordForm({
  showRecoveryError = false,
}: {
  showRecoveryError?: boolean;
}) {
  const [state, formAction, isPending] = useActionState<
    AuthActionState,
    FormData
  >(requestPasswordReset, {});

  if (state.success) {
    return (
      <div className="rounded-3xl border border-green-100 bg-white p-8 text-center shadow-xl shadow-green-100/60">
        <h1 className="text-3xl font-bold text-gray-800">Check your email</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-500">
          {state.success}
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block font-semibold text-pink-500"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-pink-100 bg-white p-8 shadow-xl shadow-pink-100/60">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Reset your password</h1>
        <p className="mt-2 text-sm text-gray-500">
          Enter your account email and we&apos;ll send reset instructions.
        </p>
      </div>
      {showRecoveryError && (
        <p
          role="alert"
          className="mb-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          Your recovery link is invalid or expired. Request a new one below.
        </p>
      )}
      <form action={formAction} className="space-y-5">
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-gray-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
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
          {isPending ? "Sending reset link..." : "Send reset link"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-500">
        <Link href="/login" className="font-semibold text-pink-500">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
