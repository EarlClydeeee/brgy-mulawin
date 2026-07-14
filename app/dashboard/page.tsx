import Link from "next/link";
import { redirect } from "next/navigation";
import { Calendar, FileText, Plus } from "lucide-react";
import { CheckEmailNotice } from "@/components/CheckEmailNotice";
import { LogoutButton } from "@/components/LogoutButton";
import { RequestStatusAlert } from "@/components/RequestStatusAlert";
import { RequestSubmittedNotice } from "@/components/RequestSubmittedNotice";
import {
  getDocumentLabel,
  getStatusClass,
  getStatusLabel,
  type ResidentRequestEntry,
  type StatusLogEntry,
} from "@/app/admin/requests/_constants";
import { isAdminUser } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { createPageMetadata } from "@/lib/seo";
import { createClient } from "@/utils/supabase/server";

export const metadata = createPageMetadata({
  title: "My Document Requests",
  description: "Track your Barangay Mulawin document requests.",
  path: "/dashboard",
  noIndex: true,
});

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ checkEmail?: string; submitted?: string }>;
}) {
  const { checkEmail, submitted } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (isAdminUser(user)) {
    redirect("/admin/requests");
  }

  let requests: ResidentRequestEntry[] = [];
  let loadFailed = false;

  try {
    requests = await prisma.documentRequest.findMany({
      where: { userId: user.id },
      include: {
        statusLogs: {
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to load document requests:", error);
    loadFailed = true;
  }

  return (
    <section className="bg-gradient-to-b from-green-50/70 to-white px-4 py-14">
      {checkEmail === "1" && <CheckEmailNotice variant="toast" />}
      {submitted === "1" && <RequestSubmittedNotice />}
      <div className="mx-auto max-w-6xl">
        {loadFailed && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            We could not load your requests right now. If you just submitted one,
            please try again later or contact the barangay office.
          </div>
        )}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
              Resident Dashboard
            </p>
            <h1 className="mt-2 text-4xl font-bold text-gray-800">
              My Document Requests
            </h1>
            <p className="mt-2 text-gray-500">
              Track the status of documents you submitted online.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/services/request"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-green-500 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:opacity-95"
            >
              <Plus className="h-4 w-4" />
              New request
            </Link>
            <LogoutButton className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-600 shadow-sm transition hover:border-pink-200 hover:text-pink-500" />
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-pink-200 bg-white p-10 text-center shadow-sm">
            <FileText className="mx-auto h-12 w-12 text-pink-300" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              No requests yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-gray-500">
              Submit your first online document request and it will appear here
              for tracking.
            </p>
            <Link
              href="/services/request"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-green-500 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:opacity-95"
            >
              Request a document
            </Link>
          </div>
        ) : (
          <div className="grid gap-5">
            {requests.map((request: ResidentRequestEntry) => (
              <article
                key={request.id}
                className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${getStatusClass(request.status)}`}
                    >
                      {getStatusLabel(request.status)}
                    </span>
                    <h2 className="mt-3 text-2xl font-bold text-gray-800">
                      {getDocumentLabel(request.type)}
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                      Purpose: {request.purpose}
                    </p>
                    {request.details && (
                      <p className="mt-1 text-sm text-gray-500">
                        Details: {request.details}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-gray-50 px-4 py-3 text-sm text-gray-500">
                    <Calendar className="h-4 w-4 text-green-500" />
                    {request.createdAt.toLocaleDateString("en-PH", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <div className="mt-6">
                  <RequestStatusAlert status={request.status} />
                </div>

                <div className="mt-6 border-t border-gray-100 pt-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
                    Timeline
                  </p>
                  <div className="space-y-3">
                    {request.statusLogs.map((log: StatusLogEntry) => (
                      <div key={log.id} className="flex items-start gap-3">
                        <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-pink-500 to-green-500" />
                        <div>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">
                              {getStatusLabel(log.status)}
                            </span>{" "}
                            on{" "}
                            {log.createdAt.toLocaleDateString("en-PH", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                          {log.note && (
                            <p className="mt-1 text-sm text-gray-500">
                              {log.note}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
