import { motion } from 'framer-motion';
import { Lock, EyeOff, ShieldCheck, Fingerprint } from 'lucide-react';

const Trust = () => {
  const securityFeatures = [
    {
      icon: <Lock className="text-primary" size={28} />,
      title: "Encrypted Records",
      desc: "Your medical data is protected with military-grade 256-bit encryption at rest and in transit."
    },
    {
      icon: <EyeOff className="text-primary" size={28} />,
      title: "Minimal View Mode",
      desc: "Strangers only see essential life-saving data. Full history requires verified medical clearance."
    },
    {
      icon: <Fingerprint className="text-primary" size={28} />,
      title: "Secure Identity Link",
      desc: "Each QR code is cryptographically linked to your verified identity protecting against fraud."
    }
  ];

  return (
    <section id="trust" className="py-24 bg-white relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-medical-50 rounded-[4rem] p-12 md:p-20 border border-white shadow-inner relative overflow-hidden">
          {/* Background Decorative */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />
          
          <div className="relative z-10">
            <div className="text-center mb-16">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6"
              >
                <ShieldCheck size={40} className="text-primary" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Your Privacy is Our <span className="text-primary">Top Priority</span></h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                We believe medical information is sacred. Our platform is built with a security-first architecture to ensure your data stays in your control.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {securityFeatures.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-shadow border border-slate-100/50"
                >
                  <div className="mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-normal">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-slate-400 font-medium flex items-center justify-center gap-2">
                <Lock size={14} />
                HIPAA Compliant & GDPR Ready Platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trust;
