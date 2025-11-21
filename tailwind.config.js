/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8E7",
        saffron: "#D4A017", 
        brown: "#5A3E2B",
        maroon: "#7F1D1D",
        temple: "#F59E0B",
        holy: "#FDE047",
        pooja: "#E63946",
        royal: "#0F1D4A"
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

