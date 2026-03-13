const mongoose = require('mongoose');

const emergencyScanSchema = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.ObjectId,
    ref: 'MedicalProfile',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  deviceInfo: {
    type: String
  }
});

module.exports = mongoose.model('EmergencyScan', emergencyScanSchema);
