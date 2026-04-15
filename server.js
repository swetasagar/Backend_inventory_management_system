const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Routes
const productRoutes = require('./routes/productRoutes');
const stockRoutes = require('./routes/stockRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get('/', (req, res) => {
  res.send('Server is running successfully');
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/users', userRoutes);

// 🔥 ERROR MIDDLEWARE (VERY IMPORTANT)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});