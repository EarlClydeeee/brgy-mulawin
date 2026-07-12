import type { User } from "@supabase/supabase-js";

export const isAdminUser = (user: User | null): boolean =>
  user?.app_metadata?.role === "admin";
