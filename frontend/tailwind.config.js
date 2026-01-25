/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", "[data-theme='dark']"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // Screens directly yahan define kar do
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      "custom-md": "1080px", // 1080px breakpoint
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        baloo: ['"Baloo 2"', "cursive"],
        tiro: ['"Tiro Devanagari Hindi"', "serif"],
        noto: ['"Noto Sans Devanagari"', "sans-serif"],
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-scale": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.3)" },
        },
      },
      animation: {
        scroll: "scroll 30s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        float: "float 2s ease-in-out infinite",
        "pulse-scale": "pulse-scale 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
