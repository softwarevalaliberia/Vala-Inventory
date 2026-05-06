const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  createSale,
  getAllSales,
  getSaleById,
  getSalesSummary,
} = require('../controllers/saleController');

router.post('/', protect, authorize('superadmin', 'admin'), createSale);
router.get('/', protect, getAllSales);
router.get('/summary', protect, getSalesSummary);
router.get('/:id', protect, getSaleById);

module.exports = router;
