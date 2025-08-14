/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          500: "#1f7a99",
          600: "#155a73",
          700: "#0f4a5f",
        },
        secondary: {
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          500: "#1f7a99",
          600: "#155a73",
          700: "#0f4a5f",
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
