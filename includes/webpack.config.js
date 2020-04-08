const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const PeerDepsExternalsPlugin = require("peer-deps-externals-webpack-plugin");

const cssLoaders = [
  "style-loader",
  { loader: "css-loader", options: { importLoaders: 1 } },
  {
    loader: "postcss-loader",
    options: {
      config: { path: path.join(__dirname, "postcss.config.js") },
    },
  },
];
const sassLoaders = [...cssLoaders, "sass-loader"];

module.exports = function ({ type, paths, hot }) {
  const output = { path: paths.dist };
  const plugins = [new webpack.ProgressPlugin(), new CleanWebpackPlugin()];

  if (type === "lib") {
    output.filename = "index.js";
    output.libraryTarget = "umd";
    plugins.push(new PeerDepsExternalsPlugin());
  } else {
    plugins.push(
      new HtmlWebpackPlugin({
        template: paths.template,
      })
    );
    if (hot) {
      plugins.push(new webpack.HotModuleReplacementPlugin());
    }
  }

  return {
    mode: hot ? "development" : "production",
    entry: paths.entry,
    output,
    devtool: "source-map",
    module: {
      rules: [
        // Angular
        {
          test: /\.component\.ts$/,
          loaders: ["ts-loader", "angular2-template-loader?keepUrl=true"],
        },
        // Angular
        {
          test: /\.component\.(html|css)$/,
          loader: "raw-loader",
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: [/node_modules/, /\.component\.ts$/],
        },
        {
          test: /\.css$/,
          use: cssLoaders,
        },
        {
          test: /\.s[ac]ss$/,
          use: sassLoaders,
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    plugins,
  };
};
