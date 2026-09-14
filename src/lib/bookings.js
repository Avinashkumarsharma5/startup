import {
  auth,
  db,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "./firebase";

const bookingsCollection = (uid) => collection(db, "users", uid, "bookings");

export async function saveUserBooking(booking) {
  const user = auth.currentUser;
  if (!user) throw new Error("You must be signed in to save a booking.");

  const bookingId = String(booking.id || `BK${Date.now()}`);
  await setDoc(doc(bookingsCollection(user.uid), bookingId), {
    ...booking,
    id: bookingId,
    userId: user.uid,
    purchaser: {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email || "",
      phone: user.phoneNumber || "",
    },
    updatedAt: serverTimestamp(),
    createdAt: booking.createdAt || serverTimestamp(),
  });
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
  await updateDoc(doc(bookingsCollection(user.uid), String(bookingId)), {
    ...changes,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteUserBooking(bookingId) {
  const user = auth.currentUser;
  if (!user) throw new Error("You must be signed in to delete a booking.");
  await deleteDoc(doc(bookingsCollection(user.uid), String(bookingId)));
}
