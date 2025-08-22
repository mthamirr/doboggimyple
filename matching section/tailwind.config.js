/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sun-glare': '#C4D600',
        'exuberant-orange': '#FF5722',
        'blue-violet': '#673AB7',
        'cloud-dancer': '#F5F5F5',
        'darkest-hour': '#212121',
      },
      fontFamily: {
        'pixel': ['monospace'],
      },
      animation: {
        'pixel-pulse': 'pixel-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gameboy-blink': 'gameboy-blink 1s step-end infinite',
      },
      keyframes: {
        'pixel-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        'gameboy-blink': {
          '0%, 50%': { opacity: 1 },
          '51%, 100%': { opacity: 0 },
        }
      }
    },
  },
  plugins: [],
}
