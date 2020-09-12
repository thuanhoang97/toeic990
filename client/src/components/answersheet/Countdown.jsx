import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer';

const Countdown = ({
  timeElapsed,
  totalTime,
  paused,
  setPaused,
  onTimeUp,
  setTimeElapsed,
}) => {
  const [didTimeUp, setTimeUp] = useState(false);

  useEffect(() => {
    if (didTimeUp) return;

    if (timeElapsed >= totalTime) {
      setTimeUp(true);
      onTimeUp();
    }
  }, [timeElapsed, onTimeUp, totalTime, didTimeUp]);

  const getRemainTime = (timeElapsed) => Math.max(totalTime - timeElapsed, 0);

  return (
    <Timer
      timeElapsed={timeElapsed}
      setTimeElapsed={setTimeElapsed}
      paused={paused}
      setPaused={setPaused}
      getTime={getRemainTime}
    />
  );
};

Countdown.defaultProps = {
  time: 0,
  paused: false,
};

Countdown.propTypes = {
  totalTime: PropTypes.number.isRequired,
  paused: PropTypes.bool.isRequired,
  setPaused: PropTypes.func.isRequired,
  onTimeUp: PropTypes.func.isRequired,
  timeElapsed: PropTypes.number.isRequired,
  setTimeElapsed: PropTypes.func.isRequired,
};

export default Countdown;
