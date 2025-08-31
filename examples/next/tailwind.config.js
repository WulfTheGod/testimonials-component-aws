/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../../src/**/*.{js,ts,jsx,tsx}', // Include the main component
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1e293b',
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5', 
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}