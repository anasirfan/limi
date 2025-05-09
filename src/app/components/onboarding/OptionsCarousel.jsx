"use client";
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function OptionsCarousel({ options, selectedId, onSelect, children }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Handle automatic scrolling when an option is selected
  useEffect(() => {
    if (selectedId) {
      const selectedIndex = options.findIndex(option => option.id === selectedId);
      if (selectedIndex !== -1) {
        setCurrentIndex(selectedIndex);
      }
    }
  }, [selectedId, options]);

  // Handle manual scrolling with touch/mouse
  const handleMouseDown = (e) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollToOption = (index) => {
    if (!carouselRef.current) return;
    const optionWidth = carouselRef.current.scrollWidth / options.length;
    carouselRef.current.scrollTo({
      left: optionWidth * index,
      behavior: 'smooth'
    });
    setCurrentIndex(index);
  };

  return (
    <div className="w-full space-y-4">
      {/* Mobile View */}
      <div className="md:hidden">
        {/* Mobile Carousel */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
        >
          {options.map((option, index) => (
            <div 
              key={option.id}
              className={`flex-none w-[85%] snap-center mx-2 first:ml-0 last:mr-0 rounded-xl overflow-hidden transition-all duration-300 ${
                selectedId === option.id 
                  ? 'ring-3 ring-[#50C878] shadow-[0_0_15px_rgba(80,200,120,0.5)]' 
                  : 'ring-1 ring-transparent'
              }`}
              onClick={() => {
                onSelect(option.id);
                scrollToOption(index);
              }}
            >
              <div className="relative h-32 w-full">
                <Image
                  src={option.image}
                  alt={option.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 85vw, 33vw"
                  className="transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2B2D2F] opacity-70"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">{option.name}</h3>
                    {selectedId === option.id && (
                      <div className="bg-[#50C878] rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-300 text-xs mt-1">{option.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile Carousel Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {options.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-[#50C878] w-4' : 'bg-gray-400'
              }`}
              onClick={() => scrollToOption(index)}
            />
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex md:flex-col md:space-y-4">
        {options.map((option) => (
          <motion.div
            key={option.id}
            className={`flex overflow-hidden rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.01] ${
              selectedId === option.id 
                ? 'ring-4 ring-[#50C878] shadow-[0_0_15px_rgba(80,200,120,0.5)]' 
                : 'ring-2 ring-transparent hover:ring-[#87CEAB]'
            }`}
            onClick={() => onSelect(option.id)}
          >
            <div className="relative h-32 w-40 md:h-36 md:w-48 flex-shrink-0">
              <Image
                src={option.image}
                alt={option.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2B2D2F] opacity-50"></div>
            </div>
            
            <div className="p-4 flex-1 flex flex-col justify-center">
              <div className="flex items-center">
                <h3 className="text-xl font-semibold text-white">{option.name}</h3>
                {selectedId === option.id && (
                  <div className="ml-3 bg-[#50C878] rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-gray-300 text-sm mt-1">{option.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons - Separate from carousel for better click handling */}
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
}
