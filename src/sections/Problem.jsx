import { motion } from 'framer-motion';
import { Clock, AlertCircle, Users } from 'lucide-react';

const Problem = () => {
  const problems = [
    {
      icon: <Clock className="text-red-500" size={32} />,
      title: "Delayed Treatment",
      description: "Critical time is wasted when paramedics cannot find a patient's medical history during the 'Golden Hour'.",
      color: "red"
    },
    {
      icon: <AlertCircle className="text-amber-500" size={32} />,
      title: "Unknown Allergies",
      description: "Doctors may inadvertently administer medication that causes severe allergic reactions due to lack of info.",
      color: "amber"
    },
    {
      icon: <Users className="text-blue-500" size={32} />,
      title: "Unreachable Family",
      description: "When victims are unconscious, contacting their next of kin or emergency contacts becomes an impossible task.",
      color: "blue"
    }
  ];

  return (
    <section id="problem" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Why Emergency Medical <span className="text-primary">Access Matters</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Seconds count in an emergency. Traditional methods of carrying medical info are often overlooked or inaccessible when needed most.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 transition-all hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-${problem.color}-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                {problem.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{problem.title}</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
    </section>
  );
};

export default Problem;
