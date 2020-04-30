#!/usr/bin/env node

const path = require("path");
const iconic = require("../includes/iconic");

module.exports = function (cmd) {
  if (cmd.dirs) {
    cmd.dirs.forEach((d) => iconic(path.join(process.cwd(), d)));
  } else {
    iconic(process.cwd());
  }
};
