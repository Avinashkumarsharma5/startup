import { requireSupabase } from "./supabase";

function mapLead(row) {
  return { ...row, eventType: row.event_type, createdAt: row.created_at, submittedAt: row.created_at, nextFollowUpAt: row.next_follow_up_at };
}

function mapVendor(row) {
  return { ...row, userId: row.user_id, name: row.applicant_name || row.business_name, vendorType: row.vendor_type, submittedAt: row.submitted_at };
}

function mapBooking(row) {
  let details = {};
  try { details = row.notes ? JSON.parse(row.notes) : {}; } catch { /* notes may be plain text */ }
  return { ...details, ...row, service: details.service || row.booking_type, status: row.booking_status, bookingStatus: row.booking_status, totalAmount: Number(row.total_amount || 0), createdAt: row.created_at };
}

export function formatDashboardDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

export async function fetchAdminDashboardData({ role = "ADMIN" } = {}) {
  const client = requireSupabase();
  const normalizedRole = String(role || "").toUpperCase();
  const canManageVendors = ["ADMIN", "SUPER_ADMIN"].includes(normalizedRole);
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toISOString();
  const [statsResult, leadsResult, vendorsResult, bookingsResult, followUpsResult, providersResult] = await Promise.all([
    client.rpc("admin_dashboard_stats"),
    client.from("leads").select("*").order("created_at", { ascending: false }).limit(6),
    canManageVendors
      ? client.from("vendor_applications").select("*").order("submitted_at", { ascending: false }).limit(100)
      : Promise.resolve({ data: [], error: null }),
    client.from("bookings").select("*").order("created_at", { ascending: false }).limit(6),
    client.from("leads").select("*").gte("next_follow_up_at", startOfDay).lt("next_follow_up_at", endOfDay).order("next_follow_up_at", { ascending: true }).limit(100),
    canManageVendors
      ? client.from("vendor_profiles").select("user_id,business_name,vendor_type").eq("verification_status", "APPROVED").order("business_name").limit(200)
      : Promise.resolve({ data: [], error: null }),
  ]);
  for (const result of [statsResult, leadsResult, vendorsResult, bookingsResult, followUpsResult, providersResult]) if (result.error) throw result.error;
  const stats = statsResult.data || {};
  const leads = leadsResult.data.map(mapLead);
  const vendors = vendorsResult.data.map(mapVendor);
  const bookings = bookingsResult.data.map(mapBooking);
  const followUpsToday = followUpsResult.data.map(mapLead);
  return {
    leads, vendors, users: [], bookings, followUpsToday, providers: providersResult.data,
    revenue: 0,
    stats: {
      totalLeads: Number(stats.totalLeads || 0), newLeads: Number(stats.newLeads || 0),
      totalBookings: Number(stats.totalBookings || 0), confirmedBookings: Number(stats.confirmedBookings || 0),
      totalCustomers: Number(stats.totalCustomers || 0), totalVendors: Number(stats.totalVendors || 0),
      totalUsers: Number(stats.totalUsers || 0), totalPandits: Number(stats.totalPandits || 0),
      totalOrders: Number(stats.totalOrders || 0), totalProducts: Number(stats.totalProducts || 0),
      totalReviews: Number(stats.totalReviews || 0),
      pendingVendors: Number(stats.pendingVendors || 0), completedBookings: Number(stats.completedBookings || 0),
      cancelledBookings: Number(stats.cancelledBookings || 0), activeVendors: Number(stats.activeVendors || 0),
      pendingApplications: Number(stats.pendingApplications || 0), approvedApplications: Number(stats.approvedApplications || 0),
    },
    recentLeads: leads, recentBookings: bookings,
    pendingVendors: vendors.filter((vendor) => vendor.status === "PENDING").slice(0, 6),
  };
}
