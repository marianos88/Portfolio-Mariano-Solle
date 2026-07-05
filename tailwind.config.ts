import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mint: '#AAEEC4',
        'off-white': '#F8F8F8',
        'mid-gray': '#3E3E3E',
        dark: '#222222',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        tight2: '-0.02em',
        wide2: '0.2em',
      },
    },
  },
  plugins: [],
}

export default config
