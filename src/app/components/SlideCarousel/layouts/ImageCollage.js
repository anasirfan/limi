'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ImageCollage layout component
 * Displays multiple overlapping images with configurable text positioning
 */
export default function ImageCollage({ slide }) {
  const { media, text, appearance } = slide;
  const [hoveredImage, setHoveredImage] = useState(null);
  const [images, setImages] = useState([]);
  
  // Set up enhanced theme-based styling with the same structure as other components
  const themeStyles = {
    charleston: {
      bg: '#2B2D2F', // Charleston Green
      text: '#FFFFFF',
      accent: '#50C878', // Emerald
      secondaryAccent: '#93cfa2',
      gradient: 'linear-gradient(135deg, #2B2D2F 0%, #3a3c3e 100%)',
      buttonGradient: 'linear-gradient(to right, #50C878, #93cfa2)',
      shadow: '0 4px 12px rgba(80, 200, 120, 0.2)',
      borderRadius: '0.5rem',
      headingStyle: 'font-bold tracking-tight',
      bulletStyle: 'rounded-full bg-[#50C878]',
      textShadow: 'none',
      cardStyle: 'border-l-4 border-[#50C878]',
      animation: 'fade-in-up',
    },
    emerald: {
      bg: '#50C878', // Emerald
      text: '#2B2D2F', // Charleston Green
      accent: '#FFFFFF',
      secondaryAccent: '#e6e6e6',
      gradient: 'linear-gradient(135deg, #50C878 0%, #93cfa2 100%)',
      buttonGradient: 'linear-gradient(to right, #2B2D2F, #3a3c3e)',
      shadow: '0 4px 12px rgba(43, 45, 47, 0.2)',
      borderRadius: '1rem',
      headingStyle: 'font-bold italic',
      bulletStyle: 'rounded-full bg-white',
      textShadow: '0 1px 2px rgba(0,0,0,0.1)',
      cardStyle: 'border-b-4 border-white',
      animation: 'slide-in-right',
    },
    eton: {
      bg: '#87CEAB', // Eton Blue
      text: '#2B2D2F', // Charleston Green
      accent: '#FFFFFF',
      secondaryAccent: '#e6e6e6',
      gradient: 'linear-gradient(135deg, #87CEAB 0%, #a9dbc4 100%)',
      buttonGradient: 'linear-gradient(to right, #2B2D2F, #3a3c3e)',
      shadow: '0 4px 12px rgba(135, 206, 171, 0.3)',
      borderRadius: '0.75rem',
      headingStyle: 'font-medium tracking-wide',
      bulletStyle: 'rounded-sm bg-white',
      textShadow: 'none',
      cardStyle: 'border-r-4 border-white',
      animation: 'fade-in-left',
    },
    beige: {
      bg: '#F2F0E6', // Alabaster/Soft Beige
      text: '#2B2D2F', // Charleston Green
      accent: '#50C878', // Emerald
      secondaryAccent: '#93cfa2',
      gradient: 'linear-gradient(135deg, #F2F0E6 0%, #e6e4da 100%)',
      buttonGradient: 'linear-gradient(to right, #50C878, #93cfa2)',
      shadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      borderRadius: '0.25rem',
      headingStyle: 'font-bold tracking-normal',
      bulletStyle: 'rounded-full bg-[#50C878]',
      textShadow: 'none',
      cardStyle: 'border-t-4 border-[#50C878]',
      animation: 'slide-in-up',
    },
  };
  
  const theme = themeStyles[appearance.theme] || themeStyles.charleston;
  
  // Get text position from media position property
  const textPosition = media.position || 'left';
  const isTextLeft = textPosition === 'left' || textPosition === 'bottom-left' || textPosition === 'top-left';
  const isTextOverlap = textPosition === 'overlap' || textPosition.includes('overlap');
  
  // Define animation keyframes based on theme
  const animationClass = {
    'fade-in-up': 'animate-fadeInUp',
    'fade-in-left': 'animate-fadeInLeft',
    'slide-in-right': 'animate-slideInRight',
    'slide-in-up': 'animate-slideInUp',
  }[theme.animation] || '';
  
  // Calculate positions for overlapping images based on the number of images
  useEffect(() => {
    if (!media.urls || media.urls.length === 0) return;
    
    // Filter out empty URLs and limit to max 6 images for better display
    const validUrls = media.urls.filter(url => url && url.trim() !== '').slice(0, 6);
    if (validUrls.length === 0) return;
    
    const imagePositions = [];
    
    // Set fixed size of 350x350 pixels for each image box
    const boxSize = '350px';
    
    // Different layout patterns based on number of images - using zig-zag pattern as specified
    if (validUrls.length === 1) {
      // Single image - left side
      imagePositions.push({
        url: validUrls[0],
        top: '10%',
        left: '5%',
        width: boxSize,
        height: boxSize,
        zIndex: 3,
        rotate: '0deg'
      });
    } else if (validUrls.length === 2) {
      // Two images - zig-zag arrangement
      const positions = [
        { top: '5%', left: '5%', width: boxSize, height: boxSize, zIndex: 3, rotate: '-1deg' },  // First image on left
        { top: '25%', left: '40%', width: boxSize, height: boxSize, zIndex: 2, rotate: '1deg' },   // Second image on right
      ];
      
      validUrls.forEach((url, index) => {
        imagePositions.push({
          url,
          ...positions[index]
        });
      });
    } else if (validUrls.length === 3) {
      // Three images - zig-zag arrangement
      const positions = [
        { top: '5%', left: '5%', width: boxSize, height: boxSize, zIndex: 3, rotate: '-1deg' },   // First image on left
        { top: '25%', left: '40%', width: boxSize, height: boxSize, zIndex: 2, rotate: '1deg' },    // Second image on right
        { top: '45%', left: '5%', width: boxSize, height: boxSize, zIndex: 4, rotate: '-1deg' },    // Third image on left
      ];
      
      validUrls.forEach((url, index) => {
        imagePositions.push({
          url,
          ...positions[index]
        });
      });
    } else {
      // Four or more images - zig-zag pattern as specified
      const positions = [
        // First image - left
        { top: '5%', left: '5%', width: boxSize, height: boxSize, zIndex: 4, rotate: '-1deg' },
        // Second image - right
        { top: '25%', left: '40%', width: boxSize, height: boxSize, zIndex: 3, rotate: '1deg' },
        // Third image - left
        { top: '45%', left: '5%', width: boxSize, height: boxSize, zIndex: 2, rotate: '-1deg' },
        // Fourth image - right
        { top: '65%', left: '40%', width: boxSize, height: boxSize, zIndex: 1, rotate: '1deg' },
      ];
      
      // Handle more than 4 images by adding them in a zig-zag pattern
      const allPositions = [...positions];
      
      // If we have more than 4 images, add positions for them
      if (validUrls.length > 4) {
        for (let i = 4; i < validUrls.length; i++) {
          const isLeft = i % 2 === 0;
          const row = Math.floor(i / 2);
          allPositions.push({
            top: `${(row * 20) + 5}%`,
            left: isLeft ? '5%' : '40%',
            width: boxSize,
            height: boxSize,
            zIndex: 4 - (i % 4),
            rotate: isLeft ? '-1deg' : '1deg'
          });
        }
      }
      
      // Use only as many positions as we have URLs, up to the first 6
      const positionsToUse = allPositions.slice(0, Math.min(validUrls.length, 6));
      
      validUrls.forEach((url, index) => {
        if (index < positionsToUse.length) {
          imagePositions.push({
            url,
            ...positionsToUse[index]
          });
        }
      });
    }
    
    setImages(imagePositions);
  }, [media.urls]);
  
  // Function to determine text position based on the selected position
  const getTextPositionStyles = () => {
    const baseStyles = {
      zIndex: 10,
      maxWidth: textPosition === 'overlap' ? '80%' : '40%', // Changed from 50% to 40% as requested
    };

    // Determine position-specific styles
    switch (textPosition) {
      case 'top-left':
        return { ...baseStyles, top: '8%', left: '8%' };
      case 'top-center':
        return { ...baseStyles, top: '8%', left: '50%', transform: 'translateX(-50%)' };
      case 'top-right':
        return { ...baseStyles, top: '8%', right: '8%', textAlign: 'right' };
      case 'bottom-left':
        return { ...baseStyles, bottom: '8%', left: '8%' };
      case 'bottom-center':
        return { ...baseStyles, bottom: '8%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' };
      case 'bottom-right':
        return { ...baseStyles, bottom: '8%', right: '8%', textAlign: 'right' };
      case 'overlap':
        return { 
          ...baseStyles, 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          padding: '1.5rem',
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          borderRadius: '0.5rem',
        };
      default:
        return { ...baseStyles, bottom: '8%', left: '8%' };
    }
  };
  
  // Function to get CSS classes for text positioning
  const getTextPositionClasses = () => {
    switch (textPosition) {
      case 'top-left':
        return 'justify-start items-start';
      case 'top-center':
        return 'justify-start items-center text-center';
      case 'top-right':
        return 'justify-start items-end text-right';
      case 'bottom-left':
        return 'justify-end items-start';
      case 'bottom-center':
        return 'justify-end items-center text-center';
      case 'bottom-right':
        return 'justify-end items-end text-right';
      case 'overlap':
        return 'justify-center items-center text-center';
      default:
        return 'justify-start items-start';
    }
  };

  // Function to get text color based on position and theme
  const getTextColor = () => {
    // For overlap position, always use white for better contrast
    if (textPosition === 'overlap') {
      return '#FFFFFF';
    }
    return theme.text;
  };

  return (
    <div 
      className={`relative flex flex-col md:flex-row h-full w-full overflow-hidden ${animationClass}`}
      style={{ 
        background: appearance.backgroundColor || theme.gradient,
        padding: appearance.padding || '0',
        borderRadius: theme.borderRadius,
        boxShadow: theme.shadow,
      }}
    >
      {/* Image Collage Section - Full width with overlapping images */}
      <div className="relative w-full h-64 md:h-full overflow-hidden">
        {/* Container for overlapping images */}
        <div className="relative w-full h-full">
          <AnimatePresence>
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="absolute shadow-xl overflow-hidden"
                style={{
                  width: image.width,
                  height: image.height,
                  top: image.top,
                  left: image.left,
                  zIndex: hoveredImage === index ? 10 : image.zIndex,
                  borderRadius: theme.borderRadius,
                  boxShadow: theme.shadow,
                  transform: `rotate(${image.rotate})`,
                }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ 
                  scale: hoveredImage === index ? 1.08 : 1,
                  opacity: 1,
                  rotate: hoveredImage === index ? '0deg' : image.rotate,
                  boxShadow: hoveredImage === index ? '0 10px 25px rgba(0,0,0,0.3)' : theme.shadow,
                  transition: { duration: 0.4 }
                }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 300, 
                  damping: 20,
                  delay: index * 0.1
                }}
                onMouseEnter={() => setHoveredImage(index)}
                onMouseLeave={() => setHoveredImage(null)}
                whileHover={{ scale: 1.08, zIndex: 10, boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.98, rotate: '0deg' }}
              >
                <Image
                  src={image.url}
                  alt={`${text.heading || 'Collage'} - image ${index + 1}`}
                  fill
                  className="object-cover transition-all duration-700 hover:scale-110 filter hover:brightness-110 hover:contrast-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2} // Prioritize loading first two images
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Optional overlay */}
        {appearance.overlayDarken && (
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10 transition-opacity duration-300"
            style={{ backdropFilter: 'blur(1px)' }}
          ></div>
        )}
      </div>
      
      {/* Text Section - Positioned based on textPosition */}
      <motion.div 
        className={`absolute md:w-2/5 flex flex-col p-6 md:p-8 z-20 ${getTextPositionClasses()}`}
        style={{
          top: textPosition.includes('top') ? '0' : textPosition.includes('bottom') ? 'auto' : '0',
          bottom: textPosition.includes('bottom') ? '0' : 'auto',
          left: isTextLeft ? '0' : 'auto',
          right: !isTextLeft ? '0' : 'auto',
          background: isTextOverlap ? 'rgba(43, 45, 47, 0.85)' : 'rgba(43, 45, 47, 0.75)',
          backdropFilter: 'blur(8px)',
          borderRadius: theme.borderRadius,
          color: '#FFFFFF',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          height: textPosition.includes('top') || textPosition.includes('bottom') ? 'auto' : '100%',
          border: `1px solid ${theme.accent}30`,
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        }}
        initial={{ opacity: 0, x: isTextLeft ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)', borderColor: `${theme.accent}50` }}
      >
        <div className={theme.cardStyle ? `p-4 ${theme.cardStyle}` : 'p-4'}>
          {/* Subheading with theme-specific styling */}
          {text.showSubheading && text.subheading && (
            <motion.h3 
              className={`text-lg md:text-xl font-medium mb-2 transition-all duration-300 hover:translate-y-[-2px]`}
              style={{ 
                color: theme.accent,
                textShadow: isTextOverlap ? '0 2px 4px rgba(0,0,0,0.5)' : theme.textShadow,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {text.subheading}
            </motion.h3>
          )}
          
          {/* Heading with theme-specific styling */}
          {text.showHeading && (
            <motion.h2 
              className={`text-2xl md:text-3xl lg:text-4xl mb-4 transition-all duration-300 hover:translate-y-[-2px] ${theme.headingStyle}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {text.heading}
            </motion.h2>
          )}
          
          {/* Body text with theme-specific styling */}
          {text.showBody && (
            <motion.div 
              className="text-base md:text-lg leading-relaxed"
              style={{ 
                color: getTextColor(),
                textShadow: isTextOverlap ? '0 1px 2px rgba(0,0,0,0.7)' : 'none',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              dangerouslySetInnerHTML={{ __html: text.body }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
