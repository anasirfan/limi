'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function ProductImageGallery({ images, productName, currentImageIndex, setCurrentImageIndex }) {
  const [isLoading, setIsLoading] = useState(true);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const imageRef = useRef(null);
  const zoomFactor = 10; // 2x magnification
  
  // Handle image navigation
  const handlePrevImage = () => {
    setShowMagnifier(false);
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const handleNextImage = () => {
    setShowMagnifier(false);
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  const handleThumbnailClick = (index) => {
    setShowMagnifier(false);
    setCurrentImageIndex(index);
  };
  
  // Handle mouse interactions for zoom
  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    
    // Get the dimensions of the image container
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    
    // Check if cursor is near navigation buttons (20% from edges)
    const edgeThreshold = 0.1;
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    
    // Disable magnifier when near the edges (where navigation buttons are)
    if (relativeX < edgeThreshold || relativeX > (1 - edgeThreshold) || 
        relativeY < edgeThreshold || relativeY > (1 - edgeThreshold)) {
      setShowMagnifier(false);
      return;
    }
    
    // Set the position for the magnifier
    setZoomPosition({
      x: relativeX * 100,
      y: relativeY * 100
    });
    
    setShowMagnifier(true);
  };
  
  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };
  
  return (
    <div className="space-y-4">
      {/* Main image with zoom functionality */}
      <div 
        className="relative aspect-square bg-[#1e1e1e] rounded-lg overflow-hidden cursor-none"
        ref={imageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {images && images.length > 0 ? (
          <>
            <Image
              src={images[currentImageIndex] || '/images/products/placeholder.jpg'}
              alt={`${productName} - Image ${currentImageIndex + 1}`}
              fill
              className="object-contain"
              onLoadingComplete={() => setIsLoading(false)}
              priority
            />
            
            {/* Magnifying glass zoom effect */}
            {showMagnifier && !isLoading && (
              <div 
                className="absolute pointer-events-none border-2 border-[#54BB74] shadow-lg rounded-full overflow-hidden z-10"
                style={{
                  width: '150px',
                  height: '150px',
                  left: `calc(${zoomPosition.x}% - 75px)`,
                  top: `calc(${zoomPosition.y}% - 75px)`,
                  backgroundImage: `url(${images[currentImageIndex] || '/images/products/placeholder.jpg'})`,
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  backgroundSize: `${zoomFactor * 100}%`,
                  backgroundRepeat: 'no-repeat',
                }}
              />
            )}
            
            {/* Image navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Previous image"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Next image"
                >
                  <FaArrowRight />
                </button>
              </>
            )}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e1e]">
                <div className="animate-pulse text-[#54BB74]">Loading...</div>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e1e]">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
      </div>
      
      {/* Thumbnails */}
      {images && images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors ${
                currentImageIndex === index ? 'border-[#54BB74]' : 'border-transparent'
              }`}
            >
              <Image
                src={image || '/images/products/placeholder.jpg'}
                alt={`${productName} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
