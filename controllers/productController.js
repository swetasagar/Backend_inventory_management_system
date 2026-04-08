const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');


const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});


const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});


const createProduct = asyncHandler(async (req, res) => {
  const { name, price, quantity, description } = req.body;

  const product = new Product({
    name,
    price,
    quantity,
    description,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});


const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, quantity, description } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price !== undefined ? price : product.price;
    product.quantity = quantity !== undefined ? quantity : product.quantity;
    product.description = description || product.description;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});


const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
