'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useThemeConfig } from '../context/ThemeConfigContext';
import { skillsList } from '../constants/portfolioData';

interface SkillTagProps {
  word: string;
  position: [number, number, number];
  color: string;
}

function SkillTag({ word, position, color }: SkillTagProps) {
  const [hovered, setHovered] = useState(false);
  const textRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }
    return () => {
      if (typeof window !== 'undefined') {
        document.body.style.cursor = 'auto';
      }
    };
  }, [hovered]);

  useFrame((state) => {
    if (textRef.current) {
      // Gentle local float animation for each tag
      const time = state.clock.getElapsedTime();
      textRef.current.position.y = position[1] + Math.sin(time * 1.5 + position[0]) * 0.06;
      textRef.current.scale.setScalar(hovered ? 1.25 : 1);
    }
  });

  const handleClick = () => {
    // Scroll and flash the card corresponding to this skill
    const elementId = `skill-card-${word.toLowerCase().replace('.', '\\.')}`;
    const card = document.getElementById(`skill-card-${word.toLowerCase().replace(/\./g, '-')}`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.add('scale-105', 'shadow-[0_0_20px_rgba(139,92,246,0.35)]', 'border-violet-500');
      setTimeout(() => {
        card.classList.remove('scale-105', 'shadow-[0_0_20px_rgba(139,92,246,0.35)]', 'border-violet-500');
      }, 1500);
    }
  };

  return (
    <Billboard position={position}>
      <Text
        ref={textRef}
        fontSize={0.34}
        color={hovered ? color : '#a1a1aa'}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        {word}
      </Text>
    </Billboard>
  );
}

function Cloud() {
  const groupRef = useRef<THREE.Group>(null);
  const { particleColor } = useThemeConfig();

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth orbit rotation influenced by mouse positions
      const targetRotationY = state.pointer.x * 0.6;
      const targetRotationX = -state.pointer.y * 0.6;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, 
        state.clock.getElapsedTime() * 0.08 + targetRotationY, 
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x, 
        targetRotationX, 
        0.05
      );
    }
  });

  // Spherical Fibonacci lattice distribution
  const tags = skillsList.map((skill, idx) => {
    const k = idx + 0.5;
    const phi = Math.acos(1 - (2 * k) / skillsList.length);
    const theta = Math.PI * (1 + Math.sqrt(5)) * k;
    const radius = 2.8;

    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    return {
      word: skill.name,
      position: [x, y, z] as [number, number, number],
    };
  });

  return (
    <group ref={groupRef}>
      {tags.map((tag) => (
        <SkillTag 
          key={tag.word} 
          word={tag.word} 
          position={tag.position} 
          color={particleColor} 
        />
      ))}
    </group>
  );
}

export default function SkillSphere() {
  return (
    <div className="w-full h-[360px] md:h-[480px] relative select-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Cloud />
      </Canvas>
    </div>
  );
}
