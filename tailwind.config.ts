import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      bgDark: "#070217",
      bgSecondary: "#0A0029",
      accent: "#FFCB05",
      textSecondary: "#CCCCCC",
      textAccent: "#444444",
      white: "#ffffff",
      fire: "#BE5649",
      water: "#0DAFD9",
      grass: "#7AC74C",
      electric: "#FFB759",
      hp: "#FF6969",
      defence: "#FAE078",
      attack: "#F5AC78",
      speed: "#FA92B2",
      flying: "#9DB7F5",
      darkGray: "#464646",
    },
    fontFamily: {
      heading: "var(--heading-font)",
      body: "var(--body-font)",
      accent: "var(--accent-font)",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
