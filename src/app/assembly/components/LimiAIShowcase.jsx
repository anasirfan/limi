"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const LimiAIShowcase = ({ onVisible }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userCount, setUserCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animate number counter
  const animateNumber = () => {
    if (isAnimating) return; // Prevent multiple animations
    
    setIsAnimating(true);
    const targetNumber = 156;
    const duration = 1500; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const increment = targetNumber / steps;
    const stepDuration = duration / steps;
    
    let currentNumber = 0;
    const timer = setInterval(() => {
      currentNumber += increment;
      if (currentNumber >= targetNumber) {
        setUserCount(targetNumber);
        clearInterval(timer);
        setIsAnimating(false);
      } else {
        setUserCount(Math.floor(currentNumber));
      }
    }, stepDuration);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          onViewportEnter={onVisible}
        >
          <h2 className="text-5xl md:text-6xl font-black text-[#292929] mb-6 leading-tight">
            LIMI AI{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#54bb74] to-[#93cfa2]">
              EXPERIENCE
            </span>
          </h2>
          <p className="text-xl text-[#666] max-w-3xl mx-auto">
            Discover the power of intelligent automation with our award-winning LIMI AI technology
          </p>
        </motion.div>

        {/* Main Layout: 2 Columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[500px]"
        >
          
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            
            {/* Top Row: 2 cards side by side */}
            <div className="grid grid-cols-2 gap-6 flex-1">
              
              {/* Trusted by card */}
              <motion.div
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                onViewportEnter={animateNumber}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col justify-center h-full">
                  <p className="text-sm opacity-90 mb-2">LIMI AI Powered:</p>
                  <h3 className="text-4xl font-black mb-1">{userCount}K</h3>
                  <p className="text-sm opacity-90">Smart decisions daily</p>
                </div>
              </motion.div>

              {/* Product with speech bubble */}
              <motion.div
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
              >
                <div className="flex flex-col items-center justify-center h-full relative">
                  {/* Speech bubble */}
                  <div className="absolute top-4 left-4 bg-[#54bb74] text-white px-3 py-2 rounded-full text-sm font-medium shadow-md">
                    Learning your preferences...
                    <div className="absolute bottom-[-6px] left-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#54bb74]"></div>
                  </div>
                  
                  {/* Placeholder for device image */}
                  <div className="w-20 h-20 bg-gradient-to-br from-[#292929] to-[#404040] rounded-2xl flex items-center justify-center">
                    <div className="w-10 h-10 bg-[#54bb74] rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Row: Full width 8D Sound Mode */}
            <motion.div
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="bg-[#f8f8f8] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1"
            >
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-4xl md:text-5xl font-black text-green-500 mb-2">LIMI AI</h3>
                  <p className="text-xl md:text-2xl font-bold text-[#292929]">Adaptive Learning Engine</p>
                  <p className="text-sm text-[#666] mt-2">Continuously learns and optimizes your experience</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            
            {/* Large card: Person with rating */}
            <motion.div
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden flex-[3]"
            >
              {/* Background Image */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <Image
                  src="/assemblyImages/baseExploaded.jpg"
                  alt="LIMI AI Base Exploded View"
                  fill
                  className="object-cover"
                />
              </div>
              
          
            </motion.div>

            {/* Clock card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="bg-black rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1"
            >
              <div className="flex flex-col items-center justify-center h-full text-white">
                <div className="text-2xl md:text-3xl font-mono font-bold tracking-wider">
                  {formatTime(currentTime)}
                </div>
             </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default LimiAIShowcase;
