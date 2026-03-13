import { motion } from 'framer-motion';
import { Phone, Heart, Activity, AlertCircle } from 'lucide-react';

const DemoProfile = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: -0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-primary/10 rounded-[40px] blur-2xl group-hover:bg-primary/20 transition-all duration-500" />
            <img 
              src="/doctor-scan.png" 
              alt="Medical professional scanning QR" 
              className="relative rounded-[32px] shadow-2xl w-full object-cover aspect-[4/3]"
            />
            {/* Overlay Badge */}
            <div className="absolute bottom-8 right-8 glass-morphism p-4 rounded-2xl shadow-lg border border-white/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Activity size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Status</p>
                  <p className="text-sm font-bold text-slate-900">Scan Verified</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
              A <span className="text-primary">Medical Profile</span> That Saves Lives
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              When every second counts, your LifeQR profile provides paramedics with everything they need to treat you safely and effectively.
            </p>

            {/* Demo Disclaimer */}
            <div className="bg-red-50 border-2 border-red-200 p-8 rounded-[32px] mb-12 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <AlertCircle size={80} />
              </div>
              <div className="flex gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2 italic">Important: Feature Showcase Only</h4>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    This interactive preview illustrates what LifeQR offers. To create your own <strong>Legitimate Medical Profile</strong> and generate a functioning QR code with SMS alerts, please <span className="text-red-600 font-bold underline">Sign Up</span> or <span className="text-red-600 font-bold underline">Log In</span>.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-morphism p-8 rounded-[32px] border border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                      RS
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Rohan Sharma</h3>
                      <p className="text-primary font-bold">O Positive (O+)</p>
                    </div>
                  </div>
                  <button className="bg-red-500 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg shadow-red-200">
                    <AlertCircle size={16} />
                    Emergency
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Allergies</p>
                    <p className="text-slate-900 font-semibold">Penicillin, Peanuts</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Conditions</p>
                    <p className="text-slate-900 font-semibold">Type 1 Diabetes</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <Heart size={20} />
                    </div>
                    <p className="text-sm font-bold text-slate-900">Organ Donor: Yes</p>
                  </div>
                  <button className="primary-gradient text-white w-full sm:w-auto px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                    <Phone size={18} fill="currentColor" />
                    Call Emergency Contact
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default DemoProfile;
