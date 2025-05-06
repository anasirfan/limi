"use client";
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Import BlobBackground component
import BlobBackground from './BlobBackground';

const ProductShowcaseWrapper = ({ children }) => {
  // Refs for DOM elements and animations
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  // Initialize ScrollTrigger and Lenis integration
  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    // Create scroll-based animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate section title and subtitle
    tl.fromTo(
      '.showcase-title',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    ).fromTo(
      '.showcase-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: -0.4 }
    );

    // Clean up animations on unmount
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen bg-[#F0F0F0] text-[#292929] overflow-hidden py-16 md:py-24"
    >
      {/* Animated background with blobs */}
      <BlobBackground />
      
      {/* Main content container */}
      <div className="relative z-10">
        <div ref={contentRef} className="container mx-auto px-4">
          {/* Section header - moved to ProductShowcase component */}
          
          {/* Children components will be rendered here */}
          <div className="relative">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseWrapper;
