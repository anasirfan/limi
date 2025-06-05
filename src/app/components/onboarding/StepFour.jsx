"use client";
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import confetti from 'canvas-confetti';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function StepFour({ selections, onComplete, onPrevious }) {
  // Handle button clicks with explicit event handling
  const handlePreviousButtonClick = (e) => {
    // Stop event propagation to prevent any parent elements from capturing the click
    e.stopPropagation();
    // Call the onPrevious function passed as prop
    onPrevious();
  };
  
  const handleCompleteButtonClick = (e) => {
    // Stop event propagation to prevent any parent elements from capturing the click
    e.stopPropagation();
    // Call the onComplete function passed as prop
    onComplete();
  };
  const confettiCanvasRef = useRef(null);
  
  // Trigger confetti animation when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      
      const randomInRange = (min, max) => {
        return Math.random() * (max - min) + min;
      };
      
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        
        // Launch confetti from random positions
        confetti({
          particleCount: 3,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.1, 0.5) },
          colors: ['#50C878', '#87CEAB', '#3da861', '#F2F0E6', '#FFFFFF'],
          disableForReducedMotion: true
        });
      }, 200);
      
      return () => clearInterval(interval);
    }
  }, []);
  
  // Helper functions to get human-readable names from selections
  
  const getCategoryName = (id) => {
    switch(id) {
      case 'pendant': return 'Pendant Light';
      case 'wall': return 'Wall Light';
      case 'floor': return 'Floor Lamp';
      default: return 'Light';
    }
  };
  
  const getStyleName = (id) => {
    switch(id) {
      case 'coolLux': return 'Cool Lux';
      case 'dreamGlow': return 'DreamGlow';
      case 'shadowHue': return 'ShadowHue';
      case 'zenFlow': return 'ZenFlow';
      default: return 'Style';
    }
  };
  
  const getAestheticName = (id) => {
    switch(id) {
      case 'minimalist': return 'Minimalist';
      case 'industrial': return 'Industrial';
      case 'scandinavian': return 'Scandinavian';
      case 'modern': return 'Modern';
      case 'traditional': return 'Traditional';
      default: return 'Aesthetic';
    }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Perfect! Here's your selection</h2>
        <p className="text-[#87CEAB] mb-6">We'll use these preferences to create your ideal lighting solution.</p>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <div className="bg-[#3a3d42] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">Your Selections</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Light Type:</span>
              <span className="text-white font-medium">{getCategoryName(selections.lightCategory)}</span>
            </div>
            
            <div className="h-px bg-gray-700"></div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Light Style:</span>
              <span className="text-white font-medium">{getStyleName(selections.lightStyle)}</span>
            </div>
            
            <div className="h-px bg-gray-700"></div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Design Aesthetic:</span>
              <span className="text-white font-medium">{getAestheticName(selections.designAesthetic)}</span>
            </div>
          </div>
        </div>
        
        <div className="py-4 flex space-x-3 relative z-50">
          <button
            onClick={handlePreviousButtonClick}
            className="w-1/3 py-2 rounded-lg font-medium text-base transition-all duration-300 bg-gray-700 text-white hover:bg-gray-600"
          >
            Back
          </button>
          
          <Link 
            href="/configurator" 
            className="block w-2/3 py-2 rounded-lg font-medium text-base transition-all duration-300 bg-[#50C878] text-white hover:bg-[#3da861] text-center"
            onClick={handleCompleteButtonClick}
          >
            Launch Your Configurator
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
