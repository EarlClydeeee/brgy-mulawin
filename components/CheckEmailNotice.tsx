"use client";

import { Mail, X } from "lucide-react";
import { useState } from "react";

type CheckEmailNoticeProps = {
  variant?: "inline" | "toast";
};

export function CheckEmailNotice({ variant = "inline" }: CheckEmailNoticeProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  const content = (
    <>
      <Mail className="h-5 w-5 shrink-0 text-green-600" aria-hidden />
      <p className="flex-1 text-sm text-green-800">
        Please check your email for verification to complete your login.
      </p>
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="shrink-0 rounded-full p-1 text-green-700 transition hover:bg-green-100"
        aria-label="Dismiss message"
      >
        <X className="h-4 w-4" />
      </button>
    </>
  );

  if (variant === "toast") {
    return (
      <div
        role="status"
        className="fixed right-4 top-24 z-50 flex max-w-sm items-start gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 shadow-lg shadow-green-100/80"
      >
        {content}
      </div>
    );
  }

  return (
    <div
      role="status"
      className="mb-5 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3"
    >
      {content}
    </div>
  );
}
