// Central backend API base URL configuration
// In production (Netlify / Vercel), set VITE_API_BASE_URL to your deployed Express backend URL
// Example: VITE_API_BASE_URL=https://your-backend.onrender.com

const rawEnvUrl = (import.meta.env.VITE_API_BASE_URL || "").trim().replace(/\/+$/, "");
const backendOrigin = rawEnvUrl.replace(/\/api$/i, "");

const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

export const API_BASE_URL = backendOrigin
  ? `${backendOrigin}/api`
  : isLocalhost
    ? "http://localhost:5000/api"
    : "/api";

