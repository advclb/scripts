const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const PeerDepsExternalsPlugin = require("peer-deps-externals-webpack-plugin");

const cssLoader = { loader: "css-loader", options: { importLoaders: 1 } };
const postCssLoader = {
  loader: "postcss-loader",
  options: {
    config: { path: path.join(__dirname, "postcss.config.js") },
  },
};

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
          use: ["ts-loader", "angular2-template-loader?keepUrl=true"],
        },
        // Angular Template
        {
          test: /\.component\.html$/,
          use: "raw-loader",
        },
        // Angular CSS
        {
          test: /\.component\.css$/,
          use: ["raw-loader", postCssLoader],
        },
        // Angular SaSS
        {
          test: /\.component\.s[ac]ss$/,
          use: ["raw-loader", postCssLoader, "sass-loader"],
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: [/node_modules/, /\.component\.ts$/],
        },
        {
          test: /\.css$/,
          use: ["style-loader", cssLoader, postCssLoader],
          exclude: /\.component\.css$/,
        },
        {
          test: /\.s[ac]ss$/,
          use: ["style-loader", cssLoader, postCssLoader, "sass-loader"],
          exclude: /\.component\.s[ac]ss$/,
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    plugins,
  };
};
