import { redirect } from "next/navigation";
import ResetPasswordForm from "./ResetPasswordForm";
import { createClient } from "@/utils/supabase/server";

export const metadata = {
  title: "Choose a New Password — Barangay Mulawin",
  description: "Set a new password for your Barangay Mulawin account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ResetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/forgot-password");
  }

  return <ResetPasswordForm />;
}
