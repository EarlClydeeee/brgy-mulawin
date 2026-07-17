import { getStatusInstruction } from "@/lib/status-instructions";
import { getStatusLabel } from "@/app/admin/requests/_constants";

type RequestStatusAlertProps = {
  status: string;
};

export function RequestStatusAlert({ status }: RequestStatusAlertProps) {
  const isActionable = status === "UNDER_REVIEW" || status === "FOR_PICKUP";

  return (
    <div
      className={`rounded-2xl border px-4 py-3 ${
        isActionable
          ? "border-blue-200 bg-blue-50"
          : "border-green-200 bg-green-50"
      }`}
    >
      <p
        className={`text-sm font-semibold ${
          isActionable ? "text-blue-800" : "text-green-800"
        }`}
      >
        Status update: {getStatusLabel(status)}
      </p>
      <p
        className={`mt-1 text-sm ${
          isActionable ? "text-blue-700" : "text-green-700"
        }`}
      >
        {getStatusInstruction(status)}
      </p>
    </div>
  );
}
