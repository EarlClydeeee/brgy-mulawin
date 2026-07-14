"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { isAdminUser } from "@/lib/admin";
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

export type AuthActionState = {
  error?: string;
};

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

  redirect("/dashboard");
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
