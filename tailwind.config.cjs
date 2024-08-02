/** @type {import('daisyui').Config & {daisyui: import("daisyui").Config}} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      "light",
      "dark",
      {
        jenin: {
          ...require("daisyui/src/theming/themes")["light"],
          info: "#60a5fa",
          base: "#5bbad5",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
