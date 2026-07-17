import { redirect } from "next/navigation";
import { isAdminUser } from "@/lib/admin";
import { createClient } from "@/utils/supabase/server";

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (!isAdminUser(user)) {
    redirect("/");
  }

  return user;
}
