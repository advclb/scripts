const fs = require("fs");
const path = require("path");

function getEntry(src) {
  const tsx = path.join(src, "index.tsx");
  if (fs.existsSync(tsx)) {
    return tsx;
  }
  const ts = path.join(src, "index.ts");
  if (fs.existsSync(ts)) {
    return ts;
  }
  const jsx = path.join(src, "index.jsx");
  if (fs.existsSync(jsx)) {
    return jsx;
  }
  const js = path.join(src, "index.js");
  if (fs.existsSync(js)) {
    return js;
  }
}

module.exports = function(prefix) {
  const root = prefix ? path.join(process.cwd(), prefix) : process.cwd();
  const src = path.join(root, "src");
  const dist = path.join(root, "dist");
  const template = path.join(src, "index.html");
  const entry = getEntry(src);
  return {
    root,
    src,
    dist,
    template,
    entry
  };
};
