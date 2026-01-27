/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'light-100': '#f5f5f5',
        'light-200': '#eeeeee',
      },
    },
  },
  plugins: [],
};
