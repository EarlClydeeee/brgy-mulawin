export const statusInstructions: Record<string, string> = {
  SUBMITTED:
    "Your request has been received. Barangay staff will review it soon.",
  UNDER_REVIEW:
    "Your request is being reviewed by barangay staff. Please check back for updates.",
  FOR_PICKUP:
    "Your document is ready for pickup at the barangay hall. Please bring a valid ID.",
  RELEASED:
    "Your document has been released. Thank you for using our online service.",
};

export function getStatusInstruction(status: string) {
  return statusInstructions[status] ?? "Track your request status below.";
}
