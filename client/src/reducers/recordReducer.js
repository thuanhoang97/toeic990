import {
  ADD_RECORD,
  GET_RECORDS,
  GET_RECORD,
} from '../actionTypes/recordTypes';

export default function (records = [], action) {
  switch (action.type) {
    case ADD_RECORD:
      return [action.payload, ...records];

    case GET_RECORDS:
      return action.payload.records;

    case GET_RECORD:
      return addOrUpdateRecord(records, action.payload.record);

    default:
      return records;
  }
}

const addOrUpdateRecord = (records, newRecord) => {
  let newRecords = [...records];
  let recordIdx = newRecords.findIndex(
    (record) => record._id === newRecord._id
  );
  if (recordIdx === -1) {
    newRecords = newRecords.concat(newRecord);
  } else {
    newRecords[recordIdx] = newRecord;
  }
  return newRecords;
};
