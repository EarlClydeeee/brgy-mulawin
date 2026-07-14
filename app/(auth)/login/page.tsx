import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login — Barangay Mulawin",
  description: "Sign in to your Barangay Mulawin resident account.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginForm />}>
      <LoginForm />
    </Suspense>
  );
}
