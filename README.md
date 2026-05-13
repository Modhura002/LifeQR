# LifeQR – Emergency Medical QR System

LifeQR is a life-saving digital platform that allows users to create comprehensive medical profiles and generate unique QR codes. In case of an emergency, first responders can scan the QR code to instantly access critical medical information such as blood group, allergies, and pre-existing conditions, while simultaneously alerting the user's emergency contact with their live location.

## 🚀 Key Features

- **Premium Medical Profiles**: Securely store vitals, chronic conditions, medications, and allergies.
- **Dynamic QR Generation**: Create and download high-resolution QR codes for physical use (stickers, IDs, etc.).
- **Smart SMS Alerts**: Automated Twilio integration that sends high-accuracy GPS coordinates to guardians upon scan.
- **Paramedic-First UI**: Dark-mode, high-contrast, and mobile-optimized views designed for fast reading in high-stress situations.
- **Authentication-Aware Workflow**: State-management driven UI that provides a seamless experience for both guest and registered users.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), TailwindCSS, Framer Motion, Lucide React.
- **Backend**: Node.js, Express, MongoDB (Mongoose).
- **Communication**: Twilio API for SMS alerts.
- **Security**: JWT-based authentication, Bcrypt password hashing.

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Running locally or a Cloud Atlas URI)
- [Twilio Account](https://www.twilio.com/) (For SMS functionality)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/LifeQR.git
cd LifeQR
```

# ⚠️ Team Development Setup (Important)

This project is being developed by a **team of multiple developers with limited Twilio credits**.

To avoid unnecessary usage of credits and configuration duplication, the project uses a **shared environment configuration**.

### Important Notes

- Only **one Twilio account will be used for the entire team**.
- The project maintainer will **share the `.env` file privately with all team members**.
- Team members **do NOT need to create their own Twilio accounts**.
- Team members **do NOT need separate MongoDB databases unless they want to test individually**.
- The **JWT secret key will also be included in the shared `.env` file**.

All developers simply need to **place the shared `.env` file inside the root directory (`LifeQR/.env`)**.

This ensures:

- consistent testing environment
- minimal Twilio & Groq API credit usage
- easier debugging across team members

### 2. Environment Setup

Place the shared `.env` file in the **root directory** (`LifeQR/.env`). It should look like the following:

```env
# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret

# SMS Alerts (Twilio)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_purchased_number

# AI Chatbot (Groq)
GROQ_API_KEY=your_groq_api_key
```

### 3. Backend Setup
```bash
cd server
npm install
```
 
### 4. Frontend Setup
```bash
# Return to the root directory
cd ..
npm install
```

---

## 🏃 Running the Application

### Start the Backend
```bash
cd server
npm run dev
```

### Start the Frontend
```bash
# In a new terminal / root directory
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## 🆘 How it Works (Emergency Flow)

1. **Scan**: A first responder scans the user's QR code.
2. **Access**: The system displays the **Emergency Profile** (No login required for this specific view).
3. **Alert**: The browser captures the responder's **GPS Location** (High Accuracy).
4. **Notify**: An SMS is automatically dispatched to the user's **Emergency Contact** with a Google Maps link to the location.

---

## 📄 License
This project is for demonstration and potential emergency assistance purposes. Please ensure compliance with local medical data privacy laws (like HIPAA/GDPR) if deploying for public use.
