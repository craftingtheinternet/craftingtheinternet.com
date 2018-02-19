import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createResponsiveStoreEnhancer } from 'redux-responsive';
import { connectRoutes } from 'redux-first-router';

import routesMap from './routesMap';
import * as reducers from './reducers';

const composeEnhancers = (...args) =>
  (typeof window !== 'undefined' ? composeWithDevTools({})(...args) : compose(...args));

export default (history, preloadedState) => {
  const {
    reducer, middleware, enhancer, thunk,
  } = connectRoutes(history, routesMap);

  const rootReducer = combineReducers({ ...reducers, location: reducer });
  const middlewares = applyMiddleware(middleware);
  const enhancers = composeEnhancers(
    enhancer,
    middlewares,
    createResponsiveStoreEnhancer({ calculateInitialState: false }),
  );
  const store = createStore(rootReducer, preloadedState, enhancers);

  if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('./reducers/index', () => {
      const reloadedRootReducer = combineReducers({
        // eslint-disable-next-line global-require
        ...require('./reducers/index'),
        location: reducer,
      });
      store.replaceReducer(reloadedRootReducer);
    });
  }

  return { store, thunk };
};
