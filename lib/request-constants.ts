export const documentTypes = [
  "BARANGAY_CLEARANCE",
  "CERTIFICATE_OF_RESIDENCY",
  "CERTIFICATE_OF_INDIGENCY",
  "BUSINESS_PERMIT",
] as const;

export const requestStatuses = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "FOR_PICKUP",
  "RELEASED",
] as const;

export type RequestStatus = (typeof requestStatuses)[number];

export const allowedRequestStatusTransitions: Record<
  RequestStatus,
  RequestStatus[]
> = {
  SUBMITTED: ["UNDER_REVIEW"],
  UNDER_REVIEW: ["FOR_PICKUP"],
  FOR_PICKUP: ["RELEASED"],
  RELEASED: [],
};

export function getAllowedNextStatuses(status: string): RequestStatus[] {
  return allowedRequestStatusTransitions[status as RequestStatus] ?? [];
}
