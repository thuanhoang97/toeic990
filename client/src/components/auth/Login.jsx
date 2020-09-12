import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './auth.scss';
import { TextField, Button } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import isEmpty from 'is-empty';
import { loginUser } from '../../actions/authActions';

const Login = ({ auth, history, loginUser, ...props }) => {
  const [errors, setErrors] = useState({});
  const [account, setAccount] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/');
    }
  }, [auth, history]);

  useEffect(() => {
    setErrors(props.errors);
  }, [props.errors]);

  const handleChangeInput = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (isEmpty(newErrors)) {
      loginUser(account);
    }
  };

  const validate = () => {
    const errors = {};
    const { username, password } = account;
    if (!username) {
      errors.username = 'Username field is required.';
    }

    if (!password) {
      errors.password = 'Password field is required.';
    }

    return errors;
  };

  return (
    <form className="form auth" onSubmit={handleSubmit}>
      <h4 className="title">
        <AccountCircle style={{ color: '#4791db', fontSize: 100 }} />
      </h4>

      <TextField
        label="Username"
        margin="normal"
        fullWidth
        name="username"
        onChange={handleChangeInput}
        error={!!errors.username}
        helperText={errors.username}
      />
      <TextField
        label="Password"
        margin="normal"
        fullWidth
        type="password"
        name="password"
        onChange={handleChangeInput}
        error={!!errors.password}
        helperText={errors.password}
      />

      <Button
        className="btnSubmit"
        type="submit"
        size="large"
        variant="contained"
        color="primary"
        disableElevation
      >
        Login
      </Button>

      <p className="note">
        Don't have any accounts? <Link to="/register">Register now</Link>
      </p>
    </form>
  );
};

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth, errors }) => ({
  auth,
  errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
