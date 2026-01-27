/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10b981",
        secondary: "#3b82f6",
        dark: {
          900: "#111827",
          800: "#1f2937",
        },
        light: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
        }
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0, 0, 0, 0.05)",
        navShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
      }
    },
  },
  plugins: [],
}
