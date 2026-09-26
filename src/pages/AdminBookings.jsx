import React, { useEffect, useState } from "react";
import { CalendarCheck, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { collection, db, getDocs, doc, getDoc, writeBatch, serverTimestamp } from "../lib/firebase";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const [bookingSnapshot, vendorSnapshot] = await Promise.all([
        getDocs(collection(db, "bookings")),
        getDocs(collection(db, "vendors")),
      ]);
      setBookings(bookingSnapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
      setVendors(vendorSnapshot.docs
        .map((item) => ({ id: item.id, ...item.data() }))
        .filter((vendor) => vendor.status === "APPROVED"));
    } catch (error) {
      console.error("Unable to load admin bookings:", error);
      toast.error("Bookings could not be loaded. Check administrator permissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const assignVendor = async (booking, vendorId) => {
    if (!vendorId) return;
    const vendor = vendors.find((item) => item.id === vendorId);
    if (!vendor) return;

    setSavingId(booking.id);
    try {
      const changes = {
        vendorId,
        panditId: vendor.vendorType === "pandit" ? vendorId : "",
        assignedVendorName: vendor.name || vendor.businessName || "",
        updatedAt: serverTimestamp(),
      };
      const batch = writeBatch(db);
      batch.update(doc(db, "bookings", booking.id), changes);
      if (booking.customerId || booking.userId) {
        const customerId = booking.customerId || booking.userId;
        const customerBookingRef = doc(db, "users", customerId, "bookings", booking.id);
        if ((await getDoc(customerBookingRef)).exists()) {
          batch.update(customerBookingRef, changes);
        }
      }
      await batch.commit();
      setBookings((current) => current.map((item) =>
        item.id === booking.id
          ? { ...item, vendorId, assignedVendorName: vendor.name || vendor.businessName || "" }
          : item
      ));
      toast.success("Vendor assigned to booking.");
    } catch (error) {
      console.error("Vendor assignment failed:", error);
      toast.error(error.message || "Vendor could not be assigned.");
    } finally {
      setSavingId("");
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF9F2] p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <CalendarCheck className="h-8 w-8 text-[#7A1A1A]" />
            <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A24D]">Admin</p><h1 className="text-3xl font-bold text-[#7A1A1A]">Booking Assignment</h1></div>
          </div>
          <button type="button" onClick={load} className="rounded-full border border-slate-200 bg-white p-2" aria-label="Refresh bookings"><RefreshCw className="h-4 w-4" /></button>
        </header>

        {loading ? <p className="rounded-2xl bg-white p-6">Loading bookings...</p> : (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <article key={booking.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E8D19B] bg-white p-4">
                <div>
                  <h2 className="font-semibold text-slate-800">{booking.event || booking.service || "Booking"}</h2>
                  <p className="mt-1 text-sm text-slate-600">{booking.date || "Date pending"}{booking.time ? ` · ${booking.time}` : ""}</p>
                  <p className="mt-1 text-xs text-slate-500">{booking.id} · {booking.bookingStatus || "PENDING"} · {booking.assignedVendorName || "Unassigned"}</p>
                </div>
                <label className="text-sm font-medium text-slate-700">
                  Assign approved provider
                  <select
                    value={booking.vendorId || ""}
                    disabled={savingId === booking.id || !vendors.length || booking.bookingStatus !== "PENDING"}
                    onChange={(event) => assignVendor(booking, event.target.value)}
                    className="mt-1 block min-w-56 rounded-xl border border-slate-200 bg-white px-3 py-2"
                  >
                    <option value="">Select vendor</option>
                    {vendors.map((vendor) => <option key={vendor.id} value={vendor.id}>{vendor.name || vendor.businessName || vendor.id} · {vendor.vendorType || "vendor"}</option>)}
                  </select>
                </label>
              </article>
            ))}
            {!bookings.length && <p className="rounded-2xl border border-[#E8D19B] bg-white p-6 text-slate-500">No canonical bookings found.</p>}
            {bookings.length > 0 && !vendors.length && <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">No approved vendors are available for assignment.</p>}
          </div>
        )}
      </div>
    </main>
  );
}
