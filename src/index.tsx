import createHistory from "history/createBrowserHistory";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { calculateResponsiveState } from "redux-responsive";

import Wrapper from "containers/Wrapper";

import configureStore from "./configureStore";

const history = createHistory();
const { store } = configureStore(history, (window as any).REDUX_STATE);

const render = (EntryPoint: typeof Wrapper) => {
  const root = document.getElementById("root");

  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <EntryPoint />
      </Provider>
    </AppContainer>,
    root
  );
};

render(Wrapper);

store.dispatch(calculateResponsiveState(window));

if ((module as any).hot && process.env.NODE_ENV === "development") {
  (module as any).hot.accept("containers/Wrapper", () => {
    const EntryPoint = require("containers/Wrapper").default;
    render(EntryPoint);
  });
}
