const express = require('express');
const router = express.Router();
const { 
  createProfile, 
  getProfile, 
  updateProfile, 
  deleteProfile 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create', protect, createProfile);
router.get('/:userId', protect, getProfile);
router.put('/update/:userId', protect, updateProfile);
router.delete('/delete/:userId', protect, deleteProfile);

module.exports = router;
