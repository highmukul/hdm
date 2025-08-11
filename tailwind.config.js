/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'media'
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4F46E5',
          DEFAULT: '#4338CA',
          dark: '#3730A3',
        },
        secondary: '#10B981',
        background: {
          light: '#F9FAFB',
          dark: '#111827',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#1F2937',
        },
        on: {
          background: {
            light: '#1F2937',
            dark: '#F9FAFB',
          },
          surface: {
            light: '#111827',
            dark: '#FFFFFF',
          }
        }
      },
    },
  },
  plugins: [],
}
