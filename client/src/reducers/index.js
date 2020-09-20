import { combineReducers } from 'redux';
import pagination from './pagination';
import modals from './modalReducer';
import tests from './testReducer';
import auth from './authReducer';
import errors from './errorReducer';
import records from './recordReducer';
import loadingActions from './loadingReducer';

const rootReducer = combineReducers({
  modals,
  tests: pagination(tests),
  auth,
  errors,
  records: pagination(records),
  loadingActions,
});

export default rootReducer;
