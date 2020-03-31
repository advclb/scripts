const exec = require("../includes/exec");

module.exports = function() {
  exec("prettier");
  exec("eslint --fix --ext .js,.jsx,.ts,.tsx src doc/src");
  exec(
    "stylelint --fix src/**/*.css src/**/*.scss doc/src/**/*.css doc/src/**/*.scss"
  );
};
