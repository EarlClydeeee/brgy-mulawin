import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Home, Mail, User } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getAge, getDocumentLabel, getStatusLabel } from "../_constants";
import { StatusBadge, StatusUpdateForm } from "../_components";

export const metadata = {
  title: "Request Details — Barangay Mulawin",
  description: "Review one Barangay Mulawin document request.",
};

export const dynamic = "force-dynamic";

export default async function AdminRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const request = await prisma.documentRequest.findUnique({
    where: { id },
    include: {
      user: true,
      statusLogs: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!request) {
    notFound();
  }

  return (
    <main className="px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin/requests"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-pink-500 transition hover:text-pink-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to requests
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <StatusBadge status={request.status} />
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                {getDocumentLabel(request.type)}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-800">
              {getDocumentLabel(request.type)}
            </h1>
            <p className="mt-2 text-gray-500">
              Submitted{" "}
              {request.createdAt.toLocaleDateString("en-PH", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-500">
                  <User className="h-4 w-4 text-pink-500" />
                  Full Name
                </div>
                <p className="font-bold text-gray-800">{request.fullName}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-500">
                  <Calendar className="h-4 w-4 text-green-500" />
                  Birthday and Age
                </div>
                <p className="font-bold text-gray-800">
                  {request.birthday.toLocaleDateString("en-PH", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  ({getAge(request.birthday)} years old)
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-500">
                  <Home className="h-4 w-4 text-pink-500" />
                  Address
                </div>
                <p className="font-bold text-gray-800">{request.address}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-500">
                  <Mail className="h-4 w-4 text-green-500" />
                  Account Email
                </div>
                <p className="break-all font-bold text-gray-800">
                  {request.user.email}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
                  Purpose
                </p>
                <p className="mt-2 text-gray-700">{request.purpose}</p>
              </div>
              {request.details && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
                    Additional details
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-gray-700">
                    {request.details}
                  </p>
                </div>
              )}
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                Update status
              </p>
              <StatusUpdateForm
                requestId={request.id}
                currentStatus={request.status}
              />
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="mb-5 text-xs font-bold uppercase tracking-widest text-gray-400">
                Status timeline
              </p>
              <div className="space-y-4">
                {request.statusLogs.map((log) => (
                  <div key={log.id} className="flex gap-3">
                    <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-pink-500 to-green-500" />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {getStatusLabel(log.status)}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="h-3.5 w-3.5" />
                        {log.createdAt.toLocaleDateString("en-PH", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
