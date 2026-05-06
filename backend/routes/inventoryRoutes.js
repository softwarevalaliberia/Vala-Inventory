const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  recordTransaction,
  getAllTransactions,
  getProductTransactions,
  getInventoryReport,
} = require('../controllers/inventoryController');

router.post('/', protect, authorize('superadmin', 'admin'), recordTransaction);
router.get('/', protect, getAllTransactions);
router.get('/product/:productId', protect, getProductTransactions);
router.get('/report', protect, getInventoryReport);

module.exports = router;
