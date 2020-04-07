const fs = require("fs");
const path = require("path");

module.exports = function (root) {
  const filePath = path.join(root, "package.json");
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};
