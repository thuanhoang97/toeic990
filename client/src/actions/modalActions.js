import { v4 as uuidv4 } from 'uuid';
import { SHOW, HIDE } from '../actionTypes/modalTypes';
import NotifyModal from '../components/modal/NotifyModal';
import InputNameModal from '../components/test/InputNameModal';
import InputTestModeModal from '../components/test/InputTestModeModal';

export const show = ({ component, onHide, onSuccess, onCancel, ...rest }) => {
  return {
    type: SHOW,
    payload: {
      id: uuidv4(),
      data: rest,
      Component: component,
      onSuccess,
      onCancel,
      onHide,
    },
  };
};

export const showNotify = (payload) => {
  return show({
    ...payload,
    component: NotifyModal,
  });
};

export const showInputTestName = (payload) => {
  return show({
    ...payload,
    component: InputNameModal,
  });
};

export const showInputTestMode = (payload) => {
  return show({
    ...payload,
    component: InputTestModeModal,
  });
};

export const hideModal = (id) => {
  return {
    type: HIDE,
    payload: {
      id,
    },
  };
};
