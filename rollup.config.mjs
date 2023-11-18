import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
// import dts from "rollup-plugin-dts";
import { createRequire } from "node:module";

const requireFile = createRequire(import.meta.url);
// const packageJson = requireFile("./package.json");

export default {
  input: "./src/index.js",
  output: [
    {
      file: "./dist/index.js",
      format: "cjs",
    },
    {
      file: "./dist/index.es.js",
      format: "es",
      exports: "named",
    },
  ],
  plugins: [
    peerDepsExternal(),
    postcss({
      minimize: true,
      modules: true,
      use: {
        less: { javascriptEnabled: true },
      },
      extract: true,
    }),
    resolve(),
    commonjs(),
  ],
};

//
// export default [
//   {
//     input: "./src/index.js",
//     output: [
//       {
//         file: "./dist/bundle.index.js",
//         format: "cjs",
//       },
//       {
//         file: "./dist/bundle.index.js",
//         format: "es",
//         exports: "named",
//       },
//     ],
//     plugins: [
//       peerDepsExternal(),
//       resolve(),
//       commonjs(),
//       typescript(),
//       postcss({
//         extensions: [".css"],
//       }),
//     ],
//   },
//   {
//     input: "lib/index.d.ts",
//     output: [{ file: "lib/index.d.ts", format: "es" }],
//     plugins: [dts()],
//     external: [/\.css$/],
//   },
// ];
