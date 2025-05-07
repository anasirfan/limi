"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function ConfiguratorPreview({ isVisible = true }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [rotationActive, setRotationActive] = useState(false);
  const [selectedColor, setSelectedColor] = useState('white');
  const modelRef = useRef(null);
  
  // Color options based on LIMI brand colors
  const colors = [
    { name: 'White', value: '#FFFFFF', selected: selectedColor === 'white' },
    { name: 'Black', value: '#2B2D2F', selected: selectedColor === 'black' },
    { name: 'Emerald', value: '#50C878', selected: selectedColor === 'emerald' },
    { name: 'Eton Blue', value: '#87CEAB', selected: selectedColor === 'eton' },
    { name: 'Alabaster', value: '#F2F0E6', selected: selectedColor === 'alabaster' }
  ];
  
  // Toggle rotation animation
  const toggleRotation = () => {
    setRotationActive(!rotationActive);
    
    if (modelRef.current) {
      if (rotationActive) {
        // Stop rotation
        gsap.killTweensOf(modelRef.current);
      } else {
        // Start rotation
        gsap.to(modelRef.current, {
          rotateY: 360,
          duration: 20,
          repeat: -1,
          ease: "none"
        });
      }
    }
  };
  
  // Simulate loading delay
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
    
    return () => clearTimeout(loadTimer);
  }, []);
  
  // Set up rotation animation if active
  useEffect(() => {
    let rotationAnimation;
    if (modelRef.current && rotationActive) {
      rotationAnimation = gsap.to(modelRef.current, {
        rotationY: 360,
        duration: 10,
        repeat: -1,
        ease: 'none'
      });
    }
    
    return () => {
      if (rotationAnimation) rotationAnimation.kill();
    };
  }, [rotationActive]);

  return (
    <motion.div 
      className="bg-[#2B2D2F] rounded-xl overflow-hidden shadow-2xl relative"
      style={{ height: '500px', minHeight: '500px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Loading state */}
      {!isLoaded && isVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#2B2D2F] z-10">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#50C878] border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
            <p className="text-lg text-white">Loading 3D preview...</p>
          </div>
        </div>
      )}
      
      {/* 3D Preview container */}
      <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
        {/* Drag to rotate hint */}
        {isLoaded && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm flex items-center z-10 animate-fadeOut">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 15L19 19M19 19V15M19 19H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 9L5 5M5 5V9M5 5H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Drag to rotate</span>
          </div>
        )}
        
        {/* 3D model placeholder */}
        <div ref={modelRef} className="relative w-64 h-64 transform-gpu">
          {/* Light fixture */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-[#3a3d42] rounded-t-lg"></div>
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-32 bg-[#3a3d42]"></div>
          <div className="absolute top-36 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full bg-[#3a3d42] flex items-center justify-center overflow-hidden">
            <div className="w-24 h-24 rounded-full bg-[#50C878] animate-pulse opacity-70"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1e2022] opacity-30"></div>
          </div>
          
          {/* Light effect */}
          <div className="absolute top-36 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-[#50C878] rounded-full opacity-10 blur-xl animate-pulse"></div>
        </div>
        
        {/* Controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex justify-between items-center">
            {/* Color swatches */}
            <div className="flex space-x-2">
              {colors.map(color => (
                <button 
                  key={color.name}
                  className={`w-8 h-8 rounded-full border-2 ${color.selected ? 'border-[#50C878]' : 'border-transparent hover:border-gray-400'} transition-colors`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                  onClick={() => setSelectedColor(color.name.toLowerCase())}
                />
              ))}
            </div>
            
            {/* Camera controls */}
            <div className="flex space-x-2">
              <button 
                className={`w-10 h-10 ${rotationActive ? 'bg-[#50C878]' : 'bg-[#3a3d42]'} rounded-full flex items-center justify-center hover:bg-[#6ab890] transition-colors`}
                onClick={toggleRotation}
                title={rotationActive ? "Stop rotation" : "Start rotation"}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2"/>
                  <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" stroke="white" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
