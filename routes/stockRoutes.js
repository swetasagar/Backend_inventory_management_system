const express = require('express');
const router = express.Router();
const {
  addStockMovement,
  getStockHistory,
  getDashboardStats,
} = require('../controllers/stockController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, addStockMovement).get(protect, getStockHistory);
router.route('/stats').get(protect, getDashboardStats);

module.exports = router;