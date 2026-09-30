import { requireSupabase } from "./supabase";

export async function signUpWithEmail({ name, email, password, redirectTo = `${window.location.origin}/auth` }) {
  const client = requireSupabase();
  const { data, error } = await client.auth.signUp({
    email: email.trim(),
    password,
    options: { emailRedirectTo: redirectTo, data: { name: name.trim() } },
  });
  if (error) throw error;
  return data;
}

export async function signInWithEmail({ email, password }) {
  const { data, error } = await requireSupabase().auth.signInWithPassword({ email: email.trim(), password });
  if (error) throw error;
  return data;
}

export async function signInWithGoogle(redirectTo = window.location.origin) {
  const { data, error } = await requireSupabase().auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await requireSupabase().auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email, redirectTo = `${window.location.origin}/reset-password`) {
  const { error } = await requireSupabase().auth.resetPasswordForEmail(email.trim(), { redirectTo });
  if (error) throw error;
}

export async function getCurrentUser() {
  const client = requireSupabase();
  // getUser() rejects with AuthSessionMissingError for a normal signed-out
  // visitor. Check local/session storage first so anonymous pages stay quiet.
  const { data: sessionData, error: sessionError } = await client.auth.getSession();
  if (sessionError) throw sessionError;
  if (!sessionData.session) return null;

  const { data, error } = await client.auth.getUser();
  if (error) throw error;
  return data.user || null;
}

export async function getCurrentProfile() {
  const client = requireSupabase();
  const user = await getCurrentUser();
  if (!user) return null;
  const { data, error } = await client.from("profiles").select("*").eq("id", user.id).single();
  if (error) throw error;
  return data;
}

export function subscribeToAuthState(callback) {
  const { data } = requireSupabase().auth.onAuthStateChange((event, session) => {
    queueMicrotask(() => callback(event, session));
  });
  return () => data.subscription.unsubscribe();
}
