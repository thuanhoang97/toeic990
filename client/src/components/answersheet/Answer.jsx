import React from 'react';
import PropTypes from 'prop-types';

const Answer = ({
  index,
  displayIndex,
  ansValIdx,
  onSelect,
  rightAnsIdx,
  style,
}) => {
  const isEmpty = ansValIdx === -1;

  const handleSelect = (ansValIdx) => {
    onSelect(index, ansValIdx);
  };

  const getClass = (valIdx) => {
    let className = 'option';
    const selected = ansValIdx === valIdx;
    if (rightAnsIdx === undefined) {
      if (selected) {
        className += ' select';
      }
    } else {
      const right = rightAnsIdx === valIdx;
      if (selected && !right) {
        className += ' wrong';
      } else if (right) {
        className += ' right';
      }
    }
    return className;
  };

  return (
    <li className={`answerSheet__answer`} style={style}>
      <span className="index" style={{ textDecoration: 'line-through' }}>
        {displayIndex}.
      </span>
      {['A', 'B', 'C', 'D'].map((val, idx) => (
        <React.Fragment key={val}>
          <label htmlFor={`${displayIndex}-${val}`} className={getClass(idx)}>
            {val}
          </label>
          <input
            type="radio"
            id={`${displayIndex}-${val}`}
            name={index}
            value={idx}
            onChange={() => handleSelect(idx)}
          />
        </React.Fragment>
      ))}
    </li>
  );
};

Answer.propTypes = {
  index: PropTypes.number.isRequired,
  ansValIdx: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  right: PropTypes.number,
};

export default Answer;
