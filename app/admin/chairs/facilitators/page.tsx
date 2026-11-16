import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { FacilitatorForms } from "./_components";

export const metadata = {
  title: "Delivery Facilitators — Barangay Mulawin",
  description: "Manage people who facilitate chair deliveries.",
};

export const dynamic = "force-dynamic";

export default async function AdminFacilitatorsPage() {
  const facilitators = await prisma.deliveryFacilitator.findMany({
    orderBy: [{ isActive: "desc" }, { name: "asc" }],
  });

  return (
    <main className="px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/admin/chairs"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-pink-500 transition hover:text-pink-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to chair reservations
        </Link>

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
            Delivery Team
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-800 sm:text-4xl">
            Facilitators & Contact Persons
          </h1>
          <p className="mt-2 text-gray-500">
            Add people who can facilitate chair delivery, then assign them on
            each reservation.
          </p>
        </div>

        <FacilitatorForms facilitators={facilitators} />
      </div>
    </main>
  );
}
