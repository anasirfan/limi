"use client";
import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const styles = [
  {
    id: 'coolLux',
    name: 'Cool Lux',
    description: 'Sleek, modern lighting with cool tones and minimalist design.',
    color: '#50C878',
    image: '/images/onboarding/cool-lux.jpg'
  },
  {
    id: 'dreamGlow',
    name: 'DreamGlow',
    description: 'Soft, ambient lighting with warm hues for a cozy atmosphere.',
    color: '#87CEAB',
    image: '/images/onboarding/dream-glow.jpg'
  },
  {
    id: 'shadowHue',
    name: 'ShadowHue',
    description: 'Dramatic lighting with bold contrasts and striking silhouettes.',
    color: '#3da861',
    image: '/images/onboarding/shadow-hue.jpg'
  },
  {
    id: 'zenFlow',
    name: 'ZenFlow',
    description: 'Balanced, harmonious lighting inspired by natural elements.',
    color: '#6ab890',
    image: '/images/onboarding/zen-flow.jpg'
  }
];

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

export default function StepTwo({ selection, onSelect, onNext, onPrevious }) {
  const hasSelection = !!selection;
  const carouselRef = useRef(null);
  
  // These functions are directly called when the buttons are clicked
  const handleNextButtonClick = (e) => {
    // Stop event propagation to prevent any parent elements from capturing the click
    e.stopPropagation();
    // Call the onNext function passed as prop
    onNext();
  };
  
  const handlePreviousButtonClick = (e) => {
    // Stop event propagation to prevent any parent elements from capturing the click
    e.stopPropagation();
    // Call the onPrevious function passed as prop
    onPrevious();
  };
  
  // Scroll the carousel left
  const scrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.85; // Approximately one card width
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };
  
  // Scroll the carousel right
  const scrollRight = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.85; // Approximately one card width
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Choose your vibe</h2>
        <p className="text-[#87CEAB] mb-6">Select a style that matches your aesthetic preferences.</p>
      </motion.div>
      
      {/* Mobile Carousel View */}
      <div className="md:hidden relative">
        {/* Left indicator */}
        {/* <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 rounded-r-lg p-1 z-10 cursor-pointer hover:bg-opacity-50 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button> */}
        
        {/* Right indicator */}
        {/* <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 rounded-l-lg p-1 z-10 cursor-pointer hover:bg-opacity-50 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button> */}
        
        <div ref={carouselRef} className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-3 max-sm:space-x-4 pb-4 max-sm:-mb-6">
          {styles.map((style) => (
            <motion.div
              key={style.id}
              variants={itemVariants}
              className={`flex-none w-[85%] max-sm:w-[75%] snap-center rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                selection === style.id 
                  ? 'ring-3 ring-[#50C878] shadow-[0_0_15px_rgba(80,200,120,0.5)]' 
                  : 'ring-1 ring-transparent'
              }`}
              onClick={() => onSelect(style.id)}
              style={{
                background: `linear-gradient(135deg, #2B2D2F 0%, #3a3d42 100%)`,
              }}
            >
              <div className="p-6 max-sm:p-4 relative z-10">
                <div 
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-xl"
                  style={{ backgroundColor: style.color }}
                ></div>
                
                <div 
                  className="w-16 h-16 max-sm:w-12 max-sm:h-12 rounded-full mb-4 flex items-center justify-center"
                  style={{ 
                    backgroundColor: `${style.color}20`,
                    boxShadow: selection === style.id ? `0 0 20px ${style.color}80` : 'none'
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-full"
                    style={{ backgroundColor: style.color }}
                  ></div>
                </div>
                
                <h3 className="text-xl font-semibold max-sm:text-lg text-white mb-2">{style.name}</h3>
                <p className="text-gray-300 text-sm max-sm:text-xs">{style.description}</p>
                
                {selection === style.id && (
                  <div className="absolute top-4 right-4 bg-[#50C878] rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Desktop Grid Layout */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-4">
        {styles.map((style) => (
          <motion.div
            key={style.id}
            variants={itemVariants}
            className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
              selection === style.id 
                ? 'ring-4 ring-[#50C878] shadow-[0_0_15px_rgba(80,200,120,0.5)]' 
                : 'ring-2 ring-transparent hover:ring-[#87CEAB]'
            }`}
            onClick={() => onSelect(style.id)}
            style={{
              background: `linear-gradient(135deg, #2B2D2F 0%, #3a3d42 100%)`,
            }}
          >
            <div className="p-6 relative z-10">
              <div 
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-xl"
                style={{ backgroundColor: style.color }}
              ></div>
              
              <div 
                className="w-16 h-16 rounded-full mb-4 flex items-center justify-center"
                style={{ 
                  backgroundColor: `${style.color}20`,
                  boxShadow: selection === style.id ? `0 0 20px ${style.color}80` : 'none'
                }}
              >
                <div 
                  className="w-10 h-10 rounded-full"
                  style={{ backgroundColor: style.color }}
                ></div>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">{style.name}</h3>
              <p className="text-gray-300">{style.description}</p>
              
              {selection === style.id && (
                <div className="absolute top-4 right-4 bg-[#50C878] rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            <div 
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{ backgroundColor: style.color }}
            ></div>
          </motion.div>
        ))}
      </div>
      
      <div className="pt-4 flex space-x-4 relative z-50">
        <button
          onClick={handlePreviousButtonClick}
          className="w-1/3 py-4 rounded-lg font-medium text-lg transition-all duration-300 bg-gray-700 text-white hover:bg-gray-600"
        >
          Back
        </button>
        
        <button
          onClick={handleNextButtonClick}
          disabled={!hasSelection}
          className={`w-2/3 py-4 rounded-lg font-medium text-lg transition-all duration-300 ${
            hasSelection 
              ? 'bg-[#50C878] text-white hover:bg-[#3da861]' 
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
}
