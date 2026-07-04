import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeConfig } from '../context/ThemeConfigContext';
import { Sliders, X, RefreshCw, Eye, EyeOff } from 'lucide-react';

const colorPresets = [
  { name: 'Violet', value: '#a78bfa' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Indigo', value: '#6366f1' },
];

export default function ThreeControlPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    particleColor,
    setParticleColor,
    particleSpeed,
    setParticleSpeed,
    blobScale,
    setBlobScale,
    wireframe,
    setWireframe,
    particleCount,
    setParticleCount,
    theme,
  } = useThemeConfig();

  // Reset to theme defaults
  const handleReset = () => {
    setParticleSpeed(1.0);
    setBlobScale(1.6);
    setWireframe(true);
    setParticleCount(1500);
    if (theme === 'cyberpunk') setParticleColor('#06b6d4');
    else if (theme === 'matrix') setParticleColor('#10b981');
    else setParticleColor('#a78bfa');
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 select-none font-sans">
      <AnimatePresence>
        {!isOpen ? (
          /* Floating Minimize Button Trigger */
          <motion.button
            key="trigger"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center p-3 rounded-full border border-white/10 bg-black/60 hover:bg-black/80 text-white backdrop-blur-md shadow-lg transition-colors cursor-pointer group"
            title="Open 3D Sandbox Controls"
          >
            <Sliders className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out text-[10px] font-mono tracking-wider uppercase pl-0 group-hover:pl-2 text-zinc-300 font-semibold">
              WebGL Sandbox
            </span>
          </motion.button>
        ) : (
          /* Glassmorphic settings panel */
          <motion.div
            key="panel"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="w-[280px] p-5 rounded-2xl border border-white/10 bg-black/85 backdrop-blur-xl shadow-2xl flex flex-col gap-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  3D WebGL Sandbox
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="p-1 rounded hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Reset to defaults"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Controllers */}
            <div className="flex flex-col gap-4">
              {/* Particle Speed */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                  <span>Particle Speed</span>
                  <span className="text-white font-medium">{particleSpeed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="3.0"
                  step="0.1"
                  value={particleSpeed}
                  onChange={(e) => setParticleSpeed(parseFloat(e.target.value))}
                  className="w-full accent-violet-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Particle Count */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                  <span>Particle Count</span>
                  <span className="text-white font-medium">{particleCount}</span>
                </div>
                <input
                  type="range"
                  min="250"
                  max="3000"
                  step="250"
                  value={particleCount}
                  onChange={(e) => setParticleCount(parseInt(e.target.value))}
                  className="w-full accent-violet-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Mesh Shape Scale */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                  <span>Object Scale</span>
                  <span className="text-white font-medium">{blobScale.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.1"
                  value={blobScale}
                  onChange={(e) => setBlobScale(parseFloat(e.target.value))}
                  className="w-full accent-violet-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Wireframe toggle */}
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 border-t border-white/5 pt-3">
                <span>Mesh Wireframe</span>
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                    wireframe
                      ? 'border-violet-500/30 bg-violet-500/10 text-violet-300'
                      : 'border-white/10 bg-white/5 text-zinc-400'
                  }`}
                >
                  {wireframe ? (
                    <>
                      <Eye className="w-3 h-3" />
                      <span>ON</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3" />
                      <span>OFF</span>
                    </>
                  )}
                </button>
              </div>

              {/* Color Presets */}
              <div className="flex flex-col gap-2 border-t border-white/5 pt-3">
                <span className="text-[10px] font-mono text-zinc-400">Glow Colors</span>
                <div className="grid grid-cols-6 gap-2">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => setParticleColor(preset.value)}
                      className={`w-6 h-6 rounded-full border transition-transform cursor-pointer relative flex items-center justify-center ${
                        particleColor.toLowerCase() === preset.value.toLowerCase()
                          ? 'border-white scale-110 shadow-lg'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: preset.value }}
                      title={preset.name}
                    >
                      {particleColor.toLowerCase() === preset.value.toLowerCase() && (
                        <span className="w-1.5 h-1.5 rounded-full bg-black/40" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
