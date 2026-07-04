'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const intervalTime = 20; // 20ms update interval
    const totalSteps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentProgress = Math.min(Math.round((step / totalSteps) * 100), 100);
      setProgress(currentProgress);

      if (step >= totalSteps) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 500); // Wait 500ms before fading out
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#030014] flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Background glowing blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-fuchsia-600/5 blur-[160px] rounded-full pointer-events-none" />

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-xs w-full px-6">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-500 to-indigo-500 font-mono mb-8 relative font-sans tracking-normal"
        >
          vaibhav.dev
          {/* Subtle scanning line effect */}
          <motion.div
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
            className="absolute left-0 right-0 h-[2px] bg-violet-400/50 shadow-[0_0_10px_#a78bfa] pointer-events-none"
          />
        </motion.div>

        {/* Numeric Progress Counter */}
        <div className="font-mono text-5xl sm:text-6xl font-extrabold text-white/90 mb-4 tracking-tighter w-full text-center flex items-center justify-center gap-1">
          <motion.span>
            {progress}
          </motion.span>
          <span className="text-violet-400 font-normal text-3xl">%</span>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 rounded-full shadow-[0_0_15px_#8b5cf6]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        {/* Subtitle Status */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-zinc-500 font-mono text-[10px] tracking-widest uppercase mt-6"
        >
          {progress < 40 ? 'Initializing Matrix...' : progress < 80 ? 'Injecting 3D Shaders...' : 'Compiling Assets...'}
        </motion.p>
      </div>
    </div>
  );
}
