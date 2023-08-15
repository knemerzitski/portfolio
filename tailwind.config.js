/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

// ############################### Color Definitions ###########################
const primaryColor = { h: 210, s: 15, l: 20 };
const secondaryColor = { h: 165, s: 60, l: 50 };
// const successH = 122;
const dangerH = 2;

// ############################### Config #####################################
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xxs': '320px',
      'xs': '480px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      'short': { 'raw': '(min-height: 480px)' },
      'tall': { 'raw': '(min-height: 768px)' },
      
      'mobile': {'raw' : '(hover: none) and (pointer: coarse)'},
    },
    extend: {
      colors: {
        white: 'white',
        text: `hsl(0deg 0% 95%)`,
        textInverse: `hsl(0deg 0% 6%)`,
        background: `hsl(${primaryColor.h}deg, 20%, 6%)`,
        backgroundInverse: `hsl(${primaryColor.h}deg, 25%, 95%)`,
        shadow: `black`,
        overlay: `black`,
        accent1: 'rgb(128, 11, 196)',
        accent2: 'rgb(238, 160, 15)',
        
        primary: {
          50: `hsl(${primaryColor.h}deg, ${primaryColor.s - 8}%,  ${primaryColor.l + 10}%)`,
          100: `hsl(${primaryColor.h}deg, ${primaryColor.s - 6}%,  ${primaryColor.l + 8}%)`,
          200: `hsl(${primaryColor.h}deg, ${primaryColor.s - 4}%,  ${primaryColor.l + 6}%)`,
          300: `hsl(${primaryColor.h}deg, ${primaryColor.s - 3}%,  ${primaryColor.l + 4}%)`,
          400: `hsl(${primaryColor.h}deg, ${primaryColor.s - 1}%,  ${primaryColor.l + 2}%)`,
          500: `hsl(${primaryColor.h}deg, ${primaryColor.s}%,       ${primaryColor.l}%)`,
          600: `hsl(${primaryColor.h}deg, ${primaryColor.s + 2}%,  ${primaryColor.l - 3}%)`,
          700: `hsl(${primaryColor.h}deg, ${primaryColor.s + 4}%,  ${primaryColor.l - 6}%)`,
          800: `hsl(${primaryColor.h}deg, ${primaryColor.s + 7}%,  ${primaryColor.l - 9}%)`,
          900: `hsl(${primaryColor.h}deg, ${primaryColor.s + 10}%, ${primaryColor.l - 12}%)`,
          950: `hsl(${primaryColor.h}deg, ${primaryColor.s + 12}%, ${primaryColor.l - 15}%)`,
        },
        secondary: {
          50: `hsl(${secondaryColor.h}deg, ${secondaryColor.s - 20}%, ${secondaryColor.l + 45}%)`,
          100: `hsl(${secondaryColor.h}deg, ${secondaryColor.s - 16}%, ${secondaryColor.l + 36}%)`,
          200: `hsl(${secondaryColor.h + 1}deg, ${secondaryColor.s - 11}%, ${secondaryColor.l + 24}%)`,
          300: `hsl(${secondaryColor.h + 2}deg, ${secondaryColor.s - 6}%,  ${secondaryColor.l + 15}%)`,
          400: `hsl(${secondaryColor.h + 2}deg, ${secondaryColor.s - 4}%,  ${secondaryColor.l + 9}%)`,
          500: `hsl(${secondaryColor.h}deg, ${secondaryColor.s}%,      ${secondaryColor.l}%)`,
          600: `hsl(${secondaryColor.h + 3}deg, ${secondaryColor.s + 8}%,  ${secondaryColor.l - 8}%)`,
          700: `hsl(${secondaryColor.h + 6}deg, ${secondaryColor.s + 14}%, ${secondaryColor.l - 22}%)`,
          800: `hsl(${secondaryColor.h + 5}deg, ${secondaryColor.s + 22}%, ${secondaryColor.l - 26}%)`,
          900: `hsl(${secondaryColor.h + 3}deg, ${secondaryColor.s + 32}%, ${secondaryColor.l - 32}%)`,
          950: `hsl(${secondaryColor.h + 1}deg, ${secondaryColor.s + 40}%, ${secondaryColor.l - 40}%)`,
        },
        // success: {
        //   50: `hsl(${successH}deg, ${secondaryColor.s - 15}%, ${secondaryColor.l + 25}%)`,
        //   100: `hsl(${successH}deg, ${secondaryColor.s - 12}%, ${secondaryColor.l + 20}%)`,
        //   200: `hsl(${successH}deg, ${secondaryColor.s - 9}%,  ${secondaryColor.l + 15}%)`,
        //   300: `hsl(${successH}deg, ${secondaryColor.s - 6}%,  ${secondaryColor.l + 10}%)`,
        //   400: `hsl(${successH}deg, ${secondaryColor.s - 3}%,  ${secondaryColor.l + 5}%)`,
        //   500: `hsl(${successH}deg, ${secondaryColor.s}%,      ${secondaryColor.l}%)`,
        //   600: `hsl(${successH}deg, ${secondaryColor.s + 4}%,  ${secondaryColor.l - 7}%)`,
        //   700: `hsl(${successH}deg, ${secondaryColor.s + 8}%,  ${secondaryColor.l - 14}%)`,
        //   800: `hsl(${successH}deg, ${secondaryColor.s + 12}%, ${secondaryColor.l - 21}%)`,
        //   900: `hsl(${successH}deg, ${secondaryColor.s + 16}%, ${secondaryColor.l - 28}%)`,
        //   950: `hsl(${successH}deg, ${secondaryColor.s + 20}%, ${secondaryColor.l - 35}%)`,
        // },
        danger: {
          50: `hsl(${dangerH}deg, ${secondaryColor.s - 15}%, ${secondaryColor.l + 25}%)`,
          100: `hsl(${dangerH}deg, ${secondaryColor.s - 12}%, ${secondaryColor.l + 20}%)`,
          200: `hsl(${dangerH}deg, ${secondaryColor.s - 9}%,  ${secondaryColor.l + 15}%)`,
          300: `hsl(${dangerH}deg, ${secondaryColor.s - 6}%,  ${secondaryColor.l + 10}%)`,
          400: `hsl(${dangerH}deg, ${secondaryColor.s - 3}%,  ${secondaryColor.l + 5}%)`,
          500: `hsl(${dangerH}deg, ${secondaryColor.s + 0}%,  ${secondaryColor.l - 0}%)`,
          600: `hsl(${dangerH}deg, ${secondaryColor.s + 4}%,  ${secondaryColor.l - 7}%)`,
          700: `hsl(${dangerH}deg, ${secondaryColor.s + 8}%,  ${secondaryColor.l - 14}%)`,
          800: `hsl(${dangerH}deg, ${secondaryColor.s + 12}%, ${secondaryColor.l - 21}%)`,
          900: `hsl(${dangerH}deg, ${secondaryColor.s + 16}%, ${secondaryColor.l - 28}%)`,
          950: `hsl(${dangerH}deg, ${secondaryColor.s + 20}%, ${secondaryColor.l - 35}%)`,
        },
      },
      boxShadow: {
        dp2: '0px 1px 1px 0px hsla(0, 0, 0, .1)', // small
        dp4: '0px 1px 4px 0px hsla(0, 0, 0, 0.2)', // btn
        dp6: '0px 2px 2px 0px hsla(0, 0, 0, 0.12), 0px 3px 4px 0px hsla(0, 0, 0, 0.18)', // card
        dp12: '0px 3px 6px 0px hsla(0, 0, 0, 0.06), 0px 5px 12px 0px hsla(0, 0, 0, 0.12)', // heading
        dp24: '0px 2px 10px 0px hsla(0, 0, 0, 0.8), 0px 4px 30px 0px hsla(0, 0, 0, 0.14)', // nav

        '-dp48': '0px -3px 20px 0px hsla(0, 0, 0, 0.8), 0px -6px 55px 0px hsla(0, 0, 0, 0.14)',

        'inner-full': `inset 0 0 0 9999px rgb(0 0 0 / 1);`
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-conic-corner': 'conic-gradient(from 270deg at 25% 35%, var(--tw-gradient-stops))'
      }
    },
  },
  plugins: [],
}

