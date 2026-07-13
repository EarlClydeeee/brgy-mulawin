import { isAdminUser } from "@/lib/admin";
import { createClient } from "@/utils/supabase/server";

export type AuthNavState = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  email: string | null;
};

export async function getAuthNavState(): Promise<AuthNavState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    isAuthenticated: Boolean(user),
    isAdmin: isAdminUser(user),
    email: user?.email ?? null,
  };
}
