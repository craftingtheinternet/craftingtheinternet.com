import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { calculateResponsiveState } from 'redux-responsive';
import createHistory from 'history/createBrowserHistory';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import Wrapper from 'containers/Wrapper';
import configureStore from './configureStore';

const history = createHistory();
const { store } = configureStore(history, window.REDUX_STATE);

const render = (EntryPoint) => {
  const root = document.getElementById('root');

  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <EntryPoint />
      </Provider>
    </AppContainer>,
    root,
  );
};

render(Wrapper);

store.dispatch(calculateResponsiveState(window));

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('containers/Wrapper', () => {
    // eslint-disable-next-line global-require
    const EntryPoint = require('containers/Wrapper').default;
    render(EntryPoint);
  });
}
