'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [hovered, setHovered] = useState<boolean>(false);
  const [clickActive, setClickActive] = useState<boolean>(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Position of the mouse
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring settings for smooth trailing
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorSpringX = useSpring(cursorX, springConfig);
  const cursorSpringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('clickable') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT';

      if (isClickable) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setClickActive(true);
      const newRipple: Ripple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev, newRipple]);
    };

    const handleMouseUp = () => {
      setClickActive(false);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY, isVisible]);

  // Clean up ripples after animation finishes
  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Ring trailing cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-violet-500/60 pointer-events-none z-50 mix-blend-screen"
        style={{
          x: cursorSpringX,
          y: cursorSpringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hovered ? 1.8 : clickActive ? 0.8 : 1,
          backgroundColor: hovered ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0)',
          borderColor: hovered ? 'rgb(167, 139, 250)' : 'rgba(139, 92, 246, 0.6)',
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
      />

      {/* Inner Dot cursor */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-violet-400 rounded-full pointer-events-none z-50"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hovered ? 0.5 : 1,
          backgroundColor: hovered ? '#ffffff' : '#a78bfa',
        }}
      />

      {/* Click Ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="fixed w-10 h-10 -ml-5 -mt-5 rounded-full border-2 border-violet-400/50 pointer-events-none z-50 animate-ping-once"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
    </>
  );
}
