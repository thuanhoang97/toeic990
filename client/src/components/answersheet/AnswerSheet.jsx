import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './AnswerSheet.scss';
import { useBreakpoint } from '../../common/hooks/responsive';
import { chunkArray } from '../../utils';
import { TEST_PART_RANGE } from '../../constants';
import Answer from './Answer';

const AnswerSheet = ({
  range,
  answers,
  rightAnswers,
  readOnly,
  setAnswers,
}) => {
  const keyBreakpoint = useBreakpoint();

  const handleSelectAnswer = (selectAnsIdx, selectAnsValIdx) => {
    if (readOnly) return;

    setAnswers(
      answers.map((ansValIdx, ansIdx) =>
        ansIdx === selectAnsIdx ? selectAnsValIdx : ansValIdx
      )
    );
  };

  let { numRow, styles } = useMemo(() => getSheetConfig(keyBreakpoint), [
    keyBreakpoint,
  ]);
  const groups = useMemo(() => chunkArray(answers, numRow), [answers, numRow]);
  styles.answers = {
    ...styles.answers,
    width: Math.max(
      groups.length * (styles.answer.width + 30),
      styles.answers.width
    ),
    pointerEvents: readOnly ? 'none' : 'all',
  };

  return (
    <div className="answerSheet">
      <div className="answerSheet__wrapper" style={styles.wrapper}>
        <ul className="answerSheet__answers" style={styles.answers}>
          {groups.map((group, groupIdx) => (
            <li
              className="answerSheet__col"
              key={groupIdx}
              style={styles.answerCol}
            >
              <ul className="items">
                {group.map((ansValIdx, idx) => {
                  const answerIdx = groupIdx * numRow + idx;
                  const displayIdx = answerIdx + range[0] + 1;
                  return (
                    <Answer
                      style={styles.answer}
                      key={displayIdx}
                      index={answerIdx}
                      displayIndex={displayIdx}
                      ansValIdx={ansValIdx}
                      onSelect={handleSelectAnswer}
                      rightAnsIdx={rightAnswers && rightAnswers[answerIdx]}
                    />
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const getGridConfig = (keyBreakpoint) => {
  let numRow, numCol;
  switch (keyBreakpoint) {
    case 'sm':
      numRow = 10;
      numCol = 2;
      break;

    case 'md':
      numRow = 10;
      numCol = 3;
      break;

    case 'lg':
    case 'xl':
      numRow = 10;
      numCol = 5;
      break;

    default:
      numRow = 10;
      numCol = 5;
  }

  return [numRow, numCol];
};

const getSheetConfig = (keyBreakpoint) => {
  const [numRow, numCol] = getGridConfig(keyBreakpoint);
  const styles = {};

  styles.answer = {
    width: 160,
    height: 30,
    marginBottom: 15,
  };

  styles.answerCol = {
    margin: '0 15px',
  };

  styles.wrapper = {
    width: numCol * (styles.answer.width + 30) + 20,
    height: numRow * (styles.answer.height + 15) + 30,
    padding: '15px 10px',
  };

  styles.answers = {
    width: styles.wrapper.width - 20,
    height: numRow * (styles.answer.height + 15),
  };

  return {
    numRow,
    numCol,
    styles,
  };
};

AnswerSheet.defaultProps = {
  range: TEST_PART_RANGE,
  readOnly: false,
};

AnswerSheet.propTypes = {
  range: PropTypes.array.isRequired,
  answers: PropTypes.arrayOf(PropTypes.number).isRequired,
  rightAnswers: PropTypes.arrayOf(PropTypes.number),
  readOnly: PropTypes.bool,
  setAnswers: PropTypes.func,
};

export default AnswerSheet;
