import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";

import { createRequire } from "node:module";
// import dts from "rollup-plugin-dts";
// import typescript from "@rollup/plugin-typescript";

const requireFile = createRequire(import.meta.url);
const packageJson = requireFile("./package.json");

export default {
  input: "./src/index.js",
  external: ["react-dom"],
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [postcss(), resolve(), commonjs(), peerDepsExternal()],
};
