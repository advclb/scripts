const getPaths = require("../include/get-paths");
const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const generateConfig = require("../include/webpack.config");

module.exports = function() {
  const paths = getPaths(true);
  const config = generateConfig({ paths, hot: true });
  const compiler = Webpack(config);
  const port = 8080;
  const devServerOptions = {
    open: true,
    stats: {
      colors: true
    },
    contentBase: paths.dist,
    compress: true,
    port
  };
  const server = new WebpackDevServer(compiler, devServerOptions);

  server.listen(port, "127.0.0.1", () => {
    console.log("Starting server on http://localhost:8080");
  });
};
