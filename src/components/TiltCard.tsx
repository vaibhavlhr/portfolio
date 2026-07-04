'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function TiltCard({ children, className = '', glowColor = 'rgba(139,92,246,0.3)' }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tilt angles
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid tilt transitions
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(y, springConfig);
  const rotateY = useSpring(x, springConfig);

  // Map mouse positions to rotational angles
  const rX = useTransform(rotateX, [-0.5, 0.5], [15, -15]);
  const rY = useTransform(rotateY, [-0.5, 0.5], [-15, 15]);

  // Glow position tracking
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  // Unconditional hook call at top level to satisfy Rules of Hooks
  const glowBackground = useTransform(
    [glowX, glowY],
    ([xVal, yVal]) => `radial-gradient(140px circle at ${xVal}px ${yVal}px, ${glowColor}, transparent 80%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative mouse coordinates from -0.5 to 0.5
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(relativeX);
    y.set(relativeY);

    // Glow position within the card (px)
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 w-full h-full"
    >
      <motion.div
        style={{
          rotateX: rX,
          rotateY: rY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative w-full h-full rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md transition-shadow duration-300 ${
          isHovered ? 'shadow-[0_15px_40px_rgba(0,0,0,0.5)] border-white/20' : 'shadow-none'
        } ${className}`}
      >
        {/* Spot Light Radial Glow effect */}
        <motion.div
          className="absolute -inset-px rounded-2xl pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background: glowBackground,
            opacity: isHovered ? 0.7 : 0,
          }}
        />

        {/* Animated Gradient Border */}
        {isHovered && (
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 opacity-30 blur-[1px] pointer-events-none -z-10" />
        )}

        {/* Inner Content */}
        <div style={{ transform: 'translateZ(20px)' }} className="w-full h-full relative z-20">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
