/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      "delay-animation": {
        "animation-delay": "50ms"
      },
      keyframes: {
        shake: {
          '0%': {transform: "translate(0px)"},
          '25%': {transform: "translate(3px)"},
          '50%': {transform: "translate(0px)"},
          '75%': {transform: "translate(-3px)"},
          '100%': {transform: "translate(0px)"}
        },
        wiggle: {
          '10%': { transform: 'scale(1)' },
          '20%': {transform: 'scale(1.05)'},
          '30%': {transform: 'scale(1)'}
        }
      },
      animation: {
        shake: "shake .25s linear infinite",
        wiggle: 'wiggle 2s ease infinite'
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"]
  }
};
