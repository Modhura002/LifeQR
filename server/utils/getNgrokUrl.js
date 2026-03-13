const axios = require('axios');

/**
 * Utility to fetch the dynamic public URL from ngrok's local API.
 * ngrok exposes an API at http://127.0.0.1:4040/api/tunnels when running.
 */
const getNgrokUrl = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:4040/api/tunnels', { timeout: 1000 });
    
    // Extract the public URL from the first active tunnel
    if (response.data && response.data.tunnels && response.data.tunnels.length > 0) {
      const publicUrl = response.data.tunnels[0].public_url;
      console.log(`[ngrok] Detected active tunnel: ${publicUrl}`);
      return publicUrl;
    }
    
    throw new Error('No active ngrok tunnels found');
  } catch (error) {
    // If ngrok is not running or API fails, we throw to let the caller handle fallback
    throw new Error('ngrok API not reachable');
  }
};

module.exports = { getNgrokUrl };
