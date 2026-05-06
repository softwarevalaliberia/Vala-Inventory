const Product = require('../models/Product');

// @route   POST /api/products
// @desc    Create a new product
// @access  Private/Admin
exports.createProduct = async (req, res) => {
  try {
    const { productName, productCode, category, description, purchasePrice, sellingPrice, minStock, unit, supplier } = req.body;

    let product = await Product.findOne({ productCode });
    if (product) {
      return res.status(400).json({ success: false, message: 'Product code already exists' });
    }

    product = await Product.create({
      productName,
      productCode,
      category,
      description,
      purchasePrice,
      sellingPrice,
      minStock,
      unit,
      supplier,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/products
// @desc    Get all products
// @access  Private
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/products/:id
// @desc    Get product by id
// @access  Private
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('createdBy', 'name email');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
  try {
    const { productName, category, description, purchasePrice, sellingPrice, minStock, unit, status, supplier } = req.body;

    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.productName = productName || product.productName;
    product.category = category || product.category;
    product.description = description || product.description;
    product.purchasePrice = purchasePrice || product.purchasePrice;
    product.sellingPrice = sellingPrice || product.sellingPrice;
    product.minStock = minStock || product.minStock;
    product.unit = unit || product.unit;
    product.status = status || product.status;
    product.supplier = supplier || product.supplier;

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
