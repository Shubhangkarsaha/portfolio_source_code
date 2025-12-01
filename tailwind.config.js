/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffd700',
        background: '#022c43',
        dark: '#181818',
        'dark-blue': '#115173',
      },
      fontFamily: {
        'helvetica': ['Helvetica Neue', 'sans-serif'],
        'belle': ['La Belle Aurore', 'cursive'],
        'coolvetica': ['Coolvetica', 'sans-serif'],
      },
      animation: {
        'fadeIn': 'fadeIn 1s forwards',
        'fadeOut': 'fadeOut 1s forwards',
        'bounceIn': 'bounceIn 1s forwards',
        'rotateIn': 'rotateIn 1s linear both',
        'pulse': 'pulse 1s',
        'fadeInUp': 'fadeInUp 2s forwards',
        'backInRight': 'backInRight 1s forwards',
        'rubberBand': 'rubberBand 1s',
        'spincube': 'spincube 12s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        rotateIn: {
          '0%': { opacity: '0', transform: 'rotate(-200deg)' },
          '100%': { opacity: '1', transform: 'rotate(0deg)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        backInRight: {
          '0%': { opacity: '0', transform: 'translateX(2000px) scale(0.7)' },
          '80%': { transform: 'translateX(0px) scale(0.7)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        rubberBand: {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scaleX(1.25) scaleY(0.75)' },
          '40%': { transform: 'scaleX(0.75) scaleY(1.25)' },
          '50%': { transform: 'scaleX(1.15) scaleY(0.85)' },
          '65%': { transform: 'scaleX(0.95) scaleY(1.05)' },
          '75%': { transform: 'scaleX(1.05) scaleY(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        spincube: {
          '0%, 100%': { transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)' },
          '16%': { transform: 'rotateY(-90deg)' },
          '33%': { transform: 'rotateY(-90deg) rotateZ(90deg)' },
          '50%': { transform: 'rotateY(-180deg) rotateZ(90deg)' },
          '66%': { transform: 'rotateY(-270deg) rotateZ(90deg)' },
          '83%': { transform: 'rotateX(90deg)' },
        },
      },
    },
  },
  plugins: [],
}

