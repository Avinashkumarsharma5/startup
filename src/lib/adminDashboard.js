import {
  collection,
  db,
  getDocs,
  orderBy,
  query,
} from "./firebase";

function timestampToDate(value) {
  if (!value) return null;
  if (typeof value?.toDate === "function") return value.toDate();
  if (typeof value?.seconds === "number") return new Date(value.seconds * 1000);
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDashboardDate(value) {
  const date = timestampToDate(value);
  return date ? date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—";
}

function sortNewest(rows) {
  return [...rows].sort((a, b) => {
    const left = timestampToDate(a.createdAt || a.submittedAt || a.updatedAt)?.getTime() || 0;
    const right = timestampToDate(b.createdAt || b.submittedAt || b.updatedAt)?.getTime() || 0;
    return right - left;
  });
}

export async function fetchAdminDashboardData() {
  const [leadSnapshot, vendorSnapshot, userSnapshot] = await Promise.all([
    getDocs(query(collection(db, "leads"), orderBy("createdAt", "desc"))),
    getDocs(query(collection(db, "vendorApplications"), orderBy("submittedAt", "desc"))),
    getDocs(collection(db, "users")),
  ]);

  const leads = leadSnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
  const vendors = vendorSnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
  const users = userSnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));

  const bookingGroups = await Promise.all(
    users.map(async (user) => {
      const snapshot = await getDocs(
        query(collection(db, "users", user.id, "bookings"), orderBy("createdAt", "desc"))
      );
      return snapshot.docs.map((item) => ({
        id: item.id,
        customerId: user.id,
        ...item.data(),
      }));
    })
  );
  const bookings = bookingGroups.flat();

  const todayKey = new Date().toLocaleDateString("en-CA");
  const followUpsToday = leads.filter((lead) => {
    const followUp = timestampToDate(lead.nextFollowUpAt);
    return followUp?.toLocaleDateString("en-CA") === todayKey;
  });

  const revenue = bookings.reduce((total, booking) => {
    const status = String(booking.paymentStatus || "").toUpperCase();
    if (!["PAID", "PARTIAL", "COMPLETED"].includes(status)) return total;
    const amount = Number(booking.amount || booking.total || booking.price || 0);
    return total + (Number.isFinite(amount) ? amount : 0);
  }, 0);

  return {
    leads,
    vendors,
    users,
    bookings,
    followUpsToday,
    revenue,
    stats: {
      totalLeads: leads.length,
      newLeads: leads.filter((lead) => lead.status === "NEW").length,
      totalBookings: bookings.length,
      confirmedBookings: bookings.filter((booking) =>
        ["CONFIRMED", "confirmed", "PAID"].includes(booking.bookingStatus || booking.status)
      ).length,
      totalCustomers: users.filter((user) => !["VENDOR", "PANDIT", "ADMIN", "STAFF", "SUPER_ADMIN"].includes(String(user.role || "").toUpperCase())).length,
      totalVendors: vendors.length,
      pendingVendors: vendors.filter((vendor) => String(vendor.status || "PENDING").toUpperCase() === "PENDING").length,
    },
    recentLeads: sortNewest(leads).slice(0, 6),
    recentBookings: sortNewest(bookings).slice(0, 6),
    pendingVendors: vendors.filter((vendor) => String(vendor.status || "PENDING").toUpperCase() === "PENDING").slice(0, 6),
  };
}
