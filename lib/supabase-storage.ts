import { createClient as createSupabaseServiceClient } from "@supabase/supabase-js";
import { createClient as createSupabaseServerClient } from "@/utils/supabase/server";

export const POST_IMAGES_BUCKET = "post-images";
export const REQUEST_DRAFTS_BUCKET = "request-drafts";

export async function getStorageClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && serviceKey) {
    return createSupabaseServiceClient(url, serviceKey);
  }

  return createSupabaseServerClient();
}

export function getServiceStorageClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Private document storage is not configured. Set SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  return createSupabaseServiceClient(url, serviceKey);
}

export function isStorageConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
}
