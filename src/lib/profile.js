import {
  auth,
  db,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "./firebase";

export function profileFromAuthUser(user) {
  return {
    uid: user.uid,
    name: user.displayName || "",
    email: user.email || "",
    phone: user.phoneNumber || "",
    profileImage: user.photoURL || "",
  };
}

export async function getOrCreateUserProfile(user) {
  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);
  const authProfile = profileFromAuthUser(user);

  if (!snapshot.exists()) {
    const profile = {
      ...authProfile,
      dateOfBirth: "",
      gender: "",
      address: "",
      city: "",
      state: "",
      phoneVerified: false,
      role: "CUSTOMER",
      accountStatus: "ACTIVE",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(userRef, profile);
    return profile;
  }

  const profile = { ...authProfile, ...snapshot.data() };
  await setDoc(userRef, {
    name: authProfile.name || snapshot.data().name || "",
    email: authProfile.email || snapshot.data().email || "",
    profileImage: authProfile.profileImage || snapshot.data().profileImage || "",
    updatedAt: serverTimestamp(),
  }, { merge: true });
  return profile;
}

export async function updateUserProfile(uid, changes) {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, { ...changes, updatedAt: serverTimestamp() });
  const snapshot = await getDoc(userRef);
  return snapshot.data();
}

export function persistProfile(profile) {
  localStorage.setItem("loggedInUser", JSON.stringify({
    ...profile,
    isLoggedIn: true,
  }));
}

export function getCurrentAuthUser() {
  return auth.currentUser;
}
