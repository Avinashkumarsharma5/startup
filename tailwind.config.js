/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {

      // Sanskaraa Brand Colors
      colors: {
        royalRed: "#7A1A1A",
        gold: "#E8C871",
        goldDark: "#D4A455",
        goldLight: "#F3E5AB",
        darkBg: "#1a0505",
        offWhite: "#d4bd78ff",
        stone: "#5A3E2B"
      },

      // Brand Fonts
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        body: ["Inter", "Poppins", "sans-serif"],
      },

      backgroundImage: {
        "sanskaraa-pattern":
          "url('https://i.ibb.co/P6VZxGq/gold-pattern.png')",
        "gradient-royal":
          "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(122,26,26,0.9))",
      },

      boxShadow: {
        gold: "0 4px 15px rgba(232,200,113,0.35)",
        royal: "0 2px 10px rgba(122,26,26,0.4)",
      },

      animation: {
        "gold-glow": "goldGlow 1.6s infinite alternate ease-in-out",
      },

      keyframes: {
        goldGlow: {
          "0%": { textShadow: "0 0 5px rgba(232,200,113,0.5)" },
          "100%": { textShadow: "0 0 14px rgba(232,200,113,1)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".hide-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".hide-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
  ],
};
