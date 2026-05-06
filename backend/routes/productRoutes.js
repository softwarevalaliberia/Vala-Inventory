const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

router.post('/', protect, authorize('superadmin', 'admin'), createProduct);
router.get('/', protect, getAllProducts);
router.get('/:id', protect, getProductById);
router.put('/:id', protect, authorize('superadmin', 'admin'), updateProduct);
router.delete('/:id', protect, authorize('superadmin', 'admin'), deleteProduct);

module.exports = router;
