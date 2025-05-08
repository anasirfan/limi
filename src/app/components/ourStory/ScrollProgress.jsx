'use client';
import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from './ThemeContext';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });
  
  const { colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Only show progress bar after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      {/* Fixed progress bar at top of screen */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{ 
          scaleX,
          backgroundColor: colors.primary,
          opacity: isVisible ? 1 : 0,
          boxShadow: `0 0 10px ${colors.primary}80`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Floating scroll indicator */}
      <motion.div
        className="fixed bottom-8 right-8 z-50 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
          style={{ 
            backgroundColor: '#1e2022',
            border: `1px solid ${colors.primary}40`,
            boxShadow: `0 4px 12px rgba(0,0,0,0.2), 0 0 0 2px ${colors.primary}20`
          }}
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              scrollToTop();
            }
          }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <motion.path 
              d="M12 22V2M12 2L6 8M12 2L18 8" 
              stroke={colors.primary} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          
          {/* Circular progress indicator */}
          <svg 
            className="absolute inset-0 w-full h-full" 
            viewBox="0 0 100 100"
          >
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={colors.primary}
              strokeWidth="3"
              strokeDasharray="283"
              style={{ 
                strokeDashoffset: scrollYProgress.get() * 283,
                rotate: -90,
                transformOrigin: 'center'
              }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
}
