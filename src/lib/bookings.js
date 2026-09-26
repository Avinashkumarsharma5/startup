import {
  auth,
  db,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  writeBatch,
  serverTimestamp,
} from "./firebase";

const bookingsCollection = (uid) => collection(db, "users", uid, "bookings");

export async function saveUserBooking(booking) {
  const user = auth.currentUser;
  if (!user) throw new Error("You must be signed in to save a booking.");

  const bookingId = String(booking.id || `BK${Date.now()}`);
  const payload = {
    ...booking,
    id: bookingId,
    userId: user.uid,
    customerId: user.uid,
    bookingStatus: "PENDING",
    paymentStatus: "UNPAID",
    status: "Pending",
    vendorId: "",
    panditId: "",
    purchaser: {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email || "",
      phone: user.phoneNumber || "",
    },
    updatedAt: serverTimestamp(),
    createdAt: booking.createdAt || serverTimestamp(),
  };
  const batch = writeBatch(db);
  batch.set(doc(bookingsCollection(user.uid), bookingId), payload);
  batch.set(doc(collection(db, "bookings"), bookingId), payload);
  await batch.commit();
  return bookingId;
}

export function subscribeToUserBookings(uid, onChange, onError) {
  const bookingsQuery = query(
    bookingsCollection(uid),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(
    bookingsQuery,
    (snapshot) => onChange(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))),
    onError
  );
}

export async function updateUserBooking(bookingId, changes) {
  const user = auth.currentUser;
  if (!user) throw new Error("You must be signed in to update a booking.");
  const allowedChanges = {};
  for (const field of ["event", "date", "time", "address", "notes"]) {
    if (Object.prototype.hasOwnProperty.call(changes, field)) {
      allowedChanges[field] = changes[field];
    }
  }
  if (changes.status && ["cancelled", "canceled", "CANCELLED"].includes(changes.status)) {
    allowedChanges.status = "Cancelled";
    allowedChanges.bookingStatus = "CANCELLED";
  }

  if (!Object.keys(allowedChanges).length) {
    throw new Error("Only booking details or cancellation can be updated by the customer.");
  }

  const update = { ...allowedChanges, updatedAt: serverTimestamp() };
  const customerBookingRef = doc(bookingsCollection(user.uid), String(bookingId));
  const canonicalBookingRef = doc(collection(db, "bookings"), String(bookingId));
  const canonicalSnapshot = await getDoc(canonicalBookingRef);
  const batch = writeBatch(db);
  batch.update(customerBookingRef, update);
  if (canonicalSnapshot.exists()) {
    batch.update(canonicalBookingRef, update);
  }
  await batch.commit();
}

export async function deleteUserBooking(bookingId) {
  await updateUserBooking(bookingId, { status: "CANCELLED" });
}
