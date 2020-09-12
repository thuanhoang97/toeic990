import React from 'react';
import ReactDOM from 'react-dom';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import './styles/index.scss';
import App from './App';
import { getStore } from './store';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { setAuthToken } from './utils';
import theme from './theme';

const store = getStore();

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  const payload = jwtDecode(token);

  setAuthToken(token);
  store.dispatch(setCurrentUser(payload));

  const curTime = Date.now() / 1000;
  if (payload.exp < curTime) {
    store.dispatch(logoutUser());
    window.localtion.href = '/login';
  }
}

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
