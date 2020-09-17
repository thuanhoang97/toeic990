const Test = require('../../models/test.model');

const TEST_EACH_PAGE = 5;

exports.getTests = async (req, res) => {
  let { page } = req.query;
  page = parseInt(page) || 1;

  const filter = {};
  const totalTest = await Test.countDocuments(filter);
  const tests = await Test
    .find(filter)
    .sort('name')
    .limit(TEST_EACH_PAGE)
    .skip((page - 1) * TEST_EACH_PAGE);

  res.json({
    tests,
    currentPage: page,
    pages: Math.ceil(totalTest / TEST_EACH_PAGE),
    numberOfResult: tests.length
  });
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
