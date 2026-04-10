/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sakura: {
          light: '#FFB7C5',
          DEFAULT: '#FF8FAB',
          dark: '#FF6B8A',
        }
      }
    },
  },
  plugins: [],
}