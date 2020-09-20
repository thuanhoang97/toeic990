const mongoose = require('mongoose');
const logger = require('./logger')(__filename);

const connect = (dbURI) => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };
  logger.info('Connecting to db...');
  return mongoose
    .connect(dbURI, options)
    .then((connection) => {
      logger.info('Connected!!!');
      return connection;
    })
    .catch((err) => {
      logger.error('Connect DB got error!')
      logger.error('URI: ' + dbURI);
      logger.error(err);
    });
};

module.exports = {
  connect,
};
