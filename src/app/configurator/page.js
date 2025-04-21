'use client';
import { useEffect } from 'react';
import LightConfigurator from '../components/LightConfigurator';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRef } from 'react';

export default function ConfiguratorPage() {
  const headerRef = useRef(null);

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
  }, []);

  return (
    <main className="min-h-screen" ref={headerRef}>
      <Header />
      <div className="pt-24">
        <LightConfigurator />
      </div>
      <Footer />
    </main>
  );
}
