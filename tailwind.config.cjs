/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Epilogue", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        trybe: "url('/background.svg')",
        trybelight: "url('/background-light.svg')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
