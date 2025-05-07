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
  
  // Helper function to get human-readable names from selections
  const getSelectionName = (key, value) => {
    if (!value) return 'Not selected';
    
    const lookups = {
      lightCategory: {
        pendant: 'Pendant Light',
        wall: 'Wall Light',
        floor: 'Floor Light'
      },
      lightStyle: {
        coolLux: 'Cool Lux',
        dreamGlow: 'DreamGlow',
        shadowHue: 'ShadowHue',
        zenFlow: 'ZenFlow'
      },
      designAesthetic: {
        aesthetic: 'Aesthetic',
        modern: 'Modern',
        industrial: 'Industrial',
        minimal: 'Minimal'
      }
    };
    
    return lookups[key]?.[value] || value;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <canvas 
        ref={confettiCanvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ width: '100%', height: '100%' }}
      />
      
      <motion.div variants={itemVariants} className="text-center">
        <div className="w-20 h-20 bg-[#50C878]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#50C878]" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Congratulations!</h2>
        <p className="text-[#87CEAB] text-xl mb-6">You're now lighting certified!</p>
      </motion.div>
      
      <motion.div variants={itemVariants} className="bg-[#2B2D2F]/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-medium text-white mb-4">Your Lighting Preferences</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Light Type:</span>
            <span className="text-white font-medium">{getSelectionName('lightCategory', selections.lightCategory)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Style:</span>
            <span className="text-white font-medium">{getSelectionName('lightStyle', selections.lightStyle)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Aesthetic:</span>
            <span className="text-white font-medium">{getSelectionName('designAesthetic', selections.designAesthetic)}</span>
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="pt-4 space-y-4">
        <Link 
          href="/configurator" 
          className="block w-full py-4 rounded-lg font-medium text-lg transition-all duration-300 bg-[#50C878] text-white hover:bg-[#3da861] text-center"
          onClick={onComplete}
        >
          Launch Your Configurator
        </Link>
        
        <button
          onClick={onPrevious}
          className="w-full py-3 rounded-lg font-medium transition-all duration-300 bg-transparent text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500"
        >
          Go Back
        </button>
      </motion.div>
    </motion.div>
  );
}
