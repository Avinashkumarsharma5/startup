import { requireSupabase } from "./supabase";
import { getCurrentUser } from "./supabaseAuth";

const PROFILE_FIELDS = new Set(["name", "phone", "avatar_url", "date_of_birth", "gender", "address", "city", "state"]);

function toUiProfile(row, user) {
  if (!row) return null;
  return {
    ...row,
    uid: row.id,
    name: row.name || user?.user_metadata?.name || user?.user_metadata?.full_name || "",
    email: row.email || user?.email || "",
    phone: row.phone || "",
    profileImage: row.avatar_url || "",
    dateOfBirth: row.date_of_birth || "",
    phoneVerified: row.phone_verified || false,
  };
}

export function profileFromAuthUser(user) {
  return {
    uid: user.id,
    name: user.user_metadata?.name || user.user_metadata?.full_name || "",
    email: user.email || "",
    phone: user.phone || "",
    profileImage: user.user_metadata?.avatar_url || "",
  };
}

export async function getOrCreateUserProfile(user) {
  if (!user?.id) throw new Error("An authenticated Supabase user is required.");
  const client = requireSupabase();
  const fields = {
    id: user.id,
    name: user.user_metadata?.name || user.user_metadata?.full_name || "",
    email: user.email || "",
    phone: user.phone || null,
    avatar_url: user.user_metadata?.avatar_url || null,
  };
  const { data: existing, error: readError } = await client.from("profiles").select("*").eq("id", user.id).maybeSingle();
  if (readError) throw readError;
  if (existing) {
    const corrections = {};
    if (!existing.name && fields.name) corrections.name = fields.name;
    if (!existing.avatar_url && fields.avatar_url) corrections.avatar_url = fields.avatar_url;
    if (!existing.phone && fields.phone) corrections.phone = fields.phone;
    if (Object.keys(corrections).length) {
      const { data, error } = await client.from("profiles").update(corrections).eq("id", user.id).select("*").single();
      if (error) throw error;
      return toUiProfile(data, user);
    }
    return toUiProfile(existing, user);
  }

  // The database trigger normally creates this row. This safe fallback never writes a role.
  const { data, error } = await client.from("profiles").upsert(fields, { onConflict: "id" }).select("*").single();
  if (error) throw error;
  return toUiProfile(data, user);
}

export async function updateUserProfile(uid, changes) {
  const client = requireSupabase();
  const user = await getCurrentAuthUser();
  if (!user || user.id !== uid) throw new Error("You can only update your own profile.");
  const values = {};
  for (const [key, value] of Object.entries(changes || {})) {
    const column = key === "profileImage" ? "avatar_url" : key === "dateOfBirth" ? "date_of_birth" : key;
    if (PROFILE_FIELDS.has(column)) values[column] = value || null;
  }
  if (!Object.keys(values).length) return getOrCreateUserProfile(user);
  const { data, error } = await client.from("profiles").update({ ...values, updated_at: new Date().toISOString() }).eq("id", user.id).select("*").single();
  if (error) throw error;
  return toUiProfile(data, user);
}

export async function getCurrentAuthUser() {
  return getCurrentUser();
}
