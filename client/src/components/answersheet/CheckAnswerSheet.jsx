import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { KeyboardBackspaceRounded } from '@material-ui/icons';
import AnswerSheet from './AnswerSheet';
import { loadRecord } from '../../actions/recordActions';
import Loading from '../common/Loading';

const CheckAnswerSheet = ({ record, loadRecord }) => {
  useEffect(() => {
    if (!record) {
      loadRecord();
    }
  }, [record, loadRecord]);

  if (!record) return <Loading />;

  return (
    <div className="sheet-container">
      <div className="wrapper">
        <Link to="/records" className="link link-icon link-home">
          <KeyboardBackspaceRounded className="icon" />
          View records
        </Link>
        <h2 className="title">{record.test.name}</h2>
        <p className="result">
          Result:{' '}
          <span className="value">{`${record.score}/${record.answers.length}`}</span>
        </p>
        <AnswerSheet
          range={record.range}
          answers={record.answers}
          rightAnswers={record.test.answers}
          readOnly
        />
      </div>
    </div>
  );
};

CheckAnswerSheet.propTypes = {
  record: PropTypes.object,
  loadRecord: PropTypes.func.isRequired,
};

const mapStateToProps = ({ records }, { match }) => {
  const { items } = records;
  const recordId = match.params.recordId;
  return {
    record: items.find((r) => r._id === recordId),
  };
};

const mapDispatchToProps = (dispatch, { match }) => {
  const recordId = match.params.recordId;
  return {
    loadRecord: () => dispatch(loadRecord(recordId, { test: true })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckAnswerSheet);
