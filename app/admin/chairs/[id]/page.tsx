import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Phone,
  User,
  Users,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import {
  formatChairDateTime,
  getChairStatusLabel,
  type AdminChairReservationEntry,
  type ChairStatusLogEntry,
} from "../_constants";
import {
  AssignFacilitatorForm,
  ChairStatusBadge,
  ChairStatusUpdateForm,
} from "../_components";

export const metadata = {
  title: "Chair Reservation Details — Barangay Mulawin",
  description: "Review one barangay chair reservation.",
};

export const dynamic = "force-dynamic";

export default async function AdminChairReservationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [reservation, facilitators] = await Promise.all([
    prisma.chairReservation.findUnique({
      where: { id },
      include: {
        user: true,
        facilitator: {
          select: { id: true, name: true, phone: true },
        },
        statusLogs: {
          orderBy: { createdAt: "asc" },
        },
      },
    }) as Promise<AdminChairReservationEntry | null>,
    prisma.deliveryFacilitator.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true, phone: true },
    }),
  ]);

  if (!reservation) {
    notFound();
  }

  return (
    <main className="px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin/chairs"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-pink-500 transition hover:text-pink-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to chair reservations
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <ChairStatusBadge status={reservation.status} />
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                {reservation.quantity} chairs
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              {reservation.eventName}
            </h1>
            <p className="mt-2 text-gray-500">
              Submitted{" "}
              {reservation.createdAt.toLocaleDateString("en-PH", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-500">
                  <User className="h-4 w-4 text-pink-500" />
                  Resident
                </div>
                <p className="break-words font-bold text-gray-800">
                  {reservation.user.name}
                </p>
                <p className="mt-1 break-all text-sm text-gray-500">
                  {reservation.user.email}
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-500">
                  <Phone className="h-4 w-4 text-green-500" />
                  Contact person
                </div>
                <p className="break-words font-bold text-gray-800">
                  {reservation.contactName}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {reservation.contactPhone}
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-500">
                  <MapPin className="h-4 w-4 text-pink-500" />
                  Where
                </div>
                <p className="break-words font-bold text-gray-800">
                  {reservation.venue}
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-500">
                  <Calendar className="h-4 w-4 text-green-500" />
                  Schedule
                </div>
                <p className="font-bold text-gray-800">
                  {formatChairDateTime(reservation.borrowFrom)}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Until {formatChairDateTime(reservation.borrowUntil)}
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4 sm:col-span-2">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-500">
                  <Users className="h-4 w-4 text-pink-500" />
                  Delivery facilitator
                </div>
                <p className="break-words font-bold text-gray-800">
                  {reservation.facilitator
                    ? `${reservation.facilitator.name} — ${reservation.facilitator.phone}`
                    : "Unassigned"}
                </p>
                {reservation.deliveredByNote && (
                  <p className="mt-2 text-sm text-gray-500">
                    Delivered by: {reservation.deliveredByNote}
                  </p>
                )}
              </div>
            </div>

            {reservation.notes && (
              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
                  Notes
                </p>
                <p className="mt-2 whitespace-pre-wrap break-words text-gray-700">
                  {reservation.notes}
                </p>
              </div>
            )}

            <div className="mt-8 border-t border-gray-100 pt-6">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
                Timeline
              </p>
              <div className="space-y-3">
                {reservation.statusLogs.map((log: ChairStatusLogEntry) => (
                  <div key={log.id} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-pink-500 to-green-500" />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">
                          {getChairStatusLabel(log.status)}
                        </span>{" "}
                        on{" "}
                        {log.createdAt.toLocaleDateString("en-PH", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      {log.note && (
                        <p className="mt-1 whitespace-pre-wrap break-words text-sm text-gray-500">
                          {log.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                Update status
              </p>
              <ChairStatusUpdateForm
                reservationId={reservation.id}
                currentStatus={reservation.status}
              />
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                Assign facilitator
              </p>
              <AssignFacilitatorForm
                reservationId={reservation.id}
                currentFacilitatorId={reservation.facilitator?.id ?? null}
                facilitators={facilitators}
              />
              <Link
                href="/admin/chairs/facilitators"
                className="mt-4 inline-flex text-sm font-semibold text-pink-500 transition hover:text-pink-600"
              >
                Manage facilitator directory
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
