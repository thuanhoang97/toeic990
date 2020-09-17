export default function (listReducer) {
  return (state, action) => {
    let items = listReducer(state, action);
    if (action.payload && action.payload.pages) {
      return {
        items,
        currentPage: action.payload.currentPage,
        totalPage: action.payload.pages,
      };
    }
    return items;
  };
}
