import { motion } from 'framer-motion';
import { 
  Zap, ShieldCheck, BellRing, Mic, WifiOff, MapPin, 
  Stethoscope, History, LayoutDashboard 
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Zap className="text-blue-500" />,
      title: "Instant Profile Access",
      desc: "Instant retrieval of medical data by first responders via QR scan."
    },
    {
      icon: <ShieldCheck className="text-emerald-500" />,
      title: "Secure Generation",
      desc: "Encrypted QR code generation ensures only essential info is shared."
    },
    {
      icon: <BellRing className="text-red-500" />,
      title: "Emergency Alerts",
      desc: "Automatic SMS and email alerts sent to your emergency contacts."
    },
    {
      icon: <Mic className="text-purple-500" />,
      title: "Voice Emergency Mode",
      desc: "Integrated text-to-speech reads critical medical info aloud."
    },
    {
      icon: <WifiOff className="text-amber-500" />,
      title: "Offline Critical Info",
      desc: "Base medical data is embedded in the QR for offline access."
    },
    {
      icon: <MapPin className="text-rose-500" />,
      title: "Hospital Locator",
      desc: "Automatically identifies and directs to the nearest medical facility."
    },
    {
      icon: <Stethoscope className="text-medical-600" />,
      title: "Doctor Mode",
      desc: "Extended clinical history viewable only by verified medical staff."
    },
    {
      icon: <History className="text-indigo-500" />,
      title: "Scan Notifications",
      desc: "Get notified with a location map whenever your code is scanned."
    },
    {
      icon: <LayoutDashboard className="text-cyan-500" />,
      title: "Simple Management",
      desc: "Easy-to-use dashboard to update your medical info anytime."
    }
  ];

  return (
    <section id="features" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Powerful Features for <span className="text-primary">Life-Saving</span> Results
          </motion.h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need for peace of mind in one advanced medical utility.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group"
            >
              <div className="mb-6 w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed font-normal">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
