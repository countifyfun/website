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
      colors: {
        primary: {
          50: makePrimaryColor(97) as unknown as string,
          100: makePrimaryColor(94) as unknown as string,
          200: makePrimaryColor(86) as unknown as string,
          300: makePrimaryColor(77) as unknown as string,
          400: makePrimaryColor(66) as unknown as string,
          500: makePrimaryColor(50) as unknown as string,
          600: makePrimaryColor(45) as unknown as string,
          700: makePrimaryColor(39) as unknown as string,
          750: makePrimaryColor(35) as unknown as string,
          800: makePrimaryColor(32) as unknown as string,
          900: makePrimaryColor(24) as unknown as string,
        },
      },
    },
  },
  plugins: [tailwind3d],
};
export default config;
