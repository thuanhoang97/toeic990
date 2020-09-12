import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadRecords } from '../../actions/recordActions';

const RecordList = ({ records, loadRecords }) => {
  
  useEffect(() => {
    // loadRecords();
  }, [loadRecords]);

  console.log('Records', records);

  return (
    <div>
      Record list.
    </div>
  )
};

RecordList.propTypes = {
  records: PropTypes.array.isRequired,
  loadRecords: PropTypes.func.isRequired,
};

const mapStateToProps = ({ records }) => ({
  records, 
});

export default connect(mapStateToProps, { loadRecords })(RecordList);
