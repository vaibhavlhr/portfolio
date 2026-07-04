'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/constants/portfolioData';
import TiltCard from '@/components/TiltCard';
import ProjectModal from '@/components/ProjectModal';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden border-t border-white/5 bg-black/40">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col mb-16 max-w-2xl">
          <span className="text-xs font-bold font-mono tracking-widest text-violet-400 uppercase mb-2">03 / Case Studies</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">Featured Projects</h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
            >
              <TiltCard glowColor="rgba(167, 139, 250, 0.15)" className="overflow-hidden flex flex-col h-[480px]">
                {/* Project Image */}
                <div
                  className="relative w-full h-[220px] overflow-hidden cursor-pointer group"
                  onClick={() => handleOpenModal(project)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 opacity-90 group-hover:opacity-100" />
                  
                  {/* View Details Hover Text */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0">
                    <span className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-violet-600/90 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                      Explore Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] font-mono font-medium rounded border border-white/5 bg-white/[0.03] text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-0.5 text-[10px] font-mono font-medium rounded border border-white/5 bg-white/[0.03] text-zinc-400">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className="text-lg font-bold text-white tracking-wide hover:text-violet-400 transition-colors cursor-pointer"
                      onClick={() => handleOpenModal(project)}
                    >
                      {project.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed line-clamp-3 font-light">
                      {project.description}
                    </p>
                  </div>

                  {/* Actions footer */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-4">
                    {/* Codebase Link */}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-400 hover:text-white transition-colors"
                    >
                      <FaGithub className="w-4 h-4" /> CODEBASE
                    </a>

                    {/* Live Demo Link */}
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-400 hover:text-violet-400 transition-colors"
                    >
                      LIVE PREVIEW <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
