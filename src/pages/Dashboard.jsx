import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProfile } from '../services/profileService';
import { generateQR } from '../services/qrService';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Plus, QrCode, User, Heart, Settings, Download, ExternalLink, RefreshCw, MapPin, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import SelfTransportCard from '../components/SelfTransportCard';

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qrLoading, setQrLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(user._id);
        setProfile(data);
      } catch (error) {
        console.log('No profile found or error fetching');
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchProfile();
  }, [user]);

  const handleGenerateQR = async () => {
    setQrLoading(true);
    try {
      const data = await generateQR(profile._id);
      setProfile({ ...profile, qrCodeURL: data.qrCodeURL, scanUrl: data.scanUrl });
      toast.success('QR Code generated!');
    } catch (error) {
      toast.error('Failed to generate QR');
    } finally {
      setQrLoading(false);
    }
  };

  const dashboardCards = [
    { icon: <User className="text-blue-500" />, title: 'Account Data', value: user?.name, sub: user?.email },
    { icon: <Heart className="text-red-500" />, title: 'Health Status', value: profile ? 'Active' : 'Missing', sub: profile ? profile.bloodGroup : 'Create profile now' },
    { icon: <QrCode className="text-teal-500" />, title: 'QR System', value: profile?.qrCodeURL ? 'Ready' : 'Not Linked', sub: 'Instant emergency access' },
  ];

  if (loading) return <div className="min-h-screen pt-32 flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Welcome, {user?.name ? user.name.split(' ')[0] : 'User'}</h1>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-slate-500">Manage your medical safety and QR profiles</p>
              <div className="h-4 w-px bg-slate-200" />
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Backend Online
              </div>
            </div>
          </div>
          {!profile && (
            <Link to="/profile" className="primary-gradient text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
              <Plus size={20} />
              Create Medical Profile
            </Link>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {dashboardCards.map((card, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
                {card.icon}
              </div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{card.title}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{card.value}</h3>
              <p className="text-slate-500 text-sm mt-1">{card.sub}</p>
            </div>
          ))}
        </div>
        
        {/* Quick Emergency Tools */}
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <SelfTransportCard />
            </div>
            <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[40px] shadow-xl text-white flex flex-col justify-center border border-slate-700">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <AlertTriangle className="text-primary-light" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold italic">Emergency <span className="text-primary-light">Preparedness</span></h3>
               </div>
               <p className="text-slate-400 leading-relaxed mb-6">
                 Your LifeQR is your primary defense. Ensure your profile is absolute and your QR code is reachable. The tools below are for immediate, on-the-ground assistance.
               </p>
               <div className="flex gap-4">
                  <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-slate-400">
                    GPS Active
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-slate-400">
                    Cloud Linked
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Medical Profile Status */}
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm flex flex-col overflow-hidden relative group">
            <div className="p-8 pb-4 relative z-10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
                  <Heart size={20} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight italic">Medical Profile <span className="text-primary">Status</span></h3>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${profile ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-red-500 text-white shadow-lg shadow-red-500/20'}`}>
                {profile ? 'Active' : 'Missing'}
              </div>
            </div>

            <div className="px-8 pb-8 pt-4 flex-grow relative z-10">
              {profile ? (
                <div className="h-full flex flex-col">
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-5 rounded-[24px] bg-red-50 border border-red-100 shadow-sm">
                      <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Blood Group</p>
                      <p className="text-3xl font-black text-red-600 italic leading-none">{profile.bloodGroup}</p>
                    </div>
                    <div className="p-6 rounded-[24px] bg-slate-900 border border-slate-800 shadow-lg text-white">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Emergency Contact</p>
                      <p className="text-xl font-black truncate text-primary-light">{profile.emergencyContactName}</p>
                      <p className="text-lg font-black text-slate-100 mt-1 tracking-tight">{profile.emergencyContactPhone}</p>
                    </div>
                  </div>
                  <div className="p-6 rounded-[24px] bg-slate-50 border border-slate-100 flex-grow">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Primary Allergies</p>
                     <p className="text-sm font-bold text-slate-700 leading-relaxed italic line-clamp-2">
                       {profile.allergies || 'Safe - No Critical Allergies Found'}
                     </p>
                  </div>
                </div>
              ) : (
                <div className="py-12 px-8 text-center bg-red-50 rounded-[32px] border-2 border-dashed border-red-100">
                   <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
                   <p className="text-slate-900 font-bold mb-4 italic">No life-saving data found on your profile.</p>
                   <Link to="/profile" className="inline-flex primary-gradient text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs italic shadow-lg shadow-primary/20">
                      Setup Profile Now
                   </Link>
                </div>
              )}
            </div>

            <div className="p-8 pt-0 border-t border-slate-50 bg-slate-50/50 flex gap-4 relative z-10">
              <Link to="/profile" className="flex-1 bg-white border border-slate-200 text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                 <Settings size={14} />
                 Edit Profile
              </Link>
              <Link to="/emergency-preview" className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                 <ExternalLink size={14} />
                 Preview View
              </Link>
            </div>
            
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
          </div>

          {/* QR Code Preview */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-8 pb-8 border-b border-slate-50">
               <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-500">
                  <QrCode size={20} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">QR Code Preview</h3>
              </div>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center py-6 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200 mb-8">
              {profile?.qrCodeURL ? (
                <div className="bg-white p-6 rounded-3xl shadow-sm">
                  <img src={profile.qrCodeURL} alt="QR Code" className="w-48 h-48" />
                </div>
              ) : (
                <div className="text-center p-8 text-slate-400">
                  <QrCode size={64} className="mx-auto mb-4 opacity-20" />
                  <p className="text-sm font-medium">Generate your profile first</p>
                </div>
              )}
            </div>

            <div className="flex gap-4">
               {profile && (
                 <button 
                   onClick={handleGenerateQR}
                   disabled={qrLoading}
                   className="flex-1 primary-gradient text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50 text-sm"
                 >
                   <RefreshCw size={18} className={qrLoading ? 'animate-spin' : ''} />
                   {profile.qrCodeURL ? 'Regenerate' : 'Generate'}
                 </button>
               )}
               {profile?.qrCodeURL && (
                 <a 
                   href={profile.qrCodeURL} 
                   download={`LifeQR-${user?.name?.split(' ')[0]}.png`}
                   className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all text-sm"
                 >
                   <Download size={18} />
                   Download QR
                 </a>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
