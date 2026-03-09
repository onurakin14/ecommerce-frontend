/**
 * Backend API base URL.
 * .env'de VITE_API_URL tanımlı olmalı (örn. http://localhost:3000)
 */
export const API_BASE =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL
    ? (import.meta.env.VITE_API_URL as string).replace(/\/$/, "")
    : "http://localhost:3000";

export function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${p}`;
}
