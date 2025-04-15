'use client';

import { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaUndo } from 'react-icons/fa';

/*
 * This component is currently commented out and will be fully implemented later.
 * It provides a placeholder for 360-degree product visualization.
 * When implemented, it will use Three.js or a similar library for 3D rendering.
 */

export default function Product360View({ productModel, productName }) {
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [lastAngle, setLastAngle] = useState(0);
  
  // Animation frame reference for auto-rotation
  const animationRef = useRef(null);
  
  // Auto-rotation function
  const autoRotate = () => {
    setCurrentAngle((prevAngle) => (prevAngle + 1) % 360);
    animationRef.current = requestAnimationFrame(autoRotate);
  };
  
  // Toggle auto-rotation
  const togglePlay = () => {
    if (isPlaying) {
      cancelAnimationFrame(animationRef.current);
    } else {
      animationRef.current = requestAnimationFrame(autoRotate);
    }
    setIsPlaying(!isPlaying);
  };
  
  // Reset to initial position
  const resetPosition = () => {
    setCurrentAngle(0);
    if (isPlaying) {
      cancelAnimationFrame(animationRef.current);
      setIsPlaying(false);
    }
  };
  
  // Handle mouse/touch interactions
  const handleMouseDown = (e) => {
    if (isPlaying) {
      cancelAnimationFrame(animationRef.current);
      setIsPlaying(false);
    }
    
    setIsDragging(true);
    setStartX(e.clientX || e.touches[0].clientX);
    setLastAngle(currentAngle);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    if (!x) return;
    
    const containerWidth = containerRef.current.offsetWidth;
    const deltaX = x - startX;
    const deltaAngle = (deltaX / containerWidth) * 180; // 180 degrees per container width
    
    let newAngle = (lastAngle + deltaAngle) % 360;
    if (newAngle < 0) newAngle += 360;
    
    setCurrentAngle(newAngle);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Add event listeners for mouse/touch interactions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleTouchStart = (e) => handleMouseDown(e);
    const handleTouchMove = (e) => handleMouseMove(e);
    const handleTouchEnd = () => handleMouseUp();
    
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, startX, lastAngle]);
  
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-white mb-4">360° View</h3>
      
      <div 
        ref={containerRef}
        className="relative aspect-square bg-[#1e1e1e] rounded-lg overflow-hidden cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Placeholder for 3D model - will be replaced with actual 3D renderer */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400 mb-2">360° view will be available soon</p>
            <div className="w-32 h-32 mx-auto border-4 border-dashed border-gray-600 rounded-full flex items-center justify-center">
              <span className="transform rotate-[{currentAngle}deg] block">
                {productName.charAt(0)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
          <button
            onClick={togglePlay}
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label={isPlaying ? "Pause rotation" : "Start rotation"}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button
            onClick={resetPosition}
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Reset position"
          >
            <FaUndo />
          </button>
        </div>
      </div>
    </div>
  );
}
