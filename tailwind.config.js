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
          DEFAULT: '#50C878',
          dark: '#3da861',
          light: '#7ad69a'
        },
        'eton-blue': {
          DEFAULT: '#87CEAB',
          dark: '#6ab890',
          light: '#a3dbc0'
        },
        'charleston-green': {
          DEFAULT: '#2B2D2F',
          dark: '#1e2022',
          light: '#3a3d42'
        },
        alabaster: '#F2F0E6',
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
