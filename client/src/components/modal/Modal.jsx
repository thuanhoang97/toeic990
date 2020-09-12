import React from 'react';
import PropTypes from 'prop-types';
import { HighlightOff } from '@material-ui/icons';
import { IconButton, makeStyles } from '@material-ui/core';

const Modal = ({ onHide, children, className, ...props }) => {
  const classes = useStyles();
  const handleClose = () => {
    onHide(true);
  };

  return (
    <div className={`modal ${className ? className : ''}`} {...props}>
      <IconButton onClick={handleClose} className={classes.root} disableRipple>
        <HighlightOff />
      </IconButton>
      {children}
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    transition: 'color .3s ease-out',
    padding: 5,
    '&:hover': {
      color: '#111',
      background: 'transparent',
    },
  },
});

Modal.propTypes = {
  onHide: PropTypes.func.isRequired,
};

export default Modal;
