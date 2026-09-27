import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";
import {
  fetchVendorApplications,
  updateVendorApplicationStatus,
  VENDOR_STATUSES,
} from "../lib/vendors";
import { auth, getBytes, ref, storage } from "../lib/firebase";

export default function AdminVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadVendors = async () => {
    try {
      setLoading(true);
      setVendors(await fetchVendorApplications());
    } catch (error) {
      console.error("Unable to load vendor applications:", error);
      toast.error("Vendor applications could not be loaded.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVendors();
  }, []);

  const changeStatus = async (vendor, status) => {
    try {
      await updateVendorApplicationStatus(vendor, status, auth.currentUser?.uid || "admin");

      setVendors((current) =>
        current.map((item) => (item.id === vendor.id ? { ...item, status } : item))
      );
      toast.success(`Vendor marked ${status.toLowerCase()}.`);
    } catch (error) {
      console.error("Unable to update vendor status:", error);
      toast.error("Vendor status could not be updated.");
    }
  };

  const openDocument = async (file) => {
    if (!file?.path) return;
    try {
      const bytes = await getBytes(ref(storage, file.path), 5 * 1024 * 1024);
      const url = URL.createObjectURL(new Blob([bytes], { type: file.contentType || "application/octet-stream" }));
      const download = document.createElement("a");
      download.href = url;
      download.download = file.name || "vendor-document";
      download.click();
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (error) {
      console.error("Unable to open vendor document:", error);
      toast.error("This vendor document could not be opened.");
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF9F2] p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-3">
          <ShieldAlert className="h-8 w-8 text-[#7A1A1A]" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A24D]">Admin</p>
            <h1 className="text-3xl font-bold text-[#7A1A1A]">Vendor Approvals</h1>
          </div>
        </div>

        {loading ? (
          <p className="rounded-2xl bg-white p-6 text-slate-600">Loading applications...</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-[#E8D19B] bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#FFF7E2]">
                <tr>
                  <th className="px-4 py-3">Vendor</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor) => (
                  <tr key={vendor.id} className="border-t border-slate-100">
                    <td className="px-4 py-3">
                      <div className="font-semibold">{vendor.name || "Unnamed vendor"}</div>
                      <div className="text-xs text-slate-500">{vendor.email || vendor.phone}</div>
                      {Object.values(vendor.filesMeta || {}).flat().map((file, index) => (
                        <button
                          key={file.path || `${file.name}-${index}`}
                          type="button"
                          disabled={!file.path}
                          onClick={() => openDocument(file)}
                          className="mr-2 mt-1 text-xs font-medium text-amber-700 underline disabled:text-slate-400 disabled:no-underline"
                        >
                          {file.name || file}
                        </button>
                      ))}
                    </td>
                    <td className="px-4 py-3">{vendor.vendorType || "—"}</td>
                    <td className="px-4 py-3">{vendor.location || "—"}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold">
                        {vendor.status || "PENDING"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {String(vendor.status || "PENDING").toUpperCase() === "PENDING" ? (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => changeStatus(vendor, "APPROVED")}
                            className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-2 text-xs font-semibold text-white"
                          >
                            <CheckCircle className="h-4 w-4" /> Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => changeStatus(vendor, "REJECTED")}
                            className="inline-flex items-center gap-1 rounded-full bg-red-600 px-3 py-2 text-xs font-semibold text-white"
                          >
                            <XCircle className="h-4 w-4" /> Reject
                          </button>
                        </div>
                      ) : <span className="text-xs text-slate-500">Reviewed</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!vendors.length && <p className="p-6 text-slate-500">No vendor applications yet.</p>}
          </div>
        )}
      </div>
    </main>
  );
}
