import { GET_TESTS } from '../actionTypes/testTypes';
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

export const getTests = ({ tests, currentPage, pages }) => ({
  type: GET_TESTS,
  payload: {
    tests,
    currentPage,
    pages,
  },
});
