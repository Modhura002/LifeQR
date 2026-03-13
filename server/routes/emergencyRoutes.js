const express = require('express');
const router = express.Router();
const { getEmergencyProfile, logEmergencyScan } = require('../controllers/emergencyController');
const rateLimit = require('express-rate-limit');

// Rate limiting for emergency endpoint to prevent spamming SMS
const emergencyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many scans from this IP, please try again later.'
});

router.get('/:profileId', emergencyLimiter, getEmergencyProfile);
router.post('/log', emergencyLimiter, logEmergencyScan);

module.exports = router;
