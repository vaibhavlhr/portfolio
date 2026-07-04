'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '@/constants/portfolioData';
import Magnetic from '@/components/Magnetic';
import { ArrowRight, Download, Mail } from 'lucide-react';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const roles = personalInfo.roles;
    const currentRole = roles[roleIndex];
    
    // Typewriter timing configuration
    const typingSpeed = isDeleting ? 30 : 70;
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText === currentRole) {
      // Pause at complete word
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timer = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const handleScrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      const offset = target.offsetTop - 80;
      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20">
      {/* Decorative Grid Overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Moving Ambient light blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/10 blur-[150px] rounded-full animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-fuchsia-600/10 blur-[150px] rounded-full animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        {/* Floating Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-semibold text-violet-300 font-mono tracking-wider mb-6 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
          AVAILABLE FOR HIRE
        </motion.div>

        {/* Big Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight mb-6"
        >
          <span className="text-zinc-400 block font-light text-3xl sm:text-5xl mb-2 sm:mb-4">Hello World, I&apos;m</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-200 to-zinc-400">
            {personalInfo.name}
          </span>
        </motion.h1>

        {/* Typewriter Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-10 sm:h-12 flex items-center justify-center mb-10"
        >
          <p className="text-xl sm:text-3xl font-mono font-medium text-violet-400">
            <span>&lt;</span>
            <span className="text-white select-all">{displayText}</span>
            <span className="animate-blink">|</span>
            <span>&nbsp;/&gt;</span>
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 max-w-2xl mx-auto"
        >
          <Magnetic range={30}>
            <button
              onClick={() => handleScrollTo('projects')}
              className="group w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_35px_rgba(139,92,246,0.6)] cursor-pointer"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </Magnetic>

          <Magnetic range={30}>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </Magnetic>

          <Magnetic range={30}>
            <button
              onClick={() => handleScrollTo('contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-violet-500/20 hover:border-violet-500/40 bg-violet-500/5 hover:bg-violet-500/10 text-violet-300 font-medium flex items-center justify-center gap-2 transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </button>
          </Magnetic>
        </motion.div>
      </div>

      {/* Cinematic Down Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[9px] tracking-widest text-zinc-500 cursor-pointer"
        onClick={() => handleScrollTo('about')}
      >
        <span>SCROLL DOWN</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent animate-bounce" />
      </motion.div>
    </section>
  );
}
