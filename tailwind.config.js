/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{js,ts,jsx,tsx,css}",
  ],
  
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }), 
    require('tailwind-scrollbar-hide'),
  ],
}
