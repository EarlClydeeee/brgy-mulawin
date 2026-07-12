"use client";

import Link from "next/link";
import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { register as registerAction, type AuthActionState } from "@/app/actions/auth";

type RegisterValues = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const [state, formAction] = useActionState<AuthActionState, FormData>(
    registerAction,
    {},
  );
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>();

  const onSubmit = (values: RegisterValues) => {
    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("email", values.email);
    formData.set("password", values.password);
    startTransition(() => formAction(formData));
  };

  return (
    <div className="rounded-3xl border border-pink-100 bg-white p-8 shadow-xl shadow-pink-100/60">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Create account</h1>
        <p className="mt-2 text-sm text-gray-500">
          Register as a resident to request and track barangay documents.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-gray-700">
            Full name
          </label>
          <input
            id="name"
            autoComplete="name"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            {...register("name", { required: "Full name is required." })}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

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
            autoComplete="new-password"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters.",
              },
            })}
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
          {isPending ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already registered?{" "}
        <Link href="/login" className="font-semibold text-pink-500">
          Sign in
        </Link>
      </p>
    </div>
  );
}
