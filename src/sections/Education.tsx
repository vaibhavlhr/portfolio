'use client';

import { motion } from 'framer-motion';
import { education } from '@/constants/portfolioData';
import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="relative py-24 md:py-32 overflow-hidden border-t border-white/5 bg-black/40">
      {/* Background soft lighting */}
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-fuchsia-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col mb-16 max-w-2xl">
          <span className="text-xs font-bold font-mono tracking-widest text-violet-400 uppercase mb-2">05 / Academics</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">Education History</h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              animate={{ y: [0, -6, 0] }}
              transition={{
                default: { duration: 0.6, delay: idx * 0.1, ease: 'easeOut' },
                y: {
                  repeat: Infinity,
                  duration: 5 + idx * 1.5, // slightly offset durations to prevent synchrony
                  ease: 'easeInOut',
                },
              }}
              className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md relative overflow-hidden group hover:border-violet-500/20 transition-all duration-300"
            >
              {/* Backlight glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/5 to-fuchsia-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-300">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-violet-300 transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-semibold text-zinc-400 mt-1">{edu.institution}</p>
                </div>
              </div>

              {/* Timeline / Location meta */}
              <div className="flex flex-wrap items-center gap-4 mt-6 text-xs font-mono text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-violet-400" />
                  <span>{edu.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-violet-400" />
                  <span>{edu.location}</span>
                </div>
              </div>

              {/* Highlights/Coursework */}
              {edu.highlights.length > 0 && (
                <div className="mt-6 pt-6 border-t border-white/5 flex flex-col gap-3">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 uppercase flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> Core Curriculum & Focus
                  </span>
                  <ul className="flex flex-col gap-2">
                    {edu.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-zinc-400 leading-relaxed font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400/80 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
