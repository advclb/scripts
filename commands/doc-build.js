const getPaths = require("../includes/get-paths");
const Webpack = require("webpack");
const generateConfig = require("../includes/webpack.config");

module.exports = function() {
  const paths = getPaths(true);
  const config = generateConfig({ paths });
  const compiler = Webpack(config);
  compiler.run();
};
