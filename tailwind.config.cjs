/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dab-bg': '#05060A',      // fondo principal
        'dab-surface': '#0B0D14', // tarjetas / secciones
        'dab-accent': '#4C7FFF',  // acento principal
        'dab-accent-soft': '#4C7FFF1A',
        'dab-text': '#E5E7EB',
        'dab-muted': '#9CA3AF',
        'dab-border': '#1F2933',
      },
      fontFamily: {
        display: ['Thunder', 'Impact', 'Arial Black', 'sans-serif'],
        body: ['Inter', 'system-ui', 'ui-sans-serif', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
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
        'dab-soft': '0 18px 45px rgba(0,0,0,0.45)',
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
