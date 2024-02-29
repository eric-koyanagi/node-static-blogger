/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.pug', 
    './public/javascript/quillConfig.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: 'Oswald', 
        heading: 'Protest Guerrilla, ui-sans-serif'
      }
    },
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};