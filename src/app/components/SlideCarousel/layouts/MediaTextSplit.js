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
      bg: '#2B2D2F',
      text: '#FFFFFF',
      accent: '#50C878',
      secondaryAccent: '#93cfa2',
      gradient: 'linear-gradient(135deg, #2B2D2F 0%, #3a3c3e 100%)',
      buttonGradient: 'linear-gradient(to right, #50C878, #93cfa2)',
      shadow: '0 4px 12px rgba(80, 200, 120, 0.2)',
      headingStyle: 'font-bold tracking-tight',
      bulletStyle: 'rounded-full bg-[#50C878]',
      textShadow: 'none',
      animation: 'fade-in-up',
    },
    emerald: {
      bg: '#50C878',
      text: '#2B2D2F',
      accent: '#FFFFFF',
      secondaryAccent: '#e6e6e6',
      gradient: 'linear-gradient(135deg, #50C878 0%, #93cfa2 100%)',
      buttonGradient: 'linear-gradient(to right, #2B2D2F, #3a3c3e)',
      shadow: '0 4px 12px rgba(43, 45, 47, 0.2)',
      headingStyle: 'font-bold italic',
      bulletStyle: 'rounded-full bg-white',
      textShadow: '0 1px 2px rgba(0,0,0,0.1)',
      animation: 'slide-in-right',
    },
    eton: {
      bg: '#87CEAB',
      text: '#2B2D2F',
      accent: '#FFFFFF',
      secondaryAccent: '#e6e6e6',
      gradient: 'linear-gradient(135deg, #87CEAB 0%, #a9dbc4 100%)',
      buttonGradient: 'linear-gradient(to right, #2B2D2F, #3a3c3e)',
      shadow: '0 4px 12px rgba(135, 206, 171, 0.3)',
      borderRadius: '0.75rem',
      headingStyle: 'font-medium tracking-wide',
      bulletStyle: 'rounded-sm bg-white',
      textShadow: 'none',
      animation: 'fade-in-left',
    },
    beige: {
      bg: '#F2F0E6',
      text: '#2B2D2F',
      accent: '#50C878',
      secondaryAccent: '#93cfa2',
      gradient: 'linear-gradient(135deg, #F2F0E6 0%, #e6e4da 100%)',
      buttonGradient: 'linear-gradient(to right, #50C878, #93cfa2)',
      shadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      headingStyle: 'font-bold tracking-normal',
      bulletStyle: 'rounded-full bg-[#50C878]',
      textShadow: 'none',
      animation: 'slide-in-up',
    },
  };
  
  const theme = themeStyles[appearance?.theme] || themeStyles.charleston;
  
  useEffect(() => {
    if (videoRef.current && media?.type === 'video') {
      videoRef.current.play().catch(error => {
        console.log('Auto-play prevented:', error);
      });
    }
  }, [media]);
  
  const isMediaLeft = media?.position === 'left';
  
  const animationClass = {
    'fade-in-up': 'animate-fadeInUp',
    'fade-in-left': 'animate-fadeInLeft',
    'slide-in-right': 'animate-slideInRight',
    'slide-in-up': 'animate-slideInUp',
  }[theme.animation] || '';

  return (
    <div 
      className={`flex flex-col lg:flex-row h-full w-full overflow-hidden transition-all duration-500 ease-in-out ${animationClass}`}
      style={{ 
        background: appearance?.backgroundColor || theme.gradient,
        boxShadow: theme.shadow,
      }}
    >
      {/* Media Section */}
      <div 
        className={`relative w-full lg:w-1/2 h-48 sm:h-64 lg:h-full overflow-hidden transition-transform duration-500 ${
          isMediaLeft ? 'order-1 lg:order-1' : 'order-1 lg:order-2'
        }`}
      >
        {media?.type === 'video' ? (
          <video
            ref={videoRef}
            src={media?.urls?.[0]}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loop
            muted
            playsInline
          />
        ) : (
          <div className="relative w-full h-full overflow-hidden shadow-md group">
            <Image
              src={media?.urls?.[0] || '/placeholder.jpg'}
              alt={text?.heading || 'Media content'}
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 group-hover:brightness-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
              placeholder="blur"
              blurDataURL="/placeholder-blur.jpg"
            />
          </div>
        )}
        
        {appearance?.overlayDarken && (
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10 transition-opacity duration-300"
            style={{ backdropFilter: 'blur(1px)' }}
          ></div>
        )}
      </div>
      
      {/* Text Section */}
      <div 
        className={`relative w-full lg:w-1/2 flex flex-col transition-all duration-500 ${
          isMediaLeft ? 'order-2 lg:order-2' : 'order-2 lg:order-1'
        } ${
          text?.verticalPosition === 'top' ? 'justify-start' : 
          text?.verticalPosition === 'bottom' ? 'justify-end' : 'justify-center'
        } ${
          text?.alignment === 'center' ? 'items-center text-center' : 
          text?.alignment === 'right' ? 'items-end text-right' : 'items-start text-left'
        }`}
        style={{ 
          color: theme.text,
          textShadow: theme.textShadow,
        }}
      >
        <div className={theme.cardStyle ? `p-4 ${theme.cardStyle}` : 'p-4 sm:p-8 lg:p-16'}>
          <h2 
            className={`text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 transition-all duration-300 hover:translate-y-[-2px] ${theme.headingStyle}`}
          >
            {text?.heading}
          </h2>
          
          {text?.subheading && (
            <h3 
              className={`text-base sm:text-lg lg:text-xl font-medium mb-2 transition-all duration-300 hover:translate-y-[-2px]`}
              style={{ 
                color: theme.accent,
                textShadow: theme.textShadow,
              }}
            >
              {text.subheading}
            </h3>
          )}
          
          {text?.description && (
            <p 
              className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 max-w-md transition-opacity duration-300 hover:opacity-90"
              style={{ lineHeight: '1.6' }}
            >
              {text.description}
            </p>
          )}
          
          {text?.showBullets && text?.bullets && text.bullets.length > 0 && (
            <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 max-w-md">
              {text.bullets.map((bullet, index) => (
                <li 
                  key={index}
                  className="flex items-center transition-transform duration-300 hover:translate-x-1"
                >
                  <span 
                    className={`w-2 h-2 mr-2 transition-all duration-300 ${theme.bulletStyle.includes('bg-') ? theme.bulletStyle : ''}`}
                    style={!theme.bulletStyle.includes('bg-') ? { backgroundColor: theme.accent } : {}}
                  ></span>
                  <span className="text-sm sm:text-base">{bullet}</span>
                </li>
              ))}
            </ul>
          )}
          
          {text.ctaText && (
            <button
              className="px-4 sm:px-6 py-2 mt-2 text-sm sm:text-base text-white font-medium transition-all duration-300 hover:scale-105"
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
