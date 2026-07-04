import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, Mail, Trash2, ArrowLeft, RefreshCw, Database, Search } from 'lucide-react';
import { useThemeConfig } from '../context/ThemeConfigContext';

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

const API_URL = (import.meta as any).env?.VITE_API_URL || '';

export default function AdminDashboard() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { theme, particleColor } = useThemeConfig();

  // Load passcode validation state from session
  useEffect(() => {
    const savedCode = sessionStorage.getItem('admin-auth-passcode');
    if (savedCode) {
      setPasscode(savedCode);
      fetchInquiries(savedCode);
    }
  }, []);

  const fetchInquiries = async (code: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        headers: {
          'x-admin-passcode': code,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setInquiries(data.inquiries || []);
        setIsAuthenticated(true);
        sessionStorage.setItem('admin-auth-passcode', code);
      } else {
        setError(data.error || 'Failed to authenticate.');
        sessionStorage.removeItem('admin-auth-passcode');
      }
    } catch (err) {
      setError('Connection to backend failed. Make sure your server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) {
      setError('Please enter a passcode.');
      return;
    }
    fetchInquiries(passcode);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      const response = await fetch(`${API_URL}/api/contact/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-passcode': passcode,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setInquiries((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert(data.error || 'Failed to delete inquiry.');
      }
    } catch (err) {
      alert('Network error. Failed to delete.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode('');
    sessionStorage.removeItem('admin-auth-passcode');
    window.location.pathname = '/';
  };

  const filteredInquiries = inquiries.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen text-zinc-100 py-16 px-6 sm:px-12 flex flex-col items-center bg-[#030014] relative overflow-hidden font-sans">
      {/* Dynamic theme background blob lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary-theme/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-secondary-theme/10 blur-[150px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          /* Lock screen input */
          <motion.div
            key="lock-screen"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl glass mt-12"
          >
            <div className="flex flex-col items-center gap-3 text-center mb-8">
              <div className="w-12 h-12 rounded-full border border-violet-500/20 bg-violet-500/10 flex items-center justify-center text-violet-400">
                <Lock className="w-5 h-5" style={{ color: particleColor }} />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white font-mono">
                Admin Console Lock
              </h2>
              <p className="text-xs text-zinc-500 max-w-[280px]">
                Enter your secure dashboard passcode to view database portfolio inquiries.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase pl-1">
                  Passcode
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="••••••"
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-center font-mono text-lg tracking-widest focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-white placeholder-zinc-700"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-rose-500 text-center font-semibold bg-rose-500/10 border border-rose-500/20 py-2 rounded-lg"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-xs font-semibold tracking-widest transition-all duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>UNLOCK DASHBOARD</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.pathname = '/';
                }}
                className="w-full py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs font-semibold tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>BACK TO PORTFOLIO</span>
              </button>
            </form>
          </motion.div>
        ) : (
          /* Authenticated Dashboard */
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full max-w-5xl flex flex-col gap-8 relative z-10"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full border border-white/10 hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Go Back"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white font-mono">
                    Admin Inquiry Center
                  </h1>
                  <p className="text-xs text-zinc-500">
                    Review and coordinate contact form submissions stored on MongoDB.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => fetchInquiries(passcode)}
                  className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
                  disabled={loading}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>REFRESH</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl bg-rose-600/10 border border-rose-500/20 hover:bg-rose-600/20 text-rose-400 text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                >
                  LOGOUT
                </button>
              </div>
            </div>

            {/* Stats widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] glass flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    Total Messages
                  </span>
                  <h3 className="text-2xl font-bold mt-1 text-white">{inquiries.length}</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  <Mail className="w-5 h-5" />
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] glass flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    Database Status
                  </span>
                  <h3 className="text-xs font-bold font-mono mt-2 text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>CONNECTED</span>
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Database className="w-5 h-5" />
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] glass flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    Session Security
                  </span>
                  <h3 className="text-xs font-bold font-mono mt-2 text-violet-400">
                    ENCRYPTED HTTPS
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Filter controls */}
            <div className="relative">
              <Search className="absolute left-4 top-3 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search by name, email, subject, or messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-white placeholder-zinc-500"
              />
            </div>

            {/* Messages Content */}
            <div className="flex flex-col gap-4">
              {filteredInquiries.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                  <span className="text-sm text-zinc-500">No contact inquiries found.</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredInquiries.map((item) => (
                    <motion.div
                      layout
                      key={item._id}
                      className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row justify-between gap-4 glass relative group"
                    >
                      <div className="flex flex-col gap-2.5 flex-1">
                        {/* Meta header */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                          <span className="font-bold text-white">{item.name}</span>
                          <a
                            href={`mailto:${item.email}`}
                            className="text-violet-400 hover:text-violet-300 hover:underline transition-colors font-mono"
                          >
                            {item.email}
                          </a>
                          <span className="text-zinc-500 font-mono">
                            {new Date(item.createdAt).toLocaleString(undefined, {
                              dateStyle: 'medium',
                              timeStyle: 'short',
                            })}
                          </span>
                        </div>

                        {/* Subject */}
                        <div className="text-xs font-mono text-zinc-400">
                          <span className="text-zinc-600 font-bold uppercase tracking-wider">Subject:</span>{' '}
                          {item.subject}
                        </div>

                        {/* Message body */}
                        <p className="text-sm text-zinc-300 bg-black/30 p-4 rounded-xl border border-white/5 leading-relaxed whitespace-pre-wrap">
                          {item.message}
                        </p>
                      </div>

                      {/* Side Actions */}
                      <div className="flex sm:flex-col justify-end items-end gap-2 shrink-0">
                        <a
                          href={`mailto:${item.email}?subject=RE: ${encodeURIComponent(item.subject)}`}
                          className="px-4 py-2 rounded-xl border border-violet-500/25 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                        >
                          REPLY
                        </a>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2.5 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
