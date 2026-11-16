export const chairStatusLabels = {
  PENDING: "Pending",
  APPROVED: "Approved",
  DELIVERED: "Delivered",
  RETURNED: "Returned",
  CANCELLED: "Cancelled",
} as const;

export const chairStatusClasses = {
  PENDING: "bg-gray-100 text-gray-700",
  APPROVED: "bg-yellow-100 text-yellow-800",
  DELIVERED: "bg-blue-100 text-blue-800",
  RETURNED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-700",
} as const;

export type ChairStatusKey = keyof typeof chairStatusLabels;

export type ChairStatusLogEntry = {
  id: string;
  status: string;
  note: string | null;
  createdAt: Date;
};

export type ChairReservationUser = {
  name: string;
  email: string;
};

export type ChairFacilitatorSummary = {
  id: string;
  name: string;
  phone: string;
} | null;

export type AdminChairReservationEntry = {
  id: string;
  status: string;
  quantity: number;
  eventName: string;
  venue: string;
  borrowFrom: Date;
  borrowUntil: Date;
  contactName: string;
  contactPhone: string;
  notes: string | null;
  deliveredByNote: string | null;
  createdAt: Date;
  user: ChairReservationUser;
  facilitator: ChairFacilitatorSummary;
  statusLogs: ChairStatusLogEntry[];
};

export type ResidentChairReservationEntry = {
  id: string;
  status: string;
  quantity: number;
  eventName: string;
  venue: string;
  borrowFrom: Date;
  borrowUntil: Date;
  createdAt: Date;
  statusLogs: ChairStatusLogEntry[];
};

export const getChairStatusLabel = (status: string) =>
  status in chairStatusLabels
    ? chairStatusLabels[status as ChairStatusKey]
    : status;

export const getChairStatusClass = (status: string) =>
  status in chairStatusClasses
    ? chairStatusClasses[status as ChairStatusKey]
    : "bg-gray-100 text-gray-700";

export function formatChairDateTime(value: Date) {
  return value.toLocaleString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
