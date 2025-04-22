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
      boxShadow: {
        'glass': 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
      }
    },
  },
  plugins: [],
}
