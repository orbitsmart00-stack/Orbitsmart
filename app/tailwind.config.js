/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
      colors: {
        brand: {
          50: '#f4f6fb',
          100: '#e6eaf6',
          200: '#c3cee9',
          300: '#9fb2db',
          400: '#5c78bf',
          500: '#193f9e',
          600: '#173a8f',
          700: '#132f74',
          800: '#0f245a',
          900: '#0c1c46',
        },
        parchment: {
          50: '#fdfcf8',
          100: '#f8f4e9',
          200: '#efe6cd',
        },
      },
    },
  },
  plugins: [],
}
