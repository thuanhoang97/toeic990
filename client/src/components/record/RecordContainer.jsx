import React from 'react';
import PropTypes from 'prop-types';
import './record.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadRecords } from '../../actions/recordActions';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import queryString from 'query-string';
import AnimateList from '../common/List';
import RecordListItem from './RecordListItem';
import { getURLWithPage } from '../../utils';

const RecordContainer = ({
  totalPage,
  page,
  records,
  loadRecords,
  history,
  location,
}) => {
  const redirectCheckSheetURL = (record) => {
    history.push(`/check/${record._id}`);
  };

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
      <AnimateList
        items={records}
        loadItems={loadRecords}
        itemComponent={RecordListItem}
        onClickItem={redirectCheckSheetURL}
      />
    </div>
  );
};

RecordContainer.propTypes = {
  records: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  loadRecords: PropTypes.func.isRequired,
};

const mapStateToProps = ({ records }) => {
  const { items, currentPage, totalPage } = records;
  return {
    records: items,
    page: currentPage,
    totalPage,
  };
};

const mapDispatchToProps = (dispatch, { location }) => {
  let { page } = queryString.parse(location.search);
  page = parseInt(page) || 1;
  return {
    loadRecords: () => dispatch(loadRecords(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordContainer);
