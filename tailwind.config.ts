import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        cosmic: {
          purple: "hsl(267 84% 61%)",
          blue: "hsl(250 100% 60%)",
          pink: "hsl(280 100% 70%)",
        },
      },
      backgroundImage: {
        'cosmic-gradient': 'var(--cosmic-gradient)',
        'nebula-gradient': 'var(--nebula-gradient)',
        'starfield-gradient': 'var(--starfield-gradient)',
      },
      boxShadow: {
        'cosmic': 'var(--cosmic-shadow)',
        'glass': 'var(--glass-shadow)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "twinkle": {
          "0%, 100%": { opacity: "0.2", transform: "scale(1) rotate(0deg)" },
          "25%": { opacity: "0.8", transform: "scale(1.3) rotate(90deg)" },
          "50%": { opacity: "1", transform: "scale(1.1) rotate(180deg)" },
          "75%": { opacity: "0.6", transform: "scale(1.4) rotate(270deg)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-cosmic": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(267 84% 61% / 0.3)" },
          "50%": { boxShadow: "0 0 50px hsl(267 84% 61% / 0.8), 0 0 80px hsl(280 100% 70% / 0.6)" },
        },
        "aurora-flow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "25%": { backgroundPosition: "100% 50%" },
          "50%": { backgroundPosition: "100% 100%" },
          "75%": { backgroundPosition: "0% 100%" },
        },
        "galaxy-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "cosmic-drift": {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(10px, -5px) rotate(1deg)" },
          "50%": { transform: "translate(-5px, 10px) rotate(-1deg)" },
          "75%": { transform: "translate(-10px, -10px) rotate(0.5deg)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-out": {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-30px)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "scale-out": {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.8)" },
        },
        "bounce-in": {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "elastic-in": {
          "0%": { opacity: "0", transform: "scale(0) rotate(-360deg)" },
          "50%": { opacity: "1", transform: "scale(1.2) rotate(-180deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
        "text-shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(267 84% 61% / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(267 84% 61% / 0.6), 0 0 60px hsl(280 100% 70% / 0.4)" },
        },
        "typing": {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        "blink": {
          "0%, 50%": { borderColor: "transparent" },
          "51%, 100%": { borderColor: "hsl(var(--primary))" },
        },
        "morph": {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
        "levitate": {
          "0%, 100%": { transform: "translateY(0) rotateZ(0deg)" },
          "50%": { transform: "translateY(-20px) rotateZ(2deg)" },
        },
        "orbit": {
          "0%": { transform: "rotate(0deg) translateX(100px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(100px) rotate(-360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "accordion-up": "accordion-up 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "twinkle": "twinkle 4s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        "pulse-cosmic": "pulse-cosmic 3s ease-in-out infinite",
        "aurora-flow": "aurora-flow 8s ease-in-out infinite",
        "galaxy-rotate": "galaxy-rotate 20s linear infinite",
        "cosmic-drift": "cosmic-drift 6s ease-in-out infinite",
        "slide-in": "slide-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "slide-out": "slide-out 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "fade-in": "fade-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "fade-out": "fade-out 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        "scale-in": "scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "scale-out": "scale-out 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce-in": "bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "elastic-in": "elastic-in 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "text-shimmer": "text-shimmer 3s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "typing": "typing 3s steps(40) infinite",
        "blink": "blink 1s infinite",
        "morph": "morph 8s ease-in-out infinite",
        "levitate": "levitate 4s ease-in-out infinite",
        "orbit": "orbit 10s linear infinite",
        
        // Combined animations
        "enter": "fade-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "exit": "fade-out 0.5s cubic-bezier(0.4, 0, 0.2, 1), scale-out 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce-enter": "fade-in 0.8s ease-out, bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "elastic-enter": "fade-in 0.6s ease-out, elastic-in 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
