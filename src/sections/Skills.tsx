'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import TiltCard from '@/components/TiltCard';
import SkillSphere from '@/components/SkillSphere';
import { skillsList } from '@/constants/portfolioData';
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiDocker,
} from 'react-icons/si';

// Map icon names to Simple Icons components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  html: SiHtml5,
  css: SiCss,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  nodejs: SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  mysql: SiMysql,
  tailwind: SiTailwindcss,
  git: SiGit,
  github: SiGithub,
  docker: SiDocker,
};

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });

  // Custom animation colors for cards depending on the skill category
  const getGlowColor = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'rgba(6, 182, 212, 0.2)'; // Cyan
      case 'backend':
        return 'rgba(34, 197, 94, 0.2)'; // Green
      case 'database':
        return 'rgba(234, 179, 8, 0.2)'; // Yellow
      case 'languages':
        return 'rgba(168, 85, 247, 0.2)'; // Purple
      default:
        return 'rgba(139, 92, 246, 0.2)'; // Violet
    }
  };

  const getIconColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'html': return 'text-orange-500';
      case 'css': return 'text-blue-500';
      case 'javascript': return 'text-yellow-400';
      case 'typescript': return 'text-blue-400';
      case 'react': return 'text-cyan-400';
      case 'next.js': return 'text-white';
      case 'node.js': return 'text-green-500';
      case 'express': return 'text-zinc-300';
      case 'mongodb': return 'text-green-400';
      case 'mysql': return 'text-blue-300';
      case 'tailwind': return 'text-cyan-300';
      case 'git': return 'text-orange-600';
      case 'github': return 'text-white';
      case 'docker': return 'text-blue-500';
      default: return 'text-violet-400';
    }
  };

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden border-t border-white/5 bg-black/20">
      {/* Background decoration */}
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary-theme/5 blur-[120px] rounded-full pointer-events-none transition-colors duration-500" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col mb-16 max-w-2xl">
          <span className="text-xs font-bold font-mono tracking-widest text-primary-theme uppercase mb-2">02 / Technical stack</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">Skills & WebGL Sandbox</h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-primary-theme to-secondary-theme rounded-full" />
        </div>

        {/* Split Showcase Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Grid: Skill cards (60% width) */}
          <div
            ref={containerRef}
            className="w-full lg:w-[60%] grid grid-cols-2 sm:grid-cols-3 gap-5 order-2 lg:order-1"
          >
            {skillsList.map((skill, idx) => {
              const IconComponent = iconMap[skill.icon] || SiReact;
              const glowColor = getGlowColor(skill.category);
              const iconColor = getIconColor(skill.name);
              const cardId = `skill-card-${skill.name.toLowerCase().replace(/\./g, '-')}`;

              return (
                <motion.div
                  key={skill.name}
                  id={cardId}
                  initial={{ opacity: 0, y: 25 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.04, ease: 'easeOut' }}
                  className="transition-all duration-300 rounded-2xl"
                >
                  <TiltCard glowColor={glowColor} className="h-40 p-5 flex flex-col justify-between group overflow-hidden border border-white/5">
                    <div className="flex justify-between items-start">
                      {/* Glowing Icon */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary-theme/10 blur-md rounded-full pointer-events-none" />
                        <IconComponent
                          className={`w-9 h-9 transition-transform duration-500 group-hover:rotate-12 ${iconColor} relative z-10`}
                        />
                      </div>
                      {/* Proficiency Tag */}
                      <span className="text-xs font-mono text-zinc-500 group-hover:text-primary-theme transition-colors font-medium">
                        {skill.proficiency}%
                      </span>
                    </div>

                    {/* Name and category info */}
                    <div className="mt-2">
                      <h3 className="text-sm font-semibold text-white tracking-wide">{skill.name}</h3>
                      <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5">
                        {skill.category}
                      </p>
                    </div>

                    {/* Progress bar animation */}
                    <div className="w-full h-1 bg-white/5 rounded-full mt-3 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary-theme to-secondary-theme rounded-full"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.proficiency}%` } : {}}
                        transition={{ duration: 1, delay: 0.2 + idx * 0.04, ease: 'easeOut' }}
                      />
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>

          {/* Right Grid: 3D interactive cloud sphere (40% width) */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center items-center order-1 lg:order-2 border border-white/5 rounded-3xl bg-white/[0.01] p-4 glass">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
              Interactive 3D Cloud
            </span>
            <span className="text-[9px] font-mono text-zinc-600 text-center max-w-[200px] mb-4">
              Drag to spin. Hover to scale. Click to navigate.
            </span>
            <SkillSphere />
          </div>
        </div>
      </div>
    </section>
  );
}
