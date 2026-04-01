const express = require('express');

const app = express();

// test route
app.get('/', (req, res) => {
  res.send('Server is running successfully 🚀');
});

// port
const PORT = 5000;

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});