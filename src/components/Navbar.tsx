'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { navLinks } from '@/constants/portfolioData';
import { useThemeConfig, PortfolioTheme } from '@/context/ThemeConfigContext';
import { Palette, Sparkles } from 'lucide-react';
import Magnetic from './Magnetic';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Theme state from Context
  const { theme, setTheme } = useThemeConfig();
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  // Framer Motion scroll progress indicator hook
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      // Toggle compact/sticky mode
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Determine active section based on scroll offset
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      let currentActive = 'home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentActive = section;
          }
        }
      }
      setActiveSection(currentActive);
    };

    // Close theme selector when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setThemeMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    // Run once on load to configure states
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-6 left-0 right-0 mx-auto z-40 w-[90%] md:w-full transition-all duration-500 ease-out flex items-center justify-between border ${
          scrolled
            ? 'max-w-4xl bg-black/60 border-violet-500/20 shadow-[0_10px_30px_rgba(139,92,246,0.12)] py-2.5 px-6 sm:px-8 rounded-full backdrop-blur-xl'
            : 'max-w-5xl bg-black/30 border-white/5 shadow-none py-4 px-6 sm:px-12 rounded-full backdrop-blur-md'
        }`}
      >
        {/* Scroll Progress Indicator Line */}
        <motion.div
          style={{ scaleX }}
          className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 origin-[0%] rounded-full opacity-70 pointer-events-none"
        />

        {/* Logo with interactive glowing halo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500 font-mono group relative"
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-violet-100">
            VG.DEV
          </span>
          <span className="absolute -inset-x-3 -inset-y-1.5 bg-violet-500/0 group-hover:bg-violet-500/10 rounded-full blur-[4px] transition-all duration-300 -z-10" />
        </a>

        {/* Desktop Navigation links */}
        <div className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const linkNameClean = link.href.replace('#', '');
            const isActive = activeSection === linkNameClean;
            return (
              <Magnetic key={link.name} range={20} strength={0.2}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 z-10 ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>

                  {/* Active sliding pill background */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/15 to-fuchsia-500/15 border border-violet-500/20 -z-10 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover background pill */}
                  {hoveredLink === link.name && !isActive && (
                    <motion.span
                      layoutId="hoverNavPill"
                      className="absolute inset-0 rounded-full bg-white/[0.04] border border-white/5 -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </a>
              </Magnetic>
            );
          })}
        </div>

        {/* Action Controls (Theme Switcher & CTA) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Selector Dropdown */}
          <div className="relative" ref={themeMenuRef}>
            <Magnetic range={15}>
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="p-2.5 rounded-full hover:bg-white/5 border border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
                title="Choose Color Theme"
              >
                <Palette className="w-4 h-4 text-violet-400" />
              </button>
            </Magnetic>

            <AnimatePresence>
              {themeMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 p-2 rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl w-36 flex flex-col gap-1 z-50"
                >
                  <span className="text-[9px] font-mono font-bold tracking-wider text-zinc-500 uppercase px-2.5 py-1">
                    Select Theme
                  </span>
                  
                  {(['cosmos', 'cyberpunk', 'matrix'] as PortfolioTheme[]).map((themeName) => (
                    <button
                      key={themeName}
                      onClick={() => {
                        setTheme(themeName);
                        setThemeMenuOpen(false);
                      }}
                      className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-medium font-mono capitalize transition-all cursor-pointer flex items-center justify-between ${
                        theme === themeName
                          ? 'bg-violet-500/10 border border-violet-500/20 text-violet-300 font-bold'
                          : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <span>{themeName}</span>
                      {theme === themeName && <Sparkles className="w-3 h-3 text-violet-400" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Magnetic range={30}>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-xs font-semibold tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] border border-violet-400/20"
            >
              Get In Touch
            </a>
          </Magnetic>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-50 focus:outline-none rounded-full hover:bg-white/5 transition-colors"
          aria-label="Toggle Menu"
        >
          <span
            className={`w-6 h-0.5 bg-zinc-300 rounded transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-zinc-300 rounded transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-zinc-300 rounded transition-all duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark glass backdrop click area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-md md:hidden"
            />
            
            {/* Sidebar drawer content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-[280px] z-30 bg-black/90 border-l border-white/10 backdrop-blur-2xl flex flex-col p-8 pt-24 gap-6 md:hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
              {/* Navigation Links */}
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-mono font-bold tracking-wider text-zinc-500 uppercase mb-2">
                  Navigation
                </span>
                {navLinks.map((link, idx) => {
                  const linkNameClean = link.href.replace('#', '');
                  const isActive = activeSection === linkNameClean;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: idx * 0.05, duration: 0.3 }}
                      className={`text-xl font-medium tracking-wide transition-colors py-2 border-b border-white/5 ${
                        isActive ? 'text-violet-400 font-semibold' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </motion.a>
                  );
                })}
              </div>

              {/* Mobile Theme Selector */}
              <div className="flex flex-col gap-3 mt-4">
                <span className="text-[9px] font-mono font-bold tracking-wider text-zinc-500 uppercase flex items-center gap-1">
                  <Palette className="w-3 h-3 text-violet-400" />
                  Color Theme
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(['cosmos', 'cyberpunk', 'matrix'] as PortfolioTheme[]).map((themeName) => (
                    <button
                      key={themeName}
                      onClick={() => setTheme(themeName)}
                      className={`py-1.5 rounded-lg text-[10px] font-mono font-bold capitalize border cursor-pointer ${
                        theme === themeName
                          ? 'bg-violet-500/10 border-violet-500/30 text-violet-400'
                          : 'bg-white/5 border-white/5 text-zinc-500'
                      }`}
                    >
                      {themeName}
                    </button>
                  ))}
                </div>
              </div>

              {/* HIRE ME Button */}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                className="mt-6 text-center px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-semibold tracking-widest shadow-xl border border-violet-400/20 hover:from-violet-500 hover:to-fuchsia-500 transition-colors"
              >
                GET IN TOUCH
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
