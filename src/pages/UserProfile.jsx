import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, Bell, LogOut, MapPin, Save, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { getOrCreateUserProfile, updateUserProfile } from "../lib/profile";
import { signOut, subscribeToAuthState } from "../lib/supabaseAuth";

const EMPTY_FORM = { name: "", phone: "", dateOfBirth: "", gender: "", address: "", city: "", state: "" };

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    const unsubscribe = subscribeToAuthState(async (_event, session) => {
      const authUser = session?.user;
      if (!authUser) {
        if (active) {
          setLoading(false);
          navigate("/login", { replace: true });
        }
        return;
      }

      try {
        const profile = await getOrCreateUserProfile(authUser);
        if (!active) return;
        setUser(profile);
        setForm({
          name: profile.name || "",
          phone: profile.phone || "",
          dateOfBirth: profile.dateOfBirth || "",
          gender: profile.gender || "",
          address: profile.address || "",
          city: profile.city || "",
          state: profile.state || "",
        });
      } catch (error) {
        console.error("Profile loading failed:", error);
        if (active) toast.error("Could not load your profile. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [navigate]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    if (!user?.uid) return;
    if (form.phone && !/^\+?[0-9\s()-]{7,18}$/.test(form.phone)) {
      toast.error("Enter a valid phone number.");
      return;
    }

    setSaving(true);
    try {
      const updated = await updateUserProfile(user.uid, form);
      setUser((current) => ({ ...current, ...updated }));
      toast.success("Profile saved.");
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error(error.message || "Could not save your profile.");
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    try {
      await signOut();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Could not log out. Please try again.");
    }
  };

  if (loading) {
    return <main className="min-h-[60vh] grid place-items-center bg-[#FAF9F6]"><p className="text-sm text-stone-600">Loading your profile…</p></main>;
  }

  if (!user) return null;

  const initials = (user.name || user.email || "S").trim().charAt(0).toUpperCase();
  const fields = [
    { name: "name", label: "Full name", autoComplete: "name", required: true },
    { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
    { name: "dateOfBirth", label: "Date of birth", type: "date" },
    { name: "gender", label: "Gender" },
    { name: "city", label: "City", autoComplete: "address-level2" },
    { name: "state", label: "State", autoComplete: "address-level1" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-[#FAF9F6] to-white px-4 pb-16 pt-24">
      <div className="mx-auto max-w-4xl">
        <header className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-amber-100">
          <div className="h-28 bg-gradient-to-r from-[#800000] via-[#9a2c1d] to-amber-500" />
          <div className="flex flex-col gap-4 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="-mt-10 flex items-end gap-4">
              {user.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="h-20 w-20 rounded-2xl border-4 border-white bg-white object-cover shadow" />
              ) : (
                <div className="grid h-20 w-20 place-items-center rounded-2xl border-4 border-white bg-amber-100 text-3xl font-bold text-[#800000] shadow">{initials}</div>
              )}
              <div className="pb-1">
                <h1 className="text-2xl font-bold text-[#5C1A16]">My profile</h1>
                <p className="text-sm text-stone-600">{user.email || "Email not available"}</p>
              </div>
            </div>
            <span className="w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800">{String(user.role || "CUSTOMER").replaceAll("_", " ")}</span>
          </div>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-100 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100 text-amber-800"><UserRound className="h-5 w-5" /></div>
              <div><h2 className="font-semibold text-stone-900">Personal information</h2><p className="text-sm text-stone-500">Keep your contact and address details up to date.</p></div>
            </div>

            <form onSubmit={saveProfile} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {fields.map((field) => (
                  <label key={field.name} className="block text-sm font-medium text-stone-700">
                    {field.label}{field.required && <span className="ml-1 text-red-600">*</span>}
                    <input
                      name={field.name}
                      type={field.type || "text"}
                      value={form[field.name] || ""}
                      onChange={updateField}
                      autoComplete={field.autoComplete}
                      required={field.required}
                      className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                    />
                  </label>
                ))}
                <label className="block text-sm font-medium text-stone-700 sm:col-span-2">
                  Address
                  <textarea name="address" value={form.address || ""} onChange={updateField} rows={3} autoComplete="street-address" className="mt-1.5 w-full resize-y rounded-xl border border-stone-200 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100" />
                </label>
                <label className="block text-sm font-medium text-stone-700 sm:col-span-2">
                  Email
                  <input type="email" value={user.email || ""} readOnly className="mt-1.5 w-full cursor-not-allowed rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-3 text-sm text-stone-500" />
                  <span className="mt-1 block text-xs font-normal text-stone-500">Email is managed by your sign-in provider.</span>
                </label>
              </div>
              <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#800000] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#650000] disabled:cursor-wait disabled:opacity-60">
                <Save className="h-4 w-4" />{saving ? "Saving…" : "Save profile"}
              </button>
            </form>
          </section>

          <aside className="space-y-3">
            <Link to="/bookingspage" className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-100 transition hover:ring-amber-300">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-50 text-[#800000]"><CalendarDays className="h-5 w-5" /></span>
              <span><strong className="block text-sm text-stone-900">My bookings</strong><small className="text-stone-500">View and manage requests</small></span>
            </Link>
            <Link to="/notifications" className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-100 transition hover:ring-amber-300">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-800"><Bell className="h-5 w-5" /></span>
              <span><strong className="block text-sm text-stone-900">Notifications</strong><small className="text-stone-500">Booking and account updates</small></span>
            </Link>
            <Link to="/vendor-registration" className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-100 transition hover:ring-amber-300">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-orange-800"><MapPin className="h-5 w-5" /></span>
              <span><strong className="block text-sm text-stone-900">Become a partner</strong><small className="text-stone-500">Register your services</small></span>
            </Link>
            <button type="button" onClick={logout} className="flex w-full items-center gap-3 rounded-2xl border border-red-100 bg-white p-4 text-left text-red-700 shadow-sm transition hover:bg-red-50">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-red-50"><LogOut className="h-5 w-5" /></span>
              <span><strong className="block text-sm">Sign out</strong><small className="text-red-500">Sign out of this account</small></span>
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
