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
    
    // Filter out empty URLs and limit to max 4 images
    const validUrls = media.urls.filter(url => url && url.trim() !== '').slice(0, 4);
    if (validUrls.length === 0) return;
    
    const imagePositions = [];
    
    // Different layout patterns based on number of images
    if (validUrls.length === 1) {
      // Single image - centered
      imagePositions.push({
        url: validUrls[0],
        top: '15%',
        left: '10%',
        width: '80%',
        height: '70%',
        zIndex: 3,
        rotate: '0deg'
      });
    } else if (validUrls.length === 2) {
      // Two images - overlapping
      const positions = [
        { top: '15%', left: '10%', width: '70%', height: '65%', zIndex: 3, rotate: '-3deg' },
        { top: '25%', left: '25%', width: '65%', height: '60%', zIndex: 2, rotate: '2deg' },
      ];
      
      validUrls.forEach((url, index) => {
        imagePositions.push({
          url,
          ...positions[index]
        });
      });
    } else if (validUrls.length === 3) {
      // Three images - overlapping triangle
      const positions = [
        { top: '10%', left: '10%', width: '60%', height: '55%', zIndex: 3, rotate: '-3deg' },
        { top: '20%', left: '35%', width: '55%', height: '50%', zIndex: 2, rotate: '2deg' },
        { top: '35%', left: '20%', width: '50%', height: '45%', zIndex: 1, rotate: '-1deg' },
      ];
      
      validUrls.forEach((url, index) => {
        imagePositions.push({
          url,
          ...positions[index]
        });
      });
    } else {
      // Four images - grid pattern with overlaps
      const positions = [
        // Top row
        { top: '5%', left: '5%', width: '45%', height: '40%', zIndex: 4, rotate: '-2deg' },
        { top: '10%', left: '40%', width: '50%', height: '45%', zIndex: 3, rotate: '1deg' },
        // Bottom row
        { top: '40%', left: '15%', width: '45%', height: '40%', zIndex: 2, rotate: '-1deg' },
        { top: '45%', left: '45%', width: '40%', height: '45%', zIndex: 1, rotate: '2deg' },
      ];
      
      validUrls.forEach((url, index) => {
        imagePositions.push({
          url,
          ...positions[index]
        });
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
                  scale: hoveredImage === index ? 1.05 : 1,
                  opacity: hoveredImage === index ? 1 : 0.95,
                  rotate: hoveredImage === index ? '0deg' : image.rotate,
                  transition: { duration: 0.3 }
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
                whileHover={{ scale: 1.05, zIndex: 10 }}
              >
                <Image
                  src={image.url}
                  alt={`${text.heading || 'Collage'} - image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
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
      <div 
        className={`absolute md:w-1/2 flex flex-col p-6 md:p-8 z-20 ${getTextPositionClasses()}`}
        style={{
          top: textPosition.includes('top') ? '0' : textPosition.includes('bottom') ? 'auto' : '0',
          bottom: textPosition.includes('bottom') ? '0' : 'auto',
          left: isTextLeft ? '0' : 'auto',
          right: !isTextLeft ? '0' : 'auto',
          background: isTextOverlap ? 'rgba(0,0,0,0.6)' : 'transparent',
          backdropFilter: isTextOverlap ? 'blur(5px)' : 'none',
          borderRadius: theme.borderRadius,
          color: theme.text,
          textShadow: isTextOverlap ? '0 2px 4px rgba(0,0,0,0.5)' : theme.textShadow,
          height: textPosition.includes('top') || textPosition.includes('bottom') ? 'auto' : '100%',
        }}
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
          
          {/* Description with theme-specific styling */}
          {text.showDescription && text.description && (
            <motion.p 
              className="text-sm md:text-base lg:text-lg mb-6 max-w-md transition-opacity duration-300 hover:opacity-90"
              style={{ lineHeight: '1.6' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {text.description}
            </motion.p>
          )}
          
          {/* Bullets with theme-specific styling */}
          {text.showBullets && text.bullets && text.bullets.length > 0 && (
            <motion.ul 
              className="space-y-3 mb-6 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {text.bullets.map((bullet, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center transition-transform duration-300 hover:translate-x-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                >
                  <span 
                    className={`w-2 h-2 mr-2 transition-all duration-300 ${theme.bulletStyle.includes('bg-') ? theme.bulletStyle : ''}`}
                    style={!theme.bulletStyle.includes('bg-') ? { backgroundColor: theme.accent } : {}}
                  ></span>
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </motion.ul>
          )}
          
          {/* Optional CTA button with theme styling */}
          {text.ctaText && (
            <motion.button
              className="px-6 py-2 mt-2 text-white font-medium transition-all duration-300 hover:scale-105"
              style={{ 
                background: theme.buttonGradient,
                borderRadius: theme.borderRadius,
                boxShadow: theme.shadow,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {text.ctaText}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
