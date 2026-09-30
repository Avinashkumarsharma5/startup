import { requireSupabase } from "./supabase";
import { getCurrentUser } from "./supabaseAuth";

export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "QUOTE_SENT",
  "FOLLOW_UP",
  "BOOKED",
  "COMPLETED",
  "LOST",
  "CANCELLED",
];

export const LEAD_PRIORITIES = ["LOW", "MEDIUM", "HIGH", "URGENT"];

export function getLeadSourceMeta() {
  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer || "";

  return {
    source: params.get("utm_source") ||
      (referrer ? "Website" : "Direct"),
    campaign: params.get("utm_campaign") || "",
    medium: params.get("utm_medium") || "",
    content: params.get("utm_content") || "",
    term: params.get("utm_term") || "",
    landingPage: window.location.pathname,
    referrer,
  };
}

export function normalizeLeadPayload(leadInput = {}) {
  const data = { ...leadInput };
  const today = new Date();

  return {
    name: (data.name || "").trim(),
    phone: (data.phone || "").trim(),
    email: (data.email || "").trim(),
    city: (data.city || "").trim(),
    service: (data.service || "General Enquiry").trim(),
    eventType: (data.eventType || "").trim(),
    eventDate: data.eventDate || "",
    eventTime: data.eventTime || "",
    budget: data.budget || "",
    address: data.address || "",
    message: (data.message || "").trim(),
    source: data.source || "Website",
    campaign: data.campaign || "",
    medium: data.medium || "",
    content: data.content || "",
    term: data.term || "",
    landingPage: data.landingPage || window.location.pathname,
    status: data.status || "NEW",
    priority: data.priority || "MEDIUM",
    assignedTo: data.assignedTo || "",
    assignedVendorId: data.assignedVendorId || "",
    notes: data.notes || "",
    userId: data.userId || "",
    createdAt: data.createdAt || today.toISOString(),
  };
}

export async function createLead(leadInput = {}, context = {}) {
  const payload = normalizeLeadPayload({
    ...leadInput,
    ...getLeadSourceMeta(),
    ...context,
  });

  const user = await getCurrentUser();
  const dbPayload = {
    user_id: user?.id || null, name: payload.name || "Visitor", phone: payload.phone,
    email: payload.email || null, city: payload.city || null, service: payload.service,
    event_type: payload.eventType || null, event_date: payload.eventDate || null,
    event_time: payload.eventTime || null, budget: payload.budget || null, address: payload.address || null,
    message: payload.message || null, source: payload.source, campaign: payload.campaign || null,
    medium: payload.medium || null, content: payload.content || null, term: payload.term || null,
    landing_page: payload.landingPage || null, referrer: getLeadSourceMeta().referrer || null,
  };
  const { data, error } = await requireSupabase().from("leads").insert(dbPayload).select("id").single();
  if (error) throw error;
  return { id: data.id, ...payload };
}

export async function fetchLeads({
  status = "",
  service = "",
  city = "",
  source = "",
  priority = "",
  search = "",
} = {}) {
  let q = requireSupabase().from("leads").select("*").order("created_at", { ascending: false }).limit(1000);
  if (status) q = q.eq("status", status);
  if (service) q = q.eq("service", service);
  if (city) q = q.eq("city", city);
  if (source) q = q.eq("source", source);
  if (priority) q = q.eq("priority", priority);
  if (search) {
    const safeSearch = search.replace(/[^a-zA-Z0-9@ +_-]/g, " ").trim();
    if (safeSearch) q = q.or(`name.ilike.%${safeSearch}%,phone.ilike.%${safeSearch}%,email.ilike.%${safeSearch}%,message.ilike.%${safeSearch}%`);
  }
  const { data, error } = await q;
  if (error) throw error;
  return data.map((lead) => ({ ...lead, userId: lead.user_id, eventType: lead.event_type, eventDate: lead.event_date, eventTime: lead.event_time, landingPage: lead.landing_page, assignedTo: lead.assigned_to, assignedVendorId: lead.assigned_vendor_id, lastContactedAt: lead.last_contacted_at, nextFollowUpAt: lead.next_follow_up_at, createdAt: lead.created_at, updatedAt: lead.updated_at }));
}

export async function updateLeadStatus(leadId, status, changedBy = "admin") {
  const { error } = await requireSupabase().rpc("update_lead_status", { p_lead_id: leadId, p_status: status, p_changed_by: changedBy });
  if (error) throw error;
  return { leadId, status };
}

export function getLeadStatusTone(status) {
  const tones = {
    NEW: "bg-amber-100 text-amber-700",
    CONTACTED: "bg-blue-100 text-blue-700",
    QUALIFIED: "bg-violet-100 text-violet-700",
    QUOTE_SENT: "bg-cyan-100 text-cyan-700",
    FOLLOW_UP: "bg-orange-100 text-orange-700",
    BOOKED: "bg-emerald-100 text-emerald-700",
    COMPLETED: "bg-green-100 text-green-700",
    LOST: "bg-red-100 text-red-700",
    CANCELLED: "bg-slate-200 text-slate-700",
  };

  return tones[status] || "bg-gray-100 text-gray-700";
}

export function formatLeadDate(value) {
  if (!value) return "—";
  if (typeof value === "string") return value;
  return new Date(value.seconds ? value.seconds * 1000 : value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function trackLeadEvent(eventName, payload = {}) {
  if (typeof window !== "undefined") {
    if (window.gtag) {
      window.gtag("event", eventName, payload);
    }
    if (window.fbq) {
      window.fbq("track", eventName, payload);
    }
  }
}
