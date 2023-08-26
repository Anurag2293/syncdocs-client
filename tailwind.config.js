/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'editor-white' : '#f3f3f3'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

