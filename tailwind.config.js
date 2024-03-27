/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        card:"repeat(auto-fit , minmax(280px,1fr))"
      }
    },
  },
  plugins: [],
}