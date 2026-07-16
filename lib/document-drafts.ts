import { readFile } from "node:fs/promises";
import path from "node:path";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import type { DocumentRequest, DocumentType, User } from "@prisma/client";
import {
  getServiceStorageClient,
  REQUEST_DRAFTS_BUCKET,
} from "@/lib/supabase-storage";

type DraftRequest = Pick<
  DocumentRequest,
  | "id"
  | "type"
  | "fullName"
  | "birthday"
  | "address"
  | "purpose"
  | "details"
  | "createdAt"
> & {
  user: Pick<User, "email">;
};

const templateByDocumentType: Record<DocumentType, string> = {
  BARANGAY_CLEARANCE: "barangay-clearance.docx",
  CERTIFICATE_OF_RESIDENCY: "certificate-of-residency.docx",
  CERTIFICATE_OF_INDIGENCY: "certificate-of-indigency.docx",
  BUSINESS_PERMIT: "business-permit.docx",
};

const documentLabels: Record<DocumentType, string> = {
  BARANGAY_CLEARANCE: "Barangay Clearance",
  CERTIFICATE_OF_RESIDENCY: "Certificate of Residency",
  CERTIFICATE_OF_INDIGENCY: "Certificate of Indigency",
  BUSINESS_PERMIT: "Barangay Business Permit",
};

function getAge(birthday: Date) {
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
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-PH", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function toFileNamePart(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function getDraftFileName(request: DraftRequest) {
  const templateName = toFileNamePart(
    templateByDocumentType[request.type].replace(/\.docx$/i, ""),
  );
  const applicantName = toFileNamePart(request.fullName) || "Applicant";
  const requestDate = request.createdAt.toISOString().slice(0, 10);

  return `${templateName}-${applicantName}-${requestDate}.docx`;
}

async function createDraftBuffer(request: DraftRequest) {
  const templatePath = path.join(
    process.cwd(),
    "templates",
    templateByDocumentType[request.type],
  );
  const template = await readFile(templatePath);
  const zip = new PizZip(template);
  const document = new Docxtemplater(zip, {
    delimiters: {
      start: "{{",
      end: "}}",
    },
    linebreaks: true,
    paragraphLoop: true,
  });

  document.render({
    fullName: request.fullName,
    birthday: formatDate(request.birthday),
    age: getAge(request.birthday),
    address: request.address,
    purpose: request.purpose,
    details: request.details?.trim() || "None provided",
    submittedDate: formatDate(request.createdAt),
    documentType: documentLabels[request.type],
    applicantEmail: request.user.email,
  });

  return document.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });
}

export async function generateAndUploadDraft(request: DraftRequest) {
  const buffer = await createDraftBuffer(request);
  const storage = getServiceStorageClient();
  const storagePath = `${request.id}/${getDraftFileName(request)}`;
  const { error } = await storage.storage
    .from(REQUEST_DRAFTS_BUCKET)
    .upload(storagePath, buffer, {
      contentType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      upsert: true,
    });

  if (error) {
    throw new Error(`Unable to upload document draft: ${error.message}`);
  }

  return storagePath;
}

export async function createDraftDownloadUrl(storagePath: string) {
  const storage = getServiceStorageClient();
  const { data, error } = await storage.storage
    .from(REQUEST_DRAFTS_BUCKET)
    .createSignedUrl(storagePath, 60, {
      download: path.basename(storagePath),
    });

  if (error || !data?.signedUrl) {
    throw new Error(
      `Unable to create document download link: ${error?.message ?? "Unknown error"}`,
    );
  }

  return data.signedUrl;
}
