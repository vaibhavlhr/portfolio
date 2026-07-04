'use client';

import { certifications } from '@/constants/portfolioData';
import { Award, Calendar, ExternalLink } from 'lucide-react';

export default function Certifications() {
  // Duplicate certifications multiple times to ensure a continuous scrolling track
  const duplicatedCerts = [
    ...certifications,
    ...certifications,
    ...certifications,
    ...certifications,
    ...certifications,
    ...certifications,
  ];

  return (
    <section id="certifications" className="relative py-20 overflow-hidden border-t border-white/5 bg-black/20">
      <div className="container mx-auto px-6 relative z-10 mb-12">
        {/* Section Heading */}
        <div className="flex flex-col max-w-2xl">
          <span className="text-xs font-bold font-mono tracking-widest text-violet-400 uppercase mb-2">06 / Credentials</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">Certifications</h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
        </div>
      </div>

      {/* Infinite Scrolling Track */}
      <div className="relative w-full overflow-hidden py-4 select-none mask-gradient-x">
        {/* Gradients to fade out the edges of the scrolling area */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#030014] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#030014] to-transparent z-10 pointer-events-none" />

        {/* Flex container that moves */}
        <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused] py-2">
          {duplicatedCerts.map((cert, idx) => (
            <div
              key={`${cert.id}-${idx}`}
              className="w-[280px] sm:w-[360px] p-6 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm flex flex-col justify-between hover:border-violet-500/30 transition-all duration-300 group shrink-0"
            >
              <div>
                {/* Cert Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-300">
                    <Award className="w-5 h-5" />
                  </div>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/10 text-zinc-400 hover:text-white transition-all duration-300"
                    aria-label="View Credential"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Name */}
                <h3 className="text-sm sm:text-base font-bold text-white tracking-wide line-clamp-2 group-hover:text-violet-300 transition-colors">
                  {cert.name}
                </h3>

                {/* Institution */}
                <p className="text-xs font-semibold text-zinc-400 mt-2">{cert.institution}</p>
              </div>

              {/* Footer Meta */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5 text-[10px] font-mono text-zinc-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-violet-400" />
                  <span>{cert.issueDate}</span>
                </div>
                <span>ID: {cert.credentialId}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
