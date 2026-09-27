import React, { useEffect, useState } from "react";
import { Briefcase, CheckCircle, MapPin, Mail, Phone, ShieldCheck, User } from "lucide-react";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ServiceProviderProfile() {
  const [vendorData, setVendorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVendor = async () => {
      if (!auth.currentUser) {
        setLoading(false);
        return;
      }

      try {
        const vendorRef = doc(db, "vendors", auth.currentUser.uid);
        const snapshot = await getDoc(vendorRef);
        setVendorData(snapshot.exists() ? { uid: auth.currentUser.uid, ...snapshot.data() } : null);
      } catch (error) {
        console.error("Unable to load vendor profile:", error);
        setVendorData(null);
      } finally {
        setLoading(false);
      }
    };

    loadVendor();
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
          </div>
        </div>
      </div>
    </div>
  );
}
