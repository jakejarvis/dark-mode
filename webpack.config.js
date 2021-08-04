const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: {
      name: "darkMode",
      type: "umd",
    },
    globalObject: "this",
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: "Dark mode switcheroo | MIT License | jrvs.io/darkmode",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, "src/index.d.ts"),
          to: path.join(__dirname, "dist", "index.d.ts"),
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
};
