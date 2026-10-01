import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw, Save, Search, Shield } from "lucide-react";
import toast from "react-hot-toast";
import { requireSupabase } from "../lib/supabase";
import { subscribeToAuthState } from "../lib/supabaseAuth";
import { getCurrentUserProfile, normalizeRole } from "../lib/roleAccess";

const ROLES = ["CUSTOMER", "VENDOR", "PANDIT", "STAFF", "ADMIN", "SUPER_ADMIN"];

export default function AdminUsers() {
  const [profile, setProfile] = useState(null);
  const [users, setUsers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [draftRoles, setDraftRoles] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const currentProfile = await getCurrentUserProfile();
      setProfile(currentProfile);
      if (normalizeRole(currentProfile?.role) !== "SUPER_ADMIN") {
        throw new Error("SUPER_ADMIN privileges are required to manage account roles.");
      }
      const client = requireSupabase();
      const [usersResult, auditResult] = await Promise.all([
        client.from("profiles").select("id,name,email,role,created_at").order("created_at", { ascending: false }).limit(500),
        client.from("audit_logs").select("id,actor_user_id,target_user_id,old_role,new_role,action,metadata,created_at").order("created_at", { ascending: false }).limit(100),
      ]);
      if (usersResult.error) throw usersResult.error;
      if (auditResult.error) throw auditResult.error;
      setUsers(usersResult.data || []);
      setAuditLogs(auditResult.data || []);
      setDraftRoles(Object.fromEntries((usersResult.data || []).map((row) => [row.id, row.role])));
    } catch (cause) {
      console.error("Could not load user roles:", cause);
      setError(cause.message || "User roles could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState(() => { void loadUsers(); });
    return unsubscribe;
  }, [loadUsers]);

  const filteredUsers = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return users;
    return users.filter((user) => [user.name, user.email, user.id, user.role].some((item) => String(item || "").toLowerCase().includes(value)));
  }, [search, users]);

  const saveRole = async (user) => {
    const newRole = draftRoles[user.id];
    if (!newRole || newRole === user.role) return;
    if ((newRole === "SUPER_ADMIN" || user.role === "SUPER_ADMIN")
      && !window.confirm(`Change ${user.email || user.id} from ${user.role} to ${newRole}? This is a privileged role change and will be recorded.`)) return;
    setSavingId(user.id);
    try {
      const { data, error: rpcError } = await requireSupabase().rpc("manage_profile_role", {
        p_target_user_id: user.id,
        p_new_role: newRole,
      });
      if (rpcError) throw rpcError;
      setUsers((current) => current.map((row) => row.id === user.id ? { ...row, role: data.role } : row));
      toast.success(`Role updated to ${data.role}.`);
    } catch (cause) {
      console.error("Role change failed:", cause);
      toast.error(cause.message || "Role change was rejected.");
      setDraftRoles((current) => ({ ...current, [user.id]: user.role }));
    } finally {
      setSavingId("");
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF9F2] px-4 pb-12 pt-24 text-slate-800 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C19A6B]">{normalizeRole(profile?.role) || "SUPER_ADMIN"}</p><h1 className="text-3xl font-bold text-[#7A1A1A]">User role management</h1><p className="mt-1 text-sm text-slate-600">Role changes are verified and audited by Supabase.</p></div>
          <button type="button" onClick={() => void loadUsers()} disabled={loading} className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-[#7A1A1A] disabled:opacity-60"><RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh</button>
        </header>

        <section className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm font-medium"><Shield className="h-4 w-4 text-amber-700" /> {users.length} accounts</p>
            <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2"><Search className="h-4 w-4 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email, ID, or role" className="min-w-0 text-sm outline-none sm:w-72" /></label>
          </div>
          {error && <div role="alert" className="m-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</div>}
          {loading ? <p className="p-8 text-center text-sm text-slate-500">Loading users…</p> : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">User</th><th className="px-4 py-3">User ID</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Action</th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((user) => <tr key={user.id}>
                    <td className="px-4 py-3"><p className="font-semibold">{user.name || "Unnamed user"}</p><p className="text-xs text-slate-500">{user.email}</p></td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{user.id}</td>
                    <td className="px-4 py-3"><select aria-label={`Role for ${user.email || user.id}`} value={draftRoles[user.id] || user.role} onChange={(event) => setDraftRoles((current) => ({ ...current, [user.id]: event.target.value }))} className="rounded-lg border border-slate-200 bg-white px-3 py-2">{ROLES.map((role) => <option key={role} value={role}>{role}</option>)}</select></td>
                    <td className="px-4 py-3"><button type="button" disabled={savingId === user.id || draftRoles[user.id] === user.role} onClick={() => void saveRole(user)} className="flex items-center gap-2 rounded-lg bg-[#7A1A1A] px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"><Save className="h-3.5 w-3.5" /> {savingId === user.id ? "Saving…" : "Save role"}</button></td>
                  </tr>)}
                  {!filteredUsers.length && <tr><td colSpan={4} className="p-8 text-center text-slate-500">No users match this search.</td></tr>}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-4"><h2 className="font-semibold text-[#7A1A1A]">Privileged role audit log</h2><p className="mt-1 text-xs text-slate-500">Latest 100 role changes.</p></div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">When</th><th className="px-4 py-3">Actor</th><th className="px-4 py-3">Target</th><th className="px-4 py-3">Change</th><th className="px-4 py-3">Action</th></tr></thead>
              <tbody className="divide-y divide-slate-100">{auditLogs.map((entry) => <tr key={entry.id}><td className="px-4 py-3">{new Date(entry.created_at).toLocaleString("en-IN")}</td><td className="px-4 py-3 font-mono text-xs">{entry.actor_user_id || "SQL Editor/bootstrap"}</td><td className="px-4 py-3 font-mono text-xs">{entry.target_user_id || "Deleted account"}</td><td className="px-4 py-3">{entry.old_role || "—"} → <b>{entry.new_role || "—"}</b></td><td className="px-4 py-3">{entry.action}</td></tr>)}{!auditLogs.length && <tr><td colSpan={5} className="p-6 text-center text-slate-500">No role changes recorded.</td></tr>}</tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
