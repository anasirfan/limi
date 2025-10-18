import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export const LightTypeDropdown = ({ config, onLightTypeChange, setActiveStep, setOpenDropdown, tourActive, onTourSelection }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Debug: Log loading state changes
  useEffect(() => {
    console.log('LightTypeDropdown: Loading state changed to:', isLoading);
  }, [isLoading]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Listen for loadingOffMount message to turn off loading
  useEffect(() => {
    const handleMessage = (event) => {
      console.log('LightTypeDropdown: Received message:', event.data);
      if (event.data === "loadingOffMount") {
        console.log('LightTypeDropdown: Setting loading to false');
        setIsLoading(false);
      }
    };

    window.addEventListener("message", handleMessage);
    
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center"
          style={{ zIndex: 99999 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center space-y-4">
            {/* Spinning loader */}
            <div className="w-12 h-12 border-3 border-gray-600 border-t-emerald-500 rounded-full animate-spin"></div>
            <p className="text-white text-lg font-medium font-['Amenti']">Loading pendant...</p>
          </div>
        </motion.div>
      )}
      
      <div 
        className=" max-sm:left-0 max-sm:w-full p-4"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
      {!isMobile && <h3 className="text-base font-bold text-white mb-3 font-['Amenti']">Light Type</h3>}
      
      {/* Debug: Test loading button */}
      <button 
        onClick={() => {
          console.log('Test button clicked, current loading state:', isLoading);
          setIsLoading(!isLoading);
        }}
        className="mb-2 px-3 py-1 bg-red-500 text-white text-xs rounded"
      >
        Test Loading: {isLoading ? 'ON' : 'OFF'}
      </button>
      <div className="flex space-x-3">
        {['wall', 'ceiling', 'floor'].map((type) => {
          // Calculate aspect ratio: original is 1726x1296
          // For a width of 80px, height would be 60px to maintain ratio
          const aspectRatio = 1296 / 1726; // height/width
          const width = 80; // Set width to 80px
          const height = width * aspectRatio; // Calculate height to maintain aspect ratio
          
          return (
            <motion.button
              key={type}
              className={`rounded-lg overflow-hidden ${config.lightType === type ? 'ring-2 ring-emerald-500 ring-offset-1 ring-offset-gray-800' : 'hover:ring-1 hover:ring-gray-400'}`}
              onClick={() => {
                // Show loading screen
                console.log('LightTypeDropdown: Setting loading to true for type:', type);
                setIsLoading(true);
                
                // If tour is active, call tour selection handler
                if (tourActive && onTourSelection) {
                  onTourSelection('lightType', type);
                }
                
                onLightTypeChange(type);
                // Don't automatically switch to next tab
                setOpenDropdown(null);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
                <Image 
                  src={`/images/configrenders/${type}.jpg`}
                  alt={`${type} light`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className={`text-center py-1 text-xs ${config.lightType === type ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
    </>
  );
};
