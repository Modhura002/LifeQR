const express = require('express');
const router = express.Router();
const { generateProfileQR } = require('../controllers/qrController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate/:profileId', protect, generateProfileQR);

module.exports = router;
