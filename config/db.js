const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const getCustomMongoURI = (databaseName) => {
  return db.replace('<dbname>', databaseName);
};

const connectDB = async (databaseName) => {
  try {
    await mongoose.connect(getCustomMongoURI(databaseName), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err.message);
  }
};

const dropDB = async (databaseName) => {
  try {
    await mongoose.connect(
      getCustomMongoURI(databaseName),
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => mongoose.connection.db.dropDatabase()
    );
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { connectDB, dropDB };
