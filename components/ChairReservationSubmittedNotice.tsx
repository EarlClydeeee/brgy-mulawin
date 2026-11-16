"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

export function ChairReservationSubmittedNotice() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 6000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
      <div className="flex items-start gap-3">
        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
        <div>
          <p className="font-semibold">Chair reservation submitted</p>
          <p className="mt-1 text-green-700">
            Barangay staff will review your request and update the status here.
          </p>
        </div>
      </div>
    </div>
  );
}
