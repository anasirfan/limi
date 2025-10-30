'use client';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import with no SSR for the configurator to ensure it only loads on client
const ConfiguratorLayout = dynamic(
  () => import('../components/configurator/ConfiguratorLayout'),
  { ssr: false }
);

// Feature flag to toggle between old and new configurator
const USE_NEW_CONFIGURATOR = true;

// Import the old configurator for fallback
const LightConfigurator = dynamic(
  () => import('../components/LightConfigurator'),
  { ssr: false }
);

export default function ConfiguratorPage() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', checkMobile);
    };

    // Add keyboard shortcut for toggling fullscreen mode
    const handleKeyDown = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        setIsFullScreen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <main className="min-h-screen">
      <div className="h-screen">
        {USE_NEW_CONFIGURATOR ? (
          <ConfiguratorLayout />
        ) : (
          <LightConfigurator />
        )}
      </div>
    </main>
  );
}
