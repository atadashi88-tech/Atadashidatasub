/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Smartphone, 
  Wifi, 
  Tv, 
  Zap, 
  GraduationCap, 
  MessageSquare, 
  History, 
  Wallet, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Bell,
  User as UserIcon,
  CreditCard,
  Plus,
  Building2,
  ShieldCheck,
  Clock,
  Headphones,
  Lock,
  BarChart3,
  Users,
  Database,
  Search,
  Copy,
  Share2,
  Gift,
  Grid,
  Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Transaction, Network, DataPlan, CableProvider, CablePackage } from './types';
import { DATA_PLANS, CABLE_PACKAGES, TESTIMONIALS } from './constants';

// --- Components ---

const BottomNav = ({ user, onNavigate, activePage }: { 
  user: User | null, 
  onNavigate: (page: string) => void,
  activePage: string
}) => {
  if (!user) return null;

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'services', label: 'Services', icon: Grid },
    { id: 'history', label: 'History', icon: History },
    { id: 'profile', label: 'Profile', icon: UserIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center gap-1 transition-all ${activePage === item.id ? 'text-primary' : 'text-slate-400'}`}
          >
            <item.icon className={`w-6 h-6 ${activePage === item.id ? 'fill-primary/10' : ''}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

const TopHeader = ({ user, onNavigate }: { user: User | null, onNavigate: (page: string) => void }) => {
  if (!user) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-white px-4 h-16 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
          <UserIcon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Welcome back</p>
          <p className="text-sm font-black">{user.name}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 bg-white/10 rounded-full relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full border-2 border-primary"></span>
        </button>
        {user.email === 'admin@atadashi.com' && (
          <button onClick={() => onNavigate('admin')} className="p-2 bg-white/10 rounded-full">
            <ShieldCheck className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  );
};

const NotificationPopup = () => {
  const [notification, setNotification] = useState<{ name: string, city: string, action: string } | null>(null);

  const names = ['Abdullahi', 'Chukwuma', 'Bisi', 'Emeka', 'Fatima', 'Tunde', 'Ifeanyi', 'Zainab'];
  const cities = ['Kano', 'Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Enugu', 'Kaduna', 'Benin'];
  const actions = ['bought 1GB MTN', 'recharged ₦500 Airtime', 'paid DSTV bill', 'bought 2GB Airtel', 'funded wallet with ₦5,000'];

  useEffect(() => {
    const interval = setInterval(() => {
      const name = names[Math.floor(Math.random() * names.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      
      setNotification({ name, city, action });
      setTimeout(() => setNotification(null), 5000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, x: -50, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="fixed bottom-6 left-6 z-[100] bg-white rounded-2xl shadow-2xl p-4 border border-slate-100 flex items-center gap-4 max-w-xs"
        >
          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
            <Bell className="text-accent w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">{notification.name} from {notification.city}</p>
            <p className="text-xs text-slate-500">{notification.action} just now</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Pages ---

const LandingPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <div className="pt-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-20 px-4">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-12">
              <Zap className="text-primary w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              The Smart Way to <span className="text-accent">Top Up</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
              Join 10,000+ Nigerians using atadashidatasub for instant data, airtime, and bill payments.
            </p>
            
            <div className="flex flex-col gap-4 max-w-xs mx-auto">
              <button onClick={() => onNavigate('register')} className="bg-accent text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-accent/30 active:scale-95 transition-transform">
                Create Free Account
              </button>
              <button onClick={() => onNavigate('login')} className="bg-white/10 backdrop-blur-md text-white py-4 rounded-2xl font-bold border border-white/20 active:scale-95 transition-transform">
                Sign In
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-6 grid grid-cols-3 gap-4 border border-slate-100">
          <div className="text-center">
            <p className="text-2xl font-black text-primary">10k+</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Users</p>
          </div>
          <div className="text-center border-x border-slate-100">
            <p className="text-2xl font-black text-secondary">24/7</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Support</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-accent">99.9%</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Uptime</p>
          </div>
        </div>
      </div>

      {/* Trust Elements */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="text-blue-600" />
              </div>
              <h3 className="font-bold text-lg">Trusted by 10,000+</h3>
              <p className="text-slate-500 text-sm">Verified users across Nigeria</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <Zap className="text-green-600" />
              </div>
              <h3 className="font-bold text-lg">Instant Delivery</h3>
              <p className="text-slate-500 text-sm">Automated system for speed</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                <Headphones className="text-orange-600" />
              </div>
              <h3 className="font-bold text-lg">24/7 Support</h3>
              <p className="text-slate-500 text-sm">We are always here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-slate-500">Everything you need in one place</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Wifi, label: 'Data', color: 'bg-blue-500' },
              { icon: Smartphone, label: 'Airtime', color: 'bg-green-500' },
              { icon: Tv, label: 'Cable TV', color: 'bg-purple-500' },
              { icon: Zap, label: 'Electricity', color: 'bg-yellow-500' },
              { icon: GraduationCap, label: 'Edu Pins', color: 'bg-red-500' },
              { icon: MessageSquare, label: 'Bulk SMS', color: 'bg-indigo-500' },
            ].map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col items-center cursor-pointer"
                onClick={() => onNavigate('register')}
              >
                <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <service.icon className="text-white w-6 h-6" />
                </div>
                <span className="font-bold text-slate-700">{service.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-slate-500">Get started in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Sign Up', desc: 'Create a free account with your basic details.' },
              { step: '02', title: 'Fund Wallet', desc: 'Add money to your wallet via bank transfer or card.' },
              { step: '03', title: 'Buy Instantly', desc: 'Select a service and get delivered in seconds.' },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="text-6xl font-black text-slate-100 absolute -top-10 left-1/2 -translate-x-1/2 z-0">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Highlight */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Unbeatable Prices</h2>
            <p className="text-primary-foreground/80">Check out our most popular data plans</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DATA_PLANS.slice(0, 4).map((plan) => (
              <div key={plan.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">{plan.network}</span>
                  <span className="text-2xl font-black">₦{plan.price}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-white/60 mb-6">{plan.validity} Validity</p>
                <button onClick={() => onNavigate('register')} className="w-full py-3 bg-white text-primary rounded-xl font-bold hover:bg-slate-100 transition-colors">
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex gap-1 text-secondary mb-4">
                  {[...Array(5)].map((_, i) => <Zap key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-600 italic mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-[2rem] p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary rounded-full blur-3xl"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">Ready to save money on data?</h2>
          <p className="text-slate-400 mb-10 relative z-10">Join thousands of Nigerians who trust atadashidatasub for their daily top-ups.</p>
          <button onClick={() => onNavigate('register')} className="btn-secondary text-lg px-12 relative z-10">
            Start Buying Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">atadashidatasub</span>
            </div>
            <p className="max-w-sm">Nigeria's most reliable platform for cheap data, airtime, and bill payments. Fast, secure, and automated.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><button onClick={() => onNavigate('login')} className="hover:text-white transition-colors">Login</button></li>
              <li><button onClick={() => onNavigate('register')} className="hover:text-white transition-colors">Register</button></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-sm">
          <p>&copy; 2026 atadashidatasub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const AuthPage = ({ type, onAuth, onNavigate }: { type: 'login' | 'register', onAuth: (user: User) => void, onNavigate: (page: string) => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', referral: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onAuth({
        name: formData.name || 'User',
        email: formData.email,
        phone: formData.phone || '08012345678',
        balance: 0,
        referralBalance: 0,
        referralCode: '',
        referralCount: 0,
        isLoggedIn: true
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-6 flex flex-col bg-white">
      <div className="mb-12 pt-8">
        <h2 className="text-4xl font-black text-slate-900 mb-2">
          {type === 'login' ? 'Welcome Back' : 'Get Started'}
        </h2>
        <p className="text-slate-500 font-medium">
          {type === 'login' ? 'Sign in to continue' : 'Create your secure account'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 flex-1">
        {type === 'register' && (
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                required
                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="John Doe"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>
        )}
        
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="email"
              required
              className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="name@example.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        {type === 'register' && (
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
            <div className="relative">
              <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="tel"
                required
                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="08012345678"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="password"
              required
              className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
        </div>

        {type === 'register' && (
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Referral Code (Optional)</label>
            <div className="relative">
              <Gift className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="ATA12345"
                value={formData.referral}
                onChange={e => setFormData({ ...formData, referral: e.target.value })}
              />
            </div>
          </div>
        )}

        <button type="submit" disabled={loading} className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 active:scale-95 transition-transform flex items-center justify-center">
          {loading ? (
            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            type === 'login' ? 'Sign In' : 'Create Account'
          )}
        </button>
      </form>

      <div className="mt-12 text-center">
        <p className="text-slate-500 font-medium">
          {type === 'login' ? "Don't have an account?" : "Already have an account?"}
          <button 
            onClick={() => onNavigate(type === 'login' ? 'register' : 'login')} 
            className="text-primary font-black ml-2"
          >
            {type === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

const Dashboard = ({ user, onNavigate }: { user: User, onNavigate: (page: string) => void }) => {
  return (
    <div className="pt-20 pb-24 px-4 max-w-7xl mx-auto space-y-6">
      {/* Wallet Card - Opay Style */}
      <div className="bg-gradient-to-br from-primary to-indigo-700 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <Wallet className="w-24 h-24" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Total Balance</p>
            <button className="p-1 bg-white/10 rounded-full"><Clock className="w-3 h-3" /></button>
          </div>
          <h2 className="text-3xl font-black mb-6">₦{user.balance.toLocaleString()}</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => onNavigate('funding')} className="bg-white text-primary py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform">
              <Plus className="w-5 h-5" /> Fund Wallet
            </button>
            <button onClick={() => onNavigate('withdraw')} className="bg-white/20 backdrop-blur-md text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
              <ArrowUpRight className="w-5 h-5" /> Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* Referral Promo Banner */}
      <motion.div 
        whileTap={{ scale: 0.98 }}
        onClick={() => onNavigate('referral')}
        className="bg-accent/10 border border-accent/20 rounded-2xl p-4 flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
            <Gift className="text-white w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-black text-slate-900">Refer & Earn ₦50</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Invite friends and get rewarded</p>
          </div>
        </div>
        <ChevronRight className="text-accent w-5 h-5" />
      </motion.div>

      {/* Quick Actions Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Services</h3>
          <button onClick={() => onNavigate('services')} className="text-primary text-xs font-bold">See All</button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            { id: 'data', icon: Wifi, label: 'Data', color: 'text-blue-600', bg: 'bg-blue-50' },
            { id: 'airtime', icon: Smartphone, label: 'Airtime', color: 'text-green-600', bg: 'bg-green-50' },
            { id: 'bills', icon: Tv, label: 'Cable TV', color: 'text-purple-600', bg: 'bg-purple-50' },
            { id: 'electricity', icon: Zap, label: 'Electric', color: 'text-yellow-600', bg: 'bg-yellow-50' },
          ].map((action, i) => (
            <button
              key={i}
              onClick={() => onNavigate(action.id)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={`w-14 h-14 ${action.bg} rounded-2xl flex items-center justify-center group-active:scale-90 transition-transform shadow-sm`}>
                <action.icon className={`${action.color} w-6 h-6`} />
              </div>
              <span className="text-[10px] font-bold text-slate-600">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Recent Activity</h3>
          <button onClick={() => onNavigate('history')} className="text-primary text-xs font-bold">View History</button>
        </div>
        
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm divide-y divide-slate-50">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                  <History className="text-slate-400 w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Transaction #{i + 1}</p>
                  <p className="text-[10px] text-slate-400">Mar 17, 2026 • 08:40 AM</p>
                </div>
              </div>
              <span className="text-sm font-black text-slate-900">-₦0.00</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReferralPage = ({ user }: { user: User }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-20 pb-24 px-4 max-w-3xl mx-auto space-y-6">
      <div className="bg-gradient-to-br from-accent to-orange-600 rounded-[2rem] p-8 text-white text-center relative overflow-hidden shadow-xl">
        <div className="absolute top-0 left-0 p-8 opacity-10">
          <Gift className="w-32 h-32" />
        </div>
        <h2 className="text-2xl font-black mb-2">Invite & Earn</h2>
        <p className="text-white/80 text-sm mb-6">Earn ₦50 for every friend who joins and funds their wallet.</p>
        
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2 text-white/70">Your Referral Code</p>
          <div className="flex items-center justify-center gap-4">
            <span className="text-3xl font-black tracking-widest">{user.referralCode}</span>
            <button onClick={handleCopy} className="p-2 bg-white text-accent rounded-lg active:scale-90 transition-transform">
              {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Referrals</p>
          <h3 className="text-2xl font-black text-slate-900">{user.referralCount}</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Referral Earnings</p>
          <h3 className="text-2xl font-black text-secondary">₦{user.referralBalance.toLocaleString()}</h3>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <h3 className="font-black text-slate-900 mb-6">How it works</h3>
        <div className="space-y-6">
          {[
            { step: 1, title: 'Share your code', desc: 'Send your referral code to your friends and family.' },
            { step: 2, title: 'They sign up', desc: 'Your friends register using your unique referral code.' },
            { step: 3, title: 'Get rewarded', desc: 'Receive ₦50 instantly when they fund their wallet.' },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-sm shrink-0">
                {item.step}
              </div>
              <div>
                <p className="font-bold text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button className="btn-primary w-full mt-8 py-4 flex items-center justify-center gap-2">
          <Share2 className="w-5 h-5" /> Share with Friends
        </button>
      </div>
    </div>
  );
};

const AirtimePage = ({ user, onPurchase }: { user: User, onPurchase: (amount: number, details: string) => void }) => {
  const [network, setNetwork] = useState<Network | ''>('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleBuy = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(amount);
    if (val < 50) {
      alert('Minimum airtime is ₦50');
      return;
    }
    
    if (user.balance < val) {
      alert('Insufficient balance. Please fund your wallet.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      onPurchase(val, `${network} Airtime to ${phone}`);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setAmount('');
      setPhone('');
    }, 1500);
  };

  return (
    <div className="pt-20 pb-24 px-4 max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <Smartphone className="text-blue-600 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Buy Airtime</h2>
            <p className="text-slate-500">Instant top-up to any network</p>
          </div>
        </div>

        <form onSubmit={handleBuy} className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Network</label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {['MTN', 'Airtel', 'Glo', '9mobile'].map(net => (
                <button
                  key={net}
                  type="button"
                  onClick={() => setNetwork(net as Network)}
                  className={`py-3 rounded-2xl font-bold text-xs transition-all border-2 ${
                    network === net 
                    ? 'bg-primary/5 border-primary text-primary' 
                    : 'bg-slate-50 border-transparent text-slate-500'
                  }`}
                >
                  {net}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
            <input
              type="tel"
              required
              className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="08012345678"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Amount (₦)</label>
            <input
              type="number"
              required
              min="50"
              className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 font-black text-xl text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading || !amount || !network || success} className={`w-full py-5 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-transform flex items-center justify-center ${success ? 'bg-accent text-white' : 'bg-primary text-white shadow-primary/20'}`}>
            {loading ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : success ? (
              <><CheckCircle2 className="w-5 h-5 mr-2" /> Top-up Successful!</>
            ) : (
              `Pay ₦${amount || 0}`
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const DataPage = ({ user, onPurchase }: { user: User, onPurchase: (amount: number, details: string) => void }) => {
  const [network, setNetwork] = useState<Network | ''>('');
  const [plan, setPlan] = useState<string>('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const filteredPlans = useMemo(() => {
    return DATA_PLANS.filter(p => p.network === network);
  }, [network]);

  const selectedPlan = useMemo(() => {
    return DATA_PLANS.find(p => p.id === plan);
  }, [plan]);

  const handleBuy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    
    if (user.balance < selectedPlan.price) {
      alert('Insufficient balance. Please fund your wallet.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      onPurchase(selectedPlan.price, `${selectedPlan.network} ${selectedPlan.name} to ${phone}`);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setPlan('');
      setPhone('');
    }, 1500);
  };

  return (
    <div className="pt-20 pb-24 px-4 max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
            <Wifi className="text-purple-600 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Buy Data</h2>
            <p className="text-slate-500">Cheap data for all networks</p>
          </div>
        </div>

        <form onSubmit={handleBuy} className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Network</label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {['MTN', 'Airtel', 'Glo', '9mobile'].map(net => (
                <button
                  key={net}
                  type="button"
                  onClick={() => { setNetwork(net as Network); setPlan(''); }}
                  className={`py-3 rounded-2xl font-bold text-xs transition-all border-2 ${
                    network === net 
                    ? 'bg-primary/5 border-primary text-primary' 
                    : 'bg-slate-50 border-transparent text-slate-500'
                  }`}
                >
                  {net}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
            <input
              type="tel"
              required
              className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="08012345678"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>

          {network && (
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Data Plan</label>
              <div className="space-y-2 mt-2">
                {filteredPlans.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlan(p.id)}
                    className={`w-full p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${
                      plan === p.id 
                      ? 'bg-primary/5 border-primary' 
                      : 'bg-slate-50 border-transparent'
                    }`}
                  >
                    <div className="text-left">
                      <p className={`font-bold ${plan === p.id ? 'text-primary' : 'text-slate-700'}`}>{p.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{p.validity}</p>
                    </div>
                    <span className="font-black text-slate-900">₦{p.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button type="submit" disabled={loading || !plan || !phone || success} className={`w-full py-5 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-transform flex items-center justify-center ${success ? 'bg-accent text-white' : 'bg-primary text-white shadow-primary/20'}`}>
            {loading ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : success ? (
              <><CheckCircle2 className="w-5 h-5 mr-2" /> Purchase Successful!</>
            ) : (
              'Purchase Data'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const CablePage = ({ user, onPurchase }: { user: User, onPurchase: (amount: number, details: string) => void }) => {
  const [provider, setProvider] = useState<CableProvider | ''>('');
  const [plan, setPlan] = useState<string>('');
  const [customerId, setCustomerId] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const filteredPackages = useMemo(() => {
    return CABLE_PACKAGES.filter(p => p.provider === provider);
  }, [provider]);

  const selectedPackage = useMemo(() => {
    return CABLE_PACKAGES.find(p => p.id === plan);
  }, [plan]);

  const handleBuy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) return;
    
    if (user.balance < selectedPackage.price) {
      alert('Insufficient balance. Please fund your wallet.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      onPurchase(selectedPackage.price, `${selectedPackage.provider} ${selectedPackage.name} for ID: ${customerId}`);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setPlan('');
      setCustomerId('');
    }, 1500);
  };

  return (
    <div className="pt-20 pb-24 px-4 max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
            <Tv className="text-orange-600 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Cable TV</h2>
            <p className="text-slate-500">Renew your subscription instantly</p>
          </div>
        </div>

        <form onSubmit={handleBuy} className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Provider</label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {['DSTV', 'GOTV', 'Startimes'].map(prov => (
                <button
                  key={prov}
                  type="button"
                  onClick={() => { setProvider(prov as CableProvider); setPlan(''); }}
                  className={`py-3 rounded-2xl font-bold text-xs transition-all border-2 ${
                    provider === prov 
                    ? 'bg-primary/5 border-primary text-primary' 
                    : 'bg-slate-50 border-transparent text-slate-500'
                  }`}
                >
                  {prov}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">SmartCard / IUC Number</label>
            <input
              type="text"
              required
              className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Enter Number"
              value={customerId}
              onChange={e => setCustomerId(e.target.value)}
            />
          </div>

          {provider && (
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Package</label>
              <div className="space-y-2 mt-2">
                {filteredPackages.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlan(p.id)}
                    className={`w-full p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${
                      plan === p.id 
                      ? 'bg-primary/5 border-primary' 
                      : 'bg-slate-50 border-transparent'
                    }`}
                  >
                    <span className={`font-bold ${plan === p.id ? 'text-primary' : 'text-slate-700'}`}>{p.name}</span>
                    <span className="font-black text-slate-900">₦{p.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button type="submit" disabled={loading || !plan || !customerId || success} className={`w-full py-5 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-transform flex items-center justify-center ${success ? 'bg-accent text-white' : 'bg-primary text-white shadow-primary/20'}`}>
            {loading ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : success ? (
              <><CheckCircle2 className="w-5 h-5 mr-2" /> Subscription Successful!</>
            ) : (
              'Renew Subscription'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const SuccessScreen = ({ details, amount, onDone }: { details: string, amount: number, onDone: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center px-6 text-center"
    >
      <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
        >
          <CheckCircle2 className="text-secondary w-16 h-16" />
        </motion.div>
      </div>
      
      <h2 className="text-3xl font-black text-slate-900 mb-2">Transaction Successful</h2>
      <p className="text-slate-500 font-medium mb-12">Your request has been processed instantly.</p>
      
      <div className="w-full max-w-sm bg-slate-50 rounded-3xl p-6 space-y-4 mb-12 border border-slate-100">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Amount</span>
          <span className="text-xl font-black text-slate-900">₦{amount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Details</span>
          <span className="text-sm font-bold text-slate-700 text-right max-w-[200px]">{details}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Status</span>
          <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase">Success</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Date</span>
          <span className="text-xs font-bold text-slate-600">{new Date().toLocaleString()}</span>
        </div>
      </div>
      
      <div className="w-full max-w-sm space-y-4">
        <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-2">
          <Share2 className="w-5 h-5" /> Share Receipt
        </button>
        <button onClick={onDone} className="w-full bg-slate-100 text-slate-600 py-5 rounded-2xl font-black text-lg active:scale-95 transition-transform">
          Done
        </button>
      </div>
    </motion.div>
  );
};

const BulkSmsPage = ({ user, onPurchase }: { user: User, onPurchase: (amount: number, details: string) => void }) => {
  const [formData, setFormData] = useState({ senderId: '', recipients: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const recipientCount = formData.recipients.split(',').filter(r => r.trim().length > 0).length;
  const pageCount = Math.ceil(formData.message.length / 160) || 1;
  const totalAmount = recipientCount * pageCount * 4; // ₦4 per page per recipient

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (recipientCount === 0) {
      alert('Please enter at least one recipient');
      return;
    }
    if (user.balance < totalAmount) {
      alert('Insufficient balance. Please fund your wallet.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      onPurchase(totalAmount, `Bulk SMS to ${recipientCount} recipients`);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setFormData({ senderId: '', recipients: '', message: '' });
    }, 2000);
  };

  return (
    <div className="pt-20 pb-24 px-4 max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
            <MessageSquare className="text-indigo-600 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Bulk SMS</h2>
            <p className="text-slate-500">Send messages to multiple numbers</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sender ID (Max 11 chars)</label>
            <input
              type="text"
              required
              maxLength={11}
              className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="e.g. ATADASHI"
              value={formData.senderId}
              onChange={e => setFormData({ ...formData, senderId: e.target.value.toUpperCase() })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Recipients (Comma separated)</label>
            <textarea
              required
              rows={3}
              className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="08012345678, 09012345678"
              value={formData.recipients}
              onChange={e => setFormData({ ...formData, recipients: e.target.value })}
            />
            <p className="text-[10px] text-slate-400 font-bold ml-1">{recipientCount} recipients detected</p>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message</label>
            <textarea
              required
              rows={5}
              className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Type your message here..."
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
            />
            <div className="flex justify-between px-1">
              <p className="text-[10px] text-slate-400 font-bold">{formData.message.length} characters</p>
              <p className="text-[10px] text-slate-400 font-bold">{pageCount} page(s)</p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-bold">Total Cost:</span>
              <span className="text-2xl font-black text-primary">₦{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <button type="submit" disabled={loading || success || recipientCount === 0} className={`w-full py-5 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-transform flex items-center justify-center ${success ? 'bg-accent text-white' : 'bg-primary text-white shadow-primary/20'}`}>
            {loading ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : success ? (
              <><CheckCircle2 className="w-5 h-5 mr-2" /> SMS Sent!</>
            ) : (
              'Send SMS'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
const ElectricityPage = ({ user, onPurchase }: { user: User, onPurchase: (amount: number, details: string) => void }) => {
  const [formData, setFormData] = useState({ disco: 'Ikeja Electric', meterType: 'Prepaid', meterNumber: '', amount: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const discos = ['Ikeja Electric', 'Eko Electric', 'Abuja Electric', 'Kano Electric', 'Port Harcourt Electric', 'Ibadan Electric'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(formData.amount);
    if (val < 1000) {
      alert('Minimum amount is ₦1,000');
      return;
    }
    
    if (user.balance < val) {
      alert('Insufficient balance. Please fund your wallet.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      onPurchase(val, `${formData.disco} (${formData.meterType}) for Meter: ${formData.meterNumber}`);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setFormData({ ...formData, meterNumber: '', amount: '' });
    }, 2000);
  };

  return (
    <div className="pt-20 pb-24 px-4 max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
            <Zap className="text-yellow-600 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Electricity Bills</h2>
            <p className="text-slate-500">Pay your electricity bills instantly</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Disco</label>
            <select 
              className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
              value={formData.disco}
              onChange={e => setFormData({ ...formData, disco: e.target.value })}
            >
              {discos.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Meter Type</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {['Prepaid', 'Postpaid'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, meterType: type })}
                  className={`py-3 rounded-2xl font-bold text-xs transition-all border-2 ${
                    formData.meterType === type 
                    ? 'bg-primary/5 border-primary text-primary' 
                    : 'bg-slate-50 border-transparent text-slate-500'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Meter Number</label>
            <input
              type="text"
              required
              className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Enter Meter Number"
              value={formData.meterNumber}
              onChange={e => setFormData({ ...formData, meterNumber: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Amount (₦)</label>
            <input
              type="number"
              required
              min="1000"
              className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 font-black text-xl text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="0.00"
              value={formData.amount}
              onChange={e => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>

          <button type="submit" disabled={loading || !formData.amount || !formData.meterNumber || success} className={`w-full py-5 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-transform flex items-center justify-center ${success ? 'bg-accent text-white' : 'bg-primary text-white shadow-primary/20'}`}>
            {loading ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : success ? (
              <><CheckCircle2 className="w-5 h-5 mr-2" /> Payment Successful!</>
            ) : (
              'Pay Bill'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const EducationPage = ({ user, onPurchase }: { user: User, onPurchase: (amount: number, details: string) => void }) => {
  const [formData, setFormData] = useState({ exam: 'WAEC', quantity: '1' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const exams = [
    { name: 'WAEC Result Pin', price: 3500 },
    { name: 'NECO Result Pin', price: 1200 },
    { name: 'NABTEB Result Pin', price: 1000 },
    { name: 'JAMB Pin', price: 4700 },
  ];

  const selectedExam = exams.find(e => e.name.includes(formData.exam)) || exams[0];
  const totalAmount = selectedExam.price * Number(formData.quantity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.balance < totalAmount) {
      alert('Insufficient balance. Please fund your wallet.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      onPurchase(totalAmount, `${formData.quantity}x ${selectedExam.name}`);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="pt-20 pb-24 px-4 max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
            <GraduationCap className="text-red-600 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Education Pins</h2>
            <p className="text-slate-500">WAEC, NECO, JAMB & NABTEB Pins</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Exam</label>
            <div className="space-y-2 mt-2">
              {exams.map(exam => (
                <button
                  key={exam.name}
                  type="button"
                  onClick={() => setFormData({ ...formData, exam: exam.name.split(' ')[0] })}
                  className={`w-full p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${
                    formData.exam === exam.name.split(' ')[0]
                    ? 'bg-primary/5 border-primary' 
                    : 'bg-slate-50 border-transparent'
                  }`}
                >
                  <span className={`font-bold ${formData.exam === exam.name.split(' ')[0] ? 'text-primary' : 'text-slate-700'}`}>{exam.name}</span>
                  <span className="font-black text-slate-900">₦{exam.price}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Quantity</label>
            <select 
              className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
              value={formData.quantity}
              onChange={e => setFormData({ ...formData, quantity: e.target.value })}
            >
              {[1, 2, 3, 4, 5].map(q => <option key={q} value={q}>{q}</option>)}
            </select>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-bold">Total Amount:</span>
              <span className="text-2xl font-black text-primary">₦{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <button type="submit" disabled={loading || success} className={`w-full py-5 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-transform flex items-center justify-center ${success ? 'bg-accent text-white' : 'bg-primary text-white shadow-primary/20'}`}>
            {loading ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : success ? (
              <><CheckCircle2 className="w-5 h-5 mr-2" /> Pin Generated!</>
            ) : (
              'Generate Pin'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
const ProfilePage = ({ user, onLogout }: { user: User, onLogout: () => void }) => {
  return (
    <div className="pt-20 pb-24 px-4 max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-black shadow-lg">
          {user.name[0]}
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900">{user.name}</h2>
          <p className="text-sm text-slate-500 font-medium">{user.phone}</p>
          <div className="mt-1 inline-block px-2 py-0.5 bg-secondary/10 text-secondary rounded-full text-[10px] font-bold uppercase">Verified User</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
        {[
          { icon: UserIcon, label: 'Personal Information', color: 'text-blue-500' },
          { icon: ShieldCheck, label: 'Security & Password', color: 'text-green-500' },
          { icon: Wallet, label: 'Payment Methods', color: 'text-purple-500' },
          { icon: Headphones, label: 'Help & Support', color: 'text-orange-500' },
          { icon: Gift, label: 'Referral Rewards', color: 'text-accent' },
        ].map((item, i) => (
          <button key={i} className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center`}>
                <item.icon className={`${item.color} w-5 h-5`} />
              </div>
              <span className="font-bold text-slate-700">{item.label}</span>
            </div>
            <ChevronRight className="text-slate-300 w-5 h-5" />
          </button>
        ))}
      </div>

      <button 
        onClick={onLogout}
        className="w-full p-5 bg-red-50 text-red-500 rounded-3xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
      >
        <LogOut className="w-5 h-5" /> Sign Out
      </button>
    </div>
  );
};

const FundingPage = ({ onFund }: { onFund: (amount: number) => void }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState('card');

  const handleFund = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(amount);
    if (val < 100) {
      alert('Minimum funding amount is ₦100');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onFund(val);
      setLoading(false);
      setAmount('');
      alert(`Successfully funded ₦${val.toLocaleString()}`);
    }, 2000);
  };

  return (
    <div className="pt-20 pb-24 px-4 max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
            <Plus className="text-green-600 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Fund Wallet</h2>
            <p className="text-slate-500">Add money to your wallet instantly</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { id: 'card', label: 'Card Payment', icon: CreditCard },
            { id: 'transfer', label: 'Bank Transfer', icon: Building2 },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                method === m.id ? 'bg-primary/5 border-primary text-primary' : 'bg-slate-50 border-transparent text-slate-500'
              }`}
            >
              <m.icon className="w-6 h-6" />
              <span className="text-xs font-bold">{m.label}</span>
            </button>
          ))}
        </div>

        {method === 'card' ? (
          <form onSubmit={handleFund} className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Amount to Fund</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-900">₦</span>
                <input
                  type="number"
                  required
                  min="100"
                  className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-10 pr-4 font-black text-xl text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="0.00"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" disabled={loading || !amount} className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 active:scale-95 transition-transform flex items-center justify-center">
              {loading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Pay with Paystack'
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Virtual Account</p>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-bold">Bank Name</p>
                <p className="text-lg font-black">Wema Bank / Moniepoint</p>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-bold">Account Number</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-black tracking-wider">8123456789</p>
                  <button className="p-2 bg-white/10 rounded-lg"><Copy className="w-4 h-4" /></button>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-bold">Account Name</p>
                <p className="text-lg font-black">ATADASHI-USER-123</p>
              </div>
            </div>
            <p className="text-center text-xs text-slate-400 font-medium">Funds sent to this account will reflect in your wallet automatically.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const WithdrawPage = ({ user }: { user: User }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert('Withdrawal request submitted successfully!');
      setLoading(false);
      setAmount('');
    }, 2000);
  };

  return (
    <div className="pt-20 pb-24 px-4 max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
            <ArrowUpRight className="text-red-600 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Withdraw Funds</h2>
            <p className="text-slate-500">Transfer money to your bank account</p>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Available Balance</p>
          <h3 className="text-2xl font-black text-slate-900">₦{user.balance.toLocaleString()}</h3>
        </div>

        <form onSubmit={handleWithdraw} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Withdrawal Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-900">₦</span>
              <input
                type="number"
                required
                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-10 pr-4 font-black text-xl text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="0.00"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Bank</label>
            <select className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all">
              <option>Access Bank</option>
              <option>GTBank</option>
              <option>Zenith Bank</option>
              <option>United Bank for Africa (UBA)</option>
              <option>First Bank</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Number</label>
            <input
              type="text"
              required
              className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="0123456789"
            />
          </div>

          <button type="submit" disabled={loading || !amount} className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 active:scale-95 transition-transform flex items-center justify-center">
            {loading ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Withdraw Now'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
const HistoryPage = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <div className="pt-24 pb-12 px-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Transaction History</h2>
          <p className="text-slate-500">View all your past activities</p>
        </div>
        <button className="p-2 bg-white rounded-xl border border-slate-100 shadow-sm text-slate-500">
          <History className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {transactions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <History className="text-slate-300 w-8 h-8" />
            </div>
            <p className="text-slate-500">No transactions found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Service</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.type === 'Funding' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                          {t.type === 'Funding' ? <ArrowDownLeft className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
                        </div>
                        <span className="font-bold text-sm">{t.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{t.details}</td>
                    <td className="px-6 py-4 font-bold text-sm">₦{t.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${t.status === 'Success' ? 'bg-green-100 text-green-700' : t.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const AdminPanel = ({ transactions, onNavigate }: { transactions: Transaction[], onNavigate: (page: string) => void }) => {
  const stats = [
    { label: 'Total Users', value: '1,240', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Revenue', value: '₦450,000', icon: BarChart3, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Pending Orders', value: '12', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'System Status', value: 'Active', icon: ShieldCheck, color: 'text-accent', bg: 'bg-accent/10' },
  ];

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <p className="text-slate-500">Manage users, services, and transactions</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-primary px-4 py-2 text-sm">
            <Database className="w-4 h-4" /> Backup Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`${stat.color} w-6 h-6`} />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase">Live</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-black">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold">Recent System Transactions</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-slate-50 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { user: 'Abdullahi K.', service: 'MTN Data', amount: '₦280', status: 'Success' },
                    { user: 'Chinedu O.', service: 'Airtel Airtime', amount: '₦500', status: 'Success' },
                    { user: 'Bisi A.', service: 'DSTV Payment', amount: '₦5,000', status: 'Pending' },
                    { user: 'Emeka U.', service: 'Glo Data', amount: '₦1,000', status: 'Success' },
                  ].map((row, i) => (
                    <tr key={i} className="text-sm">
                      <td className="px-6 py-4 font-medium">{row.user}</td>
                      <td className="px-6 py-4 text-slate-600">{row.service}</td>
                      <td className="px-6 py-4 font-bold">{row.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${row.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-bold mb-6">Service Management</h3>
            <div className="space-y-4">
              {['MTN SME', 'Airtel CG', 'Glo Gifting', '9mobile SME'].map((service, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <span className="text-sm font-medium">{service}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-4 bg-accent rounded-full relative">
                      <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-[10px] font-bold text-accent uppercase">Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl">
            <h3 className="font-bold mb-4">Admin Quick Links</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-white/10 rounded-xl text-xs font-bold hover:bg-white/20 transition-all">Edit Plans</button>
              <button className="p-3 bg-white/10 rounded-xl text-xs font-bold hover:bg-white/20 transition-all">User List</button>
              <button className="p-3 bg-white/10 rounded-xl text-xs font-bold hover:bg-white/20 transition-all">Support</button>
              <button className="p-3 bg-white/10 rounded-xl text-xs font-bold hover:bg-white/20 transition-all">Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState('landing');
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [lastPurchase, setLastPurchase] = useState<{ details: string, amount: number } | null>(null);

  const handleAuth = (userData: User) => {
    setUser({
      ...userData,
      referralBalance: 0,
      referralCode: 'ATA' + Math.random().toString(36).substr(2, 5).toUpperCase(),
      referralCount: 0
    });
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setActivePage('landing');
  };

  const handlePurchase = (amount: number, details: string, type: Transaction['type'] = 'Data') => {
    if (!user) return;
    
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      amount,
      status: 'Success',
      date: new Date().toLocaleString(),
      details
    };

    setUser({ ...user, balance: user.balance - amount });
    setTransactions([newTransaction, ...transactions]);
    setLastPurchase({ details, amount });
  };

  const handleFund = (amount: number) => {
    if (!user) return;

    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'Funding',
      amount,
      status: 'Success',
      date: new Date().toLocaleString(),
      details: 'Wallet Funding'
    };

    setUser({ ...user, balance: user.balance + amount });
    setTransactions([newTransaction, ...transactions]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <TopHeader user={user} onNavigate={setActivePage} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="pb-20"
        >
          {activePage === 'landing' && <LandingPage onNavigate={setActivePage} />}
          {(activePage === 'login' || activePage === 'register') && (
            <AuthPage type={activePage as 'login' | 'register'} onAuth={handleAuth} onNavigate={setActivePage} />
          )}
          
          {user && (
            <>
              {activePage === 'dashboard' && <Dashboard user={user} onNavigate={setActivePage} />}
              {activePage === 'referral' && <ReferralPage user={user} />}
              {activePage === 'withdraw' && <WithdrawPage user={user} />}
              {activePage === 'profile' && <ProfilePage user={user} onLogout={handleLogout} />}
              {activePage === 'services' && (
                <div className="pt-20 pb-24 px-4 max-w-7xl mx-auto">
                  <h2 className="text-xl font-black mb-6 uppercase tracking-widest">All Services</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'data', icon: Wifi, label: 'Data', color: 'text-blue-600', bg: 'bg-blue-50' },
                      { id: 'airtime', icon: Smartphone, label: 'Airtime', color: 'text-green-600', bg: 'bg-green-50' },
                      { id: 'bills', icon: Tv, label: 'Cable TV', color: 'text-purple-600', bg: 'bg-purple-50' },
                      { id: 'electricity', icon: Zap, label: 'Electric', color: 'text-yellow-600', bg: 'bg-yellow-50' },
                      { id: 'education', icon: GraduationCap, label: 'Edu Pin', color: 'text-red-600', bg: 'bg-red-50' },
                      { id: 'sms', icon: MessageSquare, label: 'Bulk SMS', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    ].map((action, i) => (
                      <button
                        key={i}
                        onClick={() => setActivePage(action.id)}
                        className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center gap-2"
                      >
                        <div className={`w-12 h-12 ${action.bg} rounded-xl flex items-center justify-center`}>
                          <action.icon className={`${action.color} w-5 h-5`} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-600">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {activePage === 'data' && <DataPage user={user} onPurchase={(amt, det) => handlePurchase(amt, det, 'Data')} />}
              {activePage === 'airtime' && <AirtimePage user={user} onPurchase={(amt, det) => handlePurchase(amt, det, 'Airtime')} />}
              {activePage === 'bills' && <CablePage user={user} onPurchase={(amt, det) => handlePurchase(amt, det, 'Cable')} />}
              {activePage === 'electricity' && <ElectricityPage user={user} onPurchase={(amt, det) => handlePurchase(amt, det, 'Electricity')} />}
              {activePage === 'education' && <EducationPage user={user} onPurchase={(amt, det) => handlePurchase(amt, det, 'Education')} />}
              {activePage === 'sms' && <BulkSmsPage user={user} onPurchase={(amt, det) => handlePurchase(amt, det, 'SMS')} />}
              {activePage === 'funding' && <FundingPage onFund={handleFund} />}
              {activePage === 'history' && <HistoryPage transactions={transactions} />}
              {activePage === 'admin' && <AdminPanel transactions={transactions} onNavigate={setActivePage} />}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <BottomNav 
        user={user} 
        onNavigate={setActivePage} 
        activePage={activePage} 
      />
      
      {lastPurchase && (
        <SuccessScreen 
          details={lastPurchase.details} 
          amount={lastPurchase.amount} 
          onDone={() => {
            setLastPurchase(null);
            setActivePage('dashboard');
          }} 
        />
      )}

      <NotificationPopup />
    </div>
  );
}
