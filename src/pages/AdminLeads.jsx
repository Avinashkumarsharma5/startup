import React, { useEffect, useMemo, useState } from "react";
import { Search, Phone, MessageCircle } from "lucide-react";

import { fetchLeads, getLeadStatusTone, LEAD_PRIORITIES, LEAD_STATUSES, updateLeadStatus } from "../lib/leads";

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [serviceFilter, setServiceFilter] = useState("ALL");
  const [cityFilter, setCityFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [sourceFilter, setSourceFilter] = useState("ALL");
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchData = async () => {
    try {
      setError("");
      const rows = await fetchLeads({
        status: statusFilter === "ALL" ? "" : statusFilter,
        service: serviceFilter === "ALL" ? "" : serviceFilter,
        city: cityFilter === "ALL" ? "" : cityFilter,
        source: sourceFilter === "ALL" ? "" : sourceFilter,
        priority: priorityFilter === "ALL" ? "" : priorityFilter,
        search,
      });
      setLeads(rows);
    } catch (error) {
      console.error("Failed to load leads:", error);
      setError(error.message || "Unable to load leads. Check your administrator access.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (event) => {
    const nextStatus = event.target.value;
    if (!selectedLead || !nextStatus || nextStatus === selectedLead.status) return;

    setUpdatingStatus(true);
    try {
      await updateLeadStatus(selectedLead.id, nextStatus, "admin");
      setSelectedLead({ ...selectedLead, status: nextStatus });
      setLeads((current) => current.map((lead) => (
        lead.id === selectedLead.id ? { ...lead, status: nextStatus } : lead
      )));
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusFilter, serviceFilter, cityFilter, sourceFilter, priorityFilter, search]);

  const stats = useMemo(() => {
    return {
      total: leads.length,
      newLeads: leads.filter((lead) => lead.status === "NEW").length,
      contacted: leads.filter((lead) => lead.status === "CONTACTED").length,
      booked: leads.filter((lead) => lead.status === "BOOKED").length,
      conversion: leads.length
        ? Math.round((leads.filter((lead) => ["BOOKED", "COMPLETED"].includes(lead.status)).length / leads.length) * 100)
        : 0,
    };
  }, [leads]);

  const services = ["ALL", ...new Set(leads.map((lead) => lead.service).filter(Boolean))];
  const cities = ["ALL", ...new Set(leads.map((lead) => lead.city).filter(Boolean))];
  const sources = ["ALL", ...new Set(leads.map((lead) => lead.source).filter(Boolean))];

  if (loading) {
    return <div className="min-h-screen bg-[#FFF9F2] p-6 text-slate-700">Loading leads...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FFF9F2] p-6">
        <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
          <h1 className="text-xl font-bold">Lead dashboard unavailable</h1>
          <p className="mt-2 text-sm">{error}</p>
          <button
            type="button"
            onClick={fetchData}
            className="mt-4 rounded-full bg-[#7A1A1A] px-4 py-2 text-sm font-semibold text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F2] p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A24D]">CRM</p>
            <h1 className="text-3xl font-bold text-[#7A1A1A]">Lead Management</h1>
          </div>
          <div className="rounded-full border border-[#E8D19B] bg-white px-4 py-2 text-sm font-medium text-slate-700">
            {stats.total} total leads
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-5">
          {[
            ["Total Leads", stats.total, "bg-white text-slate-700"],
            ["New Leads", stats.newLeads, "bg-amber-50 text-amber-700"],
            ["Contacted", stats.contacted, "bg-blue-50 text-blue-700"],
            ["Booked", stats.booked, "bg-emerald-50 text-emerald-700"],
            ["Conversion", `${stats.conversion}%`, "bg-violet-50 text-violet-700"],
          ].map(([label, value, styles]) => (
            <div key={label} className={`rounded-2xl border border-[#E8D19B] p-4 ${styles}`}>
              <p className="text-sm font-medium opacity-75">{label}</p>
              <p className="mt-2 text-2xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 grid gap-3 rounded-2xl border border-[#E8D19B] bg-white p-4 md:grid-cols-7">
          <label className="md:col-span-2 relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search leads"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#C9A24D]"
            />
          </label>

          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
            <option value="ALL">All statuses</option>
            {LEAD_STATUSES.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select value={serviceFilter} onChange={(event) => setServiceFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
            <option value="ALL">All services</option>
            {services.filter((service) => service !== "ALL").map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>

          <select value={cityFilter} onChange={(event) => setCityFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
            <option value="ALL">All cities</option>
            {cities.filter((city) => city !== "ALL").map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
            <option value="ALL">All priorities</option>
            {LEAD_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>

          <select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
            <option value="ALL">All sources</option>
            {sources.filter((source) => source !== "ALL").map((source) => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#E8D19B] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#FFF7E2] text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">City</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Priority</th>
                  <th className="px-4 py-3 font-semibold">Source</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} onClick={() => setSelectedLead(lead)} className="cursor-pointer border-t border-slate-100 hover:bg-[#FFFDF8]">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-800">{lead.name || "Unnamed lead"}</div>
                      <div className="mt-1 text-xs text-slate-500">{lead.phone || "No phone"}</div>
                    </td>
                    <td className="px-4 py-3">{lead.service || "—"}</td>
                    <td className="px-4 py-3">{lead.city || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getLeadStatusTone(lead.status || "NEW")}`}>
                        {lead.status || "NEW"}
                      </span>
                    </td>
                    <td className="px-4 py-3">{lead.priority || "MEDIUM"}</td>
                    <td className="px-4 py-3">{lead.source || "Website"}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{lead.createdAt?.seconds ? new Date(lead.createdAt.seconds * 1000).toLocaleDateString("en-IN") : "New"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedLead && (
          <div className="mt-6 rounded-2xl border border-[#E8D19B] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A24D]">Lead details</p>
                <h2 className="text-2xl font-bold text-[#7A1A1A]">{selectedLead.name}</h2>
              </div>

              <div className="flex gap-2">
                <a href={`tel:${selectedLead.phone || "+916201486202"}`} className="inline-flex items-center gap-2 rounded-full bg-[#7A1A1A] px-3 py-2 text-xs font-semibold text-white">
                  <Phone className="h-4 w-4" /> Call
                </a>
                <a href={`https://wa.me/${selectedLead.phone ? selectedLead.phone.replace(/\D/g, "") : "916201486202"}?text=${encodeURIComponent("Namaste, I am following up on my enquiry for " + selectedLead.service + ".")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Service</p>
                <p className="mt-1 font-semibold text-slate-800">{selectedLead.service}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-slate-400">City</p>
                <p className="mt-1 font-semibold text-slate-800">{selectedLead.city || "Not provided"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Event / Puja</p>
                <p className="mt-1 font-semibold text-slate-800">{selectedLead.eventType || "—"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Source</p>
                <p className="mt-1 font-semibold text-slate-800">{selectedLead.source || "Website"}</p>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
              {selectedLead.message || "No additional requirement message added."}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <label className="text-sm font-medium text-slate-700">Update status</label>
              <select
                value={selectedLead.status || "NEW"}
                onChange={handleStatusChange}
                disabled={updatingStatus}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              >
                {LEAD_STATUSES.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
