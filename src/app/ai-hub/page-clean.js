'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { FaBrain, FaEye, FaHome, FaLightbulb, FaArrowRight, FaPlay, FaChevronDown } from 'react-icons/fa';
import { HiSparkles, HiCube, HiLightningBolt } from 'react-icons/hi';
import Link from 'next/link';
import { IntelligenceSection, ExperienceSection, FutureSection } from './sections';

const AIHubPage = () => {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  
  // Advanced scroll transforms
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
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f3ebe2] via-white/50 to-[#93cfa2]/10" />
        
        {/* Floating Orbs */}
        <motion.div
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
          className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-[#54bb74]/8 to-[#93cfa2]/8 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            x: mousePosition.x * -0.015,
            y: mousePosition.y * -0.015,
            rotate: 360,
          }}
          transition={{ 
            x: { type: "spring", stiffness: 50, damping: 30 },
            y: { type: "spring", stiffness: 50, damping: 30 },
            rotate: { duration: 60, repeat: Infinity, ease: "linear" }
          }}
          className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-gradient-to-l from-[#292929]/5 to-[#54bb74]/8 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center px-6 lg:px-12"
      >
        <div className="relative z-10 text-center max-w-7xl mx-auto">
          {/* Ambient AI Icon */}
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
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative inline-block"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-[#54bb74] via-[#93cfa2] to-[#54bb74] rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <FaBrain className="text-5xl text-white relative z-10" />
                
                {/* Pulsing Ring */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 border-2 border-[#54bb74]/30 rounded-3xl"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Typography */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="space-y-8 mb-16"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-[#292929] leading-[0.9] tracking-tight">
              <span className="block font-serif italic text-[#292929]/90">AI Hub</span>
              <span className="block text-4xl md:text-5xl lg:text-6xl font-normal mt-4 text-[#292929]/70">for your</span>
              <span className="block bg-gradient-to-r from-[#54bb74] via-[#93cfa2] to-[#54bb74] bg-clip-text text-transparent font-medium">favorite space</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-xl md:text-2xl text-[#292929]/70 max-w-4xl mx-auto leading-relaxed font-light tracking-wide"
            >
              Where artificial intelligence meets physical reality.
              <br className="hidden md:block" />
              <span className="text-[#292929]/50">Adaptive environments that understand, anticipate, and evolve.</span>
            </motion.p>
          </motion.div>

          {/* Refined CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-12 py-5 bg-[#292929] text-white rounded-2xl font-medium text-lg overflow-hidden transition-all duration-500 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center gap-3 z-10">
                Experience the Future
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
              className="group px-12 py-5 bg-white/40 backdrop-blur-xl text-[#292929] rounded-2xl font-medium text-lg border border-[#292929]/10 hover:bg-white/60 transition-all duration-500"
            >
              <span className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#54bb74] rounded-full animate-pulse" />
                Watch Demo
              </span>
            </motion.button>
          </motion.div>

          {/* Elegant Scroll Indicator */}
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

      {/* Sections */}
      <VisionSection />
      <IntelligenceSection />
      <ExperienceSection />
      <FutureSection />
    </div>
  );
};

// Vision Section - Premium storytelling
const VisionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll();
  const sectionY = useTransform(scrollYProgress, [0.1, 0.4], [50, -30]);

  return (
    <motion.section
      ref={ref}
      style={{ y: sectionY }}
      className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-[#f3ebe2] to-white/80"
    >
      {/* Section Divider */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[#292929]/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 1.2, delay: 0.2, type: "spring", stiffness: 100 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="inline-flex items-center gap-3 px-4 py-2 bg-[#54bb74]/10 rounded-full border border-[#54bb74]/20"
              >
                <div className="w-2 h-2 bg-[#54bb74] rounded-full animate-pulse" />
                <span className="text-sm font-medium text-[#292929]/80 tracking-wide">THE VISION</span>
              </motion.div>
              
              <h2 className="text-5xl md:text-6xl font-light text-[#292929] leading-[1.1] tracking-tight">
                <span className="font-serif italic text-[#292929]/90">Beyond</span>
                <br />
                <span className="font-medium">smart lighting</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-[#292929]/70 font-light">
                LIMI's AI Hub represents our evolution into comprehensive intelligent environments. 
                We're pioneering a future where artificial intelligence seamlessly integrates with physical spaces.
              </p>
              
              <p className="text-[#292929]/60 font-light">
                From AI-driven personalization to predictive automation, we're building the foundation 
                for spaces that understand, anticipate, and evolve with your life.
              </p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-4"
            >
              <button className="group flex items-center gap-3 text-[#292929]/80 hover:text-[#54bb74] transition-colors duration-300">
                <span className="font-medium tracking-wide">Explore the technology</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaArrowRight className="text-sm" />
                </motion.div>
              </button>
            </motion.div>
          </motion.div>
          
          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 60 }}
            animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.9, x: 60 }}
            transition={{ duration: 1.2, delay: 0.6, type: "spring", stiffness: 100 }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-square relative">
              {/* Ambient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#54bb74]/5 via-white/50 to-[#93cfa2]/5 rounded-[3rem] backdrop-blur-xl border border-white/30" />
              
              {/* Content */}
              <div className="absolute inset-8 flex flex-col items-center justify-center text-center space-y-6">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="w-24 h-24 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-2xl flex items-center justify-center shadow-xl"
                >
                  <HiSparkles className="text-3xl text-white" />
                </motion.div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-medium text-[#292929]/80">Intelligent Environment</h3>
                  <p className="text-sm text-[#292929]/50 leading-relaxed">
                    Adaptive systems that learn and evolve with your lifestyle patterns
                  </p>
                </div>
                
                {/* Floating Elements */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{ 
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.7
                    }}
                    className={`absolute w-2 h-2 bg-[#54bb74]/40 rounded-full ${
                      i === 0 ? 'top-16 left-16' : i === 1 ? 'bottom-20 right-12' : 'top-24 right-20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AIHubPage;
