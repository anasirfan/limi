'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function ProductImageGallery({ images, productName, currentImageIndex, setCurrentImageIndex }) {
  const [isLoading, setIsLoading] = useState(true);
  
  const handlePrevImage = () => {
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };
  
  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-square bg-[#1e1e1e] rounded-lg overflow-hidden">
        {images && images.length > 0 ? (
          <>
            <Image
              src={images[currentImageIndex] || '/images/products/placeholder.jpg'}
              alt={`${productName} - Image ${currentImageIndex + 1}`}
              fill
              className="object-contain"
              onLoadingComplete={() => setIsLoading(false)}
            />
            
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
