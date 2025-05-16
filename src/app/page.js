'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * Simple Coming Soon page for LIMI website
 * @returns {JSX.Element} The coming soon page
 */
export default function Home() {
  const [glowIntensity, setGlowIntensity] = useState(0);
  
  // Animation effect for the glow
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity((prev) => {
        // Oscillate between 0 and 1
        return prev >= 1 ? 0 : prev + 0.01;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#2B2D2F] overflow-hidden">
      <div 
        className="relative flex flex-col items-center justify-center text-center p-6 max-w-2xl"
        style={{
          filter: `drop-shadow(0 0 ${10 + glowIntensity * 15}px rgba(80, 200, 120, ${0.3 + glowIntensity * 0.2}))`
        }}
      >
        {/* Logo */}
        <div className="mb-8 relative">
          <Image 
            src="/images/svgLogos/__Logo_Icon_Colored.svg" 
            alt="LIMI Logo" 
            width={120} 
            height={120}
            priority
            className="animate-pulse"
          />
        </div>
        
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          <span className="text-[#50C878]">LIMI</span> is coming soon
        </h1>
        
        {/* Description */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-lg">
          We're crafting a revolutionary lighting experience. 
          Our website is under construction, but we'll be illuminating your world shortly.
        </p>
        
        {/* Animated countdown or teaser */}
        <div className="text-[#87CEAB] text-lg md:text-xl font-medium">
          Lighting Made Limitless
        </div>
      </div>
    </div>
  );
}
