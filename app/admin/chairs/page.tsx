import Link from "next/link";
import { Armchair, Inbox, Users } from "lucide-react";
import {
  ensureChairInventory,
  getCurrentlyOutQuantity,
} from "@/lib/chair-inventory";
import { prisma } from "@/lib/prisma";
import {
  formatChairDateTime,
  type AdminChairReservationEntry,
} from "./_constants";
import {
  ChairReservationDetailLink,
  ChairStatusBadge,
  ChairStatusUpdateForm,
  InventoryUpdateForm,
} from "./_components";

export const metadata = {
  title: "Admin Chair Reservations — Barangay Mulawin",
  description: "Manage barangay chair inventory and borrow requests.",
};

export const dynamic = "force-dynamic";

export default async function AdminChairsPage() {
  const [inventory, currentlyOut, reservations] = await Promise.all([
    ensureChairInventory(),
    getCurrentlyOutQuantity(),
    prisma.chairReservation.findMany({
      include: {
        user: true,
        facilitator: {
          select: { id: true, name: true, phone: true },
        },
        statusLogs: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const availableNow = Math.max(inventory.totalQty - currentlyOut, 0);

  return (
    <main className="px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
              Chair Inventory
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-800 sm:text-4xl">
              Chair Reservations
            </h1>
            <p className="mt-2 text-gray-500">
              Track borrows, remaining stock, and delivery facilitators.
            </p>
          </div>
          <Link
            href="/admin/chairs/facilitators"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-pink-200 hover:text-pink-500"
          >
            <Users className="h-4 w-4" />
            Manage facilitators
          </Link>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Total inventory
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-800">
              {inventory.totalQty}
            </p>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Currently out
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-800">
              {currentlyOut}
            </p>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Available now
            </p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {availableNow}
            </p>
          </div>
        </div>

        <div className="mb-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <InventoryUpdateForm totalQty={inventory.totalQty} />
        </div>

        {reservations.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-12 text-center shadow-sm">
            <Inbox className="mx-auto h-12 w-12 text-gray-300" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              No chair reservations yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-gray-500">
              Resident borrow requests will appear here after they submit the
              online form.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {reservations.map((reservation: AdminChairReservationEntry) => (
              <article
                key={reservation.id}
                className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <ChairStatusBadge status={reservation.status} />
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                        <Armchair className="h-3.5 w-3.5" />
                        {reservation.quantity} chairs
                      </span>
                    </div>
                    <h2 className="break-words text-xl font-bold text-gray-800">
                      {reservation.eventName}
                    </h2>
                    <p className="mt-1 break-words text-sm text-gray-500">
                      {reservation.user.name} — {reservation.user.email}
                    </p>
                    <div className="mt-4 grid gap-3 text-sm text-gray-600 md:grid-cols-2">
                      <p className="break-words">
                        <span className="font-semibold text-gray-700">
                          Where:
                        </span>{" "}
                        {reservation.venue}
                      </p>
                      <p className="break-words">
                        <span className="font-semibold text-gray-700">
                          Contact:
                        </span>{" "}
                        {reservation.contactName} ({reservation.contactPhone})
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">
                          When:
                        </span>{" "}
                        {formatChairDateTime(reservation.borrowFrom)}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">
                          Until:
                        </span>{" "}
                        {formatChairDateTime(reservation.borrowUntil)}
                      </p>
                      <p className="break-words md:col-span-2">
                        <span className="font-semibold text-gray-700">
                          Facilitator:
                        </span>{" "}
                        {reservation.facilitator
                          ? `${reservation.facilitator.name} (${reservation.facilitator.phone})`
                          : "Unassigned"}
                      </p>
                      {reservation.deliveredByNote && (
                        <p className="break-words md:col-span-2">
                          <span className="font-semibold text-gray-700">
                            Delivered by:
                          </span>{" "}
                          {reservation.deliveredByNote}
                        </p>
                      )}
                    </div>
                    <div className="mt-4">
                      <ChairReservationDetailLink
                        reservationId={reservation.id}
                      />
                    </div>
                  </div>
                  <div className="w-full shrink-0 lg:w-64">
                    <ChairStatusUpdateForm
                      reservationId={reservation.id}
                      currentStatus={reservation.status}
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
