const Record = require('../../models/record.model');

module.exports = {
  getRecords: async (req, res) => {
    const filter = {};
    const { mine, test } = req.query;
    if (mine) {
      filter.submitBy = req.user._id;
    }
    
    let records = await Record.find(filter).sort('-createAt');

    if (test) {
      records = await Promise.all(
        records.map(async (record) => record.populateTest())
      );
    }

    res.json(records);
  },

  getRecord: async (req, res) => {
    let record = await Record.findById(req.params.id);
    if (record) {
      const { test } = req.query;
      if (test) {
        record = await record.populateTest();
      }
      res.json(record);
    } else {
      res.status(404).json({ record: 'Record not found!' });
    }
  },

  createRecord: async (req, res) => {
    const { answers, range } = req.body;

    if (answers.length !== range[1] - range[0]) {
      return res.status(400).json({
        answers: 'Not enough answers!!!',
      });
    }

    const data = { ...req.body, submitBy: req.user._id };
    Record.create(data)
      .then((newRecord) => newRecord.populateTest())
      .then((newRecord) => res.status(201).json(newRecord))
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  removeRecord: async (req, res) => {
    const deletedRecord = await Record.findOneAndDelete({
      _id: req.params.id,
      submitBy: req.user._id,
    });

    if (deletedRecord) {
      res.json(deletedRecord);
    } else {
      res.status(404).json({
        record: 'Record not found!',
      });
    }
  },
};
