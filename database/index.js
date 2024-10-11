const mongoose = require('mongoose');

const mongoURI = 'mongodb://admin:admin123@127.0.0.1:27017/todoapp?authSource=admin';
const maxRetries = 5;
const retryInterval = 2000;

const options = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

const logConnectionError = (retries, err) => {
  console.error(`Connection attempt ${retries}/${maxRetries} failed.`);
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const tryConnect = (uri, opts) => mongoose.connect(uri, opts);

const connectDB = (uri, opts, retries = 1) =>
  tryConnect(uri, opts)
    .then(() => {
      console.log('MongoDB connected...\n');
      setupReconnection(uri, opts);
      return true;
    })
    .catch((err) => {
      logConnectionError(retries, err);
      if (retries >= maxRetries) {
        console.error('Max retries reached. Could not connect to MongoDB.');
        process.exit(1);
      }
      return wait(retryInterval).then(() =>
        connectDB(uri, opts, retries + 1)
      );
    });

const setupReconnection = (uri, opts) => {
  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected. Attempting to reconnect...');
    connectDB(uri, opts);
  });
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
};

const setQueryTimeout = (ms) => mongoose.set('maxTimeMS', ms);

const initDBConnection = () => {
  setQueryTimeout(5000);
  return connectDB(mongoURI, options);
};

module.exports = initDBConnection;