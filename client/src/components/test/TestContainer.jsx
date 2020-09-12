import React from 'react';
import './test.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadTests } from '../../actions/testActions';
import { showInputTestMode } from '../../actions/modalActions';
import { generateUrl } from '../../utils';
import AnimateList from '../common/AnimateList';
import TestListItem from './TestListItem';

const TestContainer = ({ tests, loadTests, showInputTestMode, history }) => {
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
    </div>
  );
};

TestContainer.propTypes = {
  tests: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadTests: PropTypes.func.isRequired,
  showInputTestMode: PropTypes.func.isRequired,
};

const mapStateToProps = ({ tests }) => ({
  tests,
});

export default connect(mapStateToProps, {
  loadTests,
  showInputTestMode,
})(TestContainer);
