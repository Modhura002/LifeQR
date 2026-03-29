const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load .env from the server directory
dotenv.config({ path: path.join(__dirname, '.env') });

const uri = process.env.MONGODB_URI;

console.log('Testing connection to:', uri.replace(/:([^@]+)@/, ':****@')); // Hide password

async function testConnection() {
  try {
    console.log('Attempting to connect...');
    await mongoose.connect(uri, { 
      serverSelectionTimeoutMS: 5000 
    });
    console.log('Successfully connected to MongoDB!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Connection failed!');
    console.error('Error Name:', err.name);
    console.error('Error Message:', err.message);
    
    if (err.message.includes('ENOTFOUND')) {
      console.log('\nPossible causes:');
      console.log('1. The hostname is incorrect.');
      console.log('2. Your DNS resolver cannot find the SRV record.');
      console.log('3. Your cluster might be paused or deleted in MongoDB Atlas.');
    }
    
    process.exit(1);
  }
}

testConnection();
