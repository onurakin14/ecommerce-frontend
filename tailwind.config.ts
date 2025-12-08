import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        "background-light": "#ffffff",
        "background-dark": "#101022",
        "border-light": "#e5e7eb",
        "border-dark": "#2d2d3d",
        "text-primary-light": "#111827",
        "text-primary-dark": "#f9fafb",
        "text-secondary-light": "#6b7280",
        "text-secondary-dark": "#9ca3af",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
      boxShadow: {
        soft: "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;