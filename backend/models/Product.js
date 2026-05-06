const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Please provide product name'],
    },
    productCode: {
      type: String,
      required: [true, 'Please provide product code'],
      unique: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide category'],
    },
    description: String,
    purchasePrice: {
      type: Number,
      required: [true, 'Please provide purchase price'],
    },
    sellingPrice: {
      type: Number,
      required: [true, 'Please provide selling price'],
    },
    currentStock: {
      type: Number,
      default: 0,
    },
    minStock: {
      type: Number,
      default: 10,
    },
    unit: {
      type: String,
      default: 'pcs',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    supplier: {
      name: String,
      email: String,
      phone: String,
      address: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
