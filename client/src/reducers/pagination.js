
const initialState = {
  items: [],
  currentPage: 1,
  totalPage: 1,
};

export default function (listReducer) {
  return (state=initialState, action) => {
    let items = listReducer(state.items, action);
    let newState = {...state, items };
    if (action.payload) {
      const { currentPage, pages } = action.payload;
      if (currentPage) {
        newState.currentPage = currentPage;
      }
      if (pages) {
        newState.totalPage = pages;
      }
    }
    return newState;
  };
}
