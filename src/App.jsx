import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateProfile from './pages/CreateProfile';
import EmergencyView from './pages/EmergencyView';
import GenerateQRPage from './pages/GenerateQRPage';
import EmergencyPreviewPage from './pages/EmergencyPreviewPage';

// Public Route (Redirects to dashboard if logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" />;
  return children;
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white font-sans selection:bg-primary/20 selection:text-primary">
          <Toaster position="top-center" />
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            
            <Route 
              path="/dashboard" 
              element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
            />
            
            <Route 
              path="/profile" 
              element={<ProtectedRoute><CreateProfile /></ProtectedRoute>} 
            />

            <Route 
              path="/generate-qr" 
              element={<ProtectedRoute><GenerateQRPage /></ProtectedRoute>} 
            />

            <Route 
              path="/emergency-preview" 
              element={<ProtectedRoute><EmergencyPreviewPage /></ProtectedRoute>} 
            />

            <Route path="/emergency/:profileId" element={<EmergencyView />} />
            
            {/* Catch all redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
