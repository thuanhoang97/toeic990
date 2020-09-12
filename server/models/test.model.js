const mongoose = require('mongoose');

const NUM_ANSWERS = 200;
const arraySize = (arr) => arr.length === NUM_ANSWERS;

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    answers: {
      type: [Number],
      required: true,
      validate: [arraySize, `Require ${NUM_ANSWERS} answers on create!!!`],
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Test', schema);
