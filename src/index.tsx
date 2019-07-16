import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';

import { ThemeProvider } from 'styled-components';
import { theme } from '@src/theme';
import App from './App';
import store, { history } from './store';

// Render App
const Index = hot(() => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
));

ReactDOM.render(<Index />, document.getElementById('root'));
