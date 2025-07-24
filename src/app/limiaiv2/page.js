'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FaArrowRight, FaChevronDown } from 'react-icons/fa';
import { HiCube } from 'react-icons/hi';
import Link from 'next/link';
import { DynamicTractionSection, DynamicStrategySection, DynamicOpportunitySection, DynamicTeamSection, DynamicFinalCTASection } from '../limiai/sections-seamless';

const LimiAIPage = () => {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  
  // Dynamic theme based on scroll
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ['#292929', '#f3ebe2', '#292929', '#f3ebe2', '#292929', '#f3ebe2']
  );
  
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ['#ffffff', '#292929', '#ffffff', '#292929', '#ffffff', '#292929']
  );
  
  const textColorSecondary = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ['rgba(255,255,255,0.7)', 'rgba(41,41,41,0.7)', 'rgba(255,255,255,0.7)', 'rgba(41,41,41,0.7)', 'rgba(255,255,255,0.7)', 'rgba(41,41,41,0.7)']
  );
  
  const scrollIndicatorColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ['rgba(255,255,255,0.4)', 'rgba(41,41,41,0.4)', 'rgba(255,255,255,0.4)', 'rgba(41,41,41,0.4)', 'rgba(255,255,255,0.4)', 'rgba(41,41,41,0.4)']
  );
  
  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div 
      style={{ backgroundColor }}
      className="min-h-screen relative overflow-hidden transition-colors duration-1000"
    >
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: mousePosition.x * 0.01,
            y: mousePosition.y * 0.01,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
          className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-[#54bb74]/10 to-[#93cfa2]/10 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            x: mousePosition.x * -0.008,
            y: mousePosition.y * -0.008,
            rotate: 360,
          }}
          transition={{ 
            x: { type: "spring", stiffness: 50, damping: 30 },
            y: { type: "spring", stiffness: 50, damping: 30 },
            rotate: { duration: 120, repeat: Infinity, ease: "linear" }
          }}
          className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-gradient-to-l from-[#54bb74]/8 to-[#93cfa2]/8 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center px-6 lg:px-12"
      >
        <div className="relative z-10 text-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 100 }}
            className="mb-16"
          >
            <motion.div
              animate={{ 
                y: [-8, 8, -8],
                rotateY: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative inline-block"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-[#54bb74] via-[#93cfa2] to-[#54bb74] rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <HiCube className="text-5xl text-white relative z-10" />
                
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 border-2 border-[#54bb74]/40 rounded-3xl"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="space-y-8 mb-16"
          >
            <motion.h1 
              style={{ color: textColor }}
              className="text-4xl md:text-6xl lg:text-7xl font-[Amenti] leading-[1.1] tracking-tight"
            >
              <span className="block font-[Amenti] font-bold">Building the</span>
              <span className="block bg-gradient-to-r from-[#54bb74] via-[#93cfa2] to-[#54bb74] bg-clip-text text-transparent font-[Amenti] font-bold">OS</span>
              <motion.span 
                style={{ color: textColorSecondary }}
                className="block text-2xl md:text-3xl lg:text-4xl font-[Amenti] font-normal mt-4"
              >
                for the Physical World
              </motion.span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              style={{ color: textColorSecondary }}
              className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-normal tracking-wide"
            >
              LIMI is the ambient AI infrastructure platform that connects deep intelligence 
              <br className="hidden md:block" />
              <span className="opacity-70">to the spaces where we live and work.</span>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mb-20"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-12 py-5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white rounded-2xl font-medium text-lg overflow-hidden transition-all duration-500 hover:shadow-2xl"
            >
              <span className="relative flex items-center gap-3 z-10">
                View Our Thesis
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaArrowRight />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: scrollIndicatorColor }}
              className="flex flex-col items-center space-y-3"
            >
              <motion.div 
                style={{ 
                  background: `linear-gradient(to bottom, transparent, ${scrollIndicatorColor}, transparent)` 
                }}
                className="w-px h-16"
              />
              <FaChevronDown className="text-sm" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Dynamic Sections */}
      <DynamicTractionSection />
      <DynamicStrategySection />
      <DynamicOpportunitySection />
      <DynamicTeamSection />
      <DynamicFinalCTASection />
    </motion.div>
  );
};

export default LimiAIPage;
