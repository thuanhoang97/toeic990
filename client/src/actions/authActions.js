import jwtDecode from 'jwt-decode';
import { AuthAPI } from '../api';
import { setAuthToken }  from '../utils';
import { receiveErrors, clearErrors } from './errorActions';
import  { SET_CURRENT_USER } from '../actionTypes/authTypes';

export const loginUser = (account) => dispatch => {
  const { username, password } = account;
  AuthAPI.login(username, password)
    .then(token => {
      dispatch(clearErrors());

      localStorage.setItem('jwtToken', token);
      setAuthToken(token);

      const payload = jwtDecode(token);
      dispatch(setCurrentUser(payload));
    })
    .catch(err => {
      dispatch(receiveErrors(err.response.data));
    })
};

export const registerUser = (newAccount, history) => dispatch => {
  AuthAPI.register(newAccount)
    .then(() => {
      dispatch(clearErrors());
      history.push('/login');
    })
    .catch(err => {
      dispatch(receiveErrors(err.response.data));
    })
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(null);
  dispatch(setCurrentUser(null));
};

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  }
};

