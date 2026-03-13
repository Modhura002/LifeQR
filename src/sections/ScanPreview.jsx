import { motion } from 'framer-motion';
import { Smartphone, Shield, Phone, Mic, HeartPulse } from 'lucide-react';

const ScanPreview = () => {
  return (
    <section id="scan-preview" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Emergency <span className="text-primary">Scan Interface</span>
          </motion.h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Experience what a first responder sees when they scan your code. Fast, clear, and focused on saving your life.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative group">
            {/* Phone Mockup Frame */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="w-[320px] h-[650px] bg-slate-900 rounded-[3rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[8px] border-slate-800 relative z-10"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20" />
              
              {/* Screen Content */}
              <div className="w-full h-full bg-white rounded-[2.2rem] overflow-hidden relative flex flex-col">
                {/* Status Bar */}
                <div className="h-10 px-6 flex justify-between items-center bg-white">
                  <span className="text-xs font-bold">9:41</span>
                  <div className="flex gap-1.5">
                    <div className="w-4 h-2 bg-slate-300 rounded-[2px]" />
                    <div className="w-4 h-2 bg-slate-300 rounded-[2px]" />
                  </div>
                </div>

                {/* Scan Animation Overlay (Initial State) */}
                <motion.div 
                  initial={{ opacity: 1 }}
                  whileInView={{ opacity: 0 }}
                  transition={{ delay: 2, duration: 0.8 }}
                  className="absolute inset-0 bg-slate-900/90 z-20 flex flex-col items-center justify-center text-white p-8 text-center"
                >
                  <div className="relative mb-8">
                    <Smartphone size={80} className="text-primary" />
                    <motion.div 
                      animate={{ y: [-40, 40, -40] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_20px_#0ea5e9]"
                    />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Scanning LifeQR...</h4>
                  <p className="text-slate-400 text-sm">Hold steady to identify the patient</p>
                </motion.div>

                {/* Emergency Profile Content */}
                <div className="flex-1 overflow-y-auto p-5 pb-10">
                   <div className="text-center mb-6 pt-2">
                     <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-100">
                       <Shield size={32} className="text-red-500" />
                     </div>
                     <span className="bg-red-500 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">
                       Emergency Profile
                     </span>
                     <h3 className="text-2xl font-black text-slate-900">Ananya Sharma</h3>
                     <p className="text-red-600 font-bold">BLOOD B NEGATIVE (B-)</p>
                   </div>

                   <div className="space-y-4">
                     <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Critical Allergy</p>
                       <p className="text-slate-900 font-black text-sm">PENICILLIN SENSITIVE</p>
                       <p className="text-slate-600 text-xs mt-1">Causes immediate anaphylactic shock.</p>
                     </div>

                     <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Condition</p>
                       <p className="text-slate-900 font-black text-sm">EPILEPSY</p>
                       <p className="text-slate-600 text-xs mt-1">Last seizure reported: June 2025.</p>
                     </div>

                     <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-100">
                       <Phone size={18} fill="currentColor" />
                       Call Next of Kin
                     </button>

                     <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg">
                       <Mic size={18} />
                       Read Aloud Mode
                     </button>

                     <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                       <HeartPulse className="text-emerald-500" size={24} />
                       <div>
                         <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Medical Note</p>
                         <p className="text-emerald-900 font-bold text-xs uppercase">Organ donor registered</p>
                       </div>
                     </div>
                   </div>
                </div>
              </div>
            </motion.div>

            {/* Background Decorative Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScanPreview;
