'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
}

export default function Magnetic({ children, range = 50, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const springOptions = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(0, springOptions);
  const y = useSpring(0, springOptions);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < range) {
        // Move toward the mouse pointer
        x.set(distanceX * strength);
        y.set(distanceY * strength);
      } else {
        // Snap back to origin
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const currentRef = ref.current;
    if (currentRef) {
      window.addEventListener('mousemove', handleMouseMove);
      currentRef.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (currentRef) {
        currentRef.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [range, strength, x, y]);

  return (
    <div ref={ref} className="inline-block">
      <motion.div style={{ x, y }}>
        {children}
      </motion.div>
    </div>
  );
}
