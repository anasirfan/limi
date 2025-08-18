/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        emerald: {
          DEFAULT: 'var(--color-emerald)',
          0: 'var(--color-emerald-0)',
          1: 'var(--color-emerald-1)',
          2: 'var(--color-emerald-2)',
          3: 'var(--color-emerald-3)',
          4: 'var(--color-emerald-4)',
          5: 'var(--color-emerald-5)',
          6: 'var(--color-emerald-6)',
          7: 'var(--color-emerald-7)',
          8: 'var(--color-emerald-8)',
          9: 'var(--color-emerald-9)',
          10: 'var(--color-emerald-10)',
          11: 'var(--color-emerald-11)',
          12: 'var(--color-emerald-12)',
          13: 'var(--color-emerald-13)',
          14: 'var(--color-emerald-14)',
          15: 'var(--color-emerald-15)',
          16: 'var(--color-emerald-16)',
          17: 'var(--color-emerald-17)',
          18: 'var(--color-emerald-18)',
          19: 'var(--color-emerald-19)',
          20: 'var(--color-emerald-20)',
          21: 'var(--color-emerald-21)',
          22: 'var(--color-emerald-22)',
          23: 'var(--color-emerald-23)',
        },
        etonBlue: {
          DEFAULT: 'var(--eton-blue)',
          dark: 'var(--eton-blue-dark)',
          light: 'var(--eton-blue-light)',
          0: 'var(--color-eton-blue-0)',
          1: 'var(--color-eton-blue-1)',
          2: 'var(--color-eton-blue-2)',
          3: 'var(--color-eton-blue-3)',
          4: 'var(--color-eton-blue-4)',
          5: 'var(--color-eton-blue-5)',
          6: 'var(--color-eton-blue-6)',
          7: 'var(--color-eton-blue-7)',
          8: 'var(--color-eton-blue-8)',
          9: 'var(--color-eton-blue-9)',
          10: 'var(--color-eton-blue-10)',
          11: 'var(--color-eton-blue-11)',
          12: 'var(--color-eton-blue-12)',
          13: 'var(--color-eton-blue-13)',
          14: 'var(--color-eton-blue-14)',
          15: 'var(--color-eton-blue-15)',
          16: 'var(--color-eton-blue-16)',
          17: 'var(--color-eton-blue-17)',
          18: 'var(--color-eton-blue-18)',
          19: 'var(--color-eton-blue-19)',
          20: 'var(--color-eton-blue-20)',
          21: 'var(--color-eton-blue-21)',
          22: 'var(--color-eton-blue-22)',
          23: 'var(--color-eton-blue-23)'
        },
        'charleston-green': {
          DEFAULT: 'var(--color-charleston-green)',
          0: 'var(--color-charleston-green-0)',
          1: 'var(--color-charleston-green-1)',
          2: 'var(--color-charleston-green-2)',
          3: 'var(--color-charleston-green-3)',
          4: 'var(--color-charleston-green-4)',
          5: 'var(--color-charleston-green-5)',
          6: 'var(--color-charleston-green-6)',
          7: 'var(--color-charleston-green-7)',
          8: 'var(--color-charleston-green-8)',
          9: 'var(--color-charleston-green-9)',
          10: 'var(--color-charleston-green-10)',
          11: 'var(--color-charleston-green-11)',
          12: 'var(--color-charleston-green-12)',
          13: 'var(--color-charleston-green-13)',
          14: 'var(--color-charleston-green-14)',
          15: 'var(--color-charleston-green-15)',
          16: 'var(--color-charleston-green-16)',
          17: 'var(--color-charleston-green-17)',
          18: 'var(--color-charleston-green-18)',
          19: 'var(--color-charleston-green-19)',
          20: 'var(--color-charleston-green-20)',
          21: 'var(--color-charleston-green-21)',
          22: 'var(--color-charleston-green-22)',
          23: 'var(--color-charleston-green-23)'
        },
        alabaster: {
          DEFAULT: 'var(--color-alabaster)',
          0: 'var(--color-alabaster-0)',
          1: 'var(--color-alabaster-1)',
          2: 'var(--color-alabaster-2)',
          3: 'var(--color-alabaster-3)',
          4: 'var(--color-alabaster-4)',
          5: 'var(--color-alabaster-5)',
          6: 'var(--color-alabaster-6)',
          7: 'var(--color-alabaster-7)',
          8: 'var(--color-alabaster-8)',
          9: 'var(--color-alabaster-9)',
          10: 'var(--color-alabaster-10)',
          11: 'var(--color-alabaster-11)',
          12: 'var(--color-alabaster-12)',
          13: 'var(--color-alabaster-13)',
          14: 'var(--color-alabaster-14)',
          15: 'var(--color-alabaster-15)',
          16: 'var(--color-alabaster-16)',
          17: 'var(--color-alabaster-17)',
          18: 'var(--color-alabaster-18)',
          19: 'var(--color-alabaster-19)',
          20: 'var(--color-alabaster-20)',
          21: 'var(--color-alabaster-21)',
          22: 'var(--color-alabaster-22)',
          23: 'var(--color-alabaster-23)'
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glass': 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'progress-indeterminate': 'progressIndeterminate 2s ease-in-out infinite',
        'float': 'float 10s infinite linear',
        'sway-slow': 'sway 8s ease-in-out infinite',
        'sway-medium': 'sway 6s ease-in-out infinite',
        'sway-reverse-slow': 'swayReverse 7s ease-in-out infinite',
        'cable-loading': 'cableLoading 2s linear infinite',
        // Theme animations
        'fadeIn': 'fadeIn 0.5s ease-in-out forwards',
        'fadeInUp': 'fadeInUp 0.6s ease-in-out forwards',
        'fadeInLeft': 'fadeInLeft 0.6s ease-in-out forwards',
        'slideInRight': 'slideInRight 0.6s ease-in-out forwards',
        'slideInUp': 'slideInUp 0.6s ease-in-out forwards',
        'scaleIn': 'scaleIn 0.5s ease-in-out forwards',
      },
      keyframes: {
        progressIndeterminate: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0px)' }
        },
        // Theme animation keyframes
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        slideInRight: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        slideInUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        sway: {
          '0%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
          '100%': { transform: 'rotate(-3deg)' }
        },
        swayReverse: {
          '0%': { transform: 'rotate(2deg)' },
          '50%': { transform: 'rotate(-2deg)' },
          '100%': { transform: 'rotate(2deg)' }
        },
        cableLoading: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        }
      }
    },
  },
  plugins: [],
}
