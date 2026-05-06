const Sale = require('../models/Sale');
const Product = require('../models/Product');

// Generate unique sale number
const generateSaleNumber = async () => {
  const lastSale = await Sale.findOne().sort({ createdAt: -1 });
  const nextNumber = lastSale ? parseInt(lastSale.saleNumber.split('-')[1]) + 1 : 1;
  return `SALE-${String(nextNumber).padStart(6, '0')}`;
};

// @route   POST /api/sales
// @desc    Create a new sale
// @access  Private/Admin
exports.createSale = async (req, res) => {
  try {
    const { items, discount = 0, tax = 0, customerName, customerEmail, customerPhone, paymentMethod = 'cash' } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in sale' });
    }

    let totalAmount = 0;

    // Validate and calculate totals
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product not found: ${item.product}` });
      }

      const itemTotal = item.quantity * item.unitPrice;
      totalAmount += itemTotal;

      // Update product stock
      if (product.currentStock < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${product.productName}` });
      }

      product.currentStock -= item.quantity;
      await product.save();
    }

    const finalAmount = totalAmount - discount + tax;
    const saleNumber = await generateSaleNumber();

    const sale = await Sale.create({
      saleNumber,
      items,
      totalAmount,
      discount,
      tax,
      finalAmount,
      customerName,
      customerEmail,
      customerPhone,
      paymentMethod,
      status: 'completed',
      recordedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Sale created successfully',
      sale,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/sales
// @desc    Get all sales
// @access  Private
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate('items.product', 'productName productCode')
      .populate('recordedBy', 'name email');

    res.status(200).json({
      success: true,
      count: sales.length,
      sales,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/sales/:id
// @desc    Get sale by id
// @access  Private
exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate('items.product')
      .populate('recordedBy', 'name email');

    if (!sale) {
      return res.status(404).json({ success: false, message: 'Sale not found' });
    }

    res.status(200).json({
      success: true,
      sale,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/sales/report/summary
// @desc    Get sales summary report
// @access  Private
exports.getSalesSummary = async (req, res) => {
  try {
    const sales = await Sale.find();

    const totalSales = sales.length;
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.finalAmount, 0);
    const completedSales = sales.filter((s) => s.status === 'completed').length;
    const cancelledSales = sales.filter((s) => s.status === 'cancelled').length;

    const summary = {
      totalSales,
      totalRevenue,
      completedSales,
      cancelledSales,
      averageOrder: totalSales > 0 ? totalRevenue / totalSales : 0,
    };

    res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
