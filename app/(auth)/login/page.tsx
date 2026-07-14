import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login — Barangay Mulawin",
  description: "Sign in to your Barangay Mulawin resident account.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ checkEmail?: string }>;
}) {
  const { checkEmail } = await searchParams;

  return <LoginForm showCheckEmailNotice={checkEmail === "1"} />;
}
