"use client";
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function ConfiguratorSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);
  const sliderTrackRef = useRef(null);
  
  // Initialize slider functionality
  useEffect(() => {
    if (!sliderRef.current || !sliderTrackRef.current) return;
    
    const slides = sliderTrackRef.current.children;
    const slideWidth = slides[0].offsetWidth;
    const slideCount = slides.length;
    
    // Set up click handlers for slider navigation
    const handleSlideChange = (index) => {
      setActiveSlide(index);
      gsap.to(sliderTrackRef.current, {
        x: -slideWidth * index,
        duration: 0.8,
        ease: 'power2.out'
      });
    };
    
    // Expose the slide change function to window for external access
    window.changeSlide = handleSlideChange;
    
    // Clean up function
    return () => {
      delete window.changeSlide;
    };
  }, []);

  return (
    <motion.div 
      ref={sliderRef} 
      className="relative w-full overflow-hidden my-16 h-[400px]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div ref={sliderTrackRef} className="flex transition-transform duration-500 h-full">
        {/* Slide 1: Styles */}
        <div className="min-w-full px-6 flex flex-col items-center justify-center">
          <div className="bg-[#2B2D2F] rounded-xl p-8 max-w-2xl w-full">
            <div className="w-16 h-16 bg-[#50C878]/10 rounded-full flex items-center justify-center mb-6 text-[#50C878]">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                <path d="M20 7L12 3L4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 7L12 11L4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 11L12 15L4 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 15L12 19L4 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Choose Your Style</h3>
            <p className="text-gray-300 mb-6">Select from pendant, wall, table, or floor lighting options to match your space perfectly.</p>
            <div className="grid grid-cols-2 gap-4">
              {['Pendant', 'Wall', 'Table', 'Floor'].map(style => (
                <button 
                  key={style}
                  className={`p-3 rounded-lg border ${style === 'Pendant' ? 'border-[#50C878] bg-[#50C878]/10' : 'border-gray-600 hover:border-gray-400'} transition-colors`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Slide 2: Colors */}
        <div className="min-w-full px-6 flex flex-col items-center justify-center">
          <div className="bg-[#2B2D2F] rounded-xl p-8 max-w-2xl w-full">
            <div className="w-16 h-16 bg-[#50C878]/10 rounded-full flex items-center justify-center mb-6 text-[#50C878]">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Select Your Color</h3>
            <p className="text-gray-300 mb-6">Choose the perfect finish to complement your interior design.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { name: 'White', value: '#FFFFFF' },
                { name: 'Black', value: '#2B2D2F' },
                { name: 'Emerald', value: '#50C878' },
                { name: 'Eton Blue', value: '#87CEAB' },
                { name: 'Alabaster', value: '#F2F0E6' }
              ].map(color => (
                <div key={color.name} className="text-center">
                  <button 
                    className={`w-16 h-16 rounded-full border-4 ${color.name === 'White' ? 'border-[#50C878]' : 'border-transparent hover:border-gray-400'} transition-colors`}
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="block mt-2 text-sm text-white">{color.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Slide 3: Size */}
        <div className="min-w-full px-6 flex flex-col items-center justify-center">
          <div className="bg-[#2B2D2F] rounded-xl p-8 max-w-2xl w-full">
            <div className="w-16 h-16 bg-[#50C878]/10 rounded-full flex items-center justify-center mb-6 text-[#50C878]">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                <path d="M21 10H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 6H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 14H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 18H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Choose Your Size</h3>
            <p className="text-gray-300 mb-6">Find the perfect dimensions for your space.</p>
            <div className="flex justify-center gap-6">
              {['S', 'M', 'L', 'XL'].map(size => (
                <button 
                  key={size}
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${size === 'M' ? 'bg-[#50C878] text-white' : 'bg-gray-700 hover:bg-gray-600'} transition-colors`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Slider navigation */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {[0, 1, 2].map(index => (
          <button 
            key={index}
            className={`w-3 h-3 rounded-full ${activeSlide === index ? 'bg-[#50C878]' : 'bg-gray-600'} transition-colors`}
            onClick={() => window.changeSlide && window.changeSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
