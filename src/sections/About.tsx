'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { personalInfo, about, stats } from '@/constants/portfolioData';

// Reusable Counter component that counts up when it enters view
function Counter({ value, suffix, duration = 1.5 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      if (end === 0) return;
      const totalMiliseconds = duration * 1000;
      const stepTime = Math.max(Math.floor(totalMiliseconds / end), 15);
      
      const timer = setInterval(() => {
        start += Math.ceil(end / (totalMiliseconds / stepTime));
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(start);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="font-mono text-3xl sm:text-4xl font-bold text-white tracking-tight">
      {count}
      <span className="text-violet-400 font-semibold ml-0.5">{suffix}</span>
    </span>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden border-t border-white/5">
      {/* Background soft glows */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col mb-16 max-w-2xl">
          <span className="text-xs font-bold font-mono tracking-widest text-violet-400 uppercase mb-2">01 / Profile</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">About Me</h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
        </div>

        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image & Rotating Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center lg:justify-start relative"
          >
            <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] flex items-center justify-center">
              {/* Spinning Glow Backdrop */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 blur-2xl rounded-full opacity-20 animate-pulse-slow" />

              {/* Orbiting Rotating Circular Text */}
              <div className="absolute -inset-6 select-none pointer-events-none animate-spin-slow">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <path
                    id="circlePath"
                    d="M 200,200 m -155,0 a 155,155 0 1,1 310,0 a 155,155 0 1,1 -310,0"
                    fill="none"
                  />
                  <text className="font-mono text-[9.5px] uppercase fill-violet-300/40 tracking-[6.5px]">
                    <textPath href="#circlePath">
                      {`Vaibhav Gorana • MERN Developer • Problem Solver • `}
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Profile Image Frame */}
              <div className="relative w-full h-full rounded-full p-2 border border-white/10 bg-black/60 backdrop-blur-sm overflow-hidden flex items-center justify-center group">
                <div className="relative w-full h-full rounded-full overflow-hidden border border-violet-500/20 shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover transition-transform duration-700 scale-105 group-hover:scale-115 grayscale hover:grayscale-0 brightness-90 hover:brightness-100"
                  />
                  {/* Overlay scanning effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content & Statistics */}
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            initial="hidden"
            animate={controls}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <motion.h3 variants={itemVariants} className="text-xl sm:text-2xl font-semibold text-white">
              {personalInfo.tagline}
            </motion.h3>

            <motion.p variants={itemVariants} className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              {about.bio}
            </motion.p>

            <motion.p variants={itemVariants} className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light">
              {about.objective}
            </motion.p>

            {/* Achievements Bullet List */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3 my-4">
              <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-widest font-mono">Key Highlights</h4>
              <ul className="flex flex-col gap-2">
                {about.achievements.map((ach, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-zinc-400 text-xs sm:text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0 animate-pulse" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Counters Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/5"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <Counter value={stat.value} suffix={stat.suffix} />
                  <span className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-widest mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
