/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        'prose': '75ch'
      },
      maxWidth: {
        'prose': '75ch'
      }
    }
  },
  plugins: []
};
