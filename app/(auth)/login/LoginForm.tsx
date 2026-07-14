"use client";

import Link from "next/link";
import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { login, type AuthActionState } from "@/app/actions/auth";
import { CheckEmailNotice } from "@/components/CheckEmailNotice";

type LoginValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  showCheckEmailNotice?: boolean;
};

export default function LoginForm({
  showCheckEmailNotice = false,
}: LoginFormProps) {
  const [state, formAction] = useActionState<AuthActionState, FormData>(login, {});
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>();

  const onSubmit = (values: LoginValues) => {
    const formData = new FormData();
    formData.set("email", values.email);
    formData.set("password", values.password);
    startTransition(() => formAction(formData));
  };

  return (
    <div className="rounded-3xl border border-pink-100 bg-white p-8 shadow-xl shadow-pink-100/60">
      {showCheckEmailNotice && <CheckEmailNotice />}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-500">
          Sign in to track and submit barangay document requests.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-gray-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            {...register("email", { required: "Email is required." })}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="text-sm font-semibold text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            {...register("password", { required: "Password is required." })}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {state.error && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-gradient-to-r from-pink-500 to-green-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        No account yet?{" "}
        <Link href="/register" className="font-semibold text-pink-500">
          Create one
        </Link>
      </p>
    </div>
  );
}
