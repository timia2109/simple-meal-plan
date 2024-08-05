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
      {
        jenin: {
          ...require("daisyui/src/theming/themes")["light"],
          info: "#60a5fa",
          "base-100": "#5bbad5",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
