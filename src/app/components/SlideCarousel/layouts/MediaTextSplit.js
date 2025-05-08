'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';

/**
 * MediaTextSplit layout component
 * Displays media (image or video) on one side and text content on the other
 */
export default function MediaTextSplit({ slide }) {
  const videoRef = useRef(null);
  const { media, text, appearance } = slide;
  
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
  
  // Auto-play video when component mounts
  useEffect(() => {
    if (videoRef.current && media.type === 'video') {
      videoRef.current.play().catch(error => {
        console.log('Auto-play prevented:', error);
      });
    }
  }, [media]);
  
  // Determine layout order based on media position
  const isMediaLeft = media.position === 'left';
  
  return (
    <div 
      className="flex flex-col md:flex-row h-full w-full overflow-hidden"
      style={{ 
        backgroundColor: appearance.backgroundColor || theme.bg,
        padding: appearance.padding || '0',
      }}
    >
      {/* Media Section */}
      <div 
        className={`relative w-full md:w-1/2 h-64 md:h-full overflow-hidden ${
          isMediaLeft ? 'order-1 md:order-1' : 'order-1 md:order-2'
        }`}
      >
        {media.type === 'video' ? (
          <video
            ref={videoRef}
            src={media.urls[0]}
            className="absolute inset-0 w-full h-full object-cover"
            loop
            muted
            playsInline
          />
        ) : (
          <Image
            src={media.urls[0]}
            alt={text.heading}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}
        
        {/* Optional overlay */}
        {appearance.overlayDarken && (
          <div className="absolute inset-0 bg-black/30"></div>
        )}
      </div>
      
      {/* Text Section */}
      <div 
        className={`relative w-full md:w-1/2 flex flex-col justify-center p-8 ${
          isMediaLeft ? 'order-2 md:order-2' : 'order-2 md:order-1'
        } ${
          text.alignment === 'center' ? 'items-center text-center' : 
          text.alignment === 'right' ? 'items-end text-right' : 'items-start text-left'
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
    </div>
  );
}
