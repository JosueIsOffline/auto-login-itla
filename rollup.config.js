import typescript from "@rollup/plugin-typescript";
import fs from "fs/promises";
import pkg from "./package.json" with { type: "json" };

let userscriptMetadata = await fs.readFile("src/metadata.txt", "utf-8");

userscriptMetadata = userscriptMetadata.replace(
  /@version\s+.*/,
  `@version      ${pkg.version}`,
);

export default {
  input: "src/index.ts",
  output: {
    file: "dist/itla-plus.user.js",
    format: "iife",
    banner: userscriptMetadata,
    sourcemap: true,
  },
  plugins: [typescript()],
};
