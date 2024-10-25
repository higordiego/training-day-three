const mongoose = require('mongoose');

const { wait } = require('../utils/timeout')
const { logConnectionError } = require('../utils/logger')
const { setupReconnection } = require('../utils/listening')


const tryConnect = (uri, opts) => mongoose.connect(uri, opts)


const connectDB = (uri, opts, retryInterval, maxReties, retries = 1) => {
  tryConnect(uri, opts)
    .then(() => {
      console.log('Mongodb connected...\n')
      setupReconnection(mongoose, uri, maxReties, opts, connectDB)
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

const initDBConnection = (uri, options, queryTimeout, retryInterval, maxReties) => {
  setQueryTimeout(queryTimeout)
  return connectDB(uri, options, retryInterval, maxReties)
}


module.exports = initDBConnection;