require('dotenv').config()
const express = require('express');
const connectDB = require('./database/config');
const { options, queryTimeout, maxReties, retryInterval } = require('./utils/config')

const app = express();

connectDB(
    process.env.MONGODB_URL_CONNECT,
    options,
    queryTimeout,
    retryInterval,
    maxReties
);

app.use(express.json());

require('./utils/routes')(app)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});