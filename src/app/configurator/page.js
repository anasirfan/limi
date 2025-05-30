'use client';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
  const headerRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Apply custom header styling for configurator page only
    if (headerRef.current) {
      const header = document.querySelector('header');
      if (header) {
        // Save original styles to restore on unmount
        const originalBg = header.style.background;
        const originalBackdrop = header.querySelector('.absolute')?.style.backdropFilter;

        // Apply solid Charleston Green background
        header.style.background = '#232B2B';
        const backdropElement = header.querySelector('.absolute');
        if (backdropElement) {
          backdropElement.style.backdropFilter = 'none';
          backdropElement.style.backgroundColor = '#232B2B';
        }

        // Restore original styles on unmount
        return () => {
          header.style.background = originalBg;
          if (backdropElement) {
            backdropElement.style.backdropFilter = originalBackdrop;
            backdropElement.style.backgroundColor = '';
          }
        };
      }
    }

    // Add keyboard shortcut for toggling fullscreen mode
    const handleKeyDown = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        setIsFullScreen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main className="min-h-screen" ref={headerRef}>
      {!isFullScreen && <Header />}
      
      <div className="h-screen">
        {USE_NEW_CONFIGURATOR ? (
          <ConfiguratorLayout />
        ) : (
          <LightConfigurator />
        )}
      </div>
      
      {!isFullScreen && <Footer />}
    </main>
  );
}
