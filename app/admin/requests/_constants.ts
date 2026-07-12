export const documentLabels = {
  BARANGAY_CLEARANCE: "Barangay Clearance",
  CERTIFICATE_OF_RESIDENCY: "Certificate of Residency",
  CERTIFICATE_OF_INDIGENCY: "Certificate of Indigency",
  BUSINESS_PERMIT: "Barangay Business Permit",
};

export const statusLabels = {
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
  FOR_PICKUP: "For Pickup",
  NEEDS_REVISION: "Needs Revision",
  REJECTED: "Rejected",
  RELEASED: "Released",
};

export const statusClasses = {
  SUBMITTED: "bg-gray-100 text-gray-700",
  UNDER_REVIEW: "bg-yellow-100 text-yellow-700",
  FOR_PICKUP: "bg-blue-100 text-blue-700",
  NEEDS_REVISION: "bg-orange-100 text-orange-700",
  REJECTED: "bg-red-100 text-red-700",
  RELEASED: "bg-green-100 text-green-700",
};

export type RequestStatusKey = keyof typeof statusLabels;

export const getAge = (birthday: Date) => {
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const hasBirthdayPassed =
    today.getMonth() > birthday.getMonth() ||
    (today.getMonth() === birthday.getMonth() &&
      today.getDate() >= birthday.getDate());

  if (!hasBirthdayPassed) {
    age -= 1;
  }

  return age;
};
