const exec = require("../includes/exec");

module.exports = function() {
  exec("prettier");
  const scriptExts = [".js", ".jsx", ".ts", ".tsx"].join(",");
  exec("eslint --fix --ext " + scriptExts + " .");
  const styleFiles = [
    "*.css",
    "*.scss",
    "src/**/*.css",
    "src/**/*.scss",
    "doc/src/**/*.css",
    "doc/src/**/*.scss"
  ].join(" ");
  exec("stylelint --fix " + styleFiles);
};
