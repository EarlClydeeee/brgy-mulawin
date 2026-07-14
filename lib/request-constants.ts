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

export const adminUpdateStatuses = ["UNDER_REVIEW", "FOR_PICKUP"] as const;

export type AdminUpdateStatus = (typeof adminUpdateStatuses)[number];
