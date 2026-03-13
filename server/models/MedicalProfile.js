const mongoose = require('mongoose');

const medicalProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: [true, 'Please add full name']
  },
  bloodGroup: {
    type: String,
    required: [true, 'Please add blood group']
  },
  allergies: {
    type: String,
    default: 'None'
  },
  medicalConditions: {
    type: String,
    default: 'None'
  },
  currentMedications: {
    type: String,
    default: 'None'
  },
  emergencyContactName: {
    type: String,
    required: [true, 'Please add emergency contact name']
  },
  emergencyContactPhone: {
    type: String,
    required: [true, 'Please add emergency contact phone']
  },
  qrCodeURL: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MedicalProfile', medicalProfileSchema);
