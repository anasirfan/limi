'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FaArrowRight, FaChevronDown } from 'react-icons/fa';
import { HiCube } from 'react-icons/hi';
import Link from 'next/link';
import { TractionSection, StrategySection, OpportunitySection, MarketSection, TeamSection, RaisingSection, FinalCTASection } from './sections-light';

const LimiAIPage = () => {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  
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
    <div className="min-h-screen bg-[#f3ebe2] relative overflow-hidden">
      {/* Enhanced Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f3ebe2] via-white/50 to-[#93cfa2]/10" />
        
        {/* Interactive floating blobs */}
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
        
        {/* Additional floating elements */}
        <motion.div
          animate={{
            x: mousePosition.x * 0.005,
            y: mousePosition.y * 0.005,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            x: { type: "spring", stiffness: 30, damping: 40 },
            y: { type: "spring", stiffness: 30, damping: 40 },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-[#93cfa2]/5 to-[#54bb74]/5 rounded-full blur-2xl"
        />
        
        <motion.div
          animate={{
            x: mousePosition.x * -0.003,
            y: mousePosition.y * -0.003,
            rotate: -360,
          }}
          transition={{ 
            x: { type: "spring", stiffness: 40, damping: 50 },
            y: { type: "spring", stiffness: 40, damping: 50 },
            rotate: { duration: 200, repeat: Infinity, ease: "linear" }
          }}
          className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-tl from-[#54bb74]/6 to-[#93cfa2]/6 rounded-full blur-2xl"
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
                <img 
                  src="/images/svgLogos/__Logo_Icon_White.svg" 
                  alt="LIMI Logo" 
                  className="w-16 h-16 relative z-10"
                />
                
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-[Amenti] text-[#292929] leading-[1.1] tracking-tight">
              <span className="block font-[Amenti] font-bold">LIMI: The Trojan Horse</span>
              <span className="block bg-gradient-to-r from-[#54bb74] via-[#93cfa2] to-[#54bb74] bg-clip-text text-transparent font-[Amenti] font-bold">for AI</span>
              <span className="block text-2xl md:text-3xl lg:text-4xl font-[Amenti] font-normal mt-4 text-[#292929]/80">in Every Space</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-xl md:text-2xl text-[#292929]/70 max-w-4xl mx-auto leading-relaxed font-normal tracking-wide"
            >
              LIMI is the modular infrastructure that installs AI into ceilings and walls—starting with the one
              <br className="hidden md:block" />
              <span className="text-[#292929]/50">thing every space already needs: light.</span>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mb-20 flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white rounded-2xl font-medium text-base sm:text-lg overflow-hidden transition-all duration-500 hover:shadow-2xl"
            >
              <span className="relative flex items-center justify-center gap-3 z-10">
                Request Access to Data Room
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaArrowRight />
                </motion.div>
              </span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-4 bg-white/10 backdrop-blur-sm border border-[#54bb74]/30 text-[#292929] rounded-2xl font-medium text-base sm:text-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:bg-white/20"
            >
              <span className="relative flex items-center justify-center gap-3 z-10">
                Book a Meeting With the Founders
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
              className="flex flex-col items-center text-[#292929]/40 space-y-3"
            >
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#292929]/20 to-transparent" />
              <FaChevronDown className="text-sm" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Additional Sections */}
      <TractionSection />
      <StrategySection />
      <OpportunitySection />
      <MarketSection />
      <TeamSection />
      <RaisingSection />
      <FinalCTASection />
    </div>
  );
};

export default LimiAIPage;
