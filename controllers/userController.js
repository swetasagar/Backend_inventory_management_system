const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// LOGIN USER
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 🔥 Validation
  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // 🔥 Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('All fields are required');
  }

  if (name.length < 3) {
    res.status(400);
    throw new Error('Name must be at least 3 characters');
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be at least 6 characters');
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error('Invalid email format');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

module.exports = { authUser, registerUser };