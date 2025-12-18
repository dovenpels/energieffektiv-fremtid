/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        'eef-base': '#131313',
        'eef-green': '#7ac893',
        'eef-purple': '#5835e4',
        'eef-blue': '#4b52ff',
        'eef-coral': '#FF7A5C',
        'eef-red': '#e4586b',
        'eef-yellow': '#f2cc55',
      },
      fontFamily: {
        'barlow': ['Barlow', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-out',
        'slide-up': 'slideUp 1s ease-out 0.5s backwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
