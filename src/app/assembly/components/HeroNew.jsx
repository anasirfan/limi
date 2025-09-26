"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HeroNew = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  // Motion values for smooth animations
  const x = useMotionValue(0);
  const dragProgress = useTransform(x, [-300, 0, 300], [1, 0, -1]);
  
  // Carousel items
  const carouselItems = [
    { text: "Room", segment: [0, 0.25] },
    { text: "Office", segment: [0.25, 0.5] },
    { text: "Restaurant", segment: [0.5, 0.75] },
    { text: "Hotel", segment: [0.75, 1] }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  // Sync video with carousel position
  const syncVideoWithCarousel = useCallback((index, smooth = true) => {
    if (!videoRef.current || !videoLoaded) return;
    
    const video = videoRef.current;
    const targetTime = carouselItems[index].segment[0] * video.duration;
    
    if (smooth) {
      // Smooth video scrubbing animation
      const currentTime = video.currentTime;
      const duration = Math.abs(targetTime - currentTime) * 0.5; // Adjust speed
      
      animate(currentTime, targetTime, {
        duration: Math.min(duration, 1), // Cap at 1 second
        ease: "easeInOut",
        onUpdate: (value) => {
          video.currentTime = value;
        }
      });
    } else {
      video.currentTime = targetTime;
    }
  }, [videoLoaded, carouselItems]);

  // Handle carousel navigation
  const navigateToSlide = (index) => {
    if (index < 0 || index >= carouselItems.length) return;
    
    setCurrentIndex(index);
    syncVideoWithCarousel(index, true);
    
    // Animate carousel position
    animate(x, -index * 100, {
      duration: 0.8,
      ease: "easeInOut"
    });
  };

  // Handle drag end
  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    
    const threshold = 50;
    let newIndex = currentIndex;
    
    if (info.offset.x > threshold && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (info.offset.x < -threshold && currentIndex < carouselItems.length - 1) {
      newIndex = currentIndex + 1;
    }
    
    navigateToSlide(newIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navigateToSlide(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < carouselItems.length - 1) {
        navigateToSlide(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Mouse wheel navigation
  useEffect(() => {
    const handleWheel = (e) => {
      if (!containerRef.current?.contains(e.target)) return;
      
      e.preventDefault();
      
      if (e.deltaX > 10 && currentIndex < carouselItems.length - 1) {
        navigateToSlide(currentIndex + 1);
      } else if (e.deltaX < -10 && currentIndex > 0) {
        navigateToSlide(currentIndex - 1);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [currentIndex]);

  // Initialize video sync
  useEffect(() => {
    if (videoLoaded) {
      syncVideoWithCarousel(currentIndex, false);
    }
  }, [videoLoaded, syncVideoWithCarousel]);

  if (!mounted) return null;

  return (
    <motion.section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black cursor-grab active:cursor-grabbing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          onLoadedData={handleVideoLoad}
          preload="metadata"
        >
          <source src="/limiai/step2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Main Carousel Container */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="relative w-full max-w-6xl mx-auto px-4">
          
          {/* Carousel Items */}
          <motion.div
            className="flex items-center justify-center"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -(carouselItems.length - 1) * 100, right: 0 }}
            dragElastic={0.1}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 0.95 }}
          >
            {carouselItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-full flex items-center justify-center"
                style={{ width: "100vw" }}
              >
                <motion.h1
                  className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black text-white select-none"
                  style={{
                    textShadow: "0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)",
                    letterSpacing: "-0.02em"
                  }}
                  animate={{
                    scale: index === currentIndex ? 1 : 0.8,
                    opacity: index === currentIndex ? 1 : 0.4,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut"
                  }}
                >
                  {item.text}
                </motion.h1>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation Arrows */}
          <motion.button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-20"
            onClick={() => navigateToSlide(currentIndex - 1)}
            disabled={currentIndex === 0}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: videoLoaded ? 1 : 0, x: videoLoaded ? 0 : -20 }}
            transition={{ delay: 1 }}
          >
            <FaChevronLeft className="text-lg" />
          </motion.button>

          <motion.button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-20"
            onClick={() => navigateToSlide(currentIndex + 1)}
            disabled={currentIndex === carouselItems.length - 1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: videoLoaded ? 1 : 0, x: videoLoaded ? 0 : 20 }}
            transition={{ delay: 1 }}
          >
            <FaChevronRight className="text-lg" />
          </motion.button>
        </div>
      </div>

      {/* Progress Indicators */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: videoLoaded ? 1 : 0, y: videoLoaded ? 0 : 20 }}
        transition={{ delay: 1.5 }}
      >
        {carouselItems.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            onClick={() => navigateToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </motion.div>

      {/* Instructions */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: videoLoaded ? 1 : 0, y: videoLoaded ? 0 : -20 }}
        transition={{ delay: 2 }}
      >
        <p className="text-white/70 text-sm font-medium">
          Drag, scroll, or use arrow keys to navigate
        </p>
      </motion.div>

      {/* Loading State */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-30">
          <motion.div
            className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
    </motion.section>
  );
};

export default HeroNew;
