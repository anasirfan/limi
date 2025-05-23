"use client";
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const categories = [
  {
    id: 'ceiling',
    name: 'Ceiling',
    image: '/images/configrenders/ceiling.jpg',
    description: 'Elegant ceiling-mounted lights that hang down into the space.'
  },
  {
    id: 'wall',
    name: 'Wall',
    image: '/images/configrenders/wall.jpg',
    description: 'Space-saving lights that mount directly to your walls.'
  },
  {
    id: 'floor',
    name: 'Floor',
    image: '/images/configrenders/floor.jpg',
    description: 'Freestanding lights that add style and illumination to any room.'
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

export default function StepOne({ selection, onSelect, onNext }) {
  const hasSelection = !!selection;
  const carouselRef = useRef(null);
  
  // This function is directly called when the button is clicked
  const handleNextButtonClick = (e) => {
    // Stop event propagation to prevent any parent elements from capturing the click
    e.stopPropagation();
    // Call the onNext function passed as prop
    onNext();
  };
  
  useEffect(() => {
    if (!hasSelection) {
      onSelect('ceiling');
    }
  }, []);
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
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Which light are you drawn to?</h2>
        <p className="text-[#87CEAB] mb-6">Select the type of lighting that fits your space.</p>
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
        
        <div ref={carouselRef} className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-3 pb-4">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className={`flex-none w-[85%] snap-center rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                selection === category.id 
                  ? 'ring-3 ring-[#50C878] shadow-[0_0_15px_rgba(80,200,120,0.5)]' 
                  : 'ring-1 ring-transparent'
              }`}
              onClick={() => onSelect(category.id)}
            >
              <div className="relative h-32 w-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 85vw, 33vw"
                  className="transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2B2D2F] opacity-70"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                    {selection === category.id && (
                      <div className="bg-[#50C878] rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-300 text-xs mt-1">{category.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="flex flex-col space-y-4">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className={`flex overflow-hidden rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.01] ${
                selection === category.id 
                  ? 'ring-4 ring-[#50C878] shadow-[0_0_15px_rgba(80,200,120,0.5)]' 
                  : 'ring-2 ring-transparent hover:ring-[#87CEAB]'
              }`}
              onClick={() => onSelect(category.id)}
            >
              <div className="relative h-32 w-40 md:h-36 md:w-48 flex-shrink-0">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2B2D2F] opacity-50"></div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col justify-center">
                <div className="flex items-center">
                  <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                  {selection === category.id && (
                    <div className="ml-3 bg-[#50C878] rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-gray-300 text-sm mt-1">{category.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Action Button - Completely separate from the carousel */}
      <div className="pt-4 max-sm:pt-0  relative z-50">
        <button
          onClick={handleNextButtonClick}
          disabled={!hasSelection}
          className={`w-full py-4 rounded-lg font-medium text-lg transition-all duration-300 ${
            hasSelection 
              ? 'bg-[#50C878] text-white hover:bg-[#3da861]' 
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'
          }`}
        >
          Let's Go!
        </button>
      </div>
    </motion.div>
  );
}
