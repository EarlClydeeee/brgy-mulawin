import { FileText } from "lucide-react";
import RequestForm from "./RequestForm";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Request a Document",
  description:
    "Submit an online document request to Barangay Mulawin, Tanza, Cavite.",
  path: "/services/request",
  noIndex: true,
});

export default async function RequestDocumentPage({
  searchParams,
}: {
  searchParams?: Promise<{ type?: string }>;
}) {
  const params = await searchParams;

  return (
    <section className="bg-gradient-to-b from-pink-50/70 to-white px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-pink-500 shadow-sm">
            <FileText className="h-4 w-4" />
            Online Request
          </span>
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            Request a Barangay Document
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            Submit your request online. Barangay staff will review it and update
            your dashboard as it moves through processing.
          </p>
        </div>

        <RequestForm defaultType={params?.type} />
      </div>
    </section>
  );
}
