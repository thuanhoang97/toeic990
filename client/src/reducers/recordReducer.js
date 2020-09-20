import {
  GET_RECORDS,
  GET_RECORD,
} from '../actionTypes/recordTypes';

export default function (records = [], action) {
  switch (action.type) {
    case GET_RECORDS:
      return action.payload.records;

    case GET_RECORD:
      const newRecord = action.payload.record;
      let recordIdx = findRecordIdx(records, newRecord);
      if (recordIdx === -1) {
        return [...records, newRecord];
      }

      const newRecords = [...records];
      newRecords[recordIdx] = newRecord;
      return newRecords;

    default:
      return records;
  }
}

const findRecordIdx = (records, record) => {
  return records.findIndex((r) => r._id === record._id);
};