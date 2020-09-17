import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Prompt } from 'react-router';
import { Button } from '@material-ui/core';
import AnswerSheet from './AnswerSheet';
import CountDown from './Countdown';
import Timer from './Timer';
import { TEST_MODE, TEST_TIME } from '../../constants';
import { showNotify } from '../../actions/modalActions';
import { createRecord } from '../../actions/recordActions';

const UserAnswerSheet = ({
  createRecord,
  showNotify,
  history,
  location,
  match,
}) => {
  let { mode, range } = useMemo(() => {
    return queryString.parse(location.search, {
      parseNumbers: true,
      arrayFormat: 'comma',
    });
  }, [location.search]);

  const initAnswers = new Array(range[1] - range[0]).fill(-1);
  const [answers, setAnswers] = useState(initAnswers);
  const [paused, setPaused] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [confirmOnQuit, setConfirmOnQuit] = useState(true);

  useEffect(() => {
    showNotify({
      message: 'Are you ready???',
      onHide: () => {
        setPaused(false);
      },
    });
  }, [showNotify]);

  const handleTimeup = () => {
    setPaused(true);
    setConfirmOnQuit(false);
    showNotify({
      message: "Time's up!!!",
      onHide: onCreateRecord,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    showNotify({
      message: 'Are you want to submit now?',
      onSuccess: onConfirmSubmit,
    });
  };

  const onConfirmSubmit = () => {
    setPaused(true);
    setConfirmOnQuit(false);
    onCreateRecord();
  };

  const onCreateRecord = () => {
    createRecord({
      test: match.params.testId,
      timeUse: timeElapsed,
      answers,
      range,
    }).then((newRecord) => history.push('/check/' + newRecord._id));
  };

  return (
    <form className="formTesting" onSubmit={handleSubmit}>
      <h2 className="title">Test 1</h2>
      {mode === TEST_MODE.TEST ? (
        <CountDown
          onTimeUp={handleTimeup}
          totalTime={TEST_TIME}
          timeElapsed={timeElapsed}
          setTimeElapsed={setTimeElapsed}
          paused={paused}
          setPaused={setPaused}
        />
      ) : (
        <Timer
          timeElapsed={timeElapsed}
          setTimeElapsed={setTimeElapsed}
          paused={paused}
          setPaused={setPaused}
        />
      )}

      <AnswerSheet
        title="Test 1"
        answers={answers}
        setAnswers={setAnswers}
        range={range}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="btnSubmit"
      >
        Submit
      </Button>

      <Prompt
        when={confirmOnQuit}
        message="You're doing test, do you want to leave now ?"
      />
    </form>
  );
};

export default connect(null, { showNotify, createRecord })(UserAnswerSheet);
