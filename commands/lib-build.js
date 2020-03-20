const readPackageJSON = require("../includes/read-package-json");
const getPaths = require("../includes/get-paths");
const Webpack = require("webpack");
const generateConfig = require("../includes/webpack.config");

module.exports = function() {
  const paths = getPaths(true);
  const packageJSON = readPackageJSON(process.cwd());
  const config = generateConfig({ paths, library: packageJSON.name });
  const compiler = Webpack(config);
  compiler.run();
};
