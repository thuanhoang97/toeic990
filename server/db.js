const mongoose = require('mongoose');

const connect = (dbURI) => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };
  // console.log('Connecting to db...');
  return mongoose
    .connect(dbURI, options)
    .then((connection) => {
      // console.log('Connected!!!');
      return connection;
    })
    .catch((err) => {
      console.log('Connect DB got error!');
      console.log('URI: ' + dbURI);
      console.log(err);
    });
};

module.exports = {
  connect,
};
