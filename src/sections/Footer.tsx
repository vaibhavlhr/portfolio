'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, socialLinks, navLinks } from '@/constants/portfolioData';
import { ArrowUp, Terminal, ShieldAlert, Clock, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope } from 'react-icons/fa6';
import Magnetic from '@/components/Magnetic';
import { useThemeConfig } from '../context/ThemeConfigContext';

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaXTwitter,
  email: FaEnvelope,
};

export default function Footer() {
  const { particleColor } = useThemeConfig();
  const [localTime, setLocalTime] = useState('');

  // Live Local Time updates for Udaipur (Asia/Kolkata)
  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000 * 60); // update every minute
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetPosition = targetElement.offsetTop - 85;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="relative bg-[#030014] border-t border-white/5 pt-12 pb-6 overflow-hidden select-none">
      {/* Animated glowing background blobs */}
      <div className="absolute top-[-50px] left-1/4 w-[300px] h-[300px] bg-primary-theme/5 blur-[120px] rounded-full pointer-events-none transition-colors duration-500" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-secondary-theme/5 blur-[120px] rounded-full pointer-events-none transition-colors duration-500" />

      {/* Animated top border line */}
      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-primary-theme to-transparent animate-pulse-slow transition-colors duration-500" />

      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/5 pb-10">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary-theme to-secondary-theme font-sans tracking-normal w-max"
            >
              vaibhav.dev
            </a>
            
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Developing high-performance, responsive full-stack applications with the MERN stack. Focused on clean code structures, reliable databases, and immersive WebGL user interfaces.
            </p>

            {/* Udaipur India details */}
            <div className="flex flex-col gap-2.5 mt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                <MapPin className="w-3.5 h-3.5 text-primary-theme" />
                <span>Rajasthan, India</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                <Clock className="w-3.5 h-3.5 text-secondary-theme" />
                <span>Local Time: {localTime ? `${localTime} IST` : 'Loading...'}</span>
              </div>
            </div>
          </div>

          {/* Sitemap (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
              Sitemap
            </span>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-xs text-zinc-400 hover:text-white transition-colors duration-300 font-medium hover:underline decoration-primary-theme decoration-2"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials (2 cols) */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
              Connect
            </span>
            <ul className="flex flex-col gap-2.5">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-400 hover:text-white transition-colors duration-300 font-medium hover:underline decoration-secondary-theme decoration-2"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Utilities & Admin console (2 cols) */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
              Utilities
            </span>
            <div className="flex flex-col gap-3">
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-400 hover:text-white transition-colors duration-300 font-medium"
              >
                View Resume
              </a>

              <a
                href="/admin"
                className="w-max mt-2 px-3 py-1.5 rounded-lg border border-zinc-800 bg-white/[0.01] hover:bg-white/5 text-zinc-500 hover:text-white text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5"
              >
                <Terminal className="w-3 h-3 text-primary-theme" />
                <span>Console</span>
              </a>
            </div>
          </div>
        </div>

        {/* Huge Outlined Name Typography */}
        <div className="w-full text-center py-2 select-none pointer-events-none">
          <h2 
            className="text-[6vw] font-black tracking-tighter opacity-[0.03] select-none"
            style={{ 
              WebkitTextStroke: '1.2px var(--theme-primary)', 
              color: 'transparent',
              fontFamily: 'system-ui, sans-serif'
            }}
          >
            {personalInfo.name.toUpperCase()}
          </h2>
        </div>

        {/* Bottom copyright details */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5 pt-6 mt-1">
          <p className="text-zinc-500 text-xs font-mono">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {/* Built Signature */}
            <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
              Designed & Built with ❤️
            </span>

            {/* Back to top capsule button */}
            <Magnetic range={25}>
              <button
                onClick={scrollToTop}
                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-[10px] font-mono font-bold tracking-widest text-zinc-400 hover:text-white flex items-center gap-2 transition-all duration-300 cursor-pointer"
              >
                TOP <ArrowUp className="w-3.5 h-3.5 animate-pulse text-primary-theme" />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
