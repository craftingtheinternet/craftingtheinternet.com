import * as React from "react";
import * as ReactDOM from "react-dom/server";
import Helmet from "react-helmet";
import { Provider, Store } from "react-redux";
import { flushChunkNames } from "react-universal-component/server";
import flushChunks from "webpack-flush-chunks";
import { DOMParser } from "xmldom";

import Wrapper from "../src/containers/Wrapper";

import configureStore from "./configureStore";

interface ReqProps {
  path: string;
  [key: string]: any;
}

interface ResProps {
  status: (statusCode: number) => void;
  send: (output: string) => void;
  redirect: (statusCode: number, output: string) => void;
  [key: string]: any;
}

type WebpackManifestType = {
  clientStats: object;
  [key: string]: any;
};

(global as any).DOMParser = DOMParser;

const createApp = (EntryPoint: typeof Wrapper, store: Store<object>) => (
  <Provider store={store}>
    <EntryPoint />
  </Provider>
);

export default ({ clientStats }: WebpackManifestType) => async (
  req: ReqProps,
  res: ResProps
) => {
  const store = await configureStore(req, res);

  if (!store) {
    return;
  }

  const app = createApp(Wrapper, store);
  const appString = ReactDOM.renderToString(app);
  const helmet = Helmet.renderStatic();
  const state: any = store.getState();
  const stateJson = JSON.stringify(state);
  const chunkNames = flushChunkNames();
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

  if (process.env.NODE_ENV !== "production") {
    // tslint:disable-next-line no-console
    console.log(
      `REQUESTED PATH: ${req.path}`,
      `\nCHUNK NAMES RENDERED: ${chunkNames}`
    );
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
          <div id="root">${appString}</div>
          ${cssHash}
          <script type='text/javascript' src='//cdn.polyfill.io/v2/polyfill.min.js'></script>
          <script type='text/javascript' src='/static/vendor.js'></script>
          <script>window.REDUX_STATE = ${stateJson}</script>
          ${js}
          ${
            process.env.NODE_ENV === "production"
              ? `
            <script src="/manup.js"></script>
            <script>
              if (navigator.serviceWorker && !navigator.serviceWorker.controller) {
                navigator.serviceWorker.register('/sw.js', {
                  scope: './'
                });
              }
            </script>
          `
              : ""
          }
        </body>
      </html>`);
};
