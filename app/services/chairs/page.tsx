import { Armchair } from "lucide-react";
import ChairReservationForm from "./ChairReservationForm";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Borrow Barangay Chairs",
  description:
    "Request to borrow chairs from Barangay Mulawin, Tanza, Cavite for community events.",
  path: "/services/chairs",
  noIndex: true,
});

export default function ChairReservationPage() {
  return (
    <section className="bg-gradient-to-b from-green-50/70 to-white px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-green-600 shadow-sm">
            <Armchair className="h-4 w-4" />
            Chair Reservation
          </span>
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            Borrow Barangay Chairs
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            Submit how many chairs you need, where and when, and the event
            details. Staff will review your request and arrange delivery.
          </p>
        </div>

        <ChairReservationForm />
      </div>
    </section>
  );
}
