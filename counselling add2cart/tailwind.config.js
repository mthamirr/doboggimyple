/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sun-glare': '#C4D600',        // 13-0663 TSX - Bright lime green
        'exuberant-orange': '#FF5722', // 17-1363 TSX - Vibrant orange-red
        'blue-violet': '#4338CA',      // 2725 C - Deep blue-violet
        'cloud-dancer': '#F5F5F5',     // 11-4201 TPG - Light neutral gray
        'darkest-hour': '#1A1A1A',     // 20-0199 TPM - Deep charcoal black
      },
      fontFamily: {
        'pixel': ['Orbitron', 'monospace'],
      },
    },
  },
  plugins: [],
}
