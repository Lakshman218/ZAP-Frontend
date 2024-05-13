const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/**/*.{html,js,jsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000', // Define black color
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

