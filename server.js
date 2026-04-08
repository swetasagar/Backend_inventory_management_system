const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const app = express();

// test route
app.get('/', (req, res) => {
  res.send('Server is running successfully 🚀');
});

dotenv.config({ path: __dirname + '/.env' });
connectDB();

// port
const PORT = 5000;

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});