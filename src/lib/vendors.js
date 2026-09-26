import {
  collection,
  auth,
  db,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  serverTimestamp,
  updateDoc,
  writeBatch,
  getDoc,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  where,
} from "./firebase";

export const VENDOR_STATUSES = ["PENDING", "APPROVED", "REJECTED", "SUSPENDED"];

export async function createVendorApplication(values, files = {}) {
  const user = auth.currentUser;
  if (!user) throw new Error("Sign in before submitting a vendor application.");

  const previousApplications = await getDocs(
    query(
      collection(db, "vendorApplications"),
      where("userId", "==", user.uid)
    )
  );
  if (previousApplications.docs.some((item) => item.data().status !== "REJECTED")) {
    throw new Error("You already have a vendor application under review or approved.");
  }

  const applicationRef = doc(collection(db, "vendorApplications"));
  const filesMeta = {};
  const uploadedPaths = [];

  try {
    for (const [category, categoryFiles] of Object.entries(files)) {
      filesMeta[category] = [];
      for (const file of categoryFiles || []) {
        if (file.size >= 5 * 1024 * 1024) {
          throw new Error(`${file.name} exceeds the 5 MB upload limit.`);
        }
        if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
          throw new Error(`${file.name} must be a JPG, PNG, or PDF file.`);
        }

        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const path = `vendor-kyc/${user.uid}/${applicationRef.id}/${category}/${safeName}`;
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, file, { contentType: file.type });
        uploadedPaths.push(path);
        filesMeta[category].push({
          name: file.name,
          path,
          url: await getDownloadURL(storageRef),
        });
      }
    }

    await setDoc(applicationRef, {
      userId: user.uid,
      name: String(values.name || "").trim(),
      phone: user.phoneNumber || "",
      email: String(values.email || "").trim(),
      location: String(values.location || "").trim(),
      vendorType: String(values.vendorType || ""),
      services: Array.isArray(values.services) ? values.services : [],
      experience: Number(values.experience || 0),
      certifications: String(values.certifications || ""),
      pricing: String(values.pricing || ""),
      gst: String(values.gst || ""),
      vendorId: String(values.vendorId || ""),
      estimatedApproval: values.estimatedApproval || "",
      additionalInfo: String(values.additionalInfo || ""),
      filesMeta,
      status: "PENDING",
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      reviewedAt: null,
      reviewedBy: "",
    });
  } catch (error) {
    await Promise.all(uploadedPaths.map(async (path) => {
      try {
        await deleteObject(ref(storage, path));
      } catch (cleanupError) {
        console.error("Failed to clean up incomplete vendor document upload:", cleanupError);
      }
    }));
    throw error;
  }

  return applicationRef.id;
}

export async function fetchVendorApplications() {
  const snapshot = await getDocs(
    query(collection(db, "vendorApplications"), orderBy("submittedAt", "desc"))
  );

  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function updateVendorApplicationStatus(id, status, reviewerId) {
  if (!VENDOR_STATUSES.includes(status)) {
    throw new Error("Invalid vendor application status.");
  }
  const applicationRef = doc(db, "vendorApplications", id);
  const applicationSnapshot = await getDoc(applicationRef);
  if (!applicationSnapshot.exists()) {
    throw new Error("Vendor application not found.");
  }
  const application = applicationSnapshot.data();
  const batch = writeBatch(db);

  batch.update(applicationRef, {
    status,
    reviewedBy: reviewerId,
    reviewedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  if (status === "APPROVED" && application.userId) {
    batch.set(doc(db, "users", application.userId), {
      role: "VENDOR",
      vendorStatus: "APPROVED",
      updatedAt: serverTimestamp(),
    }, { merge: true });
    batch.set(doc(db, "vendors", application.userId), {
      uid: application.userId,
      name: application.name || "",
      email: application.email || "",
      phone: application.phone || "",
      vendorType: application.vendorType || "",
      services: application.services || [],
      location: application.location || "",
      status: "APPROVED",
      applicationId: id,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  }

  if (["REJECTED", "SUSPENDED"].includes(status) && application.userId) {
    batch.set(doc(db, "users", application.userId), {
      role: "CUSTOMER",
      vendorStatus: status,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    batch.set(doc(db, "vendors", application.userId), {
      status,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  }

  await batch.commit();
}
