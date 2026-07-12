export const documentLabels = {
  BARANGAY_CLEARANCE: "Barangay Clearance",
  CERTIFICATE_OF_RESIDENCY: "Certificate of Residency",
  CERTIFICATE_OF_INDIGENCY: "Certificate of Indigency",
  BUSINESS_PERMIT: "Barangay Business Permit",
};

export type DocumentTypeKey = keyof typeof documentLabels;

export const getDocumentLabel = (type: string) =>
  type in documentLabels
    ? documentLabels[type as DocumentTypeKey]
    : type;

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

export type StatusLogEntry = {
  id: string;
  status: string;
  createdAt: Date;
};

export type RequestUser = {
  name: string;
  email: string;
};

export type AdminRequestEntry = {
  id: string;
  status: string;
  type: string;
  fullName: string;
  birthday: Date;
  address: string;
  purpose: string;
  details: string | null;
  createdAt: Date;
  user: RequestUser;
  statusLogs: StatusLogEntry[];
};

export type ResidentRequestEntry = {
  id: string;
  status: string;
  type: string;
  purpose: string;
  details: string | null;
  createdAt: Date;
  statusLogs: StatusLogEntry[];
};

export const getStatusLabel = (status: string) =>
  status in statusLabels
    ? statusLabels[status as RequestStatusKey]
    : status;

export const getStatusClass = (status: string) =>
  status in statusClasses
    ? statusClasses[status as RequestStatusKey]
    : "bg-gray-100 text-gray-700";

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
