import { GET_TESTS, GET_TEST } from '../actionTypes/testTypes';

const testReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TESTS:
      return action.payload.tests;

    case GET_TEST:
      return addOrUpdateTest(state, action.payload.test);

    default:
      return state;
  }
};

const addOrUpdateTest = (tests, newTest) => {
  let result = [...tests];
  const testIdx = tests.findIndex((t) => t._id === newTest._id);
  if (testIdx === -1) {
    result = result.concat(newTest);
  } else {
    result[testIdx] = newTest;
  }
  return result;
};

export default testReducer;
