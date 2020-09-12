import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTransition, animated } from 'react-spring';
import * as easings from 'd3-ease';
import { hideModal } from '../../actions/modalActions';
import './Modal.scss';

const ModalContainer = ({ modals, hideModal }) => {
  const containerTransition = useTransition(modals.length > 0, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200, easing: easings.easeSinOut },
    trail: 150,
  });

  const modalTrainsitions = useTransition(modals, (modal) => modal.id, {
    from: { opacity: 0, top: -20 },
    enter: { opacity: 1, top: 120 },
    leave: { opacity: 0, top: -20 },
    config: { duration: 300, easing: easings.easeBackInOut }
  });

  return containerTransition.map(
    ({ item: container, key, props }) =>
      container && (
        <animated.div key={key} style={props} className="modalContainer">
          {modalTrainsitions.map(({ item: modal, key, props }) => (
            <animated.div key={key} style={props} className="modalWrapper">
              <modal.Component
                {...modal.data}
                id={modal.id}
                onHide={(isCancel, data) => {
                  if (modal.onHide) {
                    modal.onHide(data);
                  } else {
                    if (isCancel) {
                      modal.onCancel && modal.onCancel();
                    } else {
                      modal.onSuccess && modal.onSuccess(data);
                    }
                  }
                  hideModal(modal.id);
                }}
              />
            </animated.div>
          ))}
        </animated.div>
      )
  );
};

ModalContainer.propTypes = {
  modals: PropTypes.array.isRequired,
  hideModal: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
  return {
    modals: state.modals,
  };
};

export default connect(mapStateToProps, { hideModal })(ModalContainer);
