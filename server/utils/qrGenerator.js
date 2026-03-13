const QRCode = require('qrcode');
const { getNgrokUrl } = require('./getNgrokUrl');

const generateQR = async (profileId) => {
  try {
    let baseUrl;

    // 1. Attempt to get dynamic ngrok URL
    try {
      baseUrl = await getNgrokUrl();
    } catch (error) {
      // 2. Fallback to FRONTEND_URL from .env or default localhost
      baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      console.warn(`[QR] ngrok not detected, falling back to: ${baseUrl}`);
    }

    const scanUrl = `${baseUrl}/emergency/${profileId}`;
    console.log(`[QR] Generating code for: ${scanUrl}`);
    
    // Generate QR code as a Data URL (base64)
    const qrCodeDataUrl = await QRCode.toDataURL(scanUrl);
    
    return { qrCodeDataUrl, scanUrl };
  } catch (err) {
    console.error('QR Generation Error:', err.message);
    throw new Error('Failed to generate QR code');
  }
};

module.exports = { generateQR };
