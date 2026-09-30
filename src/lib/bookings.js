import { requireSupabase } from "./supabase";
import { getCurrentUser } from "./supabaseAuth";

const uiToDbStatus = {
  pending: "PENDING", confirmed: "CONFIRMED", assigned: "ASSIGNED", accepted: "ACCEPTED",
  on_the_way: "ON_THE_WAY", arrived: "ARRIVED", in_progress: "IN_PROGRESS", completed: "COMPLETED",
  cancelled: "CANCELLED", rejected: "REJECTED",
};

function toUiBooking(row) {
  let detail = {};
  try { detail = row.notes ? JSON.parse(row.notes) : {}; } catch { detail = { notes: row.notes }; }
  const state = String(row.booking_status || "PENDING");
  return {
    ...detail,
    id: row.id,
    userId: row.customer_id,
    event: detail.event || row.booking_type,
    service: detail.service || row.booking_type,
    date: row.event_date,
    time: row.start_time,
    address: row.address,
    status: state.charAt(0) + state.slice(1).toLowerCase().replaceAll("_", " "),
    totalAmount: Number(row.total_amount || 0),
    paymentStatus: row.payment_status,
    createdAt: row.created_at,
    providerId: row.provider_id,
  };
}

function toPostgresTime(value) {
  if (!value) return null;
  const match = String(value).match(/(\d{1,2}):(\d{2})(?:\s*(AM|PM))?/i);
  if (!match) return null;
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const meridiem = match[3]?.toUpperCase();
  if (minutes > 59 || hours > 23) return null;
  if (meridiem) { if (hours < 1 || hours > 12) return null; hours = hours % 12 + (meridiem === "PM" ? 12 : 0); }
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
}

export async function saveUserBooking(booking) {
  const client = requireSupabase();
  const user = await getCurrentUser();
  if (!user) throw new Error("You must be signed in to save a booking.");
  const amount = Number(booking.totalAmount ?? booking.amount ?? booking.total ?? 0);
  if (!Number.isFinite(amount) || amount < 0) throw new Error("The booking amount is invalid.");
  const serviceId = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(booking.serviceId || ""))
    ? booking.serviceId
    : null;
  const { data, error } = await client.from("bookings").insert({
    customer_id: user.id,
    service_id: serviceId,
    booking_type: String(booking.type || booking.service || booking.event || "service"),
    event_date: booking.date || null,
    start_time: toPostgresTime(booking.time),
    address: booking.address || null,
    city: booking.city || null,
    state: booking.state || null,
    pincode: booking.pincode || null,
    notes: JSON.stringify({ ...booking, id: undefined, userId: undefined, status: undefined, totalAmount: undefined }),
    subtotal: amount,
    total_amount: amount,
    booking_status: "PENDING",
    payment_status: "UNPAID",
  }).select("id").single();
  if (error) throw error;
  return data.id;
}

export async function fetchUserBookings(uid) {
  const { data, error } = await requireSupabase().from("bookings").select("*").eq("customer_id", uid).order("created_at", { ascending: false });
  if (error) throw error;
  return data.map(toUiBooking);
}

export async function fetchProviderBookings(uid) {
  const { data, error } = await requireSupabase().from("bookings").select("*").eq("provider_id", uid).order("created_at", { ascending: false }).limit(100);
  if (error) throw error;
  return data.map(toUiBooking);
}

export function subscribeToProviderBookings(uid, onChange, onError) {
  const client = requireSupabase();
  let active = true;
  const refresh = async () => {
    try { const rows = await fetchProviderBookings(uid); if (active) onChange(rows); }
    catch (error) { if (active) onError?.(error); }
  };
  void refresh();
  const channel = client.channel(`provider-bookings:${uid}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "bookings", filter: `provider_id=eq.${uid}` }, refresh)
    .subscribe((status, error) => { if (status === "CHANNEL_ERROR" && active) onError?.(error || new Error("Booking updates could not be subscribed.")); });
  return () => { active = false; void client.removeChannel(channel); };
}

export function subscribeToUserBookings(uid, onChange, onError) {
  const client = requireSupabase();
  let active = true;
  const refresh = async () => {
    try { const rows = await fetchUserBookings(uid); if (active) onChange(rows); }
    catch (error) { if (active) onError?.(error); }
  };
  void refresh();
  const channel = client.channel(`customer-bookings:${uid}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "bookings", filter: `customer_id=eq.${uid}` }, refresh)
    .subscribe((status, error) => { if (status === "CHANNEL_ERROR" && active) onError?.(error || new Error("Booking updates could not be subscribed.")); });
  return () => { active = false; void client.removeChannel(channel); };
}

export async function updateUserBooking(bookingId, changes) {
  const status = changes?.booking_status || uiToDbStatus[String(changes?.status || "").toLowerCase().replaceAll(" ", "_")];
  if (!status) throw new Error("Booking details cannot be edited after submission.");
  const { data, error } = await requireSupabase().rpc("transition_booking", {
    p_booking_id: bookingId, p_next: status, p_reason: changes.cancellation_reason || null,
  });
  if (error) throw error;
  return toUiBooking(data);
}

export async function updatePendingBookingDetails(booking) {
  if (!booking?.id) throw new Error("Booking ID is required.");
  const { data, error } = await requireSupabase().rpc("update_pending_booking_details", {
    p_booking_id: booking.id,
    p_event_date: booking.date || null,
    p_start_time: toPostgresTime(booking.time),
    p_address: booking.address || null,
    p_notes: booking.notes || null,
  });
  if (error) throw error;
  return toUiBooking(data);
}

export async function deleteUserBooking(bookingId) {
  return updateUserBooking(bookingId, { status: "cancelled", cancellation_reason: "Cancelled by customer" });
}
