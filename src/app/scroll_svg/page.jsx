'use client';

import { useState, useEffect } from 'react';
import ScrollSVGDemoResponsive from './components/ScrollSVGDemoResponsive';
import ScrollSVGDemoMobile from './components/ScrollSVGDemoMobile';
import ScrollSVGDemoFixed from './components/ScrollSVGDemoFixed';

export default function ScrollSVGPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on mount
    checkMobile();
    setIsLoaded(true);
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show loading or nothing until we determine device type
  if (!isLoaded) {
    return (
      <div style={{ 
        background: '#111', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#f3ebe2'
      }}>
        Loading...
      </div>
    );
  }

  return isMobile ? <ScrollSVGDemoMobile /> : <ScrollSVGDemoFixed />;
}