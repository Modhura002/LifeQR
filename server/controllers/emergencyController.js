const MedicalProfile = require('../models/MedicalProfile');
const EmergencyScan = require('../models/EmergencyScan');
const { sendAlert } = require('../utils/smsService');
const axios = require('axios');

// @desc    Get emergency medical profile
// @route   GET /api/emergency/:profileId
// @access  Public (Minimal Data)
const getEmergencyProfile = async (req, res) => {
  const { profileId } = req.params;
  console.log(`[Emergency] Fetching profile for ID: ${profileId}`);

  try {
    const profile = await MedicalProfile.findById(profileId);

    if (!profile) {
      console.warn(`[Emergency] 404 - Profile not found for ID: ${profileId}`);
      return res.status(404).json({ message: 'Profile not found' });
    }

    console.log(`[Emergency] Found profile: ${profile.fullName}`);

    // Initial alert removed to prevent duplicates. 
    // Alert will now only be sent from logEmergencyScan once location is captured.

    // Return only critical medical information
    res.json({
      _id: profile._id,
      fullName: profile.fullName,
      bloodGroup: profile.bloodGroup,
      allergies: profile.allergies,
      medicalConditions: profile.medicalConditions,
      currentMedications: profile.currentMedications,
      emergencyContactName: profile.emergencyContactName,
      emergencyContactPhone: profile.emergencyContactPhone
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Log emergency scan details
// @route   POST /api/emergency/log
// @access  Public
const logEmergencyScan = async (req, res) => {
  const { profileId, latitude, longitude, deviceInfo, simulate } = req.body;

  try {
    const profile = await MedicalProfile.findById(profileId);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    // 1. Store the scan log
    await EmergencyScan.create({
      profile: profileId,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      deviceInfo: deviceInfo || 'Web Browser'
    });

    // 2. Trigger Detailed SMS Alert with Map
    let locationString = 'Location Unknown';
    if (latitude && longitude) {
      locationString = `https://www.google.com/maps?q=${latitude},${longitude}`;
    }

    const alertType = simulate ? '[SIMULATED TEST]' : '[REAL EMERGENCY]';
    
    await sendAlert(
      profile.emergencyContactPhone,
      profile.fullName,
      `${alertType} ${locationString}`
    );

    res.json({ success: true, message: 'Emergency scan logged and alert sent' });
  } catch (error) {
    console.error('Logging Error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEmergencyProfile, logEmergencyScan };
