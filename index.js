const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todo.routes');
const connectDB = require('./database');

const app = express();

connectDB();

app.use(bodyParser.json());

app.use('/api', todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});