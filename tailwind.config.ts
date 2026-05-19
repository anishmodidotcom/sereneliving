import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "2rem",
        lg: "3rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        sage: {
          DEFAULT: "#83896F",
          deep: "#6B7159",
          light: "#ACAF9E",
        },
        cream: {
          DEFAULT: "#F5F1EA",
          warm: "#EFE7D6",
        },
        sand: "#D9CFBE",
        terracotta: "#B8704F",
        ink: {
          DEFAULT: "#2C2C2A",
          soft: "#5C5C56",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      fontSize: {
        eyebrow: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.32em" }],
      },
      letterSpacing: {
        eyebrow: "0.32em",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.08) translate(-1%, -1%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 800ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "ken-burns": "ken-burns 18s ease-out both",
      },
    },
  },
  plugins: [animate],
};

export default config;
