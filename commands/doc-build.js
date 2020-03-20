const getPaths = require("../include/get-paths");
const Webpack = require("webpack");
const generateConfig = require("../include/webpack.config");

module.exports = function() {
  const paths = getPaths(true);
  const config = generateConfig({ paths });
  const compiler = Webpack(config);
  compiler.run();
};
