import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './auth.scss';
import { TextField, Button } from '@material-ui/core';
import isEmpty from 'is-empty';
import validator from 'validator';
import  { registerUser } from '../../actions/authActions';

const Register = ({ auth, history, registerUser, ...props}) => {
  const [errors, setErrors] = useState({});
  const [account, setAccount] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    password2: '',
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/');
    }
  }, [auth, history]);

  useEffect(() => {
    setErrors(props.errors);
  }, [props.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);

    if (isEmpty(errors)) {
      registerUser(account, history);
    }
  };

  const handleChangeInput = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const errors = {};
    const { firstName, lastName, username, password, password2 } = account;
    if (!firstName) {
      errors.firstName = 'First name field is required.';
    }

    if (!lastName) {
      errors.lastName = 'Last name field is required.';
    }

    if (!username) {
      errors.username = 'Username field is required.';
    }

    if (password) {
      if (!validator.isLength(password, { min: 6, max: 30 })) {
        errors.password =
          'Password need at least 6 character and less then 30 character.';
      }
    } else {
      errors.password = 'Password field is required';
    }

    if (!validator.equals(password, password2)) {
      errors.password2 = 'Confirm password is not match.';
    }

    return errors;
  };

  return (
    <form className="form auth" onSubmit={handleSubmit}>
      <h4 className="title">New account</h4>
      <div className="row">
        <TextField
          label="First name"
          margin="normal"
          name="firstName"
          onChange={handleChangeInput}
          error={!!errors.firstName}
          helperText={errors.firstName}
          className="col"
        />
        <TextField
          label="Last name"
          margin="normal"
          name="lastName"
          onChange={handleChangeInput}
          error={!!errors.lastName}
          helperText={errors.lastName}
          className="col"
        />
      </div>
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
        name="password"
        type="password"
        onChange={handleChangeInput}
        error={!!errors.password}
        helperText={errors.password}
      />
      <TextField
        label="Confirm password"
        margin="normal"
        fullWidth
        name="password2"
        type="password"
        onChange={handleChangeInput}
        error={!!errors.password2}
        helperText={errors.password2}
      />

      <Button
        className="btnSubmit"
        type="submit"
        size="large"
        variant="contained"
        color="primary"
        disableElevation
      >
        Register
      </Button>

      <p className="note">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth, errors }) => ({
  auth,
  errors,
});

export default connect(mapStateToProps, { registerUser })(Register);
