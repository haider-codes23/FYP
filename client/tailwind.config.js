/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F53850',
        'secondary': '#A390E4',
        'rose': '#F43F5E',
      }
    },
  },
  plugins: [],
}

