import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./frontend/src/**/*.{js,ts,jsx,tsx,mdx}",
    "./frontend/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./frontend/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ── Custom breakpoints ─────────────────────────────────────── */
      screens: {
        xs: "375px",   // Small phones (iPhone SE, older Android)
        "3xl": "1920px", // Ultra-wide monitors
      },

      /* ── Typography scale ───────────────────────────────────────── */
      fontSize: {
        display: ["82px", { lineHeight: "1.00", letterSpacing: "-2.05px", fontWeight: "400" }],
        h1: ["56px", { lineHeight: "0.95", letterSpacing: "-0.5px", fontWeight: "400" }],
        h2: ["56px", { lineHeight: "0.95", letterSpacing: "-0.5px", fontWeight: "400" }],
        h3: ["32px", { lineHeight: "1.15", fontWeight: "400" }],
        "card-title": ["30px", { lineHeight: "1.20", fontWeight: "400" }],
        "feature-title": ["24px", { lineHeight: "1.33", fontWeight: "400" }],
      },

      /* ── Brand color tokens ─────────────────────────────────────── */
      colors: {
        brand: {
          orange:       "#FF4800",
          "orange-alt": "#ff4d00",
          "orange-hover": "#e63f00",
          "orange-glow": "rgba(255,72,0,0.30)",
          dark:         "#121212",
          "soft-dark":  "#1a1a1a",
          surface:      "#1e1a3f",
          indigo:       "#2B2358",
          "indigo-deep": "#1e1a3f",
          light:        "#f8f8fc",
          muted:        "#6b7280",
        },
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
        input:  "hsl(var(--input))",
        ring:   "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },

      /* ── Extended spacing (fills Tailwind gaps for high-end layouts) */
      spacing: {
        "4.5": "1.125rem",
        "18":  "4.5rem",
        "22":  "5.5rem",
        "26":  "6.5rem",
        "30":  "7.5rem",
        "34":  "8.5rem",
        "38":  "9.5rem",
      },

      /* ── Minimum touch target sizes (WCAG 2.5.5) ───────────────── */
      minHeight: {
        touch: "44px",
      },
      minWidth: {
        touch: "44px",
      },

      /* ── Border radius ──────────────────────────────────────────── */
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      /* ── Box shadows ────────────────────────────────────────────── */
      boxShadow: {
        "brand-sm":  "0 4px 20px rgba(255,72,0,0.12)",
        "brand-md":  "0 8px 32px rgba(255,72,0,0.18)",
        "brand-lg":  "0 16px 48px rgba(255,72,0,0.24)",
        "card-rest": "0 4px 24px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.09), 0 0 0 1px rgba(255,72,0,0.12)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
