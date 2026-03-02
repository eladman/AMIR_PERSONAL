import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#FF8714",
        secondary: "#171717",
      },
      fontFamily: {
        sans: ["var(--font-heebo)", "sans-serif"],
      },
      keyframes: {
        "scroll-line": {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "50%": { transform: "scaleY(1)", transformOrigin: "top" },
          "50.1%": { transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "breathe": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.04" },
          "50%": { transform: "scale(1.08)", opacity: "0.07" },
        },
        "slow-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "scroll-line": "scroll-line 2s ease-in-out infinite",
        "marquee": "marquee 28s linear infinite",
        "breathe": "breathe 6s ease-in-out infinite",
        "slow-spin": "slow-spin 40s linear infinite",
        "shimmer": "shimmer 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
