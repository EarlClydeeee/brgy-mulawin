"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { isAdminUser } from "@/lib/admin";
import { getSafeResidentReturnPath } from "@/lib/auth-redirects";
import { siteUrl } from "@/lib/site";
import { syncUserToDatabase } from "@/lib/sync-user";
import { createClient } from "@/utils/supabase/server";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const passwordResetSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

const newPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type AuthActionState = {
  error?: string;
  success?: string;
};

async function getPasswordResetOrigin() {
  if (process.env.NODE_ENV === "production") {
    return siteUrl;
  }

  const requestHeaders = await headers();
  return `http://${requestHeaders.get("host") ?? "localhost:3000"}`;
}

export async function login(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid login details." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: error.message };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email) {
    await syncUserToDatabase({
      id: user.id,
      email: user.email,
      name:
        typeof user.user_metadata.name === "string"
          ? user.user_metadata.name
          : parsed.data.email,
    });
  }

  revalidatePath("/", "layout");
  if (isAdminUser(user)) {
    redirect("/admin/requests");
  }

  redirect(getSafeResidentReturnPath(formData.get("redirectedFrom")?.toString()) ?? "/dashboard");
}

export async function register(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid registration details.",
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        name: parsed.data.name,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (!data.user) {
    return { error: "Registration did not return a user account." };
  }

  await syncUserToDatabase({
    id: data.user.id,
    name: parsed.data.name,
    email: parsed.data.email,
  });

  if (data.session) {
    try {
      await supabase.auth.signOut();
    } catch (signOutError) {
      console.error("Failed to sign out after registration:", signOutError);
    }
  }

  revalidatePath("/", "layout");
  redirect("/login?checkEmail=1");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/login");
}

export async function requestPasswordReset(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = passwordResetSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Enter a valid email address.",
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(
      parsed.data.email,
      {
        redirectTo: `${await getPasswordResetOrigin()}/auth/callback?next=/reset-password`,
      },
    );

    if (error) {
      console.error("Failed to request password reset:", error);
    }
  } catch (error) {
    console.error("Failed to request password reset:", error);
  }

  return {
    success:
      "If an account matches that email, we sent password reset instructions.",
  };
}

export async function updatePassword(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = newPasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Please review your password.",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Your recovery session has expired. Request a new link." };
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    return { error: "We could not update your password. Request a new link." };
  }

  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login?passwordReset=1");
}
