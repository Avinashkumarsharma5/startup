import { requireSupabase } from "./supabase";
import { getCurrentUser } from "./supabaseAuth";

export const ROLE = { CUSTOMER: "CUSTOMER", VENDOR: "VENDOR", PANDIT: "PANDIT", ADMIN: "ADMIN", SUPER_ADMIN: "SUPER_ADMIN", STAFF: "STAFF" };
export const ADMIN_ROLES = [ROLE.ADMIN, ROLE.SUPER_ADMIN];
export const STAFF_ROLES = [ROLE.STAFF];
export const normalizeRole = (value) => String(value ?? "").trim().toUpperCase();
export const getRoleFromProfile = (profile) => normalizeRole(profile?.role) || ROLE.CUSTOMER;
export const isAdminRole = (role) => [...ADMIN_ROLES, ...STAFF_ROLES].includes(normalizeRole(role));
export const isStaffRole = (role) => normalizeRole(role) === ROLE.STAFF;
export const isVendorRole = (role) => [ROLE.VENDOR, ROLE.PANDIT].includes(normalizeRole(role));
export const isCustomerRole = (role) => normalizeRole(role) === ROLE.CUSTOMER || !normalizeRole(role);

function mapApplication(row) {
  if (!row) return null;
  return {
    ...row, userId: row.user_id, businessName: row.business_name, vendorType: row.vendor_type,
    submittedAt: row.submitted_at, reviewedAt: row.reviewed_at, reviewedBy: row.reviewed_by,
    rejectionReason: row.rejection_reason, aadhaarDocumentUrl: row.aadhaar_document_url,
    panDocumentUrl: row.pan_document_url, businessProofUrl: row.business_proof_url,
    portfolioUrls: row.portfolio_urls,
  };
}

export async function getCurrentUserProfile() {
  const client = requireSupabase();
  const user = await getCurrentUser();
  if (!user) return null;
  const { data, error } = await client.from("profiles").select("*").eq("id", user.id).maybeSingle();
  if (error) throw error;
  return data ? { ...data, uid: data.id, profileImage: data.avatar_url || "", dateOfBirth: data.date_of_birth || "", phoneVerified: data.phone_verified || false } : null;
}

export async function getVendorApplicationForUser(uid) {
  if (!uid) return null;
  const { data, error } = await requireSupabase().from("vendor_applications").select("*").eq("user_id", uid).order("updated_at", { ascending: false }).limit(1).maybeSingle();
  if (error) throw error;
  return mapApplication(data);
}

export function getMoreMenuItems({ profile, vendorApplication, logoutAction }) {
  const role = getRoleFromProfile(profile);
  const status = String(vendorApplication?.status || profile?.vendorApplicationStatus || "").toUpperCase();
  if ([ROLE.ADMIN, ROLE.SUPER_ADMIN].includes(role)) return [
    { label: "Admin Dashboard", to: "/admin/dashboard" }, { label: "Vendor Approvals", to: "/admin/vendors" },
    { label: "Leads", to: "/admin/leads" }, { label: "Analytics", to: "/admin/analytics" },
    { label: "Profile", to: "/userprofile" }, { label: "Notifications", to: "/notifications" }, { label: "Logout", action: logoutAction },
  ];
  if (role === ROLE.STAFF) return [
    { label: "Admin Dashboard", to: "/admin/dashboard" }, { label: "Leads", to: "/admin/leads" },
    { label: "Profile", to: "/userprofile" }, { label: "Notifications", to: "/notifications" }, { label: "Logout", action: logoutAction },
  ];
  if (["PENDING", "REJECTED"].includes(status)) return [
    { label: `Vendor Application · ${status === "PENDING" ? "Pending" : "Action required"}`, to: "/vendor-registration" },
    { label: "My Profile", to: "/userprofile" }, { label: "My Bookings", to: "/bookingspage" },
    { label: "Notifications", to: "/notifications" }, { label: "Logout", action: logoutAction },
  ];
  if (status === "SUSPENDED") return [{ label: "My Profile", to: "/userprofile" }, { label: "Contact / Support", to: "/contact" }, { label: "Logout", action: logoutAction }];
  if (isVendorRole(role) || status === "APPROVED") return [
    { label: "Vendor Dashboard", to: "/vendor/dashboard" }, { label: "My Bookings", to: "/bookingspage" },
    { label: "Notifications", to: "/notifications" }, { label: "Logout", action: logoutAction },
  ];
  return [
    { label: "Become a Vendor", to: "/vendor-registration" }, { label: "My Profile", to: "/userprofile" },
    { label: "My Bookings", to: "/bookingspage" }, { label: "Notifications", to: "/notifications" },
    { label: "Contact / Support", to: "/contact" }, { label: "Logout", action: logoutAction },
  ];
}
