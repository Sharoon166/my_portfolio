import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        geist: ["Geist Mono", "monospace"],
        caveat: ["Caveat", "serif"],
        poppins: ["Poppins", "serif"],
      },
      keyframes: {
        jump: {
          "0%": { transform: "translateY(0px)" },
          "30%": {
            transform: "translateY(0px)",
            animationTimingFunction: "ease-out",
          },
          "50%": {
            transform: "translateY(-200%)",
            animationTimingFunction: "ease-in",
          },
          "75%": {
            transform: "translateY(0px)",
            animationTimingFunction: "ease-in",
          },
        },
        morph: {
          "0%, 10%": { transform: "scaleY(1)" },
          "20%, 25%": {
            transform: "scaleY(0.6) scaleX(1.3)",
            animationTimingFunction: "ease-in-out",
          },
          "30%": {
            transform: "scaleY(1.15) scaleX(0.9)",
            animationTimingFunction: "ease-in-out",
          },
          "40%, 70%, 85%, 100%": { transform: "scaleY(1)" },
          "75%": { transform: "scaleY(0.8) scaleX(1.2)" },
        },
        twinkle: {
          "0%, 100%": {
            opacity: "0.2",
          },
          "50%": {
            opacity: "1",
          },
        },
        float: {
          "0%": {
            transform: "translate(0px, 0px) rotate(4deg)",
          },
          "25%": {
            transform: "translate(15px, -25px) rotate(-6deg)",
          },
          "50%": {
            transform: "translate(-12px, -40px) rotate(3deg)",
          },
          "75%": {
            transform: "translate(8px, -20px) rotate(-5deg)",
          },
          "100%": {
            transform: "translate(0px, 0px) rotate(4deg)",
          },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
