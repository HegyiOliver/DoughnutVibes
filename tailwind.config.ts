import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sensenet: {
          primary: '#0066CC',
          secondary: '#00A3E0',
          accent: '#FF6B35',
          dark: '#1A1A2E',
          light: '#F8F9FA',
          gray: '#6C757D',
          success: '#28A745',
        },
        doughnut: {
          blue: '#0192db',
          golden: '#FFD700',
          vanilla: '#E3F2FD',
        },
        game: {
          bg: '#FFFFFF',
          board: '#F8F9FA',
          accent: '#0066CC',
          primary: '#0066CC',
          secondary: '#00A3E0',
          gradient: {
            from: '#0066CC',
            to: '#00A3E0',
          }
        }
      },
      animation: {
        'bounce-in': 'bounceIn 0.3s ease-out',
        'pop': 'pop 0.2s ease-out',
        'shake': 'shake 0.5s ease-in-out',
        'fall': 'fall 0.4s ease-in',
        'match': 'match 0.4s ease-out forwards',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pop: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px)' },
          '75%': { transform: 'translateX(10px)' },
        },
        fall: {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        match: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.3)', opacity: '0.8' },
          '100%': { transform: 'scale(0)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
