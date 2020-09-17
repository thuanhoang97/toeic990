import { GET_TESTS } from '../actionTypes/testTypes';

const testReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TESTS:
      return action.payload.tests;

    default:
      return state;
  }
};

export default testReducer;
