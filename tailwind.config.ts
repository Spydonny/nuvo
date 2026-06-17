/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        terracotta: { DEFAULT: '#C0492F', dark: '#B8442B', soft: '#D06A52' },
        choco: { DEFAULT: '#3A2620', light: '#4A2C23', deep: '#2A1A15' },
        mauve: { DEFAULT: '#5C4A4A', light: '#6E5757' },
        berry: '#D6332B',
        wine: '#6B1F3A',
        gold: '#C9A86A',
        platinum: '#C9CDD2',
        ivory: '#F3EBDD',
        cream: '#F7F1E7',
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'serif'],
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 60px -25px rgba(42, 26, 21, 0.55)',
        card: '0 14px 40px -20px rgba(42, 26, 21, 0.45)',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 8s ease infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
