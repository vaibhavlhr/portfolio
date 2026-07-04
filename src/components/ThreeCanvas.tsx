'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useThemeConfig } from '../context/ThemeConfigContext';

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const { particleColor, particleSpeed, particleCount } = useThemeConfig();

  // Create particle positions dynamically based on count
  const [positions, setPositions] = useState(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 15;
    }
    return pos;
  });

  // Re-generate positions if particleCount changes
  useEffect(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 15;
    }
    setPositions(pos);
  }, [particleCount]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.005 * particleSpeed;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.008 * particleSpeed;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={particleColor}
        size={0.035}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

function MorphingBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useThree((state) => state.pointer);
  const { particleColor, particleSpeed, blobScale, wireframe } = useThemeConfig();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = time * 0.05 * particleSpeed;
      meshRef.current.rotation.y = time * 0.08 * particleSpeed;
      
      // Morphs shape
      const scale = blobScale + Math.sin(time * 1.5) * 0.08;
      meshRef.current.scale.set(scale, scale, scale);

      // Follows mouse position slightly
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.x * 1.8, 0.04);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.y * 1.8, 0.04);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 3]} />
      <meshPhysicalMaterial
        color={particleColor}
        roughness={0.15}
        metalness={0.85}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        wireframe={wireframe}
        transparent
        opacity={wireframe ? 0.35 : 0.65}
      />
    </mesh>
  );
}

function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const mouse = useThree((state) => state.pointer);
  const { particleColor } = useThemeConfig();

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = mouse.x * 6;
      lightRef.current.position.y = mouse.y * 6;
    }
  });

  return <pointLight ref={lightRef} distance={10} intensity={8} color={particleColor} />;
}

export default function ThreeCanvas() {
  const { theme, particleColor } = useThemeConfig();

  // Determine ambient intensity and gradient overlays based on active theme
  const gradientColor = 
    theme === 'cyberpunk' ? 'from-cyan-500/10' : 
    theme === 'matrix' ? 'from-emerald-500/10' : 
    'from-violet-500/10';

  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
      {/* Background radial gradient */}
      <div className={`absolute inset-0 bg-radial-gradient ${gradientColor} via-transparent to-transparent opacity-70 pointer-events-none`} />
      
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={theme === 'matrix' ? 0.25 : 0.4} />
        <directionalLight position={[5, 5, 2]} intensity={2.5} color={particleColor} />
        <directionalLight 
          position={[-5, -5, -2]} 
          intensity={0.8} 
          color={theme === 'cyberpunk' ? '#f43f5e' : theme === 'matrix' ? '#14b8a6' : '#ec4899'} 
        />
        <MouseLight />
        <Particles />
        <MorphingBlob />
      </Canvas>
    </div>
  );
}
