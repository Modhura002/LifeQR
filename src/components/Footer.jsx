import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-slate-50 pt-24 pb-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
                L
              </div>
              <span className="text-2xl font-bold text-slate-900">
                Life<span className="text-primary">QR</span>
              </span>
            </div>
            <p className="text-slate-600 mb-8 max-w-xs leading-relaxed">
              Providing instant access to life-saving medical information through secure, intelligent QR technology. Your safety is our mission.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-sm">Product</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">QR Generation</a></li>
              <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">Emergency Scan</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-sm">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">Security Profile</a></li>
              <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <Mail className="text-primary shrink-0" size={20} />
                <span className="text-slate-600">support@lifeqr.com</span>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="text-primary shrink-0" size={20} />
                <span className="text-slate-600">+1 (800) LIFE-QR</span>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="text-primary shrink-0" size={20} />
                <span className="text-slate-600">123 Health Plaza, BioTech Valley, CA 94043</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-200 text-center flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © {currentYear} LifeQR – Emergency Medical QR System. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-500 hover:text-slate-900 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-slate-900 text-sm transition-colors">Terms of Use</a>
            <a href="#" className="text-slate-500 hover:text-slate-900 text-sm transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
