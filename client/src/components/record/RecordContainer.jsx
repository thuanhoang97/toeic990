import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './record.scss';
import { connect } from 'react-redux';
import { loadRecords } from '../../actions/recordActions';
import AnimateList from '../common/AnimateList';
import RecordListItem from './RecordListItem';
import RecordFilter from './RecordFilter';

const RecordContainer = ({ tests, records, loadRecords, history }) => {
  const [displayRecords, setDisplayRecords] = useState(records);

  useEffect(() => {
    setDisplayRecords(records);
  }, [records]);

  const showCheckSheet = (record) => {
    history.push(`/check/${record._id}`);
  }; 

  const handleApplyFilter = useCallback((filter) => {
    if (filter.testId) {
      setDisplayRecords(records.filter(r => r.test._id === filter.testId));
    }
  }, [records]);

  return <div className="record-container">
    <h2 className="title">Your records</h2>
    {/* <RecordFilter tests={tests} onApplyFilter={handleApplyFilter}/> */}
    <AnimateList
      items={displayRecords}
      loadItems={loadRecords}
      itemComponent={RecordListItem}
      onClickItem={showCheckSheet}
    />
  </div>;
};

RecordContainer.propTypes = {
  tests: PropTypes.arrayOf(PropTypes.object).isRequired,
  records: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadRecords: PropTypes.func.isRequired,
};

const mapStateToProps = ({ records }) => {
  const testsById = {};
  records.forEach(r => testsById[r.test._id] = r.test);

  return {
    records,
    tests: Object.keys(testsById).map(testId => testsById[testId]),
  }
};

export default connect(mapStateToProps, { loadRecords })(RecordContainer);
