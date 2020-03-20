const readPackageJSON = require("../include/read-package-json");
const getPaths = require("../include/get-paths");
const Webpack = require("webpack");
const generateConfig = require("../include/webpack.config");

module.exports = function() {
  const paths = getPaths(true);
  const packageJSON = readPackageJSON(process.cwd());
  const config = generateConfig({ paths, library: packageJSON.name });
  const compiler = Webpack(config);
  compiler.run();
};
