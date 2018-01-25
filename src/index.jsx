import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import App from './components/App';
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

render(App);

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./components/App', () => {
    // eslint-disable-next-line global-require
    const EntryPoint = require('./components/App').default;
    render(EntryPoint);
  });
}
