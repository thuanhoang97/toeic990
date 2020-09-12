require('dotenv').config({ path: '.dev.env' });
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const db = require('./db');
const Test = require('./models/test.model');

const test_folder = 'C:/Users/hoang/Desktop/tests';

const ANSWER_MAP = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
};

const loadAnswersFromFiles = (folderPath) => {
  return new Promise((resovle, reject) => {
    fs.readdir(folderPath, (err, filenames) => {
      if (err) {
        return reject(err);
      }

      const tests = [];
      filenames.forEach((file) => {
        const name = file.split('.')[0];
        const data = fs.readFileSync(path.join(folderPath, file), {
          encoding: 'utf-8',
        });
        const answers = data.split(/\r?\n/).map((ans) => ANSWER_MAP[ans]);
        tests.push({
          name,
          answers,
        });
      });
      resovle(tests);
    });
  });
};

db.connect(process.env.DB_URI)
  .then(() => loadAnswersFromFiles(test_folder))
  .then((tests) => {
    const promises = tests.map((test) => {
      return Test.create(test)
        .then(() => {
          console.log('Create test:', test.name);
        })
        .catch((err) => {
          return Test.findOneAndUpdate(
            { name: test.name },
            { answers: test.answers }
          ).then(() => {
            console.log('Update test:', test.name);
          });
        });
    });

    return Promise.all(promises);
  })
  .then(() => mongoose.disconnect());
