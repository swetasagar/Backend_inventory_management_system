const asyncHandler = require('express-async-handler');
const Stock = require('../models/stockModel');
const Product = require('../models/productModel');


const addStockMovement = asyncHandler(async (req, res) => {
  const { product: productId, type, quantity, notes } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

 
  let newQuantity = product.quantity;
  if (type === 'in') {
    newQuantity += Number(quantity);
  } else if (type === 'out') {
    if (product.quantity < quantity) {
      res.status(400);
      throw new Error('Insufficient stock');
    }
    newQuantity -= Number(quantity);
  } else {
    res.status(400);
    throw new Error('Invalid movement type');
  }

  
  product.quantity = newQuantity;
  await product.save();

  const stock = new Stock({
    product: productId,
    user: req.user._id,
    type,
    quantity,
    notes,
  });

  const createdStock = await stock.save();

  res.status(201).json({
    stock: createdStock,
    updatedProduct: product,
  });
});


const getStockHistory = asyncHandler(async (req, res) => {
  const history = await Stock.find({}).populate('product', 'name').populate('user', 'name email');
  res.json(history);
});


const getDashboardStats = asyncHandler(async (req, res) => {
  const totalProducts = await Product.countDocuments({});
  
  const products = await Product.find({});
  const totalStock = products.reduce((acc, item) => acc + item.quantity, 0);
  const totalValue = products.reduce((acc, item) => acc + (item.quantity * item.price), 0);

  res.json({
    totalProducts,
    totalStock,
    totalValue,
    lowStockItems: products.filter(p => p.quantity < 10).length
  });
});

module.exports = {
  addStockMovement,
  getStockHistory,
  getDashboardStats,
};