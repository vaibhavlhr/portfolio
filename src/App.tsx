import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import ThreeBackground from '@/components/ThreeBackground';
import Navbar from '@/components/Navbar';
import ThreeControlPanel from '@/components/ThreeControlPanel';
import AdminDashboard from '@/components/AdminDashboard';

import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Projects from '@/sections/Projects';
import Experience from '@/sections/Experience';
import Education from '@/sections/Education';
import Certifications from '@/sections/Certifications';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Check if the current route is the secure admin dashboard
  const isAdminRoute = typeof window !== 'undefined' && window.location.pathname === '/admin';

  // Admin route bypasses standard loading sequences for high-speed admin checks
  if (isAdminRoute) {
    return (
      <>
        {/* Custom cursor trailer */}
        <CustomCursor />
        {/* Immersive interactive 3D background */}
        <ThreeBackground />
        {/* Passcode protected admin interface */}
        <AdminDashboard />
      </>
    );
  }

  return (
    <>
      {/* Immersive Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Portfolio Presentation */}
      {!isLoading && (
        <SmoothScroll>
          {/* Custom Cursor trailer and effects */}
          <CustomCursor />
          
          {/* Full-screen 3D particle canvas */}
          <ThreeBackground />
          
          {/* Floating glass navbar */}
          <Navbar />
          
          {/* Content sections */}
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Certifications />
            <Contact />
          </main>

          {/* Floating WebGL interactive controls */}
          <ThreeControlPanel />

          {/* Minimal premium footer */}
          <Footer />
        </SmoothScroll>
      )}
    </>
  );
}
