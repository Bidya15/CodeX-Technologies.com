import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: VITE_BASE_PATH || "/CodeX-Technologies.com",
  server: {
    proxy: {
      "/api": "http://localhost:5000", // Proxy /api requests to backend
    },
  },
});
