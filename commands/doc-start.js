const getPaths = require("../includes/get-paths");
const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const generateConfig = require("../includes/webpack.config");

module.exports = function (cmd) {
  const paths = getPaths("doc");
  const config = generateConfig({ paths, hot: true });
  const compiler = Webpack(config);
  const port = cmd.port || 8080;
  const host = "127.0.0.1";
  const devServerOptions = {
    host,
    port,
    open: true,
    hot: true,
    stats: {
      colors: true,
    },
    contentBase: paths.dist,
    compress: true,
    historyApiFallback: true,
  };
  const server = new WebpackDevServer(compiler, devServerOptions);

  server.listen(port, host, () => {
    console.log(`Starting server on http://${host}:${port}`);
  });
};
