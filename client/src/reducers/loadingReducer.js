
export default function (state={}, action) {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);
  if (!matches) return state;

  const [, actionName, actionState] = matches;
  return {
    ...state,
    [actionName]: actionState === 'REQUEST'
  }
};
