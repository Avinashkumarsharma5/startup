import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { requireSupabase } from "../lib/supabase";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.length < 8) return toast.error("Use at least 8 characters for your password.");
    if (password !== confirmPassword) return toast.error("Passwords do not match.");
    setLoading(true);
    try {
      const { error } = await requireSupabase().auth.updateUser({ password });
      if (error) throw error;
      await requireSupabase().auth.signOut();
      toast.success("Password updated. Sign in with your new password.");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Password update failed:", error);
      toast.error(error.message || "Password could not be updated. Request a new reset link.");
    } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5 rounded-3xl border border-orange-100 bg-white p-8 shadow-xl">
        <div><h1 className="text-2xl font-bold text-[#7A1A1A]">Set a new password</h1><p className="mt-2 text-sm text-slate-600">Choose a new password for your Sanskaraa account.</p></div>
        <label className="block text-sm font-medium text-slate-700">New password<input required minLength={8} type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
        <label className="block text-sm font-medium text-slate-700">Confirm new password<input required minLength={8} type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
        <button disabled={loading} className="w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white disabled:opacity-60">{loading ? "Updating..." : "Update password"}</button>
      </form>
    </main>
  );
}
