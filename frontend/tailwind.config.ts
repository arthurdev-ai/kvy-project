// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/app/**/*.{html,ts}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/**/*.{html,ts,js,mdx}",
  ],

};
export default config;
