/** @type {import('tailwindcss').Config} */
const url =
  process.env.NODE_ENV === "production"
    ? "images/famille.jpg"
    : "/public/images/famille.jpg";
console.log(process.env.NODE_ENV);

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        famille: `url('${url}')`,
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
