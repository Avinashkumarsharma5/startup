import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const firebaseKeys = [
    "VITE_FIREBASE_API_KEY",
    "VITE_FIREBASE_AUTH_DOMAIN",
    "VITE_FIREBASE_PROJECT_ID",
    "VITE_FIREBASE_STORAGE_BUCKET",
    "VITE_FIREBASE_MESSAGING_SENDER_ID",
    "VITE_FIREBASE_APP_ID",
    "VITE_FIREBASE_MEASUREMENT_ID",
  ];

  const firebaseEnvStatus = Object.fromEntries(
    firebaseKeys.map((key) => [key, Boolean(env[key]?.trim())])
  );

  console.log("🔥 Firebase ENV STATUS:", firebaseEnvStatus);

  const missing = firebaseKeys.filter((key) => !env[key]?.trim());

  if (missing.length > 0) {
    throw new Error(
      `Missing Firebase build environment variables: ${missing.join(", ")}`
    );
  }

  return {
    plugins: [react()],

    server: {
      host: "localhost",
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
