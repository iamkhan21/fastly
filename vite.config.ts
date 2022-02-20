/// <reference types="vitest" />
import { defineConfig } from "vite";
import path from "node:path";
import react from "@vitejs/plugin-react";
import Unocss from "unocss/vite";
import { presetUno } from "unocss";
import tsconfig from "./tsconfig.json";

function handlePath(p) {
  return path.resolve(__dirname, p).replace(/([\\/])\*$/, "");
}

const aliases = Object.entries(tsconfig.compilerOptions.paths);
const aliasConfig = {};

for (const [configAlias, configPaths = []] of aliases) {
  const wpAlias = configAlias.replace(/([\\/])\*$/, "");
  aliasConfig[wpAlias] = configPaths.map(handlePath);
}

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
    Unocss({ presets: [presetUno()] }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/utils/setup.ts",
  },
  resolve: {
    alias: {
      ...aliasConfig,
    },
  },
});
