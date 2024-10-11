require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');
const connectDB = require('./database');
const { options, queryTimeout, maxReties } = require('./utils/config')

const app = express();

connectDB(
    process.env.MONGODB_URL_CONNECT, 
    options, 
    queryTimeout, 
    maxReties
);

app.use(bodyParser.json());

app.use('/api', todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});