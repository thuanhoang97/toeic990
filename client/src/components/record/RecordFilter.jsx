import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from '../common/Select';

const RecordFilter = ({ tests, onApplyFilter }) => {
  const [filter, setFilter] = useState({});

  useEffect(() => {
    onApplyFilter(filter);
  }, [filter, onApplyFilter]);

  const handleSelectTest = (e) => {
    setFilter({
      ...filter,
      testId: e.target.value,
    });
  };

  const testOptions = tests.map((t) => ({ value: t._id, name: t.name }));

  return (
    <div className="record-filter">
      <div className="identity identity--test">
        <div className="label">Test:</div>
        <Select
          className="input"
          options={testOptions}
          value={filter.testId}
          onChange={handleSelectTest}
          placeholder="Select the test"
        />
      </div>
    </div>
  );
};

RecordFilter.propTypes = {
  tests: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecordFilter;
