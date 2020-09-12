import React from 'react';
import PropTypes from 'prop-types';
import './record.scss';
import { connect } from 'react-redux';
import { loadRecords } from '../../actions/recordActions';
import AnimateList from '../common/AnimateList';
import RecordListItem from './RecordListItem';

const RecordContainer = ({ records, loadRecords, history }) => {

  const showCheckSheet = (record) => {
    history.push(`/check/${record._id}`);
  }; 

  return <div className="record-container">
    <h2 className="title">Your records</h2>
    <AnimateList
      items={records}
      loadItems={loadRecords}
      itemComponent={RecordListItem}
      onClickItem={showCheckSheet}
    />
  </div>;
};

RecordContainer.propTypes = {
  records: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadRecords: PropTypes.func.isRequired,
};

const mapStateToProps = ({ records }) => ({
  records,
});

export default connect(mapStateToProps, { loadRecords })(RecordContainer);
