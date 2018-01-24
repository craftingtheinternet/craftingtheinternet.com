import 'babel-polyfill';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import clientConfig from '../webpack/client.dev';
import serverConfig from '../webpack/server.dev';

const DEV = process.env.NODE_ENV === 'development';
const { publicPath } = clientConfig.output;
const outputPath = clientConfig.output.path;
const app = express();

if (DEV) {
  const multiCompiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = multiCompiler.compilers[0];

  app.use(webpackDevMiddleware(multiCompiler, { publicPath }));
  app.use(webpackHotMiddleware(clientCompiler));
  // keeps serverRender updated with arg: { clientStats, outputPath }
  app.use(webpackHotServerMiddleware(multiCompiler, {
    serverRendererOptions: { outputPath },
  }));
} else {
  // eslint-disable-next-line global-require, import/no-unresolved
  const clientStats = require('../buildClient/stats.json');
  // eslint-disable-next-line global-require, import/no-unresolved
  const serverRender = require('../buildServer/main.js').default;

  app.use(publicPath, express.static(outputPath));
  app.use(serverRender({ clientStats, outputPath }));
}

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening @ http://localhost:3000/');
});
