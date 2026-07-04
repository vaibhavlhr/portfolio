'use client';

import { useEffect, useState } from 'react';
import ThreeCanvas from './ThreeCanvas';

export default function ThreeBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 bg-[#030014] -z-10" />;
  }

  return <ThreeCanvas />;
}
