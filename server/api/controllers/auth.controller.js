const isEmpty = require('is-empty');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
const { MIN_PASSWORD, MAX_PASSWORD, TIME } = require('../../constants');

exports.login = async (req, res) => {
  const errors = validateLogin(req.body);
  if (!isEmpty(errors)) {
    return res.status(400).json(errors);
  }

  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      const { _id, firstName, lastName, username } = user;
      const payload = {
        id: _id,
        firstName,
        lastName,
        username,
      };
      const token = await generateToken(payload);
      return res.json({ sucess: true, token });
    }

    return res.status(400).json({ password: 'Password is incorrect.' });
  }

  return res.status(400).json({ username: 'Username not found.' });
};

exports.register = async (req, res) => {
  const errors = validateRegister(req.body);
  if (isEmpty(errors)) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ username: 'Username is already exists.' });
    }

    const securePassword = await hashPassword(password);
    const userData = { ...req.body, password: securePassword };
    User.create(userData)
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.status(400).json(errors);
  }
};

exports.getProfile = async (req, res) => {
  res.json(req.user);
};

const validateRegister = (data) => {
  const errors = {};
  const { firstName, lastName, username, password, password2 } = data;

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
    const isEnoughLength = validator.isLength(password, {
      min: MIN_PASSWORD,
      max: MAX_PASSWORD,
    });
    if (!isEnoughLength) {
      errors.password = `Password need at least ${MIN_PASSWORD} character and  less than ${MAX_PASSWORD} character`;
    }
  } else {
    errors.password = 'Password field is required.';
  }

  if (!password2 || !validator.equals(password, password2)) {
    errors.password2 = 'Confirm password is not match.';
  }

  return errors;
};

const validateLogin = (data) => {
  const errors = {};
  const { username, password } = data;
  if (!username) {
    errors.username = 'Username field is required.';
  }

  if (!password) {
    errors.password = 'Password field is required.';
  }

  return errors;
};

const generateToken = (payload, expiresIn = TIME.WEEK) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_OR_KEY,
      {
        expiresIn,
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(`Bearer ${token}`);
        }
      }
    );
  });
};

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        bcrypt.hash(password, salt, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      }
    });
  });
};
