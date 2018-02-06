import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { DOMParser } from 'xmldom';
import App from '../src/containers/App';
import configureStore from './configureStore';

global.DOMParser = DOMParser;

const createApp = (EntryPoint, store) => (
  <Provider store={store}>
    <EntryPoint />
  </Provider>
);

export default ({ clientStats }) => async (req, res) => {
  const store = await configureStore(req, res);
  if (!store) return;

  const app = createApp(App, store);
  const appString = ReactDOM.renderToString(app);
  const helmet = Helmet.renderStatic();
  const state = store.getState();
  const stateJson = JSON.stringify(state);
  const chunkNames = flushChunkNames();
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('REQUESTED PATH:', req.path);
    // eslint-disable-next-line no-console
    console.log('CHUNK NAMES RENDERED', chunkNames);
  }

  res.send(`<!doctype html>
      <html lang="en">
        <head>
          <title>${state.title}</title>
          ${styles}
          ${helmet.style.toString()}
          ${helmet.meta.toString()}
        </head>
        <body>
          <script>window.REDUX_STATE = ${stateJson}</script>
          <div id="root">${appString}</div>
          ${cssHash}
          <script type='text/javascript' src='/static/vendor.js'></script>
          ${js}
        </body>
      </html>`);
};
