import { FileText, Inbox } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getAge, getDocumentLabel, type AdminRequestEntry } from "./_constants";
import {
  RequestDetailLink,
  StatusBadge,
  StatusUpdateForm,
} from "./_components";

export const metadata = {
  title: "Admin Requests — Barangay Mulawin",
  description: "Review and update Barangay Mulawin document requests.",
};

export const dynamic = "force-dynamic";

export default async function AdminRequestsPage() {
  const requests = await prisma.documentRequest.findMany({
    include: {
      user: true,
      statusLogs: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
            Request Queue
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-800 sm:text-4xl">
            Document Requests
          </h1>
          <p className="mt-2 text-gray-500">
            View all resident submissions and update their processing status.
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-12 text-center shadow-sm">
            <Inbox className="mx-auto h-12 w-12 text-gray-300" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              No requests yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-gray-500">
              Resident document requests will appear here after they submit the
              online form.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {requests.map((request: AdminRequestEntry) => (
              <article
                key={request.id}
                className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <StatusBadge status={request.status} />
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                        <FileText className="h-3.5 w-3.5" />
                        {getDocumentLabel(request.type)}
                      </span>
                    </div>
                    <h2 className="break-words text-xl font-bold text-gray-800">
                      {request.fullName}
                    </h2>
                    <p className="mt-1 break-words text-sm text-gray-500">
                      Account: {request.user.name} — {request.user.email}
                    </p>
                    <div className="mt-4 grid gap-3 text-sm text-gray-600 md:grid-cols-2">
                      <p className="break-words">
                        <span className="font-semibold text-gray-700">
                          Birthday:
                        </span>{" "}
                        {request.birthday.toLocaleDateString("en-PH", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        ({getAge(request.birthday)} years old)
                      </p>
                      <p className="break-words">
                        <span className="font-semibold text-gray-700">
                          Address:
                        </span>{" "}
                        {request.address}
                      </p>
                    </div>
                    <p className="mt-4 whitespace-pre-wrap break-words text-sm text-gray-600">
                      <span className="font-semibold text-gray-700">
                        Purpose:
                      </span>{" "}
                      {request.purpose}
                    </p>
                    {request.details && (
                      <p className="mt-1 whitespace-pre-wrap break-words text-sm text-gray-600">
                        <span className="font-semibold text-gray-700">
                          Details:
                        </span>{" "}
                        {request.details}
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span>
                        Submitted{" "}
                        {request.createdAt.toLocaleDateString("en-PH", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <RequestDetailLink requestId={request.id} />
                    </div>
                  </div>
                  <div className="w-full rounded-2xl bg-gray-50 p-4 lg:w-auto">
                    <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                      Update status
                    </p>
                    <StatusUpdateForm
                      requestId={request.id}
                      currentStatus={request.status}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
