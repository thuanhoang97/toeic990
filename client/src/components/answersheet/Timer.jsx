import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { PauseCircleOutline, PlayCircleOutline } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { timeToString } from '../../utils';

const Timer = ({ timeElapsed, paused, setPaused, setTimeElapsed, getTime }) => {
  useEffect(() => {
    if (paused) return;

    const timeInterval = 100;
    let curTime = timeElapsed;
    const timeIntervalId = setInterval(() => {
      curTime += timeInterval / 1000;
      const roudedTime = Math.floor(curTime);
      if (roudedTime !== timeElapsed) {
        setTimeElapsed(roudedTime);
      }
    }, timeInterval);

    return () => {
      timeIntervalId && clearInterval(timeIntervalId);
    };
  }, [paused, timeElapsed, setTimeElapsed]);

  const togglePause = () => {
    setPaused(!paused);
  };

  return (
    <div className="timer">
      <span className="value">{timeToString(getTime(timeElapsed))}</span>
      <IconButton className="btnControl" onClick={togglePause}>
        {paused ? <PlayCircleOutline /> : <PauseCircleOutline />}
      </IconButton>
    </div>
  );
};

Timer.defaultProps = {
  getTime: (time) => time,
};

Timer.propTypes = {
  timeElapsed: PropTypes.number.isRequired,
  setTimeElapsed: PropTypes.func.isRequired,
  getTime: PropTypes.func.isRequired,
  paused: PropTypes.bool.isRequired,
  setPaused: PropTypes.func.isRequired,
};

export default Timer;
