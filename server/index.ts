import * as Express from "express";
import * as Webpack from "webpack";
import * as WebpackDevMiddleware from "webpack-dev-middleware";
import * as WebpackHotMiddleware from "webpack-hot-middleware";
import * as WebpackHotServerMiddleware from "webpack-hot-server-middleware/src";

import * as clientConfig from "../webpack/client.dev";
import * as serverConfig from "../webpack/server.dev";

const DEV = process.env.NODE_ENV === "development";
const publicPath = clientConfig.output.publicPath;
const outputPath = clientConfig.output.path;
const app = Express();

if (DEV) {
  const multiCompiler = Webpack([
    clientConfig,
    serverConfig
  ] as Webpack.Configuration[]);
  const clientCompiler = multiCompiler.compilers[0];

  app.use(WebpackDevMiddleware(multiCompiler, { publicPath }));
  app.use(WebpackHotMiddleware(clientCompiler));
  app.use(
    WebpackHotServerMiddleware(multiCompiler, {
      serverRendererOptions: { outputPath }
    })
  );
} else {
  // tslint:disable-next-line no-var-requires
  const clientStats = require("../buildClient/stats.json");
  // tslint:disable-next-line no-var-requires
  const serverRender = require("../buildServer/main.js").default;

  app.use(publicPath, Express.static(outputPath));
  app.use(serverRender({ clientStats, outputPath }));
}

app.listen(4000, () => {
  // tslint:disable-next-line no-console
  console.log("Listening @ http://localhost:4000/");
});
