/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Black & Gold Theme (Primary)
        luxury: {
          50: "#F5E6B3",
          100: "#E8D49E",
          200: "#DCC389",
          300: "#C9AD70",
          400: "#D4AF37",
          500: "#BFA030",
          600: "#997F26",
          700: "#735F1D",
          800: "#4D3F13",
          900: "#261F0A",
        },
        royal: {
          50: "#F5F5F5",
          100: "#E8E8E8",
          200: "#D9D9D9",
          300: "#ADADAD",
          400: "#888888",
          500: "#696969",
          600: "#505050",
          700: "#313131",
          800: "#123C69",
          900: "#0B1F3A",
        },
        emerald: {
          50: "#ECFDF5",
          100: "#D6FAE8",
          200: "#B4F7D6",
          300: "#81EEB9",
          400: "#49E39A",
          500: "#10B981",
          600: "#0D966B",
          700: "#0A7356",
          800: "#065040",
          900: "#0F172A",
        },
        purple: {
          50: "#F5F3FF",
          100: "#EBE9FE",
          200: "#DAD2FF",
          300: "#BEA3FF",
          400: "#9F75FF",
          500: "#7C3AED",
          600: "#662ED0",
          700: "#5024A3",
          800: "#331966",
          900: "#1E1B4B",
        },
        background: "#0A0A0A",
        surface: "#111111",
        "surface-light": "#1A1A1A",
        "text-primary": "#FFFFFF",
        "text-secondary": "#D9D9D9",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0)" },
          "50%": { boxShadow: "0 0 30px rgba(212, 175, 55, 0.5)" },
        },
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
