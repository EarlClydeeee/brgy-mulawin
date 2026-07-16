-- Stores the private Supabase Storage path to the admin-review DOCX draft.
ALTER TABLE "DocumentRequest" ADD COLUMN "draftDocPath" TEXT;
