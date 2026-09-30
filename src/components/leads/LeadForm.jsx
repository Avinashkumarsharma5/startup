import React, { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, MessageSquare, Phone } from "lucide-react";
import toast from "react-hot-toast";

import { createLead, getLeadSourceMeta } from "../../lib/leads";

const DEFAULT_FORM = {
  name: "",
  phone: "",
  email: "",
  city: "",
  service: "",
  eventType: "",
  eventDate: "",
  eventTime: "",        
  budget: "",
  address: "",
  message: "",
};

export default function LeadForm({
  service = "General Enquiry",
  title = "Tell us what you need",
  subtitle = "We’ll connect you with the right Pandit, vendor or event specialist.",
  compact = false,
  className = "",
}) {
  const [form, setForm] = useState({ ...DEFAULT_FORM, service });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [leadId, setLeadId] = useState("");

  const sourceMeta = useMemo(() => getLeadSourceMeta(), []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name || !form.phone || !form.city || !form.service) {
      toast.error("Please fill in name, phone, city and service.");
      return;
    }

    const phone = form.phone.replace(/\D/g, "");
    if (phone.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    setSubmitting(true);

    try {
      const result = await createLead(
        {
          ...form,
          phone: `+91${phone}`,
          source: sourceMeta.source || "Website",
          campaign: sourceMeta.campaign || "",
          medium: sourceMeta.medium || "",
          content: sourceMeta.content || "",
          term: sourceMeta.term || "",
          landingPage: sourceMeta.landingPage || window.location.pathname,
        },
        {}
      );

      setLeadId(result.id);
      setSuccess(true);
      setForm({ ...DEFAULT_FORM, service });
      toast.success("Your enquiry has been received. Our team will contact you soon.");
    } catch (error) {
      console.error("Lead submission failed:", error);
      toast.error(error.message || "Unable to submit your enquiry right now.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className={`rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm ${className}`}>
        <div className="flex items-center gap-3 text-emerald-700">
          <CheckCircle2 className="h-6 w-6" />
          <h3 className="text-xl font-bold">Your enquiry has been received 🙏</h3>
        </div>

        <p className="mt-3 text-sm text-slate-700">
          Enquiry ID: <span className="font-semibold">{leadId}</span>
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Our team will contact you shortly. You can also WhatsApp us instantly for faster support.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="https://wa.me/916201486202?text=Namaste%20Sanskaraa%2C%20I%20have%20sent%20an%20enquiry%20for%20my%20service."
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
          >
            WhatsApp Us
          </a>
          <a
            href="tel:+916201486202"
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Call us
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`rounded-3xl border border-[#E8D19B] bg-white p-5 shadow-sm ${className}`}>
      <div className="mb-5">
        <div className="flex items-center gap-2 text-[#7A1A1A]">
          <MessageSquare className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-[0.12em]">Lead form</span>
        </div>
        <h3 className="mt-2 text-2xl font-bold text-slate-800">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          Full name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-[#C9A24D]"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          Mobile number
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="9876543210"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-[#C9A24D]"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@email.com"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-[#C9A24D]"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          City
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Ranchi"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-[#C9A24D]"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          Service
          <input
            type="text"
            name="service"
            value={form.service}
            onChange={handleChange}
            placeholder="Wedding Puja / Decoration"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-[#C9A24D]"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          Event / Puja type
          <input
            type="text"
            name="eventType"
            value={form.eventType}
            onChange={handleChange}
            placeholder="Griha Pravesh"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-[#C9A24D]"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          Preferred date
          <input
            type="date"
            name="eventDate"
            value={form.eventDate}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-[#C9A24D]"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          Preferred time
          <input
            type="time"
            name="eventTime"
            value={form.eventTime}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-[#C9A24D]"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
          Budget range
          <input
            type="text"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            placeholder="₹15,000 - ₹25,000"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-[#C9A24D]"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
          Address / location
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Full address or nearby landmark"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-[#C9A24D]"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
          Additional message
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us more about your requirement, preferred date, venue, or other details."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-[#C9A24D]"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-[#7A1A1A] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#9a1e1e] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Submitting..." : "Get a Quote"}
        </button>

        <a
          href="https://wa.me/916201486202?text=Namaste%20Sanskaraa%2C%20I%20want%20to%20book%20a%20service."
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
        >
          <Phone className="h-4 w-4" /> WhatsApp
        </a>

        <span className="inline-flex items-center gap-2 text-xs text-slate-500">
          <CalendarDays className="h-4 w-4" /> Response within 30 minutes
        </span>
      </div>
    </form>
  );
}
