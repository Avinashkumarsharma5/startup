import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "node:url";

const projectDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
  },
  resolve: {
    alias: {
      "@": path.resolve(projectDir, "./src"),
    },
  },
});
