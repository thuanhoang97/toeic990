import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getPartNameByRange } from '../../utils';

const RecordListItem = ({ data }) => {
  const createAt = moment(data.createAt).format('HH:mm:ss DD/MM/YYYY');
  const timeUse = moment()
    .startOf('day')
    .seconds(data.timeUse)
    .format('HH:mm:ss');

  return (
    <div className="record">
      <div className="record__title">
        <div className="record__result">{`[${data.score}/${data.answers.length}]`}</div>
        <div className="record__test-name">{data.test.name}</div>
        <div className="record__part">({getPartNameByRange(data.range)})</div>
      </div>
      <div className="record__info">
        <div className="record__time">
          Time taken: <span className="highlight">{timeUse}</span>
        </div>
        <div className="record__date">
          Date test: <span className="highlight">{createAt}</span>
        </div>
      </div>
    </div>
  );
};

RecordListItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default RecordListItem;
