import {
  ADD_RECORD,
  GET_RECORDS,
  GET_RECORD,
} from '../actionTypes/recordTypes';
import { RecordAPI } from '../api';

export const createRecord = (record) => (dispatch) => {
  return RecordAPI.create({ ...record }).then((newRecord) => {
    dispatch(
      addRecord({
        ...newRecord,
        score: getRecordScore(newRecord),
      })
    );
    
    return newRecord;
  });
};

export const loadRecord = (recordId, options) => (dispatch) => {
  return RecordAPI.get(recordId, options)
    .then((record) => {
      dispatch(
        getRecord({
          ...record,
          score: getRecordScore(record),
        })
      );
    })
    .catch((err) => {
      console.log('Load record errors:', err);
    });
};

export const loadRecords = () => (dispatch) => {
  return RecordAPI.list({ mine: true, test: true })
    .then((records) => {
      records = records.map((record) => ({
        ...record,
        score: getRecordScore(record),
      }));
      dispatch(getRecords(records));
    })
    .catch((err) => console.log('Load records errors:', err));
};

export const addRecord = (record) => {
  return {
    type: ADD_RECORD,
    payload: record,
  };
};

export const getRecords = (records) => {
  return {
    type: GET_RECORDS,
    payload: records,
  };
};

export const getRecord = (record) => {
  return {
    type: GET_RECORD,
    payload: record,
  };
};

const getRecordScore = (record) => {
  const answers = record.answers;
  const rightAnswers = record.test.answers;
  let score = 0;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === rightAnswers[i]) {
      score += 1;
    }
  }
  return score;
};
