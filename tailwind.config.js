const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/**/*.{html,js,jsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {},
  },
  // darkMode: 'media',

  plugins: [
    // flowbite.plugin(),
    require('flowbite/plugin'),
  ],
}

