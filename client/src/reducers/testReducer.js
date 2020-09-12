import { GET_TESTS, ADD_TEST, REMOVE_TEST, UPDATE_TEST } from '../actionTypes/testTypes';

const initState = [];

const testReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_TESTS:
      return action.payload.tests;

    case ADD_TEST:
      return [action.payload, ...state];

    case REMOVE_TEST:
      return state.filter((test) => test._id !== action.payload._id);

    case UPDATE_TEST:
      return state.map((test) =>
        test.id === action.payload._id ? { ...test, ...action.payload } : test
      );

    default:
      return state;
  }
};

export default testReducer;
