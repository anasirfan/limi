'use client';

import { useEffect, useRef } from 'react';
import ThreeScene from './components/ThreeScene';
import StorySection from './components/StorySection';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ThreeDWebsite() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();

    return () => {
      // Cleanup all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative bg-black h-screen overflow-hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        minHeight: '100vh'
      }}
    >
      {/* Fixed Three.js Canvas Background with Assembly Animation */}
      <ThreeScene 
        autoAssemble={false}  // Set to true for auto-assembly on load
        onAssemble={() => console.log('Assembly completed!')}
      />
    </div>
  );
}
