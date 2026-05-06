const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  createAdmin,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/adminController');

router.post('/create-admin', protect, authorize('superadmin'), createAdmin);
router.get('/users', protect, authorize('superadmin', 'admin'), getAllUsers);
router.get('/users/:id', protect, authorize('superadmin', 'admin'), getUserById);
router.put('/users/:id', protect, authorize('superadmin', 'admin'), updateUser);
router.delete('/users/:id', protect, authorize('superadmin'), deleteUser);

module.exports = router;
