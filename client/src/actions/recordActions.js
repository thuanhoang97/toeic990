import {
  GET_RECORDS,
  GET_RECORD,
} from '../actionTypes/recordTypes';
import { RecordAPI } from '../api';

export const createRecord = (record) => () => {
  return RecordAPI.create({ ...record });
};

export const loadRecord = (recordId, options) => (dispatch) => {
  return RecordAPI.get(recordId, options)
    .then((record) => {
      dispatch(getRecord(includeScore(record)));
    })
    .catch((err) => {
      console.log('Load record errors:', err);
    });
};

export const loadRecords = (page) => (dispatch) => {
  return RecordAPI.list({ mine: true, test: true, page })
    .then((data) => {
      const { records, currentPage, pages } = data;
      dispatch(
        getRecords({
          records: includeScore(records),
          pages,
          currentPage,
        })
      );
    })
    .catch((err) => console.log('Load records errors:', err));
};

export const getRecords = ({ records, currentPage, pages }) => {
  return {
    type: GET_RECORDS,
    payload: {
      records,
      currentPage,
      pages,
    },
  };
};

export const getRecord = (record) => {
  return {
    type: GET_RECORD,
    payload: {
      record,
    },
  };
};

const calcScore = (record) => {
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

const includeScore = (records) => {
  if (Array.isArray(records)) {
    return records.map((record) => ({
      ...record,
      score: calcScore(record),
    }));
  }

  return {
    ...records,
    score: calcScore(records),
  };
};
