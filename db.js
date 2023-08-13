const mongoose = require('mongoose');
const { DB_URI } = require('./const');

const connectToDB = () => {
  // connect to DB
  mongoose.connect(DB_URI, { useNewUrlParser: false, useUnifiedTopology: true });
  const db = mongoose.connection;

  // on success
  db.once('open', () => {
    console.log('Connected to the database');
  });

  // on error
  db.on('error', (err) => console.log('Error ' + err));
};

module.exports = connectToDB;
