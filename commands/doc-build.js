const getPaths = require("../includes/get-paths");
const Webpack = require("webpack");
const generateConfig = require("../includes/webpack.config");

module.exports = function() {
  const paths = getPaths("doc");
  const config = generateConfig({ paths });
  const compiler = Webpack(config);
  compiler.run((err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }
  });
};
