"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useTransition } from "react";
import {
  createPost,
  deletePost,
  toggleFeatured,
  updatePost,
  type PostActionState,
} from "@/app/actions/news";

type PostFormValues = {
  id: string;
  headline: string;
  caption: string;
  imageUrls: string[];
};

export function PostForm({
  mode,
  initialValues,
}: {
  mode: "create" | "edit";
  initialValues?: PostFormValues;
}) {
  const action =
    mode === "create"
      ? createPost
      : updatePost.bind(null, initialValues?.id ?? "");
  const [state, formAction] = useActionState<PostActionState, FormData>(
    action,
    {},
  );
  const [isPending, startTransition] = useTransition();
  const currentImage = initialValues?.imageUrls[0];

  return (
    <form
      action={(formData) => startTransition(() => formAction(formData))}
      className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="space-y-6">
        <div>
          <label
            htmlFor="headline"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Headline
          </label>
          <input
            id="headline"
            name="headline"
            type="text"
            required
            maxLength={200}
            defaultValue={initialValues?.headline ?? ""}
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            placeholder="Enter post headline"
          />
        </div>

        <div>
          <label
            htmlFor="caption"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Caption
          </label>
          <textarea
            id="caption"
            name="caption"
            required
            maxLength={500}
            rows={5}
            defaultValue={initialValues?.caption ?? ""}
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            placeholder="Write the announcement caption"
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Image (optional)
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-full file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-200"
          />
          <p className="mt-2 text-xs text-gray-500">
            JPEG, PNG, or WebP. Maximum 5 MB.
          </p>
          {currentImage && (
            <div className="mt-4 space-y-3">
              <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-gray-100">
                <Image
                  src={currentImage}
                  alt="Current post image"
                  fill
                  className="object-cover"
                />
              </div>
              <label className="inline-flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="removeImage"
                  value="true"
                  className="rounded border-gray-300 text-pink-500 focus:ring-pink-200"
                />
                Remove current image
              </label>
            </div>
          )}
        </div>

        {state.error && <p className="text-sm text-red-600">{state.error}</p>}

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-gradient-to-r from-pink-500 to-green-500 px-6 py-3 text-sm font-bold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isPending
              ? "Saving..."
              : mode === "create"
                ? "Create post"
                : "Save changes"}
          </button>
          <Link
            href="/admin/news"
            className="w-full rounded-full border border-gray-200 px-6 py-3 text-center text-sm font-semibold text-gray-600 transition hover:border-pink-200 hover:text-pink-500 sm:w-auto"
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}

export function FeatureButton({
  postId,
  isFeatured,
}: {
  postId: string;
  isFeatured: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await toggleFeatured(postId);
        })
      }
      className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition disabled:cursor-not-allowed disabled:opacity-60 ${
        isFeatured
          ? "bg-pink-100 text-pink-700 hover:bg-pink-200"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {isPending ? "Updating..." : isFeatured ? "Featured" : "Set featured"}
    </button>
  );
}

export function DeleteButton({ postId }: { postId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (!window.confirm("Delete this post? This cannot be undone.")) {
          return;
        }

        startTransition(async () => {
          await deletePost(postId);
        });
      }}
      className="rounded-full border border-red-200 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
