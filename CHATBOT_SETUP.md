# LifeQR AI Chatbot Setup Guide

This guide provides step-by-step instructions for anyone cloning this repository who wants to get the **LifeQR AI Chatbot** feature running locally.

## Prerequisites

Ensure you have the following installed before proceeding:
- Node.js (v18+)
- MongoDB (running locally or a MongoDB Atlas URI)
- A Groq account (to obtain the free API key)

## Step 1: Obtain a Groq API Key

The chatbot relies on the lightning-fast Groq API to generate AI responses using the `llama-3.1-8b-instant` model.
1. Go to the [Groq Cloud Console](https://console.groq.com/).
2. Create an account or log in.
3. Navigate to **API Keys** and generate a new key.
4. Copy the API key to your clipboard.

## Step 2: Configure Environment Variables

The project uses a single unified `.env` file located in the root directory.
1. In the root directory (`LifeQR/`), create a file named `.env` (if it doesn't already exist).
2. Add the following variables to it:

```env
# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/lifeqr

# Chatbot API Key (Required for the AI Chatbot)
GROQ_API_KEY=your_copied_api_key_here

# Other secrets
JWT_SECRET=your_jwt_secret
```

## Step 3: Install Dependencies

You'll need to install dependencies for both the frontend and the backend.

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
# From the root directory (LifeQR/)
npm install
```

## Step 4: Run the Application

Start your local MongoDB service if it isn't running already. Then, run both development servers:

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
# From the root directory
npm run dev
```

## Step 5: Test the Chatbot

1. Open your browser and navigate to `http://localhost:5173/`.
2. In the bottom-right corner, click the floating **LifeQR AI** chat button.
3. Send a message like "How can I set up my emergency profile?" or "What should I do for a minor burn?"
4. The chatbot will securely send the request to your backend (`/api/chat`), which will then communicate with Groq and return the AI's response to the frontend.

## Troubleshooting

- **Server Crashes on Startup**: If you see `ECONNREFUSED 127.0.0.1:27017` in your backend logs, your local MongoDB service isn't running. Please start MongoDB.
- **Chatbot Returns "Groq API Key is missing"**: Ensure you added `GROQ_API_KEY` to the `.env` file in the root directory.
- **Model Decommissioned Error**: Ensure your `server/controllers/chatController.js` uses `llama-3.1-8b-instant` and NOT the outdated `llama3-8b-8192` model.
