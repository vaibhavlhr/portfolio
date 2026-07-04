'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '@/constants/portfolioData';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    stopAutoplay();
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Cycle every 5s
  };

  const stopAutoplay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const handlePrev = () => {
    stopAutoplay();
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    startAutoplay();
  };

  const handleNext = () => {
    stopAutoplay();
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    startAutoplay();
  };

  return (
    <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden border-t border-white/5 bg-black/40">
      {/* Glow decorations */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col mb-16 max-w-2xl mx-auto text-center items-center">
          <span className="text-xs font-bold font-mono tracking-widest text-violet-400 uppercase mb-2">07 / Endorsements</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">Client & Team Feedback</h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
        </div>

        {/* 3D Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto flex flex-col items-center">
          {/* Main 3D Card Area */}
          <div className="relative w-full min-h-[360px] sm:min-h-[280px] flex items-center justify-center perspective-2000">
            <AnimatePresence mode="popLayout">
              {testimonials.map((test, idx) => {
                // Calculate relative position index in cycle
                let position = 'center';
                if (idx === activeIndex) position = 'center';
                else if ((activeIndex + 1) % testimonials.length === idx) position = 'right';
                else position = 'left';

                const isCenter = position === 'center';
                const isLeft = position === 'left';
                const isRight = position === 'right';

                // Setup 3D rotation & translation depending on position
                const xOffset = isCenter ? 0 : isLeft ? -180 : 180;
                const zOffset = isCenter ? 0 : -200;
                const rotation = isCenter ? 0 : isLeft ? 15 : -15;
                const scale = isCenter ? 1 : 0.85;
                const opacity = isCenter ? 1 : 0.4;
                const zIndex = isCenter ? 30 : 10;

                return (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      x: xOffset,
                      z: zOffset,
                      rotateY: rotation,
                      scale: scale,
                      opacity: opacity,
                      zIndex: zIndex,
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 25,
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      position: isCenter ? 'relative' : 'absolute',
                    }}
                    className="w-full max-w-xl p-8 sm:p-10 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md shadow-2xl flex flex-col justify-between"
                  >
                    <div>
                      {/* Quote Mark / Rating stars */}
                      <div className="flex items-center justify-between mb-6">
                        <Quote className="w-10 h-10 text-violet-500/20" />
                        <div className="flex gap-0.5">
                          {[...Array(test.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <p className="text-zinc-300 text-sm sm:text-base italic leading-relaxed font-light mb-8">
                        &ldquo;{test.content}&rdquo;
                      </p>
                    </div>

                    {/* Author Meta */}
                    <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={test.image}
                        alt={test.name}
                        className="w-12 h-12 rounded-full object-cover border border-violet-500/30"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-wide">{test.name}</h4>
                        <p className="text-xs font-medium text-violet-400 mt-0.5">
                          {test.role} at <span className="text-zinc-400">{test.company}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Slider controls */}
          <div className="flex items-center gap-6 mt-8 relative z-40">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    stopAutoplay();
                    setActiveIndex(idx);
                    startAutoplay();
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? 'bg-violet-400 w-6' : 'bg-white/20'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
