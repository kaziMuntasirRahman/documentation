/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#ff3811'
      }
    },
  },
  plugins: [require("daisyui")],
  themes: ["light", "dark", "cupcake"],
}
