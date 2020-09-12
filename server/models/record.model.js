const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    test: {
      type: mongoose.Types.ObjectId,
      ref: 'Test',
      required: true,
    },
    submitBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
      select: false,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    answers: {
      type: [Number],
      required: true,
    },
    range: {
      type: [Number],
      required: true,
    },
    timeUse: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

schema.methods.populateTest = async function () {
  const result = await this.populate('test').execPopulate();
  const range = result.range;
  result.test.answers = result.test.answers.slice(range[0], range[1]);
  return result;
};

schema.methods.calcScore = async function() {
  const record = await this.populateTest();
  const answers = record.answers;
  const rightAnswers = record.test.answers;
  let score = 0;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === rightAnswers[i]) {
      score += 1;
    }
  }

  return score;
};

module.exports = mongoose.model('Record', schema);
