/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@strongorange/ds-ui/tailwind.preset")],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@strongorange/ds-ui/dist/**/*.{js,mjs}",
  ],
  plugins: [],
};
