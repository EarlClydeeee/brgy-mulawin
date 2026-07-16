"use client";

import { Download, FileText } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  generateRequestDraft,
  getDraftDownloadUrl,
} from "@/app/actions/adminRequests";

export function RequestDraftDownload({
  requestId,
  available,
}: {
  requestId: string;
  available: boolean;
}) {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const downloadDraft = () => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(async () => {
      const result = await getDraftDownloadUrl(requestId);

      if (result.error || !result.url) {
        setError(result.error ?? "Unable to prepare the document download.");
        return;
      }

      window.location.assign(result.url);
    });
  };

  const generateDraft = () => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(async () => {
      const result = await generateRequestDraft(requestId);

      if (result.error) {
        setError(result.error);
        return;
      }

      setSuccess(result.success);
      router.refresh();
    });
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="rounded-2xl bg-green-50 p-2 text-green-600">
          <FileText className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <p className="font-semibold text-gray-800">DOCX draft</p>
          <p className="mt-1 text-sm text-gray-500">
            {available
              ? "Generated from the resident submission. Review before issuing."
              : "This request has no generated draft yet."}
          </p>
        </div>
      </div>

      {available ? (
        <button
          type="button"
          onClick={downloadDraft}
          disabled={isPending}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-green-500 px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Download className="h-4 w-4" aria-hidden />
          {isPending ? "Preparing download..." : "Download DOCX draft"}
        </button>
      ) : (
        <button
          type="button"
          onClick={generateDraft}
          disabled={isPending}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-green-500 px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FileText className="h-4 w-4" aria-hidden />
          {isPending ? "Generating draft..." : "Generate DOCX draft"}
        </button>
      )}

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-3 text-sm text-green-700">{success}</p>}
    </div>
  );
}
