import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import Select from '../common/Select';
import Modal from '../modal/Modal';
import { TEST_MODE, TEST_PART_RANGE } from '../../constants';

const modeOptions = Object.keys(TEST_MODE).map((k) => ({
  value: TEST_MODE[k],
  name: TEST_MODE[k].charAt(0).toUpperCase() + TEST_MODE[k].slice(1),
}));

const rangeOptions = Object.keys(TEST_PART_RANGE).map(
  (k) => TEST_PART_RANGE[k]
);

const InputTestModeModal = ({ name, ...rest }) => {
  const [mode, setMode] = useState(TEST_MODE.PRATICE);
  const [range, setRange] = useState(TEST_PART_RANGE.PART_1.value);

  useEffect(() => {
    if (mode === TEST_MODE.TEST) {
      setRange(TEST_PART_RANGE.ALL.value);
    }
  }, [mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    rest.onHide(false, {
      mode,
      range,
    });
  };

  return (
    <Modal {...rest} style={{ minWidth: 550 }}>
      <h2 className="modal__title">{name}</h2>
      <form
        action=""
        className="form formInputTestMode"
        onSubmit={handleSubmit}
      >
        <div className="form__group">
          <label className="label">Mode:</label>
          <Select
            className="input"
            options={modeOptions}
            variant="outlined"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          />
        </div>

        <div className="form__group">
          <label className="label">Range:</label>
          <Select
            className="input"
            options={rangeOptions}
            variant="outlined"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            disabled={mode === TEST_MODE.TEST}
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="btnSubmit"
        >
          Start
        </Button>
      </form>
    </Modal>
  );
};

export default InputTestModeModal;
