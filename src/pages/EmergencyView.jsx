import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Phone, AlertTriangle, Activity, ShieldCheck, MapPin, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const EmergencyView = () => {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sendingAlert, setSendingAlert] = useState(false);

  useEffect(() => {
    const fetchEmergencyData = async () => {
      try {
        const response = await api.get(`/emergency/${profileId}`);
        setProfile(response.data);
        
        // After fetching profile, attempt to capture location and log it
        captureAndLogLocation(response.data._id);
      } catch (err) {
        console.error('Fetch Error:', err);
        if (!err.response) {
          setError('Network Error: Cannot reach the backup server.');
        } else if (err.response.status === 404) {
          setError('Profile Not Found');
        } else {
          setError('Server Error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmergencyData();
  }, [profileId]);

  const captureAndLogLocation = (pid, isSimulated = false) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          initMap(latitude, longitude);
          await logScan(pid, latitude, longitude, isSimulated);
        },
        async (error) => {
          console.warn('Geolocation Error:', error.message);
          await logScan(pid, null, null, isSimulated);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      logScan(pid, null, null, isSimulated);
    }
  };

  const logScan = async (pid, lat, lng, simulate = false) => {
    try {
      if (simulate) setSendingAlert(true);
      await api.post('/emergency/log', {
        profileId: pid,
        latitude: lat,
        longitude: lng,
        deviceInfo: navigator.userAgent,
        simulate
      });
      if (simulate) toast.success('Emergency alert sent to contact!');
    } catch (err) {
      console.error('Logging Error:', err);
    } finally {
      if (simulate) setSendingAlert(false);
    }
  };

  const initMap = (lat, lng) => {
    setTimeout(() => {
      const mapContainer = document.getElementById('emergency-map');
        if (typeof window !== 'undefined' && window.L && !mapContainer._leaflet_id) {
          const map = window.L.map('emergency-map').setView([lat, lng], 15);
          window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors'
          }).addTo(map);
          window.L.marker([lat, lng]).addTo(map)
              .bindPopup('Scan Location Captured')
              .openPopup();
        }
    }, 500);
  };

  const handleSimulateAlert = () => {
    if (profile) {
      captureAndLogLocation(profile._id, true);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-6 text-center">
      <div>
        <Activity className="mx-auto text-red-500 animate-pulse mb-4" size={48} />
        <h2 className="text-2xl font-bold text-slate-900">Accessing Secure Medical Record...</h2>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 text-center">
      <div>
        <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
        <h2 className="text-2xl font-bold text-slate-900">Profile Not Found</h2>
        <p className="text-slate-500 mt-2">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Emergency Header - Redesigned for First Responders */}
      <div className="bg-red-600 text-white py-10 px-6 text-center shadow-2xl relative overflow-hidden">
        {/* Background Pulse Effect */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-white rounded-full blur-3xl"
        />
        
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="bg-white p-2 rounded-xl text-red-600">
              <AlertTriangle size={28} fill="currentColor" />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tighter italic">Emergency Profile</h1>
          </div>
          <p className="text-red-100 text-sm font-black uppercase tracking-widest opacity-90">Medical Record • Verified Profile</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Identity Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-50 p-8 rounded-[40px] border-2 border-slate-100 mb-8"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-black text-red-600 uppercase tracking-widest mb-2">Patient Identity</p>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">{profile.fullName}</h2>
              <div className="flex items-center gap-4 mt-4">
                <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Blood Group</p>
                  <p className="text-xl font-black text-red-600">{profile.bloodGroup}</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Verification</p>
                  <div className="flex items-center gap-1 text-green-600 font-bold">
                    <ShieldCheck size={16} />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-16 h-16 rounded-3xl bg-slate-900 flex items-center justify-center text-white text-3xl font-black">
              {profile.fullName.charAt(0)}
            </div>
          </div>
        </motion.div>

        {/* Map Section */}
        <div className="mb-8">
            <div id="emergency-map" className="w-full h-64 rounded-[40px] border-2 border-slate-100 overflow-hidden bg-slate-50 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-slate-400 text-sm font-medium">Detecting precise scan location...</p>
                </div>
            </div>
        </div>

        {/* Critical Information Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-8 rounded-[40px] bg-red-50 border-2 border-red-100"
          >
            <div className="flex items-center gap-2 text-red-600 font-black mb-4">
              <Plus size={20} />
              <h3 className="uppercase tracking-widest text-sm">Critical Allergies</h3>
            </div>
            <p className="text-2xl font-bold text-slate-900">{profile.allergies || 'NONE KNOWN'}</p>
          </motion.div>

          {/* Simulate Button inside Profile for easy Demo */}
          <button 
             onClick={handleSimulateAlert}
             disabled={sendingAlert}
             className="p-8 rounded-[40px] border-2 border-dashed border-red-300 bg-red-50/50 text-red-600 font-bold flex flex-col items-center justify-center gap-2 hover:bg-red-100 transition-colors disabled:opacity-50"
          >
             <AlertTriangle size={32} />
             <span>{sendingAlert ? 'Sending Simulated Alert...' : 'Simulate Emergency Alert'}</span>
             <p className="text-[10px] font-normal uppercase tracking-wider text-red-400">Forces updated SMS to emergency contact</p>
          </button>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-8 rounded-[40px] bg-blue-50 border-2 border-blue-100"
          >
            <div className="flex items-center gap-2 text-blue-600 font-black mb-4">
              <Activity size={20} />
              <h3 className="uppercase tracking-widest text-sm">Conditions & Meds</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-blue-400 uppercase">Existing Conditions</p>
                <p className="text-xl font-bold text-slate-800">{profile.medicalConditions || 'NONE'}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-blue-400 uppercase">Current Medications</p>
                <p className="text-xl font-bold text-slate-800">{profile.currentMedications || 'NONE'}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 p-8 rounded-[40px] text-white"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-blue-400 font-black text-xs uppercase tracking-widest mb-1">Emergency Contact</p>
              <h3 className="text-2xl font-bold">{profile.emergencyContactName}</h3>
            </div>
            <Phone className="text-blue-400" size={32} />
          </div>
          
          <a 
            href={`tel:${profile.emergencyContactPhone}`}
            className="w-full h-20 bg-blue-600 rounded-[30px] flex items-center justify-center gap-3 text-xl font-black hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40"
          >
            <Phone size={24} fill="white" />
            CALL NOW
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default EmergencyView;
