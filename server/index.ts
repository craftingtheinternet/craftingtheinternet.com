import * as express from "express";
import * as webpack from "webpack";
import * as webpackDevMiddleware from "webpack-dev-middleware";
import * as webpackHotMiddleware from "webpack-hot-middleware";
import * as webpackHotServerMiddleware from "webpack-hot-server-middleware/src";

import * as clientConfig from "../webpack/client.dev";
import * as serverConfig from "../webpack/server.dev";

const DEV = process.env.NODE_ENV === "development";
const publicPath = clientConfig.output.publicPath;
const outputPath = clientConfig.output.path;
const app = express();

if (DEV) {
  const multiCompiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = multiCompiler.compilers[0];

  app.use(webpackDevMiddleware(multiCompiler, { publicPath }));
  app.use(webpackHotMiddleware(clientCompiler));
  // keeps serverRender updated with arg: { clientStats, outputPath }
  app.use(webpackHotServerMiddleware(multiCompiler, {
    serverRendererOptions: { outputPath }
  }) as any);
} else {
  // tslint:disable-next-line no-var-requires
  const clientStats = require("../buildClient/stats.json");
  // tslint:disable-next-line no-var-requires
  const serverRender = require("../buildServer/main.js").default;

  app.use(publicPath, express.static(outputPath));
  app.use(serverRender({ clientStats, outputPath }));
}

app.listen(4000, () => {
  // tslint:disable-next-line no-console
  console.log("Listening @ http://localhost:4000/");
});
