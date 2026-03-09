import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Tüm /auth isteklerini dummyjson.com/auth/... yönlendirir
      "/auth": {
        target: "https://dummyjson.com",
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
});
