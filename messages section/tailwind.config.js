/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sun-glare': '#C4D600', // 13-0663 TSX
        'exuberant-orange': '#FF5722', // 17-1363 TSX
        'blue-violet': '#6A4C93', // 2725 C
        'cloud-dancer': '#F5F5F5', // 11-4201 TPG
        'darkest-hour': '#1A1A1A', // 20-0199 TPM
      },
      fontFamily: {
        'pixel': ['monospace'],
      },
      animation: {
        'pixel-blink': 'blink 1s infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
