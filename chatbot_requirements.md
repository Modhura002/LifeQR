# LifeQR AI Chatbot Requirements & Implementation Guide

This document outlines the requirements and setup instructions for the **LifeQR AI** chatbot feature. It is designed to be easily implemented or replicated in other projects or parts of the system.

## 1. Overview
"LifeQR AI" is an intelligent, floating chatbot designed to assist users with general medical inquiries, first-aid advice, and platform-specific feature guidance (like creating an emergency QR code, viewing a profile, etc.). 

## 2. Dependencies
To implement this feature, ensure the following dependencies are present in your project:
- **UI Framework**: React (or equivalent)
- **Styling**: Tailwind CSS (for the floating UI, transitions, and theme consistency)
- **Icons**: `lucide-react` (specifically `MessageCircle`, `X`, `Send`, `Bot`, `User`)
- **HTTP Client**: `axios` (or native `fetch`) to communicate with the Groq API.

## 3. External API: Groq
The chatbot relies on the [Groq API](https://console.groq.com/docs/quickstart) for lightning-fast inference.

### Configuration
- **Endpoint**: `https://api.groq.com/openai/v1/chat/completions` (OpenAI-compatible endpoint)
- **Authentication**: Requires a valid Groq API Key.
- **Model**: `llama3-8b-8192` (recommended for general text and fast response, can be upgraded to `llama3-70b-8192` if needed).

### Environment Setup
You must store your Groq API key securely. In your backend Node.js application, add the following to your `server/.env` file:
```env
GROQ_API_KEY=your_groq_api_key_here
```
The frontend should call a local backend route (e.g., `/api/chat`), which then makes the request to Groq using the key stored securely on the server.

## 4. Persona & System Prompt
To ensure the chatbot acts as "LifeQR AI", you must provide a `system` message in the API call. 

**Recommended System Prompt:**
> "You are LifeQR AI, a helpful, empathetic, and knowledgeable medical and platform assistant for the LifeQR application. 
> Your role is two-fold:
> 1. Medical Assistance: Provide general medical information, symptom checking, and first-aid advice. IMPORTANT: Always include a brief disclaimer that you are an AI and the user should seek professional medical help for emergencies.
> 2. Platform Assistance: Help users understand LifeQR's features, such as generating emergency QR codes, managing medical profiles, and scanning QR tags for rapid emergency response.
> Keep your answers concise, structured, and easy to read."

## 5. UI/UX Requirements
If replicating this component, ensure the UI meets these standards:
- **Floating Button**: Positioned at the bottom-right corner of the screen (`fixed bottom-6 right-6`).
- **Chat Window**: 
  - Toggles visibility when the button is clicked.
  - Has a fixed maximum height and width (e.g., `w-80 h-[32rem]`), ensuring it works well on both desktop and mobile.
  - Contains a scrollable message area (`overflow-y-auto`).
  - Distinguishes visually between User messages and AI messages (e.g., different background colors and alignment).
- **Loading State**: Displays a loading indicator (e.g., "Typing...") while waiting for the Groq API response.
- **Auto-scroll**: Automatically scrolls to the newest message when a message is added.

## 6. Security Considerations
- **API Key Leakage**: By proxying the Groq API requests through a secure backend server (e.g., Node.js/Express) and storing the API key in the `server/.env` file, the key remains completely hidden from the client browser.
- **Medical Disclaimer**: Never omit the medical disclaimer from the system prompt on the server side, as AI-generated advice should not replace a real doctor's diagnosis.
