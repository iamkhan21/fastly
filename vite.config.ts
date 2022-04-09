/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Unocss from "unocss/vite";
import { presetUno } from "unocss";
import presetIcons from "@unocss/preset-icons";
// @ts-ignore
import tsconfig from "./tsconfig.json";
// @ts-ignore
import path from "node:path";

function handlePath(p) {
  return path.resolve(__dirname, p).replace(/([\\/])\*$/, "");
}

const aliases = Object.entries(tsconfig.compilerOptions.paths);
const aliasConfig = {};

for (const [configAlias, configPaths = []] of aliases) {
  const wpAlias = configAlias.replace(/([\\/])\*$/, "");
  aliasConfig[wpAlias] = (configPaths as string[]).map(handlePath);
}

const buildDate = new Date().toLocaleString("en-GB", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["effector/babel-plugin"],
        // Use .babelrc files
        babelrc: true,
        // Use babel.config.js files
        configFile: true,
      },
    }),
    Unocss({
      presets: [presetUno(), presetIcons()],
      safelist: ["i-mdi-hammer-wrench", "i-mdi-car-tire-alert"],
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/utils/setup.ts",
  },
  resolve: {
    alias: {
      ...aliasConfig,
    },
  },
  define: {
    __BUILD_VERSION__: JSON.stringify(process.env.BUILD_ID || "1.1.1.1"),
    __BUILD_DATE__: JSON.stringify(buildDate),
  },
});
