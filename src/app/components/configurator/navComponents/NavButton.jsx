import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Tooltip } from '../Tooltip';
import { useState, useEffect } from 'react';

export const NavButton = ({
  step,
  index,
  activeStep,
  openDropdown,
  handleStepClick,
  toggleDropdown,
  getNavIcon,
  emerald,
  charlestonGreen,
  textColor,
  dropdownRefs,
  containerDimensions,
  isGuided = false,
  isCompleted = false,
  children,
  ...rest
}) => {
  // State to track if we're on mobile and screen dimensions
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  
  // Effect to check screen size and update on resize
  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      // Initial check
      setIsMobile(window.innerWidth < 640);
      setScreenWidth(window.innerWidth);
      
      // Function to update on resize
      const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
        setScreenWidth(window.innerWidth);
      };
      
      // Add event listener
      window.addEventListener('resize', handleResize);
      
      // Clean up
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);
  
  // Guard against undefined or null step
  if (!step) return null;
  
  return (
    <div key={step?.id} className="relative" {...rest}>
      {/* Tooltip only shows when dropdown is closed */}
      {openDropdown !== step?.id && (
        <Tooltip content={step?.tooltip || 'Navigation option'} position="left" className="">
          <div className="relative group">
            <motion.button
              className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${activeStep === step?.id ? 'shadow-lg' : 'opacity-80 hover:opacity-100'} ${step?.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${isGuided ? 'ring-4 ring-offset-2 ring-emerald-500 ring-offset-charlestonGreen animate-pulse' : ''} ${isCompleted ? 'ring-2 ring-emerald-500' : ''}`}
              onClick={() => !step?.disabled && handleStepClick(step?.id)}
              whileHover={!step?.disabled ? { scale: 1.1 } : {}}
              whileTap={!step?.disabled ? { scale: 0.95 } : {}}
              animate={{
                scale: isGuided ? [1, 1.05, 1] : 1,
                transition: isGuided ? { repeat: Infinity, duration: 1.5 } : {}
              }}
              style={{
                backgroundColor: activeStep === step?.id ? emerald : isCompleted ? `${emerald}40` : charlestonGreen,
                color: activeStep === step?.id ? '#FFFFFF' : isCompleted ? emerald : `${textColor}80`,
                border: isMobile && openDropdown === step?.id ? `2px solid ${emerald}` : 'none',
                boxShadow: isGuided ? `0 0 15px ${emerald}` : 'none'
              }}
            >
              {getNavIcon && step?.id && getNavIcon(step.id) ? (
                <Image 
                  src={getNavIcon(step.id)}
                  alt={step?.label || 'Navigation button'}
                  width={16}
                  height={16}
                  className="object-contain"
                  onError={(e) => {
                    // Fallback to the original icon if image fails to load
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
              ) : (
                <div>
                  {step?.icon}
                </div>
              )}
            </motion.button>
          </div>
        </Tooltip>
      )}
      
      {/* Button without tooltip when dropdown is open */}
      {openDropdown === step?.id && (
        <motion.button
          className={`rounded-full flex items-center justify-center transition-all duration-300 w-10 h-10`}
          style={{
            backgroundColor: isMobile ? charlestonGreen : emerald,
            color: '#FFFFFF'
          }}
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown(step?.id);
          }}
          onTouchStart={(e) => e.stopPropagation()}
          whileTap={{ scale: 0.95 }}
        >
          {getNavIcon && step?.id && getNavIcon(step?.id) ? (
            <Image 
              src={getNavIcon(step?.id)}
              alt={step?.label || 'Navigation button'}
              width={32}
              height={32}
              className="object-contain"
              onError={(e) => {
                // Fallback to the original icon if image fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
          ) : (
            <div>
              {step?.icon}
            </div>
          )}
        </motion.button>
      )}
      
      {/* Dropdown content */}
      {/* <AnimatePresence> */}
        {openDropdown === step?.id && (
          <div
            ref={el => step?.id && (dropdownRefs.current[step.id] = el)}
            className="absolute max-sm:fixed right-full mr-4 top-0 bg-gray-800 max-sm:bg-[#2b2d2f] rounded-lg shadow-xl z-[200] overflow-hidden
              sm:right-full sm:mr-3 sm:top-0 max-sm:top-[25vh] max-sm:-mr-[16px] max-sm:right-0"
            style={{
              boxShadow: `0 4px 20px rgba(0,0,0,0.3), 0 0 0 1px ${isMobile ? charlestonGreen : emerald}20`,
              width: isMobile ? `${containerDimensions.width || screenWidth}px` : '280px',
              maxWidth: isMobile ? `${containerDimensions.width || screenWidth}px` : 'calc(100vw - 2rem)',
              // Position at 25% from the top of the container on mobile
              ...(isMobile && containerDimensions.height > 0 && {
                top: `360px`,
              })
            }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        )}
      {/* </AnimatePresence> */}
    </div>
  );
};
