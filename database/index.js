const mongoose = require('mongoose');

const { wait } = require('../utils/timeout')

const retryInterval = 2000

const tryConnect = (uri, opts) => mongoose.connect(uri, opts)

const setupReconnection = (uri, maxReties, opts) => {
  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconected. Attempting to reconnect....')
    connectDB(uri, opts, maxReties)
  })
  mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error: ', err)
  })
}

const logConnectionError = (retries, maxReties, err) => {
  console.log(`Connection attempt ${retries}/${maxReties} failed.`, err?.error)
} 

const connectDB = (uri, opts, maxReties, retries = 1) => {
  tryConnect(uri, opts)
    .then(() => {
      console.log('Mongodb connected...\n')
      setupReconnection(uri, opts)
      return true;
    }).catch(err => {
      logConnectionError(retries, maxReties, err)
      if (retries >= maxReties) {
        console.log('Max retries reached. Could not connect MongoDB.')
        process.exit(1);
      }
      return wait(retryInterval).then(() => {
        connectDB(uri, opts, maxReties, retries + 1)
      })
    })
}

const setQueryTimeout = (ms) => mongoose.set('maxTimeMS', ms)

const initDBConnection = (uri, options, queryTimeout, maxReties) => {
  setQueryTimeout(queryTimeout)
  return connectDB(uri, options, maxReties)
}



module.exports = initDBConnection;