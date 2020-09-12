import { SHOW, HIDE } from '../actionTypes/modalTypes';

const initialState = [];

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW:
      return [...state, action.payload];

    case HIDE:
      return state.filter((modal) => modal.id !== action.payload.id);

    default:
      return state;
  }
};

export default modalReducer;
