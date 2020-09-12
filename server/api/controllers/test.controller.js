const Test = require('../../models/test.model');

exports.getTests = async (req, res) => {
  const tests = await Test.find({}).sort('-createdAt');
  res.json(tests);
};

exports.getTest = async (req, res) => {
  const test = await Test.findById(req.params.id);
  if (test) {
    res.json(test);
  } else {
    res.status(404).json({ test: 'Test not found!!!'});
  }
};

exports.postTest = async (req, res) => {
  Test.create(req.body)
    .then((newTest) => {
      res.status(201).json(newTest);
    })
    .catch((err) => {
      if (err.name === 'MongoError') {
        res.status(409).json(err);
      } else {
        res.status(403).json(err);
      }
    });
};

exports.updateTest = async (req, res) => {
  Test.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
  })
    .then((updatedTest) => {
      res.json(updatedTest);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

exports.deleteTest = async (req, res) => {
  const deletedTest = await Test.findByIdAndDelete(req.params.id);
  if (deletedTest) {
    res.json(deletedTest);
  } else {
    res.status(404).json({ test: 'Test not found!!!'});
  }
};
