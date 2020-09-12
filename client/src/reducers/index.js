import { combineReducers } from 'redux';
import modals from './modalReducer';
import tests from './testReducer';
import auth from './authReducer';
import errors from './errorReducer';
import records from './recordReducer';
import loadingActions from './loadingReducer';


const rootReducer = combineReducers({
  modals,
  tests,
  auth,
  errors,
  records,
  loadingActions,
});

export default rootReducer;