/** @type {import('daisyui').Config & {daisyui: import("daisyui").Config}} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      "light",
      "dark",
      "synthwave",
      "cyberpunk",
      "aqua",
      "wireframe",
      "nord",
    ],
  },
  plugins: [require("daisyui")],
};
