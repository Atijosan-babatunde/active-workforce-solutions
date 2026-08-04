import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E1526",
        navy: "#0B1836",
        navy2: "#132A54",
        navydeep: "#060C1C",
        gold: "#C9962E",
        golddark: "#9C7420",
        goldtint: "#FBF1DD",
        silver: "#9AA7B5",
        silvertint: "#EEF1F4",
        sand: "#F7F7F5",
        line: "#E4E3DE",
        muted: "#5B6472",
        // Muted accent set used only for icon badges — gives visual variety
        // without breaking from the navy/gold/silver brand identity
        sage: "#4F8A6D",
        sagetint: "#E7F2EC",
        rose: "#B8666B",
        rosetint: "#F6E9EA",
        sky: "#3F6C9E",
        skytint: "#E7EDF5",
        // kept as aliases so existing component code (teal/brass) still resolves to the real brand colors
        teal: "#0B1836",
        tealdark: "#060C1C",
        tealtint: "#EEF1F4",
        brass: "#C9962E",
        brasstint: "#FBF1DD",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
      borderRadius: {
        card: "10px",
      },
    },
  },
  plugins: [],
};
export default config;
