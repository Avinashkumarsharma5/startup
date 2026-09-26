import React, { useEffect, useState } from "react";
import { CalendarCheck, Check, Clock3, LogOut, RefreshCw, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  auth,
  collection,
  db,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  writeBatch,
  where,
  signOut,
} from "../lib/firebase";

export default function VendorDashboard() {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [workingId, setWorkingId] = useState("");

  const loadDashboard = async () => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    setLoading(true);
    setError("");
    try {
      const profileSnapshot = await getDoc(doc(db, "users", user.uid));
      const profile = profileSnapshot.data();
      if (profile?.role !== "VENDOR" || profile?.vendorStatus !== "APPROVED") {
        setVendor(profile || null);
        setBookings([]);
        return;
      }

      const vendorSnapshot = await getDoc(doc(db, "vendors", user.uid));
      setVendor({ ...profile, ...vendorSnapshot.data(), uid: user.uid });
      const bookingSnapshot = await getDocs(
        query(collection(db, "bookings"), where("vendorId", "==", user.uid))
      );
      const results = bookingSnapshot.docs
        .map((item) => ({ id: item.id, ...item.data() }))
        .sort((a, b) => {
          const left = a.createdAt?.seconds || 0;
          const right = b.createdAt?.seconds || 0;
          return right - left;
        });
      setBookings(results);
    } catch (loadError) {
      console.error("Could not load vendor dashboard:", loadError);
      setError(loadError.message || "Unable to load assigned bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const updateBookingStatus = async (booking, status) => {
    setWorkingId(booking.id);
    try {
      const changes = {
        bookingStatus: status,
        status,
        updatedAt: serverTimestamp(),
      };
      const batch = writeBatch(db);
      batch.update(doc(db, "bookings", booking.id), changes);
      if (booking.customerId || booking.userId) {
        batch.update(
          doc(db, "users", booking.customerId || booking.userId, "bookings", booking.id),
          changes
        );
      }
      await batch.commit();
      setBookings((current) => current.map((item) =>
        item.id === booking.id
          ? { ...item, bookingStatus: status, status }
          : item
      ));
      toast.success(`Booking ${status.toLowerCase().replaceAll("_", " ")}.`);
    } catch (updateError) {
      console.error("Could not update assigned booking:", updateError);
      toast.error(updateError.message || "Booking could not be updated.");
    } finally {
      setWorkingId("");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("loggedInUser");
      navigate("/login", { replace: true });
    } catch (logoutError) {
      console.error("Vendor logout failed:", logoutError);
      toast.error("Could not log out.");
    }
  };

  if (loading) return <main className="min-h-screen bg-[#FFF9F2] p-8">Loading vendor dashboard...</main>;

  if (!vendor || vendor.role !== "VENDOR" || vendor.vendorStatus !== "APPROVED") {
    const status = vendor?.vendorStatus || "NOT APPROVED";
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFF9F2] p-5">
        <section className="max-w-lg rounded-3xl border border-amber-200 bg-white p-8 text-center shadow-sm">
          <Clock3 className="mx-auto h-10 w-10 text-amber-600" />
          <h1 className="mt-4 text-2xl font-bold text-[#7A1A1A]">Vendor access {status === "PENDING" ? "pending" : "not available"}</h1>
          <p className="mt-3 text-slate-600">
            {status === "PENDING"
              ? "Your application is awaiting admin approval. Dashboard access will open after approval."
              : status === "REJECTED"
                ? "Your vendor application was not approved. Please contact Sanskaraa support."
                : "Complete your vendor application and wait for admin approval to access this dashboard."}
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <button type="button" onClick={() => navigate("/vendor-registration")} className="rounded-full bg-[#7A1A1A] px-4 py-2 text-sm font-semibold text-white">Vendor application</button>
            <button type="button" onClick={logout} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold">Logout</button>
          </div>
        </section>
      </main>
    );
  }

  const pendingCount = bookings.filter((booking) => booking.bookingStatus === "PENDING").length;
  const activeCount = bookings.filter((booking) => ["ACCEPTED", "IN_PROGRESS"].includes(booking.bookingStatus)).length;
  const completedCount = bookings.filter((booking) => booking.bookingStatus === "COMPLETED").length;

  return (
    <main className="min-h-screen bg-[#FFF9F2] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E8D19B] bg-white p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A24D]">Approved Service Partner</p>
            <h1 className="mt-1 text-2xl font-bold text-[#7A1A1A]">{vendor.name || vendor.businessName || "Vendor Dashboard"}</h1>
            <p className="mt-1 text-sm text-slate-600">{vendor.vendorType || "Vendor"} · {vendor.location || "Location not set"}</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={loadDashboard} className="rounded-full border border-slate-200 p-2" aria-label="Refresh"><RefreshCw className="h-4 w-4" /></button>
            <button type="button" onClick={logout} className="inline-flex items-center gap-2 rounded-full bg-[#7A1A1A] px-4 py-2 text-sm font-semibold text-white"><LogOut className="h-4 w-4" /> Logout</button>
          </div>
        </header>

        <section className="mb-6 grid gap-4 sm:grid-cols-3">
          {[
            ["Pending Requests", pendingCount],
            ["Active Bookings", activeCount],
            ["Completed Bookings", completedCount],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-[#E8D19B] bg-white p-5">
              <p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold text-[#7A1A1A]">{value}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-[#E8D19B] bg-white p-5">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#7A1A1A]"><CalendarCheck className="h-5 w-5" /> Assigned Bookings</h2>
          {error && <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</div>}
          {bookings.length ? (
            <div className="space-y-3">
              {bookings.map((booking) => (
                <article key={booking.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div>
                    <h3 className="font-semibold">{booking.event || booking.service || "Service booking"}</h3>
                    <p className="mt-1 text-sm text-slate-600">{booking.date || "Date not set"}{booking.time ? ` · ${booking.time}` : ""}</p>
                    <p className="mt-1 text-xs text-slate-500">Booking {booking.id} · {booking.bookingStatus || "PENDING"}</p>
                  </div>
                  {booking.bookingStatus === "PENDING" && (
                    <div className="flex gap-2">
                      <button type="button" disabled={workingId === booking.id} onClick={() => updateBookingStatus(booking, "ACCEPTED")} className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"><Check className="h-4 w-4" /> Accept</button>
                      <button type="button" disabled={workingId === booking.id} onClick={() => updateBookingStatus(booking, "REJECTED")} className="inline-flex items-center gap-1 rounded-full bg-red-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"><X className="h-4 w-4" /> Reject</button>
                    </div>
                  )}
                  {booking.bookingStatus === "ACCEPTED" && <button type="button" disabled={workingId === booking.id} onClick={() => updateBookingStatus(booking, "COMPLETED")} className="rounded-full bg-[#7A1A1A] px-3 py-2 text-xs font-semibold text-white">Mark complete</button>}
                </article>
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-slate-50 p-5 text-sm text-slate-500">No bookings have been assigned to your account yet.</p>
          )}
        </section>
      </div>
    </main>
  );
}
