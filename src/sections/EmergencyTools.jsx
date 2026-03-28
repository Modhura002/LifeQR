import React from 'react';
import SelfTransportCard from '../components/SelfTransportCard';
import { Shield, Smartphone, HeartPulse } from 'lucide-react';

const EmergencyTools = () => {
  return (
    <section id="tools" className="py-24 bg-slate-900 overflow-hidden relative">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm font-black uppercase tracking-widest mb-6">
              <Shield size={16} />
              Instant Access
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-[1.1]">
              Tools You Can Use <span className="text-primary italic">Right Now</span>
            </h2>
            
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Experience the power of LifeQR emergency tools immediately. Our hospital finder works even without an account, ensuring you can find help in any situation.
            </p>

            <div className="space-y-6">
              {[
                { icon: <Smartphone className="text-primary" />, title: "No Login Required", desc: "Access critical tools like the hospital finder instantly." },
                { icon: <HeartPulse className="text-red-400" />, title: "Always Available", desc: "Data is fetched directly from global medical databases." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Glow behind card */}
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-75" />
            <div className="relative transform hover:scale-[1.02] transition-transform duration-500">
              <SelfTransportCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyTools;
