import { GET_ERRORS } from '../actionTypes/errorTypes';

export const receiveErrors = (errors) => {
  return {
    type: GET_ERRORS,
    payload: errors
  }
};

export const clearErrors = () => {
  return {
    type: GET_ERRORS,
    payload: {},
  }
};