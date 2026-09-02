/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#FAF8F5',
          100: '#F5F0EB',
          200: '#EAE1D6',
          300: '#DDD0C0',
          400: '#CBBBA8',
          500: '#B29E87',
          600: '#94816C',
          700: '#756350',
          800: '#58493A',
          900: '#3D3227',
          950: '#231C15',
        },
        ink: {
          50: '#F2F4F8',
          100: '#E4E7EE',
          200: '#C7CDDC',
          300: '#A4AFCA',
          400: '#7889B0',
          500: '#536696',
          600: '#3D4D77',
          700: '#2F3C5E',
          800: '#1F273E',
          900: '#141A2B',
          950: '#0B0E17',
        },
        amberGold: {
          400: '#FBBF24',
          500: '#D97706',
          600: '#B45309',
          700: '#92400E',
        },
        crimson: {
          500: '#BE123C',
          600: '#9F1239',
          700: '#881337',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Noto Serif Bengali"', 'serif'],
        display: ['"Cinzel"', '"Playfair Display"', '"Noto Serif Bengali"', 'serif'],
        bengali: ['"Noto Serif Bengali"', '"Hind Siliguri"', 'serif'],
        handwriting: ['"Caveat"', '"Galada"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'book': '0 20px 30px -10px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.1), inset 0 0 15px rgba(0,0,0,0.15)',
        'book-lg': '0 30px 60px -12px rgba(0, 0, 0, 0.45), 0 18px 36px -18px rgba(0, 0, 0, 0.3)',
        'shelf': '0 12px 10px -5px rgba(0,0,0,0.5)',
        'glow': '0 0 25px rgba(217, 119, 6, 0.35)',
      },
      keyframes: {
        pageFlipRight: {
          '0%': { transform: 'rotateY(0deg)', transformOrigin: 'left center' },
          '100%': { transform: 'rotateY(-180deg)', transformOrigin: 'left center' }
        },
        pageFlipLeft: {
          '0%': { transform: 'rotateY(0deg)', transformOrigin: 'right center' },
          '100%': { transform: 'rotateY(180deg)', transformOrigin: 'right center' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' }
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        pulseSlow: 'pulseSlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
