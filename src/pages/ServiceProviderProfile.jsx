import React, { useEffect, useRef, useState } from "react";
import { Briefcase, CheckCircle, MapPin, Mail, Phone, ShieldCheck, User } from "lucide-react";
import { requireSupabase } from "../lib/supabase";
import { getCurrentUser } from "../lib/supabaseAuth";
import { subscribeToProviderBookings, updateUserBooking } from "../lib/bookings";
import { startProviderLocationSharing } from "../lib/liveLocations";

export default function ServiceProviderProfile() {
  const [vendorData, setVendorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const locationStop = useRef(null);
  const subscriptionStop = useRef(null);

  useEffect(() => {
    const loadVendor = async () => {
      const user = await getCurrentUser();
      if (!user) {
        setLoading(false);
        return;
      }

      subscriptionStop.current = subscribeToProviderBookings(user.id, setBookings, (error) => {
        console.error("Unable to load assigned bookings:", error);
        setErrorMessage("Bookings could not be refreshed. Please reload the page.");
      });

      try {
        const { data, error } = await requireSupabase().from("vendor_profiles").select("*").eq("user_id", user.id).maybeSingle();
        if (error) throw error;
        setVendorData(data ? {
          ...data, uid: user.id, name: data.business_name, vendorType: data.vendor_type,
          location: [data.city, data.state].filter(Boolean).join(", "), email: data.email || user.email,
        } : null);
      } catch (error) {
        console.error("Unable to load vendor profile:", error);
        setVendorData(null);
      } finally {
        setLoading(false);
      }
    };

    loadVendor();
    return () => { subscriptionStop.current?.(); void locationStop.current?.(); };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-6">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-slate-600">Loading vendor dashboard...</p>
        </div>
      </div>
    );
  }

  if (!vendorData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-6">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 text-center shadow-sm">
          <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-orange-500" />
          <h1 className="text-2xl font-bold text-[#7A1A1A]">Vendor dashboard unavailable</h1>
          <p className="mt-3 text-slate-600">No approved vendor profile is available yet for this account.</p>
        </div>
      </div>
    );
  }

  const serviceList = Array.isArray(vendorData.services) && vendorData.services.length
    ? vendorData.services.join(", ")
    : "No services added yet.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 pb-20 pt-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="h-28 bg-gradient-to-r from-orange-500 to-amber-500" />
          <div className="px-6 pb-8">
            <div className="-mt-12 flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-orange-100 text-2xl font-bold text-orange-700">
                {vendorData.name?.charAt(0)?.toUpperCase() || <User className="h-8 w-8" />}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#7A1A1A]">{vendorData.name || "Vendor"}</h1>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Briefcase className="h-4 w-4 text-orange-500" />
                  <span>{vendorData.vendorType || "Vendor"}</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                    Approved
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h2 className="mb-3 text-lg font-semibold text-[#7A1A1A]">Business info</h2>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-orange-500" /> {vendorData.email || "No email available"}</div>
                  <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-orange-500" /> {vendorData.phone || "No phone available"}</div>
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-orange-500" /> {vendorData.location || "Location not set"}</div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h2 className="mb-3 text-lg font-semibold text-[#7A1A1A]">Service details</h2>
                <p className="text-sm text-slate-600">{serviceList}</p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-dashed border-orange-200 bg-orange-50 p-5 text-center">
              <CheckCircle className="mx-auto mb-2 h-8 w-8 text-emerald-600" />
              <p className="text-sm font-medium text-slate-700">No vendor data has been published yet.</p>
              <p className="mt-1 text-sm text-slate-500">This dashboard will display your approved vendor profile and activity once it is available.</p>
            </div>
            <section className="mt-8">
              <h2 className="mb-3 text-lg font-semibold text-[#7A1A1A]">Assigned bookings</h2>
              {errorMessage && <p role="alert" className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{errorMessage}</p>}
              {bookings.length === 0 ? <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">No bookings are assigned to you yet.</p> : <div className="space-y-3">
                {bookings.map((booking) => <ProviderBookingCard key={booking.id} booking={booking} onError={setErrorMessage} />)}
              </div>}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProviderBookingCard({ booking, onError }) {
  const [busy, setBusy] = useState(false);
  const [sharing, setSharing] = useState(false);
  const stopLocation = useRef(null);
  useEffect(() => () => { void stopLocation.current?.(); }, []);
  useEffect(() => {
    const status = booking.status?.toUpperCase().replaceAll(" ", "_");
    if (["COMPLETED", "CANCELLED", "REJECTED"].includes(status) && stopLocation.current) {
      void stopLocation.current();
      stopLocation.current = null;
      setSharing(false);
    }
  }, [booking.status]);
  const actions = {
    ASSIGNED: ["ACCEPTED", "REJECTED"], ACCEPTED: ["ON_THE_WAY"], ON_THE_WAY: ["ARRIVED"],
    ARRIVED: ["IN_PROGRESS"], IN_PROGRESS: ["COMPLETED"],
  }[booking.status?.toUpperCase().replaceAll(" ", "_")] || [];
  const transition = async (next) => {
    setBusy(true);
    try {
      await updateUserBooking(booking.id, { booking_status: next });
      onError("");
      if (["COMPLETED", "REJECTED"].includes(next)) { await stopLocation.current?.(); stopLocation.current = null; setSharing(false); }
    } catch (error) { console.error("Booking update failed:", error); onError(error.message || "Booking could not be updated."); }
    finally { setBusy(false); }
  };
  const toggleLocation = async () => {
    try {
      if (sharing) { await stopLocation.current?.(); stopLocation.current = null; setSharing(false); }
      else { stopLocation.current = await startProviderLocationSharing(booking.id, (error) => onError(error.message || "Location update failed.")); setSharing(true); }
    } catch (error) { onError(error.message || "Location sharing could not start. Check browser location permission."); }
  };
  return <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex flex-wrap items-start justify-between gap-2"><div><h3 className="font-semibold text-[#7A1A1A]">{booking.service || booking.event || "Service booking"}</h3><p className="text-sm text-slate-600">{booking.date || "Date not set"} · {booking.address || "Address not set"}</p></div><span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">{booking.status}</span></div>
    <div className="mt-3 flex flex-wrap gap-2">{actions.map((action) => <button key={action} disabled={busy} onClick={() => void transition(action)} className="rounded-lg bg-[#800000] px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">{action.replaceAll("_", " ")}</button>)}
      {["ACCEPTED", "ON_THE_WAY", "ARRIVED", "IN_PROGRESS"].includes(booking.status?.toUpperCase().replaceAll(" ", "_")) && <button onClick={() => void toggleLocation()} className="rounded-lg border border-orange-300 px-3 py-2 text-xs font-semibold text-[#800000]">{sharing ? "Stop location sharing" : "Share live location"}</button>}</div>
  </article>;
}
