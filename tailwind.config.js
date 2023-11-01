/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.pug', 
    './public/javascript/quillConfig.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};