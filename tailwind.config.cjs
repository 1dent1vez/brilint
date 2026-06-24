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
        'dab-surface-elevated': '#11131C',
        'dab-accent': '#4C7FFF',  // acento principal
        'dab-accent-soft': 'rgba(76, 127, 255, 0.1)',
        'dab-accent-warm': '#FF7A59', // glow decorativo cálido
        'dab-text': '#E5E7EB',
        'dab-muted': '#9CA3AF',
        'dab-border': '#1F2933',
        'dab-rose': '#F43F5E',
        'dab-amber': '#F59E0B',
        'dab-cyan': '#22D3EE',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'ui-sans-serif', 'sans-serif'],
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
      backgroundImage: {
        'number-glow': 'linear-gradient(135deg, #4C7FFF 0%, #7B61FF 100%)',
        'glass-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0))',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
