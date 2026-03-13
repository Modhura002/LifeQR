import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProfile } from '../services/profileService';
import { Phone, AlertTriangle, Activity, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import toast from 'react-hot-toast';

const EmergencyPreviewPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sendingAlert, setSendingAlert] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(user._id);
        setProfile(data);
      } catch (error) {
        toast.error('Please create your medical profile first');
        navigate('/profile');
      } finally {
        setLoading(false);
      }
    };
    if (user?._id) fetchProfile();
  }, [user, navigate]);

  const handleSimulateAlert = async () => {
    setSendingAlert(true);
    try {
      await api.post('/emergency/log', {
        profileId: profile._id,
        simulate: true,
        deviceInfo: 'Preview Mode'
      });
      toast.success('Simulation: Emergency SMS sent to contact!');
    } catch (err) {
      toast.error('Simulation Failed. Check server connection.');
    } finally {
      setSendingAlert(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="animate-spin text-red-500" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-3xl mx-auto px-6 pt-12">
        <Link to="/dashboard" className="flex items-center gap-2 text-slate-600 font-black uppercase tracking-widest text-xs hover:text-primary transition-all mb-8 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-200/50 w-fit">
          <ArrowLeft size={16} />
          Safe Mode: Exit Preview
        </Link>
 
        <div className="bg-white rounded-[64px] shadow-2xl border border-white overflow-hidden relative">
          {/* Mock Emergency Header */}
          <div className="bg-red-600 text-white py-12 px-8 text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-white/5 animate-pulse" />
             <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="bg-white p-2 rounded-xl text-red-600 shadow-lg">
                    <AlertTriangle size={24} fill="currentColor" />
                  </div>
                  <h1 className="text-3xl font-black uppercase tracking-tighter italic">Emergency Profile</h1>
                </div>
                <p className="text-red-100 text-sm font-black uppercase tracking-widest opacity-80">Medical Record Preview</p>
             </div>
          </div>

          <div className="p-8 md:p-12 space-y-10">
            {/* Identity Info */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-10">
              <div>
                 <p className="text-xs font-black text-red-600 uppercase tracking-widest mb-2">Patient Name</p>
                 <h2 className="text-4xl font-black text-slate-900 tracking-tight">{profile.fullName}</h2>
                 <div className="flex gap-3 mt-4">
                    <div className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-black border border-red-100 italic">
                       {profile.bloodGroup} BLOOD
                    </div>
                    <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-bold border border-emerald-100 flex items-center gap-2">
                       <ShieldCheck size={16} />
                       VERIFIED
                    </div>
                 </div>
              </div>
              <div className="w-20 h-20 rounded-[32px] bg-slate-900 flex items-center justify-center text-white text-3xl font-black shadow-xl">
                 {profile.fullName.charAt(0)}
              </div>
            </div>

            {/* Medical Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Critical Allergies</p>
                  <p className="text-xl font-bold text-slate-900 leading-tight">{profile.allergies || 'NONE KNOWN'}</p>
               </div>
               <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Medical Conditions</p>
                  <p className="text-xl font-bold text-slate-900 leading-tight">{profile.medicalConditions || 'NONE'}</p>
               </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Current Medications</p>
               <p className="text-xl font-bold text-slate-900 leading-tight">{profile.currentMedications || 'NONE'}</p>
            </div>

            {/* Emergency Contact */}
            <div className="bg-slate-900 rounded-[40px] p-8 text-white">
               <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-red-400 font-bold text-xs uppercase tracking-widest mb-1">Emergency Contact</p>
                    <h3 className="text-2xl font-bold">{profile.emergencyContactName}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Phone size={24} className="text-red-400" />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => toast.success(`Calling ${profile.emergencyContactPhone}...`)}
                    className="h-16 bg-red-600 rounded-2xl flex items-center justify-center gap-2 font-black text-lg hover:bg-red-500 transition-all shadow-xl shadow-red-900/40 uppercase"
                  >
                    <Phone size={20} fill="white" />
                    Call Contact
                  </button>
                  <button 
                    onClick={handleSimulateAlert}
                    disabled={sendingAlert}
                    className="h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center gap-2 font-bold text-lg hover:bg-white/20 transition-all disabled:opacity-50 uppercase"
                  >
                    {sendingAlert ? <Loader2 className="animate-spin" size={20} /> : <Activity size={20} />}
                    Simulate SMS
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPreviewPage;
