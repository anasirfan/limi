'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * ImageCollage layout component
 * Displays multiple overlapping images with text content
 */
export default function ImageCollage({ slide }) {
  const { media, text, appearance } = slide;
  const [hoveredImage, setHoveredImage] = useState(null);
  
  // Set up theme-based styling
  const themeStyles = {
    charleston: {
      bg: '#2B2D2F', // Charleston Green
      text: '#FFFFFF',
      accent: '#50C878', // Emerald
    },
    emerald: {
      bg: '#50C878', // Emerald
      text: '#2B2D2F', // Charleston Green
      accent: '#FFFFFF',
    },
    eton: {
      bg: '#87CEAB', // Eton Blue
      text: '#2B2D2F', // Charleston Green
      accent: '#FFFFFF',
    },
    beige: {
      bg: '#F2F0E6', // Alabaster/Soft Beige
      text: '#2B2D2F', // Charleston Green
      accent: '#50C878', // Emerald
    },
  };
  
  const theme = themeStyles[appearance.theme] || themeStyles.charleston;
  
  // Calculate positions for overlapping images
  const getImagePosition = (index) => {
    const positions = [
      { top: '10%', left: '10%', zIndex: 3, rotate: '-5deg' },
      { top: '20%', left: '25%', zIndex: 2, rotate: '3deg' },
      { top: '30%', left: '15%', zIndex: 1, rotate: '-2deg' },
    ];
    
    return positions[index % positions.length];
  };
  
  return (
    <div 
      className="flex flex-col md:flex-row h-full w-full overflow-hidden"
      style={{ 
        backgroundColor: appearance.backgroundColor || theme.bg,
        padding: appearance.padding || '0',
      }}
    >
      {/* Text Section */}
      <div 
        className={`relative w-full md:w-1/2 flex flex-col justify-center p-8 ${
          text.alignment === 'center' ? 'items-center text-center' : 
          text.alignment === 'right' ? 'items-end text-right' : 'items-start text-left'
        } ${
          text.verticalPosition === 'top' ? 'justify-start' :
          text.verticalPosition === 'bottom' ? 'justify-end' : 'justify-center'
        }`}
        style={{ color: theme.text }}
      >
        {/* Subheading */}
        {text.subheading && (
          <h3 
            className="text-lg md:text-xl font-medium mb-2"
            style={{ color: theme.accent }}
          >
            {text.subheading}
          </h3>
        )}
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {text.heading}
        </h2>
        
        {/* Description */}
        {text.description && (
          <p className="text-base md:text-lg mb-6 max-w-md">
            {text.description}
          </p>
        )}
        
        {/* Bullets */}
        {text.showBullets && text.bullets && text.bullets.length > 0 && (
          <ul className="space-y-2 mb-6 max-w-md">
            {text.bullets.map((bullet, index) => (
              <li 
                key={index}
                className="flex items-center"
              >
                <span 
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: theme.accent }}
                ></span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Image Collage Section */}
      <div className="relative w-full md:w-1/2 h-64 md:h-full overflow-hidden">
        {/* Container for overlapping images */}
        <div className="relative w-full h-full">
          {media.urls.map((url, index) => (
            <motion.div
              key={index}
              className="absolute shadow-xl rounded-lg overflow-hidden"
              style={{
                width: '70%',
                height: '70%',
                ...getImagePosition(index),
              }}
              initial={{ scale: 0.95, opacity: 0.9 }}
              animate={{ 
                scale: hoveredImage === index ? 1.05 : 1,
                opacity: hoveredImage === index ? 1 : 0.9,
                zIndex: hoveredImage === index ? 10 : getImagePosition(index).zIndex,
                rotate: hoveredImage === index ? '0deg' : getImagePosition(index).rotate,
              }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setHoveredImage(index)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <Image
                src={url}
                alt={`${text.heading} - image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </motion.div>
          ))}
        </div>
        
        {/* Optional overlay */}
        {appearance.overlayDarken && (
          <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
        )}
      </div>
    </div>
  );
}
