import ForgotPasswordForm from "./ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password — Barangay Mulawin",
  description: "Request a password reset for your Barangay Mulawin account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return <ForgotPasswordForm showRecoveryError={error === "recovery"} />;
}
