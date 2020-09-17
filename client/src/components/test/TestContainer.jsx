import React from 'react';
import './test.scss';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadTests } from '../../actions/testActions';
import { showInputTestMode } from '../../actions/modalActions';
import { generateUrl } from '../../utils';
import AnimateList from '../common/AnimateList';
import TestListItem from './TestListItem';

const TestContainer = ({
  totalPage,
  page,
  tests,
  loadTests,
  showInputTestMode,
  history,
  location,
}) => {
  const doTest = (test) => {
    const { _id: testId, name } = test;
    showInputTestMode({
      name,
      onSuccess: ({ mode, range }) => {
        const url = generateUrl(`/testing/${testId}`, { mode, range });
        history.push(url);
      },
    });
  };

  const getURLWithPage = (page) =>
    queryString.stringifyUrl({
      url: location.pathname,
      query: {
        ...queryString.parse(location.search),
        page: page === 1 ? undefined : page,
      },
    });

  return (
    <div className="test-container">
      <h2 className="title">List tests</h2>
      <AnimateList
        className="tests"
        items={tests}
        loadItems={loadTests}
        itemComponent={TestListItem}
        onClickItem={doTest}
      />
      {totalPage > 0 && (
        <Pagination
          page={page}
          count={totalPage}
          variant="outlined"
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={getURLWithPage(item.page)}
              {...item}
            />
          )}
        />
      )}
    </div>
  );
};

TestContainer.defaultProps = {
  page: 1,
  totalPage: 1,
  tests: [],
};

TestContainer.propTypes = {
  page: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  tests: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadTests: PropTypes.func.isRequired,
  showInputTestMode: PropTypes.func.isRequired,
};

const mapStateToProps = ({ tests }, { location }) => {

  const { currentPage, totalPage, items } = tests;

  return {
    page: currentPage,
    totalPage: totalPage,
    tests: items,
  };
};

const mapDispatchToProps = (dispatch, { location }) => {
  let { page } = queryString.parse(location.search);
  page = parseInt(page) || 1;

  return {
    loadTests: () => dispatch(loadTests(page)),
    showInputTestMode: (payload) => dispatch(showInputTestMode(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestContainer);
