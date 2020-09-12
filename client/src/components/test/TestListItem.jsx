import React from 'react';
import PropTypes from 'prop-types';

const TestListItem = ({ data }) => {
  return <div className="test">{data.name}</div>;
};

TestListItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TestListItem;
