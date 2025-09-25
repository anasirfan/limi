import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaHome, FaBan } from 'react-icons/fa';

export const EnvironmentDropdown = ({ config, onEnvironmentChange, setActiveStep, setOpenDropdown, tourActive, onTourSelection, sendMessageToPlayCanvas }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const environments = [
    {
      id: 'noScene',
      label: 'No Scene',
      icon: <FaBan className="w-8 h-8" />,
      description: 'Empty environment',
      sceneValue: 0
    },
    {
      id: 'interior',
      label: 'Interior',
      icon: <FaHome className="w-8 h-8" />,
      description: 'Interior room scene',
      sceneValue: 1
    }
  ];

  const handleEnvironmentSelect = (environment) => {
    // If tour is active, call tour selection handler
    if (tourActive && onTourSelection) {
      onTourSelection('environment', environment.id);
    }
    
    // Call the environment change handler
    onEnvironmentChange(environment.id);
    
    // Send message to PlayCanvas
    if (sendMessageToPlayCanvas) {
      sendMessageToPlayCanvas(`scene:${environment.sceneValue}`);
    }
    
    // Close dropdown
    setOpenDropdown(null);
  };

  return (
    <div 
      className="max-sm:left-0 max-sm:w-full p-4"
      onClick={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      {!isMobile && <h3 className="text-base font-bold text-white mb-3 font-['Amenti']">Environment</h3>}
      <div className="flex space-x-3">
        {environments.map((environment) => (
          <motion.button
            key={environment.id}
            className={`
              flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200
              ${config.environment === environment.id 
                ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400' 
                : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-400 hover:bg-gray-700/50'
              }
            `}
            onClick={() => handleEnvironmentSelect(environment)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="mb-2">
              {environment.icon}
            </div>
            <div className="text-sm font-medium text-center">
              {environment.label}
            </div>
            <div className="text-xs text-gray-400 text-center mt-1">
              {environment.description}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
