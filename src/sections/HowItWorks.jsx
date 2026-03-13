import { motion } from 'framer-motion';
import { UserPlus, QrCode, ClipboardList, PhoneCall } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus size={32} />,
      title: "Quick Registration",
      description: "Sign up and create your secure emergency medical profile in minutes.",
      id: "01"
    },
    {
      icon: <ClipboardList size={32} />,
      title: "Input Medical Data",
      description: "Add vital info like blood group, allergies, conditions, and contacts.",
      id: "02"
    },
    {
      icon: <QrCode size={32} />,
      title: "Generate Your QR",
      description: "Our system creates a personalized QR code unique to your profile.",
      id: "03"
    },
    {
      icon: <PhoneCall size={32} />,
      title: "Save a Life",
      description: "First responders scan the code to access your critical data instantly.",
      id: "04"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 medical-gradient relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            How <span className="text-primary">LifeQR Works</span>
          </motion.h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A simple, secure process designed to protect you and your loved ones in the most critical moments.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-primary/20 -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative z-10"
              >
                <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-primary/5 text-center group hover:bg-primary transition-all duration-500">
                  <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 group-hover:text-white transition-colors duration-500">
                    {step.icon}
                  </div>
                  <span className="text-primary group-hover:text-white/80 font-bold mb-2 block">{step.id}</span>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-white transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 group-hover:text-white/90 transition-colors">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
