import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import ModalContainer from './components/modal/ModalContainer';
import UserAnswerSheet from './components/answersheet/UserAnswerSheet';
import CheckAnswerSheet from './components/answersheet/CheckAnswerSheet';
import TestContainer from './components/test/TestContainer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/navbar/Navbar';
import RecordContainer from './components/record/RecordContainer';
import PrivateRoute from './components/common/PrivateRoute';
import { showNotify } from './actions/modalActions';

function App({ auth, showNotify }) {
  const getUserConfirmation = (message, callback) => {
    showNotify({
      message,
      onSuccess: () => callback(true),
      onCancel: () => callback(false),
    });
  };

  return (
    <div className="app">
      <BrowserRouter getUserConfirmation={getUserConfirmation}>
        {auth.isAuthenticated && <Navbar user={auth.user} />}

        <div className="row">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/records" component={RecordContainer} />
            <PrivateRoute exact path="/tests" component={TestContainer} />
            <PrivateRoute
              exact
              path="/testing/:testId"
              component={UserAnswerSheet}
            />
            <PrivateRoute
              exact
              path="/check/:recordId"
              component={CheckAnswerSheet}
            />
            <PrivateRoute exact path="/" component={TestContainer} />
          </Switch>
        </div>
        <ModalContainer />
      </BrowserRouter>
    </div>
  );
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps, { showNotify })(App);
