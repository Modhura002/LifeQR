const MedicalProfile = require('../models/MedicalProfile');
const { generateQR } = require('../utils/qrGenerator');

// @desc    Generate QR code for medical profile
// @route   POST /api/qr/generate/:profileId
// @access  Private
const generateProfileQR = async (req, res) => {
  try {
    const profile = await MedicalProfile.findById(req.params.profileId);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Check if user is the owner
    if (profile.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const { qrCodeDataUrl, scanUrl } = await generateQR(profile._id);
    
    profile.qrCodeURL = qrCodeDataUrl;
    await profile.save();
    
    res.json({ qrCodeURL: qrCodeDataUrl, scanUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateProfileQR };
