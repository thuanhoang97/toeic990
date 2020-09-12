import React from 'react';
import Button from '../common/Button';
import PropTypes from 'prop-types';

const Notify = ({ setVisible, data, textButton, ...props }) => {
  const variant = props.variant || 'primary';

  return (
    <div className={`notify notify--${variant}`} style={props.style}>
      <h2 className="notify__title">{data.title}</h2>
      <p className="notify__text">
        { data.content }
      </p>
      <button 
        type="button"
        className="notify__btnClose"
        onClick={setVisible}
      >
          <i className="fas fa-times"></i>
      </button>
      <Button variant='primary'>
        { textButton || 'OK'}
      </Button>
    </div>
  )
}

Notify.propTypes = {
  style: PropTypes.object,
  textButton: PropTypes.string,
  variant: PropTypes.string,
  data: PropTypes.object.isRequired,
  setVisible: PropTypes.func.isRequired
};

export default Notify;
