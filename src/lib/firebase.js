// src/firebase.js

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase Configuration
const defaultFirebaseConfig = {
  apiKey: "AIzaSyATLgJA5fmHCm8P0ENm-qnHC5AV4V4dxj4",
  authDomain: "sanskaraa-01.firebaseapp.com",
  projectId: "sanskaraa-01",
  storageBucket: "sanskaraa-01.firebasestorage.app",
  messagingSenderId: "877282572828",
  appId: "1:877282572828:web:ff2d0d52fcd6e9c13e3dd9",
  measurementId: "G-9ESJQ1H0CX",
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || defaultFirebaseConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || defaultFirebaseConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || defaultFirebaseConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || defaultFirebaseConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || defaultFirebaseConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || defaultFirebaseConfig.appId,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || defaultFirebaseConfig.measurementId,
};

const missingKeys = Object.entries(firebaseConfig)
  .filter(([key, value]) => key !== "measurementId" && !value)
  .map(([key]) => key);

const hasFirebaseConfig = missingKeys.length === 0;

if (import.meta.env.DEV) {
  console.group("Firebase config check");
  console.log("VITE_FIREBASE_API_KEY:", import.meta.env.VITE_FIREBASE_API_KEY ? "loaded from env" : "fallback used");
  console.log("Firebase API key value:", firebaseConfig.apiKey ? "present" : "missing");
  console.log("VITE_FIREBASE_AUTH_DOMAIN:", firebaseConfig.authDomain);
  console.log("VITE_FIREBASE_PROJECT_ID:", firebaseConfig.projectId);
  console.log("VITE_FIREBASE_STORAGE_BUCKET:", firebaseConfig.storageBucket);
  console.log("VITE_FIREBASE_MESSAGING_SENDER_ID:", firebaseConfig.messagingSenderId);
  console.log("VITE_FIREBASE_APP_ID:", firebaseConfig.appId);
  if (missingKeys.length > 0) {
    console.warn("Firebase config missing keys:", missingKeys.join(", "));
  }
  console.groupEnd();
}

let app;
let auth;
let db;
let storage;
let analytics = null;

if (hasFirebaseConfig) {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);

  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);

  // Analytics (Browser only)
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
} else {
  console.error(
    "❌ Firebase configuration missing. Check your .env file."
  );
}

export {
  app,
  auth,
  db,
  storage,
  analytics,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
};

export const isFirebaseConfigured = hasFirebaseConfig;