"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const LimiAIShowcase = ({ onVisible }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    };

    const observer = new window.IntersectionObserver(handlePlay, { threshold: 0.5 });
    observer.observe(video);

    return () => observer.disconnect();
  }, []);

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
    <section className="relative py-12 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-16 px-4"
          onViewportEnter={onVisible}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#292929] mb-4 md:mb-6 leading-tight">
            LIMI AI{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#54bb74] to-[#93cfa2] block sm:inline">
              EXPERIENCE
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#666] max-w-3xl mx-auto">
            Discover the power of intelligent automation with our award-winning LIMI AI technology
          </p>
        </motion.div>

        {/* Main Layout: 2 Columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 h-auto lg:min-h-[500px]"
        >
          {/* Left Column */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Top Row: 2 cards side by side */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6 flex-1">
              {/* Trusted by card */}
              <motion.div
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                onViewportEnter={animateNumber}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col justify-center h-full">
                  <p className="text-xs sm:text-sm opacity-90 mb-1 sm:mb-2">LIMI AI Powered:</p>
                  <h3 className="text-3xl sm:text-4xl font-black mb-1">{userCount}K</h3>
                  <p className="text-xs sm:text-sm opacity-90">Smart decisions daily</p>
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
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full min-h-[140px] sm:min-h-0"
              >
                <div className="flex flex-col items-center justify-center h-full relative">
                  {/* Speech bubble */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-[#54bb74] text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-[10px] xs:text-xs sm:text-sm font-medium shadow-md max-w-[80%] xs:max-w-none">
                    <span className="truncate">Learning your preferences...</span>
                    <div className="absolute bottom-[-5px] left-4 sm:left-5 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-[#54bb74]"></div>
                  </div>
                  
                  {/* Placeholder for device image */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#292929] to-[#404040] rounded-xl sm:rounded-2xl flex items-center justify-center mt-4 sm:mt-6">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#54bb74] rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Row: Full width LIMI AI Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ 
                scale: 1.01,
                y: -3,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="bg-[#f8f8f8] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex-1"
            >
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-green-500 mb-1 sm:mb-2">LIMI AI</h3>
                  <p className="text-base sm:text-lg md:text-xl font-bold text-[#292929]">Adaptive Learning Engine</p>
                  <p className="text-xs sm:text-sm text-[#666] mt-1 sm:mt-2">Continuously learns and optimizes your experience</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Large card: Video */}
            <motion.div
              variants={cardVariants}
              whileHover={{ 
                scale: 1.01,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="bg-gray-100 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden aspect-video lg:aspect-auto lg:flex-1"
            >
              {/* Video */}
              <div className="w-full h-full">
                <video
                  ref={videoRef}
                  src="/limi_ai_assets/base_animation.mp4"
                  className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                  loop
                  muted
                  playsInline
                />
              </div>
            </motion.div>

            {/* Bottom Right: Time and Date */}
            <motion.div 
              variants={cardVariants}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-[#666] mb-1">Current Time</p>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#292929] mb-1">
                    {formatTime(currentTime)}
                  </div>
                  <p className="text-xs sm:text-sm text-[#666]">
                    {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
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
