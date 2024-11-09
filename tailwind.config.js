/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBackground: "#f5f5f5",
        primaryGreen: "#3C7E40",
        secondaryGreen: "#E1F5EB",
        white: "#ffffff",
        borderGray: "#E4EBE7",
        tableText: "#5E6A71",
      },
    },
  },
  plugins: [],
};
