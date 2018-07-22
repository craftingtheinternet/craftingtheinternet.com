import * as express from "express";
import * as webpack from "webpack";
import * as webpackDevMiddleware from "webpack-dev-middleware";
import * as webpackHotClient from "webpack-hot-client";

import * as clientConfig from "../webpack/client.dev";
import * as serverConfig from "../webpack/server.dev";

const DEV = process.env.NODE_ENV === "development";
const publicPath = clientConfig.output.publicPath;
const outputPath = clientConfig.output.path;
const app = express();

if (DEV) {
  const compiler = webpack([clientConfig, serverConfig] as webpack.Configuration[]);
  webpackHotClient(compiler, {});
  app.use(webpackDevMiddleware(compiler));
} else {
  // tslint:disable-next-line no-var-requires
  const clientStats = require("../buildClient/stats.json");
  // tslint:disable-next-line no-var-requires
  const serverRender = require("../buildServer/main.js").default;
  app.use(publicPath, express.static(outputPath));
  app.use(serverRender({ clientStats, outputPath }));
}

app.get('/', () => console.log('FUCK FUCK FUCK FUCK FUCK'));

app.listen(4000, () => {
  // tslint:disable-next-line no-console
  console.log("Listening @ http://localhost:4000/");
});
