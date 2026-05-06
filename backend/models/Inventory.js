const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    transactionType: {
      type: String,
      enum: ['in', 'out', 'adjustment'],
      required: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide quantity'],
    },
    reference: String,
    notes: String,
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    balanceBefore: Number,
    balanceAfter: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inventory', inventorySchema);
