/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        surface2: 'rgb(var(--c-surface2) / <alpha-value>)',
        surface3: 'rgb(var(--c-surface3) / <alpha-value>)',
        border: 'rgb(var(--c-border) / <alpha-value>)',
        border2: 'rgb(var(--c-border2) / <alpha-value>)',
        text: 'rgb(var(--c-text) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        faint: 'rgb(var(--c-faint) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        accent2: 'rgb(var(--c-accent2) / <alpha-value>)',
        accentDim: 'var(--c-accent-dim)',
        gold: 'rgb(var(--c-gold) / <alpha-value>)',
        purple: 'rgb(var(--c-purple) / <alpha-value>)',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          /* 3 copies of the strip → shift exactly one copy for a seamless loop */
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.3333%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
