import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Activity, LogOut, User as UserIcon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const isEmergency = location.pathname.startsWith('/emergency');

  if (isEmergency) return null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const publicLinks = [
    { name: 'Home', href: isHome ? '#hero' : '/' },
    { name: 'About', href: isHome ? '#problem' : '/#problem' },
    { name: 'Hospital Finder', href: isHome ? '#tools' : '/#tools' },
    { name: 'How It Works', href: isHome ? '#how-it-works' : '/#how-it-works' },
    { name: 'Features', href: isHome ? '#features' : '/#features' },
  ];

  const authLinks = [
    { name: 'Dashboard', href: '/dashboard', isRoute: true },
    { name: 'My Profile', href: '/profile', isRoute: true },
    { name: 'Emergency Preview', href: '/emergency-preview', isRoute: true },
  ];

  const navLinks = user ? authLinks : publicLinks;

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${
      isScrolled ? 'py-4 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm' : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 group z-20">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Activity size={24} />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">LifeQR</span>
        </Link>

        {/* Center-Left: Desktop Nav Links */}
        <div className="hidden lg:flex flex-1 items-center justify-start ml-12">
          <div className="flex items-center gap-8 text-sm font-bold text-slate-600">
            {navLinks.map((link) => {
              const isActive = link.isRoute ? location.pathname === link.href : location.hash === link.href;
              return link.isRoute ? (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className={`transition-all relative py-2 ${isActive ? 'text-primary' : 'hover:text-primary text-slate-600'}`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              ) : (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`transition-all relative py-2 ${isActive ? 'text-primary' : 'hover:text-primary text-slate-600'}`}
                  onClick={(e) => {
                    if (link.href.startsWith('#')) {
                      e.preventDefault();
                      const el = document.querySelector(link.href);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </a>
              )
            })}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="hidden lg:flex items-center gap-4 z-20">
          {user ? (
            <>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 shadow-sm transition-all text-xs font-black text-slate-400 tracking-widest uppercase">
                <UserIcon size={14} />
                {user?.name?.split(' ')[0]}
              </div>
              <button 
                onClick={handleLogout}
                className="bg-slate-900 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors pr-2">
                Login
              </Link>
              <Link to="/register" className="primary-gradient text-white px-8 py-3.5 rounded-2xl text-sm font-black uppercase tracking-widest italic hover:shadow-lg hover:shadow-primary/30 transition-all">
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="lg:hidden p-2 text-slate-900 z-50 rounded-xl bg-slate-50 border border-slate-100" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute top-full left-6 right-6 mt-4 bg-white border border-slate-100 rounded-[32px] p-6 flex flex-col gap-2 lg:hidden shadow-2xl z-[60]"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  link.isRoute ? (
                    <Link 
                      key={link.name} 
                      to={link.href} 
                      className="px-4 py-3 rounded-2xl text-lg font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a 
                      key={link.name} 
                      href={link.href} 
                      className="px-4 py-3 rounded-2xl text-lg font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  )
                ))}
              </div>
              
              <div className="h-px bg-slate-100 my-2" />
              
              {user ? (
                <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-3 px-4 py-4 text-red-500 font-black uppercase tracking-widest text-sm italic hover:bg-red-50 rounded-2xl transition-colors"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link 
                    to="/login" 
                    className="px-4 py-4 rounded-2xl text-lg font-bold text-slate-900 hover:bg-slate-50 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="primary-gradient text-white py-5 rounded-3xl text-center font-black uppercase tracking-widest italic shadow-lg shadow-primary/20"
                    onClick={() => setIsOpen(false)}
                  >
                    Signup
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
