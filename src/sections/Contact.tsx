'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo, socialLinks } from '@/constants/portfolioData';
import { Send, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope } from 'react-icons/fa6';
import Magnetic from '@/components/Magnetic';
import confetti from 'canvas-confetti';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaXTwitter,
  email: FaEnvelope,
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Input states tracking for floating labels
  const [focusedFields, setFocusedFields] = useState<Record<string, boolean>>({});

  const handleFocus = (field: string) => {
    setFocusedFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocusedFields((prev) => ({ ...prev, [field]: false }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Invalid email address';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Trigger celebratory confetti burst!
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#a78bfa', '#f472b6', '#6366f1'],
        });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden border-t border-white/5 bg-black/20">
      {/* Background radial lighting */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col mb-16 max-w-2xl">
          <span className="text-xs font-bold font-mono tracking-widest text-violet-400 uppercase mb-2">07 / Connection</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">Get In Touch</h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Left Column: Direct Info & Social Connect */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-32">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">Let&apos;s Build Something Great</h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light mt-3">
                Have a project concept or want to expand your engineering team? I&apos;m currently available for full-time software developer opportunities and remote projects. Reach out to collaborate!
              </p>
            </div>

            {/* Direct Contact Channels */}
            <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
              <div className="flex items-center gap-4 text-zinc-400">
                <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02] text-violet-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Email address</p>
                  <a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold text-white hover:text-violet-400 transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-zinc-400">
                <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02] text-violet-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Call directly</p>
                  <a href={`tel:${personalInfo.phone}`} className="text-sm font-semibold text-white hover:text-violet-400 transition-colors">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-zinc-400">
                <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02] text-violet-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Location</p>
                  <span className="text-sm font-semibold text-white">{personalInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="flex flex-col gap-3 pt-6 border-t border-white/5">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Digital Channels</span>
              <div className="flex gap-4">
                {socialLinks.map((link) => {
                  const Icon = socialIconMap[link.icon] || Mail;
                  return (
                    <Magnetic key={link.name} range={25}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/10 text-zinc-400 hover:text-violet-400 transition-all duration-300"
                        aria-label={link.name}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    </Magnetic>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md relative overflow-hidden">
            {/* Glow overlay */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-violet-600/5 blur-[80px] rounded-full pointer-events-none" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  className={`w-full px-4 py-3 rounded-lg border bg-black/30 text-white font-light text-sm outline-none transition-all duration-300 ${
                    focusedFields.name ? 'border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.15)] bg-black/55' : 'border-white/10'
                  } ${errors.name ? 'border-red-500' : ''}`}
                />
                <label
                  htmlFor="name"
                  className={`absolute left-4 top-3.5 text-sm transition-all duration-300 pointer-events-none ${
                    focusedFields.name || formData.name
                      ? '-translate-y-8 translate-x-[-8px] scale-85 text-violet-400 font-medium font-mono'
                      : 'text-zinc-500 font-light'
                  }`}
                >
                  Your Name
                </label>
                {errors.name && <p className="text-[10px] text-red-500 font-mono mt-1 pl-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  className={`w-full px-4 py-3 rounded-lg border bg-black/30 text-white font-light text-sm outline-none transition-all duration-300 ${
                    focusedFields.email ? 'border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.15)] bg-black/55' : 'border-white/10'
                  } ${errors.email ? 'border-red-500' : ''}`}
                />
                <label
                  htmlFor="email"
                  className={`absolute left-4 top-3.5 text-sm transition-all duration-300 pointer-events-none ${
                    focusedFields.email || formData.email
                      ? '-translate-y-8 translate-x-[-8px] scale-85 text-violet-400 font-medium font-mono'
                      : 'text-zinc-500 font-light'
                  }`}
                >
                  Email Address
                </label>
                {errors.email && <p className="text-[10px] text-red-500 font-mono mt-1 pl-1">{errors.email}</p>}
              </div>

              {/* Subject */}
              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus('subject')}
                  onBlur={() => handleBlur('subject')}
                  className={`w-full px-4 py-3 rounded-lg border bg-black/30 text-white font-light text-sm outline-none transition-all duration-300 ${
                    focusedFields.subject ? 'border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.15)] bg-black/55' : 'border-white/10'
                  } ${errors.subject ? 'border-red-500' : ''}`}
                />
                <label
                  htmlFor="subject"
                  className={`absolute left-4 top-3.5 text-sm transition-all duration-300 pointer-events-none ${
                    focusedFields.subject || formData.subject
                      ? '-translate-y-8 translate-x-[-8px] scale-85 text-violet-400 font-medium font-mono'
                      : 'text-zinc-500 font-light'
                  }`}
                >
                  Subject / Topic
                </label>
                {errors.subject && <p className="text-[10px] text-red-500 font-mono mt-1 pl-1">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={() => handleBlur('message')}
                  className={`w-full px-4 py-3 rounded-lg border bg-black/30 text-white font-light text-sm outline-none transition-all duration-300 resize-none ${
                    focusedFields.message ? 'border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.15)] bg-black/55' : 'border-white/10'
                  } ${errors.message ? 'border-red-500' : ''}`}
                />
                <label
                  htmlFor="message"
                  className={`absolute left-4 top-3.5 text-sm transition-all duration-300 pointer-events-none ${
                    focusedFields.message || formData.message
                      ? '-translate-y-8 translate-x-[-8px] scale-85 text-violet-400 font-medium font-mono'
                      : 'text-zinc-500 font-light'
                  }`}
                >
                  Detailed Message
                </label>
                {errors.message && <p className="text-[10px] text-red-500 font-mono mt-1 pl-1">{errors.message}</p>}
              </div>

              {/* Status Message Overlay */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-3 text-xs sm:text-sm"
                  >
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <span>Message received! Vaibhav will get back to you shortly.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm"
                  >
                    Oops, something went wrong. Please check your network or email directly.
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <Magnetic range={30}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </button>
              </Magnetic>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
