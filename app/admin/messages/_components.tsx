"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setContactMessageRead } from "@/app/actions/adminMessages";

export function MessageReadButton({
  messageId,
  isRead,
}: {
  messageId: string;
  isRead: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const result = await setContactMessageRead(messageId, !isRead);
          if (result.success) {
            router.refresh();
          }
        })
      }
      className="rounded-full border border-gray-200 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-600 transition hover:border-pink-200 hover:text-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Updating..." : isRead ? "Mark unread" : "Mark read"}
    </button>
  );
}
