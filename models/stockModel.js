const mongoose = require('mongoose');

const stockSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    type: {
      type: String,
      required: true,
      enum: ['in', 'out'],
    },
    quantity: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;