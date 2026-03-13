const MedicalProfile = require('../models/MedicalProfile');

// @desc    Create a medical profile
// @route   POST /api/profile/create
// @access  Private
const createProfile = async (req, res) => {
  try {
    const { 
      fullName, 
      bloodGroup, 
      allergies, 
      medicalConditions, 
      currentMedications, 
      emergencyContactName, 
      emergencyContactPhone 
    } = req.body;

    const profile = await MedicalProfile.create({
      user: req.user.id,
      fullName,
      bloodGroup,
      allergies,
      medicalConditions,
      currentMedications,
      emergencyContactName,
      emergencyContactPhone
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user medical profile
// @route   GET /api/profile/:userId
// @access  Private
const getProfile = async (req, res) => {
  try {
    const profile = await MedicalProfile.findOne({ user: req.params.userId });

    if (profile) {
      // Check if user is the owner
      if (profile.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
      }
      res.json(profile);
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update medical profile
// @route   PUT /api/profile/update/:userId
// @access  Private
const updateProfile = async (req, res) => {
  try {
    let profile = await MedicalProfile.findOne({ user: req.params.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Check if user is the owner
    if (profile.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    profile = await MedicalProfile.findOneAndUpdate(
      { user: req.params.userId },
      req.body,
      { new: true, runValidators: true }
    );

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete medical profile
// @route   DELETE /api/profile/delete/:userId
// @access  Private
const deleteProfile = async (req, res) => {
  try {
    const profile = await MedicalProfile.findOne({ user: req.params.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Check if user is the owner
    if (profile.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await profile.deleteOne();

    res.json({ message: 'Profile removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile
};
