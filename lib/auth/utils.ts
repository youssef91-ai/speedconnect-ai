import { createClient } from "@/lib/supabase/client";

export interface AuthUser {
  id: string;
  email: string | undefined;
  role?: string;
}

/**
 * Sign in with email and password.
 * Returns the user on success, throws on failure.
 */
export async function signIn(
  email: string,
  password: string
): Promise<AuthUser> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  if (!data.user) throw new Error("No user returned from sign-in.");

  return {
    id: data.user.id,
    email: data.user.email,
    role: data.user.role,
  };
}

/**
 * Sign out the current user.
 */
export async function signOut(): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

/**
 * Get the currently authenticated user (client-side).
 * Returns null if not authenticated.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
}
