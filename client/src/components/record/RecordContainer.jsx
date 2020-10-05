import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import './record.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadRecords, removeRecord } from '../../actions/recordActions';
import { showNotify } from '../../actions/modalActions';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import List from '../common/List';
import RecordListItem from './RecordListItem';
import { getURLWithPage } from '../../utils';
import queryString from 'query-string';

const RecordContainer = ({
  totalPage,
  page,
  records,
  loadRecords,
  showNotify,
  removeRecord,
  history,
  location,
}) => {
  const redirectCheckSheetURL = (record) => {
    history.push(`/check/${record._id}`);
  };

  const onRemoveRecord = (recordId) => {
    showNotify({
      message: 'Are you sure to remove this record?',
      onSuccess: () => {
        removeRecord(recordId).then(() => {
          loadRecords(page);
        });
      },
    });
  };

  const loadItems = useCallback(() => {
    console.log('page', page);
    return loadRecords(page);
  }, [loadRecords, page]);

  const renderPagination = () => (
    <Pagination
      page={page}
      count={totalPage}
      hidePrevButton
      hideNextButton
      shape="rounded"
      variant="outlined"
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={getURLWithPage(location.pathname, location.search, item.page)}
          {...item}
        />
      )}
    />
  );

  return (
    <div className="record-container">
      <h2 className="title">Your records</h2>
      {totalPage > 1 && renderPagination()}
      <List
        items={records}
        loadItems={loadItems}
        itemComponent={RecordListItem}
        onClickItem={redirectCheckSheetURL}
        itemProps={{
          onRemove: onRemoveRecord,
        }}
      />
    </div>
  );
};

RecordContainer.propTypes = {
  records: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  loadRecords: PropTypes.func.isRequired,
  showNotify: PropTypes.func.isRequired,
  removeRecord: PropTypes.func.isRequired,
};

const mapStateToProps = ({ records }, { location }) => {
  const { items, totalPage } = records;
  const { page } = queryString.parse(location.search);
  return {
    records: items,
    page: Number(page),
    totalPage,
  };
};

export default connect(mapStateToProps, {
  loadRecords,
  removeRecord,
  showNotify,
})(RecordContainer);
