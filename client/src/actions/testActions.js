import { GET_TESTS, GET_TEST } from '../actionTypes/testTypes';
import { TestAPI } from '../api';

export const loadTests = (page) => (dispatch) => {
  return TestAPI.list({ page })
    .then((data) => {
      const { tests, currentPage, pages } = data;
      dispatch(
        getTests({
          tests,
          pages,
          currentPage,
        })
      );
    })
    .catch((err) => console.log('Load Tests error:', err));
};

export const loadTest = (id) => (dispatch) => {

  return TestAPI.getById(id)
    .then((test) => {
      dispatch(getTest(test))
    })
    .catch((err) => console.log('Load test error:', err));
};

export const getTests = ({ tests, currentPage, pages }) => ({
  type: GET_TESTS,
  payload: {
    tests,
    currentPage,
    pages,
  },
});

export const getTest = (test) => ({
  type: GET_TEST,
  payload: {
    test
  }
});
