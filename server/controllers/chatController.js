const axios = require('axios');

const SYSTEM_PROMPT = `You are LifeQR AI, a helpful, empathetic, and knowledgeable medical and platform assistant for the LifeQR application. 
Your role is two-fold:
1. Medical Assistance: Provide general medical information, symptom checking, and first-aid advice. IMPORTANT: Always include a brief disclaimer that you are an AI and the user should seek professional medical help for emergencies.
2. Platform Assistance: Help users understand LifeQR's features, such as generating emergency QR codes, managing medical profiles, and scanning QR tags for rapid emergency response.
Keep your answers concise, structured, and easy to read.`;

const handleChat = async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const apiKey = process.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'Groq API Key is missing on the server' });
    }

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1024,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Chat API Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'An error occurred while processing the chat request',
      details: error.message 
    });
  }
};

module.exports = {
  handleChat
};
