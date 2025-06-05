import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Tooltip } from '../Tooltip';

export const NavButton = ({
  step,
  index,
  activeStep,
  openDropdown,
  handleStepClick,
  toggleDropdown,
  getNavIcon,
  emerald,
  textColor,
  dropdownRefs,
  children
}) => {
  // Guard against undefined or null step
  if (!step) return null;
  
  return (
    <div key={step?.id} className="relative">
      {/* Tooltip only shows when dropdown is closed */}
      {openDropdown !== step?.id && (
        <Tooltip content={step?.tooltip || 'Navigation option'} position="left">
          <div className="relative group">
            <motion.button
              className={`rounded-full flex items-center justify-center transition-all duration-300 w-10 h-10`}
              style={{
                backgroundColor: openDropdown === step?.id ? emerald : 
                                activeStep === step?.id ? emerald : 'transparent',
                color: openDropdown === step?.id ? '#FFFFFF' : 
                      activeStep === step?.id ? '#FFFFFF' : 
                      step?.isActive ? `${textColor}80` : `${textColor}40`
              }}
              onClick={() => handleStepClick(step?.id)}
              whileHover={step?.isActive ? { scale: 1.1 } : {}}
              whileTap={step?.isActive ? { scale: 0.95 } : {}}
              disabled={!step?.isActive}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                delay: 0.1 * index 
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
            backgroundColor: emerald,
            color: '#FFFFFF'
          }}
          onClick={() => toggleDropdown(step?.id)}
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
      <AnimatePresence>
        {openDropdown === step?.id && (
          <motion.div
            ref={el => step?.id && (dropdownRefs.current[step.id] = el)}
            className="absolute right-full mr-4 top-0 bg-gray-800 rounded-lg shadow-xl z-50 overflow-hidden
              sm:right-full sm:mr-3 sm:top-0
              xs:right-0 xs:mr-0 xs:top-full xs:mt-3"
            style={{ 
              width: '280px',
              maxWidth: 'calc(100vw - 2rem)',
              boxShadow: `0 4px 20px rgba(0,0,0,0.3), 0 0 0 1px ${emerald}20`
            }}
            initial={{ opacity: 0, x: 20, width: 0 }}
            animate={{ opacity: 1, x: 0, width: '280px' }}
            exit={{ opacity: 0, x: 20, width: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
