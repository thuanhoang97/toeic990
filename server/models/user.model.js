const mongoose = require('mongoose');
const { MIN_PASSWORD, MAX_PASSWORD } = require('../constants');

const schema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: MIN_PASSWORD,
    maxLength: MAX_PASSWORD,
  }
}, {
  versionKey: false,
});

schema.set('toJSON', {
  transform: (doc, ret, opt) => {
    delete ret['password'];
    return ret;
  }
})

module.exports = mongoose.model('users', schema);