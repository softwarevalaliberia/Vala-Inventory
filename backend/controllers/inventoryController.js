const Inventory = require('../models/Inventory');
const Product = require('../models/Product');

// @route   POST /api/inventory
// @desc    Record inventory transaction
// @access  Private/Admin
exports.recordTransaction = async (req, res) => {
  try {
    const { productId, transactionType, quantity, reference, notes } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const balanceBefore = product.currentStock;

    if (transactionType === 'out' && quantity > balanceBefore) {
      return res.status(400).json({ success: false, message: 'Insufficient stock' });
    }

    if (transactionType === 'in') {
      product.currentStock += quantity;
    } else if (transactionType === 'out') {
      product.currentStock -= quantity;
    } else if (transactionType === 'adjustment') {
      product.currentStock = quantity;
    }

    const balanceAfter = product.currentStock;

    const transaction = await Inventory.create({
      product: productId,
      transactionType,
      quantity,
      reference,
      notes,
      recordedBy: req.user.id,
      balanceBefore,
      balanceAfter,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Transaction recorded successfully',
      transaction,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/inventory
// @desc    Get all inventory transactions
// @access  Private
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Inventory.find()
      .populate('product', 'productName productCode')
      .populate('recordedBy', 'name email');

    res.status(200).json({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/inventory/product/:productId
// @desc    Get inventory transactions for a product
// @access  Private
exports.getProductTransactions = async (req, res) => {
  try {
    const transactions = await Inventory.find({ product: req.params.productId })
      .populate('product', 'productName productCode')
      .populate('recordedBy', 'name email');

    res.status(200).json({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/inventory/report
// @desc    Get inventory report
// @access  Private
exports.getInventoryReport = async (req, res) => {
  try {
    const products = await Product.find();

    const report = products.map((product) => ({
      id: product._id,
      productName: product.productName,
      productCode: product.productCode,
      currentStock: product.currentStock,
      minStock: product.minStock,
      status: product.currentStock <= product.minStock ? 'Low Stock' : 'In Stock',
      purchasePrice: product.purchasePrice,
      sellingPrice: product.sellingPrice,
      totalValue: product.currentStock * product.purchasePrice,
    }));

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
