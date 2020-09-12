import { GET_TESTS } from '../actionTypes/testTypes';
import { TestAPI } from '../api';

export const loadTests = (onLoaded) => dispatch => {
  return TestAPI.list().then(tests => {
    dispatch(getTests(tests));
    onLoaded && onLoaded(tests);
  })
    .catch(err => console.log('Load Tests error:', err));
};

export const getTests = (tests) => ({
  type: GET_TESTS,
  payload: { tests }
});
