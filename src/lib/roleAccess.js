import { auth, db, collection, doc, getDoc, getDocs, query, where } from "./firebase";

export const ROLE = {
  CUSTOMER: "CUSTOMER",
  VENDOR: "VENDOR",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
  STAFF: "STAFF",
};

export const ADMIN_ROLES = [ROLE.ADMIN, ROLE.SUPER_ADMIN];
export const STAFF_ROLES = [ROLE.STAFF];

export function normalizeRole(value) {
  return String(value ?? "").trim().toUpperCase();
}

export function getRoleFromProfile(profile) {
  const role = normalizeRole(profile?.role);
  return role || ROLE.CUSTOMER;
}

export function isAdminRole(role) {
  const normalized = normalizeRole(role);
  return ADMIN_ROLES.includes(normalized) || STAFF_ROLES.includes(normalized);
}

export function isStaffRole(role) {
  return normalizeRole(role) === ROLE.STAFF;
}

export function isVendorRole(role) {
  return normalizeRole(role) === ROLE.VENDOR;
}

export function isCustomerRole(role) {
  const normalized = normalizeRole(role);
  return normalized === ROLE.CUSTOMER || !normalized;
}

export async function getCurrentUserProfile() {
  if (!auth.currentUser) return null;
  const userRef = doc(db, "users", auth.currentUser.uid);
  const snapshot = await getDoc(userRef);
  return snapshot.exists() ? { uid: auth.currentUser.uid, ...snapshot.data() } : null;
}

export async function getVendorApplicationForUser(uid) {
  if (!uid) return null;

  const applicationsQuery = query(
    collection(db, "vendorApplications"),
    where("userId", "==", uid)
  );

  const snapshot = await getDocs(applicationsQuery);
  const applications = snapshot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    ...docSnapshot.data(),
  }));

  applications.sort((a, b) => {
    const aValue = a.updatedAt?.seconds ?? a.submittedAt?.seconds ?? 0;
    const bValue = b.updatedAt?.seconds ?? b.submittedAt?.seconds ?? 0;
    return bValue - aValue;
  });

  return applications[0] ?? null;
}

export function getMoreMenuItems({ profile, vendorApplication, logoutAction }) {
  const role = getRoleFromProfile(profile);
  const applicationStatus = String(
    vendorApplication?.status || profile?.vendorApplicationStatus || ""
  ).toUpperCase();

  if (role === ROLE.ADMIN || role === ROLE.SUPER_ADMIN) {
    return [
      { label: "Admin Dashboard", to: "/admin/dashboard" },
      { label: "Vendor Approvals", to: "/admin/vendors" },
      { label: "Leads", to: "/admin/leads" },
      { label: "Analytics", to: "/admin/analytics" },
      { label: "Profile", to: "/userprofile" },
      { label: "Notifications", to: "/notifications" },
      { label: "Logout", action: logoutAction },
    ];
  }

  if (role === ROLE.STAFF) {
    return [
      { label: "Admin Dashboard", to: "/admin/dashboard" },
      { label: "Leads", to: "/admin/leads" },
      { label: "Profile", to: "/userprofile" },
      { label: "Notifications", to: "/notifications" },
      { label: "Logout", action: logoutAction },
    ];
  }

  if (applicationStatus === "PENDING" || applicationStatus === "REJECTED") {
    return [
      { label: `Vendor Application · ${applicationStatus === "PENDING" ? "Pending" : "Action required"}`, to: "/vendor-registration" },
      { label: "My Profile", to: "/userprofile" },
      { label: "My Bookings", to: "/bookingspage" },
      { label: "Notifications", to: "/notifications" },
      { label: "Logout", action: logoutAction },
    ];
  }

  if (applicationStatus === "SUSPENDED") {
    return [
      { label: "My Profile", to: "/userprofile" },
      { label: "Contact / Support", to: "/contact" },
      { label: "Logout", action: logoutAction },
    ];
  }

  if (role === ROLE.VENDOR || applicationStatus === "APPROVED") {
    return [
      { label: "Vendor Dashboard", to: "/vendor/dashboard" },
      { label: "My Bookings", to: "/bookingspage" },
      { label: "Notifications", to: "/notifications" },
      { label: "Logout", action: logoutAction },
    ];
  }

  return [
    { label: "Become a Vendor", to: "/vendor-registration" },
    { label: "My Profile", to: "/userprofile" },
    { label: "My Bookings", to: "/bookingspage" },
    { label: "Notifications", to: "/notifications" },
    { label: "Contact / Support", to: "/contact" },
    { label: "Logout", action: logoutAction },
  ];
}
