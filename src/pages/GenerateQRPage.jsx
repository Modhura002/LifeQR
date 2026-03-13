import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProfile } from '../services/profileService';
import { generateQR } from '../services/qrService';
import { QrCode, Download, Share2, RefreshCw, ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const GenerateQRPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qrLoading, setQrLoading] = useState(false);

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

  const handleGenerateQR = async () => {
    setQrLoading(true);
    try {
      const data = await generateQR(profile._id);
      setProfile({ ...profile, qrCodeURL: data.qrCodeURL });
      toast.success('QR Code updated!');
    } catch (error) {
      toast.error('Failed to generate QR');
    } finally {
      setQrLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My LifeQR Emergency Profile',
          text: 'In case of emergency, scan this QR code to see my medical information.',
          url: profile?.qrCodeURL,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      toast.error('Sharing not supported on this browser');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="max-w-2xl mx-auto px-6">
        <Link to="/dashboard" className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors mb-8">
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <div className="bg-white p-12 rounded-[48px] shadow-xl border border-slate-100 text-center">
          <div className="mb-10">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Your Emergency QR</h1>
            <p className="text-slate-500 mt-2">This code leads directly to your life-saving medical profile</p>
          </div>

          <div className="aspect-square bg-slate-50 rounded-[40px] flex items-center justify-center border-2 border-dashed border-slate-200 relative mb-10 overflow-hidden group">
            {profile?.qrCodeURL ? (
              <div className="bg-white p-10 rounded-[32px] shadow-sm transform group-hover:scale-105 transition-transform duration-500">
                <img src={profile.qrCodeURL} alt="Emergency QR Code" className="w-64 h-64" />
              </div>
            ) : (
              <div className="text-slate-400">
                <QrCode size={80} className="mx-auto mb-4 opacity-10" />
                <p className="font-bold">Generate QR to secure your profile</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {!profile?.qrCodeURL && (
              <button 
                onClick={handleGenerateQR}
                disabled={qrLoading}
                className="w-full primary-gradient text-white py-5 rounded-3xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all disabled:opacity-50"
              >
                {qrLoading ? <Loader2 className="animate-spin" size={24} /> : <RefreshCw size={24} />}
                Generate My Emergency QR
              </button>
            )}

            {profile?.qrCodeURL && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a 
                  href={profile.qrCodeURL} 
                  download={`LifeQR-${user?.name?.split(' ')[0]}.png`}
                  className="bg-slate-900 text-white py-5 rounded-3xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg"
                >
                  <Download size={24} />
                  Download
                </a>
                <button 
                  onClick={handleShare}
                  className="bg-white border-2 border-slate-100 text-slate-900 py-5 rounded-3xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                >
                  <Share2 size={24} />
                  Share QR
                </button>
              </div>
            )}
            
            {profile?.qrCodeURL && (
              <button 
                onClick={handleGenerateQR}
                disabled={qrLoading}
                className="text-slate-400 text-sm font-bold hover:text-primary transition-colors flex items-center gap-2 mx-auto pt-4"
              >
                <RefreshCw size={14} className={qrLoading ? 'animate-spin' : ''} />
                Regenerate QR Code
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateQRPage;
