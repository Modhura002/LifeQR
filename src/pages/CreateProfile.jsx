import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createProfile, getProfile, updateProfile } from '../services/profileService';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, Heart, Phone, Clipboard, AlertCircle, QrCode } from 'lucide-react';

const CreateProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    bloodGroup: '',
    allergies: '',
    medicalConditions: '',
    currentMedications: '',
    emergencyContactName: '',
    emergencyContactPhone: ''
  });

  useEffect(() => {
    const fetchExisting = async () => {
      try {
        const data = await getProfile(user._id);
        if (data) {
          setFormData(data);
          setIsEdit(true);
        }
      } catch (err) {
        // No profile found, stick to creation mode
      }
    };
    if (user?._id) fetchExisting();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await updateProfile(user._id, formData);
        toast.success('Medical profile updated!');
      } else {
        await createProfile(formData);
        toast.success('Medical profile created!');
      }
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-100">
      <div className="max-w-4xl mx-auto px-6">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-600 font-black uppercase tracking-widest text-xs hover:text-primary transition-all mb-8 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-200/50"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        <div className="bg-white p-8 md:p-16 rounded-[64px] shadow-2xl shadow-slate-200/50 border border-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -ml-32 -mb-32" />

          <div className="relative mb-16">
            <h2 className="text-5xl font-black text-slate-900 tracking-tight italic">
              {isEdit ? 'Refine' : 'Setup'} <span className="text-primary">Medical</span> Profile
            </h2>
            <p className="text-slate-500 mt-4 text-lg font-medium">Your life-saving information, secured and ready for any emergency.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-16 relative">
            {/* Personal Section */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-[24px] bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-900/20">
                  <Heart size={24} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Identity & Vitals</h3>
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Core Medical Credentials</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Legal Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Johnathan Doe"
                    className="w-full px-8 py-5 rounded-[24px] bg-slate-50 border-2 border-slate-100 text-slate-900 font-bold placeholder:text-slate-300 focus:border-primary focus:bg-white focus:ring-8 focus:ring-primary/5 outline-none transition-all shadow-inner"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Blood Group</label>
                  <div className="relative">
                    <select
                      required
                      className="w-full px-8 py-5 rounded-[24px] bg-slate-50 border-2 border-slate-100 text-slate-900 font-bold appearance-none focus:border-primary focus:bg-white focus:ring-8 focus:ring-primary/5 outline-none transition-all shadow-inner"
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                    >
                      <option value="">Select Group</option>
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <Heart size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Critical Conditions Section */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-[24px] bg-red-600 flex items-center justify-center text-white shadow-xl shadow-red-600/20">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Critical Warnings</h3>
                  <p className="text-red-500 text-sm font-bold uppercase tracking-widest">Lifesaver Data Points</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Severe Allergies</label>
                  <textarea
                    placeholder="List any life-threatening allergies (e.g. Penicillin, Nuts)..."
                    className="w-full px-8 py-6 rounded-[32px] bg-slate-50 border-2 border-slate-100 text-slate-900 font-bold placeholder:text-slate-300 focus:border-red-500 focus:bg-white focus:ring-8 focus:ring-red-500/5 outline-none transition-all h-32 shadow-inner"
                    value={formData.allergies}
                    onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                  ></textarea>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Ongoing Conditions</label>
                  <textarea
                    placeholder="List current medical conditions (e.g. Asthma, Cardiac, Epilepsy)..."
                    className="w-full px-8 py-6 rounded-[32px] bg-slate-50 border-2 border-slate-100 text-slate-900 font-bold placeholder:text-slate-300 focus:border-red-500 focus:bg-white focus:ring-8 focus:ring-red-500/5 outline-none transition-all h-32 shadow-inner"
                    value={formData.medicalConditions}
                    onChange={(e) => setFormData({...formData, medicalConditions: e.target.value})}
                  ></textarea>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Current Medications</label>
                  <input
                    type="text"
                    placeholder="e.g. Insulin, Beta Blockers..."
                    className="w-full px-8 py-5 rounded-[24px] bg-slate-50 border-2 border-slate-100 text-slate-900 font-bold placeholder:text-slate-300 focus:border-red-500 focus:bg-white focus:ring-8 focus:ring-red-500/5 outline-none transition-all shadow-inner"
                    value={formData.currentMedications}
                    onChange={(e) => setFormData({...formData, currentMedications: e.target.value})}
                  />
                </div>
              </div>
            </section>

            {/* Emergency Contact */}
            <section className="p-10 rounded-[40px] bg-slate-900 text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
               
               <div className="flex items-center gap-4 mb-10 relative">
                  <div className="w-14 h-14 rounded-[24px] bg-white/10 flex items-center justify-center text-white border border-white/20">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">Emergency Contact</h3>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Primary Guardian Access</p>
                  </div>
               </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-8 py-5 rounded-[24px] bg-white/5 border-2 border-white/10 text-white font-bold focus:border-white/30 focus:bg-white/10 outline-none transition-all"
                    value={formData.emergencyContactName}
                    onChange={(e) => setFormData({...formData, emergencyContactName: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-8 py-5 rounded-[24px] bg-white/5 border-2 border-white/10 text-white font-bold focus:border-white/30 focus:bg-white/10 outline-none transition-all"
                    value={formData.emergencyContactPhone}
                    onChange={(e) => setFormData({...formData, emergencyContactPhone: e.target.value})}
                  />
                </div>
              </div>
            </section>

            <div className="flex flex-col md:flex-row gap-6 pt-10">
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] primary-gradient text-white py-6 rounded-[32px] font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-primary/40 hover:shadow-primary/60 -translate-y-0 hover:-translate-y-2 transition-all disabled:opacity-50 uppercase tracking-widest italic"
              >
                {loading ? <div className="animate-spin border-4 border-white border-t-transparent rounded-full w-6 h-6" /> : <Save size={24} />}
                {loading ? 'Securing Data...' : 'Save & Shield Profile'}
              </button>
              
              {isEdit && (
                <button
                  type="button"
                  onClick={() => navigate('/generate-qr')}
                  className="flex-1 bg-slate-900 text-white py-6 rounded-[32px] font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-800 shadow-2xl shadow-slate-900/30 -translate-y-0 hover:-translate-y-2 transition-all uppercase tracking-widest italic"
                >
                  <QrCode size={24} />
                  Get QR
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
