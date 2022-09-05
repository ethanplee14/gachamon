/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '10%': { transform: 'rotate(3deg)' },
          '20%': {transform: 'rotate(-3deg)'},
          '30%': {transform: 'rotate(0deg)'}
        }
      },
      animation: {
        wiggle: 'wiggle 2s ease infinite'
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"]
  }
};
