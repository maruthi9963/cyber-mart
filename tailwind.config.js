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
        cyber: {
          950: '#060913',
          900: '#0a0f1d',
          850: '#0f172a',
          800: '#141e36',
          700: '#1e293b',
          600: '#334155',
          neon: '#00f5a0',
          cyan: '#00d8f6',
          amber: '#f59e0b',
          rose: '#f43f5e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace']
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'neon-cyan': '0 0 20px -3px rgba(0, 216, 246, 0.35)',
        'neon-green': '0 0 20px -3px rgba(0, 245, 160, 0.35)',
        'neon-hover': '0 0 25px 0 rgba(0, 245, 160, 0.45)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
