'use client';

import { motion } from 'framer-motion';
import { experience } from '@/constants/portfolioData';
import { Calendar, MapPin, Briefcase, Award } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden border-t border-white/5 bg-black/20">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col mb-16 max-w-2xl">
          <span className="text-xs font-bold font-mono tracking-widest text-violet-400 uppercase mb-2">04 / Journey</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">Professional Experience</h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Glowing Connector Line */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[2px] bg-gradient-to-b from-violet-500 via-fuchsia-500 to-violet-950/20 -translate-x-[1px]" />

          <div className="flex flex-col gap-12 md:gap-16">
            {experience.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Glowing Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                      className="w-8 h-8 rounded-full border border-violet-400 bg-[#0b081a] flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.6)]"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-violet-300" />
                    </motion.div>
                  </div>

                  {/* Empty Spacer Column for Desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card Column */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                    className="w-full md:w-[45%] pl-10 md:pl-0"
                  >
                    {/* Glass Experience Card */}
                    <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md relative overflow-hidden group hover:border-violet-500/20 transition-all duration-300">
                      {/* Background Hover Glow */}
                      <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-violet-600/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-violet-600/10 transition-colors" />

                      {/* Header details */}
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="px-3 py-1 rounded-full text-[10px] font-semibold font-mono tracking-wider bg-violet-500/10 border border-violet-500/20 text-violet-300">
                            {exp.type}
                          </span>
                          <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{exp.duration}</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-white tracking-wide mt-1">
                          {exp.role}
                        </h3>

                        <div className="flex items-center gap-4 text-xs font-mono font-medium text-zinc-400">
                          <span className="text-violet-400">{exp.company}</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* Short Description */}
                      <p className="text-zinc-400 text-xs sm:text-sm mt-4 leading-relaxed font-light">
                        {exp.description}
                      </p>

                      {/* Responsibilities list */}
                      <div className="mt-4 flex flex-col gap-2 border-t border-white/5 pt-4">
                        {exp.responsibilities.map((resp, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                            <span className="w-1 h-1 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                            <span>{resp}</span>
                          </div>
                        ))}
                      </div>

                      {/* Technologies badges */}
                      <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[9px] font-mono font-semibold rounded border border-violet-500/10 bg-violet-500/[0.02] text-violet-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
