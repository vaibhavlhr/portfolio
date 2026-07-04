'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '@/constants/portfolioData';
import { X, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

interface ProjectModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-hidden">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative w-full max-w-4xl max-h-[85vh] bg-[#0b081a]/95 border border-white/10 rounded-2xl shadow-2xl overflow-y-auto z-10 flex flex-col scrollbar-thin"
          >
            {/* Background glowing blob */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-violet-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer z-20"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hero Image Section */}
            <div className="relative w-full h-[220px] sm:h-[320px] shrink-0 overflow-hidden border-b border-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b081a] via-transparent to-transparent" />
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-8 flex flex-col gap-6">
              {/* Header Title / Date */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs font-mono text-violet-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{project.timeline}</span>
                  </div>
                </div>

                {/* Link Buttons */}
                <div className="flex items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors"
                  >
                    <FaGithub className="w-4 h-4" /> Codebase
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white transition-all shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium font-mono rounded-md border border-violet-500/20 bg-violet-500/5 text-violet-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold font-mono tracking-widest text-zinc-400 uppercase">Overview</h4>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                  {project.longDescription}
                </p>
              </div>

              {/* Key Features */}
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold font-mono tracking-widest text-zinc-400 uppercase">Key Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg border border-white/5 bg-white/[0.02] text-xs sm:text-sm text-zinc-400">
                      <CheckCircle className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
