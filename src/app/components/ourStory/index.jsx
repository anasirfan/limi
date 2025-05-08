'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from './ThemeContext';
import MissionSection from './MissionSection';
import TeamSection from './TeamSection';
import StatsSection from './StatsSection';
import PartnersSection from './PartnersSection';
import CommunitySection from './CommunitySection';
import ThemeToggle from './ThemeToggle';
import ScrollProgress from './ScrollProgress';
import FloatingNav from './FloatingNav';
import SmoothScroll from './SmoothScroll';
import ParallaxBackground from './ParallaxBackground';

function OurStoryContent() {
  const sectionRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const { colors, theme, isTransitioning } = useTheme();
  
  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Simple version for server-side rendering to avoid hydration mismatch
  if (!isMounted) {
    return (
      <section className="relative bg-[#1F1F1F] text-white py-24 overflow-hidden">
        <ScrollProgress />
        <div className="container mx-auto px-4 relative z-10">
          <ThemeToggle />
          <div className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Lighting That Adapts to You</h2>
          </div>
          <div className="mb-24">
            <h3 className="text-3xl font-bold text-center mb-4">The People Behind the Light</h3>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              We're a team of designers, engineers, and dreamers who believe light should be limitless.
            </p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <AnimatePresence mode="wait">
      <motion.section 
        key={theme}
        ref={sectionRef}
        className="relative py-24 overflow-hidden"
        style={{ 
          backgroundColor: colors.background,
          color: colors.text
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Advanced parallax background */}
        <ParallaxBackground />
        {/* Theme transition overlay */}
        {isTransitioning && (
          <motion.div 
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: theme === 'light' ? '#FFFFFF' : '#2B2D2F' }}
          />
        )}
        
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `radial-gradient(circle at 20px 20px, ${colors.primary} 2px, transparent 0)`,
            backgroundSize: '40px 40px',
            opacity: 0.05
          }}></div>
        </div>
        
        {/* Theme toggle button */}
        <ThemeToggle />
        
        {/* Scroll progress indicator */}
        <ScrollProgress />
        
        {/* Floating navigation */}
        <FloatingNav />
        
        {/* Smooth scrolling effect */}
        <SmoothScroll />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Mission Section */}
          <MissionSection />
          
          {/* Team Section */}
          <TeamSection />
          
          {/* Stats Section */}
          <StatsSection />
          
          {/* Partners Section */}
          <PartnersSection />
          
          {/* Community Section */}
          <CommunitySection />
          
          {/* Call to action */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/about-us"
              className="inline-flex items-center px-8 py-4 rounded-lg font-medium text-lg"
              style={{ 
                backgroundColor: colors.primary,
                color: '#FFFFFF'
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 10px 25px -5px ${colors.primary}80`
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Discover Our Full Story</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.a>
            
            <p 
              className="mt-4 text-sm"
              style={{ color: `${colors.text}80` }}
            >
              Learn more about our journey, mission, and the people shaping the future of lighting.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}

export default function OurStory() {
  return (
    <ThemeProvider>
      <OurStoryContent />
    </ThemeProvider>
  );
}
