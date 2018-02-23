import { History } from "history";
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { connectRoutes, RoutesMap, RouteThunk } from "redux-first-router";
import { createResponsiveStoreEnhancer } from "redux-responsive";

import routesMap from "./routesMap";

import * as reducers from "./reducers";

export type StoreProps = {
  [key: string]: any;
};

export interface PrimedStore {
  store: Store<StoreProps>;
  thunk: (store: Store<StoreProps>) => Promise<RouteThunk<object>>;
}

const composeEnhancers: any = (...args: any[]) =>
  typeof window !== "undefined"
    ? composeWithDevTools({})(...args)
    : compose(...args);

export default (history: History, preloadedState?: object): PrimedStore => {
  const { reducer, middleware, enhancer, thunk } = connectRoutes(
    history,
    routesMap
  );

  const rootReducer = combineReducers({ ...reducers, location: reducer });
  const middlewares = applyMiddleware(middleware);
  const enhancers = composeEnhancers(
    enhancer,
    middlewares,
    createResponsiveStoreEnhancer({ calculateInitialState: false })
  );
  const store = createStore(rootReducer, preloadedState, enhancers);

  if (module.hot && process.env.NODE_ENV === "development") {
    module.hot.accept("./reducers/index", () => {
      const reloadedRootReducer = combineReducers({
        ...require("./reducers/index"),
        location: reducer
      });
      store.replaceReducer(reloadedRootReducer);
    });
  }

  return { store, thunk };
};
