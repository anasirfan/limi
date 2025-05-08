'use client';
import { useRef, useEffect } from 'react';

/**
 * VideoBackground layout component
 * Displays a video as the background with text content overlaid
 */
export default function VideoBackground({ slide }) {
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
      text: '#FFFFFF',
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
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Auto-play prevented:', error);
      });
    }
  }, []);
  
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        src={media.urls[0]}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted
        playsInline
      />
      
      {/* Overlay for better text visibility */}
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundColor: appearance.overlayDarken 
            ? 'rgba(0, 0, 0, 0.5)' 
            : 'rgba(0, 0, 0, 0.2)',
        }}
      ></div>
      
      {/* Text Content */}
      <div 
        className={`relative z-10 h-full w-full flex flex-col justify-center items-center p-8 ${
          text.verticalPosition === 'top' ? 'justify-start' :
          text.verticalPosition === 'bottom' ? 'justify-end' : 'justify-center'
        }`}
        style={{ 
          color: theme.text,
          padding: appearance.padding || '2rem',
        }}
      >
        <div className={`max-w-2xl text-center ${
          text.alignment === 'left' ? 'text-left self-start' :
          text.alignment === 'right' ? 'text-right self-end' : 'text-center'
        }`}>
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
            {text.heading}
          </h2>
          
          {/* Description */}
          {text.description && (
            <p className="text-base md:text-xl mb-6 drop-shadow-md">
              {text.description}
            </p>
          )}
          
          {/* Bullets */}
          {text.showBullets && text.bullets && text.bullets.length > 0 && (
            <ul className={`space-y-2 mb-6 ${
              text.alignment === 'center' ? 'mx-auto' : ''
            }`}>
              {text.bullets.map((bullet, index) => (
                <li 
                  key={index}
                  className="flex items-center drop-shadow-md"
                >
                  <span 
                    className="w-2 h-2 rounded-full mr-2 flex-shrink-0"
                    style={{ backgroundColor: theme.accent }}
                  ></span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
