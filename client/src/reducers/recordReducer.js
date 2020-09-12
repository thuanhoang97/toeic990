import {
  ADD_RECORD,
  GET_RECORDS,
  GET_RECORD,
} from '../actionTypes/recordTypes';

export default function (state = [], action) {
  switch (action.type) {
    case ADD_RECORD:
      return [action.payload, ...state];

    case GET_RECORDS:
      return action.payload;

    case GET_RECORD:
      const records = state.filter((r) => r._id !== action.payload._id);
      return [action.payload, ...records];

    default:
      return state;
  }
}
