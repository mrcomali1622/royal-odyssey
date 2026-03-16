/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'sans-serif'],
      },
      colors: {
        forest: '#1B4332',
        gold: '#D4AF37',
        cream: '#FAF7F0',
      }
    },
  },
  plugins: [],
}
