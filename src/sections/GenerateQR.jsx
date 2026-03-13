import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Download, Share2, CheckCircle } from 'lucide-react';

const GenerateQR = () => {
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: '',
    allergies: '',
    conditions: '',
    contact: ''
  });
  const [isGenerated, setIsGenerated] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerated(true);
  };

  return (
    <section id="generate-qr" className="py-24 bg-medical-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Generate Your <span className="text-primary">Emergency QR</span>
          </motion.h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Try it out! Fill in the details below to see how your medical QR profile will look.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-white"
          >
            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                  <input 
                    name="name"
                    type="text" 
                    placeholder="e.g. John Doe" 
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    onChange={handleInputChange}
                    value={formData.name}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Blood Group</label>
                  <select 
                    name="bloodGroup"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none"
                    onChange={handleInputChange}
                    value={formData.bloodGroup}
                    required
                  >
                    <option value="">Select Group</option>
                    <option>A+</option><option>A-</option>
                    <option>B+</option><option>B-</option>
                    <option>AB+</option><option>AB-</option>
                    <option>O+</option><option>O-</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Critical Allergies</label>
                <input 
                  name="allergies"
                  placeholder="e.g. Penicillin, Peanuts" 
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  onChange={handleInputChange}
                  value={formData.allergies}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Medical Conditions</label>
                <textarea 
                  name="conditions"
                  rows="3" 
                  placeholder="e.g. Type 1 Diabetes, Hypertension" 
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                  onChange={handleInputChange}
                  value={formData.conditions}
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Emergency Contact Number</label>
                <input 
                  name="contact"
                  type="tel" 
                  placeholder="e.g. +1 234 567 890" 
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  onChange={handleInputChange}
                  value={formData.contact}
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full primary-gradient text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
              >
                <QrCode size={24} />
                Generate My QR Code
              </button>
            </form>
          </motion.div>

          {/* Preview Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 sticky top-32"
          >
            <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <QrCode size={40} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">QR Preview Card</h3>
                <p className="text-slate-400 text-sm mb-8 italic">Your emergency ID will look like this</p>

                <AnimatePresence mode="wait">
                  {isGenerated ? (
                    <motion.div 
                      key="result"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      <div className="bg-white p-6 rounded-3xl mx-auto inline-block shadow-inner">
                        <div className="w-48 h-48 bg-slate-50 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-200">
                          <div className="grid grid-cols-5 gap-1.5 p-4">
                            {[...Array(25)].map((_, i) => (
                              <div key={i} className={`w-6 h-6 rounded-sm ${i % 3 === 0 ? 'bg-slate-800' : 'bg-slate-200'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-left space-y-4 bg-white/5 p-6 rounded-3xl border border-white/10">
                        <div>
                          <p className="text-xs font-bold text-primary uppercase">Patient</p>
                          <p className="text-xl font-bold">{formData.name || 'Rohan Sharma'}</p>
                        </div>
                        <div className="flex justify-between">
                          <div>
                            <p className="text-xs font-bold text-primary uppercase">Blood</p>
                            <p className="font-bold">{formData.bloodGroup || 'O+'}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-primary uppercase">Contact</p>
                            <p className="font-bold">{formData.contact || '+91 98765 43210'}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button className="flex-1 bg-white/10 hover:bg-white/20 py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors">
                          <Download size={20} />
                          Save
                        </button>
                        <button className="flex-1 bg-white/10 hover:bg-white/20 py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors">
                          <Share2 size={20} />
                          Share
                        </button>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm">
                        <CheckCircle size={16} />
                        Profile ready for emergency use
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-12 px-6 border-2 border-dashed border-white/10 rounded-[32px] text-slate-500"
                    >
                      <p>Fill in the form and click generate to preview your secure medical QR code.</p>
                      <div className="mt-8 flex justify-center opacity-10">
                         <QrCode size={120} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GenerateQR;
