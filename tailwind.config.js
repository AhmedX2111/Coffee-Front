/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f6',
          100: '#fce8e0',
          200: '#f8d1c1',
          300: '#f4baa2',
          400: '#f0a383',
          500: '#d97c5c',
          600: '#c66b4d',
          700: '#b35a3e',
          800: '#8b4830',
          900: '#6a3822',
        },
        secondary: {
          50: '#f5faf9',
          100: '#dfeeed',
          200: '#c0ddd9',
          300: '#a0ccc5',
          400: '#80bbb1',
          500: '#66a897',
          600: '#4d917e',
          700: '#347a65',
          800: '#1b634c',
          900: '#0e4c33',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in',
        slideIn: 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
