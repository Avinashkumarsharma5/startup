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
  where,
  writeBatch,
} from "./firebase";

export const VENDOR_STATUSES = ["PENDING", "APPROVED", "REJECTED", "SUSPENDED"];

export async function findExistingVendorApplicationForUser(userId) {
  if (!userId) return null;

  const snapshot = await getDocs(
    query(collection(db, "vendorApplications"), where("userId", "==", userId))
  );

  const applications = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
  if (!applications.length) return null;

  applications.sort((a, b) => {
    const aUpdated = a.updatedAt?.seconds ?? a.submittedAt?.seconds ?? 0;
    const bUpdated = b.updatedAt?.seconds ?? b.submittedAt?.seconds ?? 0;
    return bUpdated - aUpdated;
  });

  return applications[0];
}

export async function createVendorApplication(values, filesMeta = {}) {
  const userId = values.userId;
  if (!userId) {
    throw new Error("A logged-in user is required to submit a vendor application.");
  }

  const existing = await findExistingVendorApplicationForUser(userId);
  if (existing && existing.status !== "REJECTED") {
    throw new Error("A vendor application already exists for this user.");
  }

  const applicationData = {
    ...values,
    userId,
    filesMeta,
    status: "PENDING",
    submittedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    reviewedAt: null,
    reviewedBy: "",
  };

  if (existing) {
    await updateDoc(doc(db, "vendorApplications", existing.id), applicationData);
    return existing.id;
  }

  const vendorRef = await addDoc(collection(db, "vendorApplications"), applicationData);

  return vendorRef.id;
}

export async function fetchVendorApplications() {
  const snapshot = await getDocs(
    query(collection(db, "vendorApplications"), orderBy("submittedAt", "desc"))
  );

  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function updateVendorApplicationStatus(application, status, reviewerId) {
  const { id, userId } = application;
  const batch = writeBatch(db);
  const applicationRef = doc(db, "vendorApplications", id);
  const userRef = doc(db, "users", userId);
  const vendorRef = doc(db, "vendors", userId);

  batch.update(applicationRef, {
    status,
    reviewedBy: reviewerId,
    reviewedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  batch.set(userRef, {
    name: application.name || "",
    email: application.email || "",
    phone: application.phone || "",
    role: status === "APPROVED" ? "VENDOR" : "CUSTOMER",
    vendorApplicationId: id,
    vendorApplicationStatus: status,
    updatedAt: serverTimestamp(),
  }, { merge: true });

  if (status === "APPROVED") {
    batch.set(vendorRef, {
      applicationId: id,
      userId,
      name: application.name || "",
      email: application.email || "",
      phone: application.phone || "",
      vendorType: application.vendorType || "",
      location: application.location || "",
      services: Array.isArray(application.services) ? application.services : [],
      status: "APPROVED",
      approvedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } else {
    batch.delete(vendorRef);
  }

  await batch.commit();
}
