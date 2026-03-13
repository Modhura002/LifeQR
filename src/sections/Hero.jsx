import { motion } from 'framer-motion';
import { Shield, Activity, Plus, Phone } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#f8fafc]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
              <Shield size={16} />
              <span>Certified Emergency Medical Platform</span>
            </div>
            
            <h1 className="text-6xl lg:text-[5.5rem] font-extrabold text-[#1e293b] leading-[1.1] tracking-tight">
              Instant Medical <br />
              <span className="text-primary">Information</span> in <br />
              Emergencies
            </h1>
            
            <p className="mt-8 text-xl text-slate-600 max-w-xl leading-relaxed">
              LifeQR allows doctors, first responders, and bystanders to access life-saving medical information instantly by scanning a secure QR code.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-5">
              <a href="#generate-qr" className="primary-gradient text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 transition-all text-center">
                Create My Medical QR
              </a>
              <a href="#how-it-works" className="bg-white text-slate-900 border border-slate-200 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                <Activity size={20} className="text-primary" />
                See How It Works
              </a>
            </div>
          </motion.div>

          {/* Card Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 30 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative lg:h-[600px] flex items-center justify-center pt-10"
          >
            {/* Main Floating Card */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="glass-morphism relative z-10 w-full max-w-[380px] p-8 rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/60"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    L
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Rohan Sharma</h3>
                    <p className="text-primary font-bold">LifeQR ID: 294-852</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 font-bold">
                  B+
                </div>
              </div>

              <div className="space-y-5">
                <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-red-50/50 hover:border-red-100 transition-colors">
                  <div className="flex items-center gap-2 text-red-600 font-bold text-sm uppercase tracking-wider mb-1">
                    <Plus size={16} />
                    <span>Critical Allergies</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-800">Penicillin, Latex</p>
                </div>

                <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-blue-50/50 hover:border-blue-100 transition-colors">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider mb-1">
                    <Phone size={16} />
                    <span>Emergency Contact</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold text-slate-800">Ananya Sharma (Wife)</p>
                      <p className="text-slate-500 font-medium">+91 98765 43210</p>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                      <Phone size={18} fill="currentColor" />
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex justify-center">
                  <div className="p-4 bg-white rounded-2xl shadow-inner border border-slate-100">
                    {/* Placeholder for QR Code */}
                    <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-1">
                         {[...Array(9)].map((_, i) => <div key={i} className="w-4 h-4 bg-slate-800 rounded-sm" />)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Accent Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[100px] -z-10" />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
