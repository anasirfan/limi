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
  
  // Set up theme-based styling with enhanced visual effects
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
  
  // Define animation keyframes based on theme
  const animationClass = {
    'fade-in-up': 'animate-fadeInUp',
    'fade-in-left': 'animate-fadeInLeft',
    'slide-in-right': 'animate-slideInRight',
    'slide-in-up': 'animate-slideInUp',
  }[theme.animation] || '';

  return (
    <div 
      className={`flex flex-col md:flex-row h-full w-full overflow-hidden transition-all duration-500 ease-in-out ${animationClass}`}
      style={{ 
        background: appearance.backgroundColor || theme.gradient,
        padding: appearance.padding || '0',
        borderRadius: theme.borderRadius,
        boxShadow: theme.shadow,
      }}
    >
      {/* Media Section */}
      <div 
        className={`relative w-full md:w-1/2 h-64 md:h-full overflow-hidden transition-transform duration-500 ${
          isMediaLeft ? 'order-1 md:order-1' : 'order-1 md:order-2'
        }`}
        style={{ 
          borderRadius: isMediaLeft ? `${theme.borderRadius} 0 0 ${theme.borderRadius}` : `0 ${theme.borderRadius} ${theme.borderRadius} 0`,
        }}
      >
        {media.type === 'video' ? (
          <video
            ref={videoRef}
            src={media.urls[0]}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loop
            muted
            playsInline
          />
        ) : (
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={media.urls[0]}
              alt={text.heading}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        )}
        
        {/* Optional overlay with theme-based styling */}
        {appearance.overlayDarken && (
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10 transition-opacity duration-300"
            style={{ backdropFilter: 'blur(1px)' }}
          ></div>
        )}
      </div>
      
      {/* Text Section with enhanced theme styling */}
      <div 
        className={`relative w-full md:w-1/2 flex flex-col p-8 transition-all duration-500 ${
          isMediaLeft ? 'order-2 md:order-2' : 'order-2 md:order-1'
        } ${
          text.verticalPosition === 'top' ? 'justify-start' : 
          text.verticalPosition === 'bottom' ? 'justify-end' : 'justify-center'
        } ${
          text.alignment === 'center' ? 'items-center text-center' : 
          text.alignment === 'right' ? 'items-end text-right' : 'items-start text-left'
        }`}
        style={{ 
          color: theme.text,
          textShadow: theme.textShadow,
        }}
      >
        <div className={theme.cardStyle ? `p-4 ${theme.cardStyle}` : 'p-4'}>
          {/* Subheading with theme-specific styling */}
          {text.subheading && (
            <h3 
              className={`text-lg md:text-xl font-medium mb-2 transition-all duration-300 hover:translate-y-[-2px]`}
              style={{ 
                color: theme.accent,
                textShadow: theme.textShadow,
              }}
            >
              {text.subheading}
            </h3>
          )}
          
          {/* Heading with theme-specific styling */}
          <h2 
            className={`text-3xl md:text-4xl mb-4 transition-all duration-300 hover:translate-y-[-2px] ${theme.headingStyle}`}
          >
            {text.heading}
          </h2>
          
          {/* Description with theme-specific styling */}
          {text.description && (
            <p 
              className="text-base md:text-lg mb-6 max-w-md transition-opacity duration-300 hover:opacity-90"
              style={{ lineHeight: '1.6' }}
            >
              {text.description}
            </p>
          )}
          
          {/* Bullets with theme-specific styling */}
          {text.showBullets && text.bullets && text.bullets.length > 0 && (
            <ul className="space-y-3 mb-6 max-w-md">
              {text.bullets.map((bullet, index) => (
                <li 
                  key={index}
                  className="flex items-center transition-transform duration-300 hover:translate-x-1"
                >
                  <span 
                    className={`w-2 h-2 mr-2 transition-all duration-300 ${theme.bulletStyle.includes('bg-') ? theme.bulletStyle : ''}`}
                    style={!theme.bulletStyle.includes('bg-') ? { backgroundColor: theme.accent } : {}}
                  ></span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
          
          {/* Optional CTA button with theme styling */}
          {text.ctaText && (
            <button
              className="px-6 py-2 mt-2 text-white font-medium transition-all duration-300 hover:scale-105"
              style={{ 
                background: theme.buttonGradient,
                borderRadius: theme.borderRadius,
                boxShadow: theme.shadow,
              }}
            >
              {text.ctaText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
