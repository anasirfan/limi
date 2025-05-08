'use client';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from './ThemeContext';

export default function ParallaxBackground() {
  const { colors, theme } = useTheme();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Create parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, 0.3]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.8, 0.3]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.2]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.9]);
  
  // GSAP-like dynamic import for scroll-triggered animations
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;
    
    const loadGSAP = async () => {
      try {
        // Dynamically import GSAP
        const gsapModule = await import('gsap');
        const scrollTriggerModule = await import('gsap/ScrollTrigger');
        
        const gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.default;
        
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        // Create particle effect
        const particles = document.querySelectorAll('.parallax-particle');
        particles.forEach((particle) => {
          gsap.to(particle, {
            y: () => Math.random() * -100 - 50,
            x: () => (Math.random() - 0.5) * 100,
            opacity: 0,
            duration: 10,
            ease: 'none',
            repeat: -1,
            repeatRefresh: true,
            scrollTrigger: {
              trigger: 'body',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
            },
          });
        });
      } catch (error) {
        console.error('Failed to load GSAP:', error);
      }
    };
    
    loadGSAP();
  }, []);
  
  return (
    <div ref={containerRef} className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Gradient background */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          background: theme === 'light' 
            ? `linear-gradient(to bottom, #FFFFFF 0%, ${colors.background} 100%)` 
            : `linear-gradient(to bottom, #2B2D2F 0%, #1a1a1a 100%)`,
          opacity: opacity1
        }}
      />
      
      {/* Parallax elements */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: y1, scale: scale1 }}
      >
        <div className="absolute w-full h-full opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full" 
            style={{ background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)` }} 
          />
          <div className="absolute top-3/4 right-1/4 w-96 h-96 rounded-full" 
            style={{ background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)` }} 
          />
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute inset-0"
        style={{ y: y2, opacity: opacity2, scale: scale2 }}
      >
        <div className="absolute w-full h-full">
          {/* Create particles */}
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="parallax-particle absolute w-2 h-2 rounded-full"
              style={{ 
                backgroundColor: colors.primary,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3 + 0.1
              }}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Pattern overlay */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: y3 }}
      >
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: `radial-gradient(circle at 20px 20px, ${colors.primary} 2px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </motion.div>
    </div>
  );
}
