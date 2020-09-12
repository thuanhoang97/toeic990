import { SET_CURRENT_USER } from '../actionTypes/authTypes';

const initialState = {
  isAuthenticated: false,
  user: null,
};

export default function (state = initialState, action) {
  
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        user: action.payload,
        isAuthenticated: action.payload !== null
      }
      
    default:
      return state;
  };
};