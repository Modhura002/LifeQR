const twilio = require('twilio');

const formatPhoneNumber = (number) => {
  // Remove all non-digits
  const cleaned = ('' + number).replace(/\D/g, '');
  
  // If it's 10 digits and doesn't start with +, assume India (+91) as default for this user
  // (In a real app, you'd handle this more dynamically)
  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  }
  
  // If it already seems like E.164 (starts with +), return it
  if (number.startsWith('+')) {
    return number;
  }

  // Prepend + if missing
  return `+${cleaned}`;
};

const sendAlert = async (phoneNumber, patientName, location) => {
  // Guard clause for missing settings
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
    console.warn('[Twilio] Missing credentials in .env. SMS skipped.');
    return null;
  }

  const e164Number = formatPhoneNumber(phoneNumber);

  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    console.log(`[Twilio] Sending alert to ${e164Number} (Org: ${phoneNumber}) for ${patientName}`);

    const message = await client.messages.create({
      body: `LifeQR Alert: Emergency scan detected for ${patientName}. Location: ${location}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: e164Number
    });

    console.log(`[Twilio] Success! SID: ${message.sid}`);
    return message.sid;
  } catch (error) {
    console.error('[Twilio] Error Detail:', {
      code: error.code,
      message: error.message,
      moreInfo: error.moreInfo,
      status: error.status
    });
    return null;
  }
};

module.exports = { sendAlert };
