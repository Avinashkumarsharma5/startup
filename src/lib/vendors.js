import {
  addDoc,
  collection,
  db,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "./firebase";

export const VENDOR_STATUSES = ["PENDING", "APPROVED", "REJECTED", "SUSPENDED"];

export async function createVendorApplication(values, filesMeta = {}) {
  const vendorRef = await addDoc(collection(db, "vendorApplications"), {
    ...values,
    filesMeta,
    status: "PENDING",
    submittedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    reviewedAt: null,
    reviewedBy: "",
  });

  return vendorRef.id;
}

export async function fetchVendorApplications() {
  const snapshot = await getDocs(
    query(collection(db, "vendorApplications"), orderBy("submittedAt", "desc"))
  );

  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function updateVendorApplicationStatus(id, status, reviewerId) {
  await updateDoc(doc(db, "vendorApplications", id), {
    status,
    reviewedBy: reviewerId,
    reviewedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}
