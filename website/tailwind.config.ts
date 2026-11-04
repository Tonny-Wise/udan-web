import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-blue": "#1377a4",
        "brand-blue-dark": "#0e5779",
        "brand-blue-light": "#e8f3f8",
        "brand-green": "#63b849",
        "brand-green-dark": "#4f9738",
        "brand-green-light": "#f0f9ed",
        "brand-gold": "#c6ac62",
        "brand-gold-dark": "#a88e45",
        "brand-gold-light": "#faf6eb",
        "brand-navy": "#1e3559",
        "brand-navy-dark": "#131c33",
        "brand-charcoal": "#1b2238",
        "udan-green": "#63b849",
        "udan-green-accent": "#82d069",
        "udan-green-dark": "#4f9738",
        "udan-green-light": "#f0f9ed",
        "udan-blue": "#1377a4",
        "udan-gold": "#c6ac62",
        "udan-dark": "#131c33",
        "udan-light": "#f7f8fc",
      },
      fontFamily: {
        heading: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["Mulish", "system-ui", "sans-serif"],
      },
      spacing: {
        section: "6rem",
        "section-sm": "3rem",
      },
    },
  },
  plugins: [],
};

export default config;
