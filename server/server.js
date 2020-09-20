require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');
const boolParser = require('express-query-boolean');
const db = require('./db');
const logger = require('./logger')(__filename);
const apiRoute = require('./api/routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/build')))
app.use(boolParser());
app.use(passport.initialize());
require('./config/passport')(passport);
process.env.NODE_ENV !== 'test' && app.use(morgan('tiny'));
app.use('/api', apiRoute);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

if (process.env.NODE_ENV !== 'test') {
  const DB_URI = process.env.DB_URI;
  const PORT = process.env.PORT || 5000;
  db.connect(DB_URI).then(() => {
    app.listen(PORT, () => {
      logger.info(`Server is running on ${PORT}`);
    });
  });
}

module.exports = app;
