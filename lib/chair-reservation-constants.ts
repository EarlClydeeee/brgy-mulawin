export const chairReservationStatuses = [
  "PENDING",
  "APPROVED",
  "DELIVERED",
  "RETURNED",
  "CANCELLED",
] as const;

export type ChairReservationStatus =
  (typeof chairReservationStatuses)[number];

export const stockHoldingStatuses: ChairReservationStatus[] = [
  "APPROVED",
  "DELIVERED",
];

export const allowedChairReservationStatusTransitions: Record<
  ChairReservationStatus,
  ChairReservationStatus[]
> = {
  PENDING: ["APPROVED", "CANCELLED"],
  APPROVED: ["DELIVERED", "CANCELLED"],
  DELIVERED: ["RETURNED"],
  RETURNED: [],
  CANCELLED: [],
};

export function getAllowedNextChairStatuses(
  status: string,
): ChairReservationStatus[] {
  return (
    allowedChairReservationStatusTransitions[
      status as ChairReservationStatus
    ] ?? []
  );
}

export function rangesOverlap(
  fromA: Date,
  untilA: Date,
  fromB: Date,
  untilB: Date,
): boolean {
  return fromA < untilB && untilA > fromB;
}
