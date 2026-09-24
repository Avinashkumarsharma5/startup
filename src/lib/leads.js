import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  orderBy,
} from "firebase/firestore";

import { db } from "./firebase";

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
    createdAt: data.createdAt || serverTimestamp(),
    updatedAt: data.updatedAt || serverTimestamp(),
    lastContactedAt: data.lastContactedAt || null,
    nextFollowUpAt: data.nextFollowUpAt || null,
    history: data.history || [
      {
        status: "NEW",
        changedAt: today.toISOString(),
      },
    ],
  };
}

export async function createLead(leadInput = {}, context = {}) {
  const payload = normalizeLeadPayload({
    ...leadInput,
    ...getLeadSourceMeta(),
    ...context,
  });

  const leadRef = await addDoc(collection(db, "leads"), payload);
  return { id: leadRef.id, ...payload };
}

export async function fetchLeads({
  status = "",
  service = "",
  city = "",
  source = "",
  priority = "",
  search = "",
} = {}) {
  const q = collection(db, "leads");
  const constraints = [];

  if (status) constraints.push(where("status", "==", status));
  if (service) constraints.push(where("service", "==", service));
  if (city) constraints.push(where("city", "==", city));
  if (source) constraints.push(where("source", "==", source));
  if (priority) constraints.push(where("priority", "==", priority));

  constraints.push(orderBy("createdAt", "desc"));
  const snapshot = await getDocs(query(q, ...constraints));

  const rows = snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));

  if (!search) return rows;

  const lowerSearch = search.toLowerCase();
  return rows.filter((lead) => {
    const searchable = [
      lead.name,
      lead.phone,
      lead.email,
      lead.city,
      lead.service,
      lead.eventType,
      lead.source,
      lead.assignedTo,
      lead.message,
    ].join(" ").toLowerCase();

    return searchable.includes(lowerSearch);
  });
}

export async function updateLeadStatus(leadId, status, changedBy = "admin") {
  const leadRef = doc(db, "leads", leadId);

  const historyEntry = {
    status,
    changedBy,
    changedAt: new Date().toISOString(),
  };

  await updateDoc(leadRef, {
    status,
    updatedAt: serverTimestamp(),
    lastContactedAt: serverTimestamp(),
    history: arrayUnion(historyEntry),
  });

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
