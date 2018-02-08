/*
  eslint-disable
  global-require,
  import/no-unresolved,
  import/no-extraneous-dependencies,
  no-restricted-syntax,
  no-await-in-loop,
  no-console,
*/
import 'babel-polyfill';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import clientConfig from '../webpack/client.dev';

const outputPath = clientConfig.output.path;
const clientStats = require('../buildClient/stats.json');
const serverRender = require('../buildServer/main.js').default;

const render = serverRender({ clientStats, outputPath });

const writeFile = slug => async (contents) => {
  const filePath = path.join(__dirname, '..', 'buildStatic', slug, 'index.html');
  try {
    await fs.outputFile(filePath, contents);
    console.log(chalk.green(`${slug} ✓`));
  } catch (e) {
    console.log(chalk.red(`${slug} ✗`));
    throw e;
  }
};

const renderRoute = async (slug) => {
  await render({ path: slug }, { send: writeFile(slug), status: () => 200 });
};

const renderRoutes = async (routes) => {
  const resolvedRoutes = (typeof routes === 'function') ? await routes() : routes;
  for (const route of resolvedRoutes) {
    await renderRoute(route);
  }
};

renderRoutes(['/', '/resume']);
