import 'babel-polyfill';

// eslint-disable-next-line global-require, import/no-unresolved
const clientStats = require('../buildClient/stats.json');
// eslint-disable-next-line global-require, import/no-unresolved
const serverRender = require('../buildServer/main.js').default;

serverRender({ clientStats, outputPath });
