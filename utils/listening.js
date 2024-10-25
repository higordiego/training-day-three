

exports.setupReconnection = (mongoose, uri, maxReties, opts, connectDB) => {
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect....')
      connectDB(uri, opts, maxReties)
    })
    mongoose.connection.on('error', (err) => {
      console.log('MongoDB connection error: ', err)
    })
  }