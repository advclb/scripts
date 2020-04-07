const Webpack = require("webpack");

const exec = require("../includes/exec");
const getPaths = require("../includes/get-paths");
const generateConfig = require("../includes/webpack.config");

module.exports = function () {
  const paths = getPaths();
  if (paths.entry.endsWith(".ts") || paths.entry.endsWith(".tsx")) {
    exec(
      "tsc --project tsconfig.json --declaration --outDir lib && cp src/*css lib"
    );
  }
  const config = generateConfig({
    paths,
    type: "lib",
  });
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
