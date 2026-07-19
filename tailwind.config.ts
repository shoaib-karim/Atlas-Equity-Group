import type { Config } from "tailwindcss";

/**
 * Tailwind maps 1:1 to the design tokens declared in app/globals.css :root.
 * Utilities and raw CSS therefore speak one vocabulary. No hex values live here
 * or anywhere outside globals.css (design.md §10 styling law).
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "paper-raised": "var(--paper-raised)",
        "ink-wash": "var(--ink-wash)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "field-green": "var(--field-green)",
        "field-green-deep": "var(--field-green-deep)",
        "plat-line": "var(--plat-line)",
        "seal-brass": "var(--seal-brass)",
        error: "var(--error)",
        success: "var(--success)",

        /* shadcn/ui semantic names — aliased to Atlas tokens in globals.css */
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: { DEFAULT: "var(--card)", foreground: "var(--card-foreground)" },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      fontFamily: {
        caslon: "var(--font-caslon)",
        sans: "var(--font-public-sans)",
        mono: "var(--font-plex-mono)",
      },
      fontSize: {
        xs: "var(--text-xs)",
        sm: "var(--text-sm)",
        base: "var(--text-base)",
        lg: "var(--text-lg)",
        xl: "var(--text-xl)",
        "2xl": "var(--text-2xl)",
        "3xl": "var(--text-3xl)",
      },
      borderRadius: {
        card: "var(--radius-card)",
        btn: "var(--radius-btn)",
        input: "var(--radius-input)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
      },
      maxWidth: {
        container: "var(--container)",
        "container-narrow": "var(--container-narrow)",
      },
      spacing: {
        "section-y": "var(--section-y)",
      },
    },
  },
  // Tailwind ships its own `.container` with responsive max-widths that would
  // collide with ours in globals.css (ours only wins on source order, and
  // theirs would cap the site at 1280px). One definition, in globals.css.
  corePlugins: {
    container: false,
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
