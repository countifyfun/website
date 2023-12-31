import type { Config } from "tailwindcss";
import tailwind3d from "tailwindcss-3d";
import colors from "tailwindcss/colors";

const makePrimaryColor =
  (l: number) =>
  ({ opacityValue }: { opacityValue: number }) => {
    return (
      `hsl(53deg 100% ${l}%` + (opacityValue ? ` / ${opacityValue})` : ")")
    );
  };

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
      },
    },
  },
  plugins: [tailwind3d],
};
export default config;
