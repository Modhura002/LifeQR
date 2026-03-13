import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, Zap, Activity, Clock } from 'lucide-react';

const Benefits = () => {
  const containerRef = useRef(null);
  
  const benefits = [
    {
      title: "Faster Emergency Treatment",
      desc: "Eliminate guesswork. Paramedics get your history in 2 seconds.",
      icon: <Clock className="text-primary" size={24} />
    },
    {
      title: "Prevent Medication Errors",
      desc: "Avoid lethal drug interactions by providing allergy data instantly.",
      icon: <Zap className="text-amber-500" size={24} />
    },
    {
      title: "Immediate Awareness",
      desc: "First responders gain instant insight into invisible conditions.",
      icon: <Activity className="text-red-500" size={24} />
    },
    {
      title: "Family Connection",
      desc: "Automated alerts and one-tap calls connect you to loved ones.",
      icon: <ShieldCheck className="text-emerald-500" size={24} />
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Life-Saving Benefits of <br />
              <span className="text-primary">Medical Preparedness</span>
            </h2>
            <p className="text-lg text-slate-400 mb-12 max-w-xl">
              LifeQR isn't just a technology platform; it's a critical safety net that ensures you're never alone in a medical crisis.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{benefit.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-20 lg:mt-0 relative"
          >
            <div className="bg-white/5 border border-white/10 p-12 rounded-[3rem] backdrop-blur-sm relative overflow-hidden">
               <div className="grid gap-12 text-center">
                  <div>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-6xl md:text-7xl font-black text-primary mb-2"
                    >
                      500k+
                    </motion.p>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Potential Lives Impacted</p>
                  </div>
                  
                  <div className="h-px bg-white/10 w-2/3 mx-auto" />

                  <div>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="text-6xl md:text-7xl font-black text-emerald-400 mb-2"
                    >
                      75%
                    </motion.p>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Response Time Saved</p>
                  </div>
               </div>
               
               {/* Decorative Ring */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/5 rounded-full -z-10 animate-pulse" />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Benefits;
