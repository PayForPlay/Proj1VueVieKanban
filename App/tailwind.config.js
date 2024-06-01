/** @type {import('tailwindcss').Config} */

export const TRANSITIONS = {
  overlay: {
    enterFromClass: 'opacity-0 scale-75',
      enterActiveClass: 'transition-transform transition-opacity duration-150 ease-in',
      leaveActiveClass: 'transition-opacity duration-150 ease-linear',
      leaveToClass: 'opacity-0'
  }
};
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}"
  ],
  darkMode:'class',
  theme: {
    
    extend: {
      width: {
        '1/7': '14.25%'
      },
      
      boxShadow: {
        'task': '0 4px 6px 0px rgba(54, 78, 126, 0.1)',
      },
      spacing: {
        '4.5': '1.125rem'
      },
      maxWidth: {
        '3xs': '16.5rem',
        'xs': '21.5rem',
        'md': '30rem'
      },
      colors: {
        "main-purple": "#635FC7",
        "main-green": "#5fc797",
        "main-purple-light": "#A8A4FF",
        "black": "#000112",
        "very-dark-grey": "#20212C",
        "dark-grey": "#2B2C37",
        "medium-grey": "#828FA3",
        "light-grey": "#F4F7FD",
        "lines-dark": "#3E3F4E",
        "lines-light": "#E4EBFA",
        "red": "#EA5555",
        "red-light": "#FF9898",
        "white": "#FFFFFF"
      },
      fontSize: {
        'xs': '.75rem',
        'sm': '.8rem',
        'base': '.94rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Graphik', 'sans-serif'],
      },
    }
  },
  variants: {},
  plugins: [],
};