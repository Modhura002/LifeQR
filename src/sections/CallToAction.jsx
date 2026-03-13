import { motion } from 'framer-motion';
import { ArrowRight, QrCode } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="primary-gradient rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/40"
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-20 -mt-20" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-32 -mb-32" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-md border border-white/30">
              <QrCode size={40} />
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
              Create Your Emergency <br />
              Medical QR <span className="text-sky-200">Today</span>
            </h2>
            <p className="text-xl text-sky-50 mb-12 leading-relaxed">
              Don't wait for an emergency to happen. Take 2 minutes to set up your profile and provide yourself and your family with the ultimate peace of mind.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-primary px-10 py-5 rounded-2xl text-xl font-black shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
                Generate My QR Now
                <ArrowRight size={24} />
              </button>
              <button className="bg-primary/20 hover:bg-primary/30 text-white border border-white/30 px-10 py-5 rounded-2xl text-xl font-bold transition-all">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
