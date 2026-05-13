const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/profile', require('./routes/userRoutes'));
app.use('/api/qr', require('./routes/qrRoutes'));
app.use('/api/emergency', require('./routes/emergencyRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

// Basic health check route
app.get('/', (req, res) => {
  res.send('LifeQR API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
