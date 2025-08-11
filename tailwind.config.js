/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // VERY important
  ],
  theme: {
    extend: {
      colors: {
        'deep-rose': '#660033',
        'light-rose': '#fccbd95e',
      }
    },
  },
  plugins: [],
};
