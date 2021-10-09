import pkg from "./package.json";
import resolve from "@rollup/plugin-node-resolve";
import externals from "rollup-plugin-node-externals";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import filesize from "rollup-plugin-filesize";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import commonjs from "@rollup/plugin-commonjs";
import eslint from "@rollup/plugin-eslint";

const exportName = "darkMode";
const input = "src/index.js";
const banner = `/*! ${pkg.name} v${pkg.version} | ${pkg.license} License | ${pkg.homepage} */`;

export default [
  {
    // universal (browser and node)
    input,
    output: [
      {
        name: exportName,
        file: pkg.exports.browser.replace(".min.js", ".js"), // unminified (.js)
        format: "umd",
        exports: "named",
        esModule: false,
        banner: banner,
      },
      {
        name: exportName,
        file: pkg.exports.browser, // minified (.min.js)
        format: "umd",
        exports: "named",
        esModule: false,
        plugins: [
          terser({
            output: {
              preamble: banner,
            },
          }),
        ],
      },
    ],
    plugins: [
      del({ targets: "dist/*" }),
      copy({
        // clearly this isn't really typescript, so we need to manually copy the type definition file
        targets: [
          {
            src: input.replace(".js", ".d.ts"),
            dest: "dist",
            rename: pkg.types.replace("./dist/", ""),
          },
        ],
      }),
      resolve(),
      commonjs(),
      eslint(),
      babel({
        babelHelpers: "bundled",
        presets: [["@babel/preset-env"]],
        exclude: ["node_modules/**"],
      }),
      filesize(),
    ],
  },
  {
    // modules
    input,
    output: [
      {
        // ES6 module (import)
        file: pkg.exports.import,
        format: "esm",
        exports: "named",
        banner: banner,
      },
      {
        // commonjs (require)
        file: pkg.exports.require,
        format: "cjs",
        exports: "named",
        banner: banner,
      },
    ],
    plugins: [
      externals({ deps: true }),
      resolve(),
      babel({
        babelHelpers: "bundled",
        exclude: ["node_modules/**"],
      }),
      filesize(),
    ],
  },
];
