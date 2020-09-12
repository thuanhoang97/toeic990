import React from 'react';
import { Button } from '@material-ui/core';
import Modal from './Modal';

const NotifyModal = ({ message, ...rest }) => {
  return (
    <Modal className="modal--notify" {...rest}>
      <h2 className="modal__title">NOTIFICATION</h2>
      <div className="modal__content">
        <p className="message">{message}</p>
      </div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => rest.onHide(false)}
      >
        OK
      </Button>
    </Modal>
  );
};

export default NotifyModal;
