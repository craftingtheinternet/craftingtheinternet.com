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
  const state = store.getState();
  const stateJson = JSON.stringify(state);
  const chunkNames = flushChunkNames();
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

  if (process.env.NODE_ENV !== "production") {
    // tslint:disable-next-line no-console
    console.log("REQUESTED PATH:", req.path);
    // tslint:disable-next-line no-console
    console.log("CHUNK NAMES RENDERED", chunkNames);
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
