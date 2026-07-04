import React, { createContext, useContext, useState, useEffect } from 'react';

export type PortfolioTheme = 'cosmos' | 'cyberpunk' | 'matrix';

interface ThemeConfig {
  theme: PortfolioTheme;
  setTheme: (t: PortfolioTheme) => void;
  // WebGL Controls
  particleColor: string;
  setParticleColor: (c: string) => void;
  particleSpeed: number;
  setParticleSpeed: (s: number) => void;
  blobScale: number;
  setBlobScale: (sc: number) => void;
  wireframe: boolean;
  setWireframe: (w: boolean) => void;
  particleCount: number;
  setParticleCount: (count: number) => void;
}

const ThemeConfigContext = createContext<ThemeConfig | undefined>(undefined);

// Theme default colors helper
const getThemeColors = (theme: PortfolioTheme) => {
  switch (theme) {
    case 'cyberpunk':
      return {
        particleColor: '#06b6d4', // Cyan
      };
    case 'matrix':
      return {
        particleColor: '#10b981', // Emerald
      };
    case 'cosmos':
    default:
      return {
        particleColor: '#a78bfa', // Violet
      };
  }
};

export const ThemeConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<PortfolioTheme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('portfolio-theme') as PortfolioTheme) || 'cosmos';
    }
    return 'cosmos';
  });

  const [particleColor, setParticleColor] = useState('#a78bfa');
  const [particleSpeed, setParticleSpeed] = useState(1.0);
  const [blobScale, setBlobScale] = useState(1.6);
  const [wireframe, setWireframe] = useState(true);
  const [particleCount, setParticleCount] = useState(1500);

  // Set theme attributes on HTML element & save to localStorage
  const setTheme = (newTheme: PortfolioTheme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-theme', newTheme);
    }
  };

  // Sync HTML data attribute and default WebGL colors when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const defaults = getThemeColors(theme);
    setParticleColor(defaults.particleColor);
  }, [theme]);

  return (
    <ThemeConfigContext.Provider
      value={{
        theme,
        setTheme,
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
      }}
    >
      {children}
    </ThemeConfigContext.Provider>
  );
};

export const useThemeConfig = () => {
  const context = useContext(ThemeConfigContext);
  if (!context) {
    throw new Error('useThemeConfig must be used within a ThemeConfigProvider');
  }
  return context;
};
