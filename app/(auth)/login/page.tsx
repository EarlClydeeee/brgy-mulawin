import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login — Barangay Mulawin",
  description: "Sign in to your Barangay Mulawin resident account.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    checkEmail?: string;
    passwordReset?: string;
    redirectedFrom?: string;
  }>;
}) {
  const { checkEmail, passwordReset, redirectedFrom } = await searchParams;

  return (
    <LoginForm
      showCheckEmailNotice={checkEmail === "1"}
      showPasswordResetNotice={passwordReset === "1"}
      redirectedFrom={redirectedFrom}
    />
  );
}
