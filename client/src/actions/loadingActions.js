
export const loadRequest = (actionName) => {
  return {
    type: actionName + '_REQUEST'
  }
};

export const loadSuccess = (actionName, payload) => {
  return {
    type: actionName + '_SUCCESS',
    payload
  }
}; 

export const loadError = (actionName, errors) => {
  return {
    type: actionName + '_ERROR',
    payload: errors,
  }
};
