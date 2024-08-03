import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./**/@material-tailwind/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./node_modules/tw-elements/js/**/*.js",
    "./node_modules/flowbite/**/*.js",
    "./src/**/*.{html,js}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-1': {
          textShadow: '1px 1px 2px black',
        },
      };
      
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
    require('flowbite/plugin'),
    require("tw-elements/plugin.cjs"),
  ],
};

export default config;
