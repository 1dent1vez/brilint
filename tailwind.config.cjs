/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brilint-bg': '#05060A',      // fondo principal
        'brilint-surface': '#0B0D14', // tarjetas / secciones
        'brilint-accent': '#4C7FFF',  // acento principal
        'brilint-accent-soft': '#4C7FFF1A',
        'brilint-text': '#E5E7EB',
        'brilint-muted': '#9CA3AF',
        'brilint-border': '#1F2933',
      },
      fontFamily: {
        sans: ['system-ui', 'ui-sans-serif', 'Inter', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      spacing: {
       'xs': '0.25rem',
  'sm': '0.5rem',
  'md': '1rem',
  'lg': '1.5rem',
  'xl': '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  'section-y': '6rem',
  'section-y-md': '8rem',
      },
      boxShadow: {
        'brilint-soft': '0 18px 45px rgba(0,0,0,0.45)',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '250ms',
        slow: '400ms',
      },
    },
  },
  plugins: [],
};
