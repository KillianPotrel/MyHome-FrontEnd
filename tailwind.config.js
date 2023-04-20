/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        famille: "url('../public/images/famille.jpg')",
      },
    },
  },
  plugins: [],
};
