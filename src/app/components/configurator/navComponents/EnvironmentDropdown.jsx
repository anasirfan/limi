import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaHome, FaBan, FaBuilding, FaUtensils } from 'react-icons/fa';

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
      icon: <FaBan className="w-5 h-5" />,
      description: 'Empty',
      sceneValue: 0
    },
    {
      id: 'interior',
      label: 'Interior',
      icon: <FaHome className="w-5 h-5" />,
      description: 'Home',
      sceneValue: 1
    },
    {
      id: 'office',
      label: 'Office',
      icon: <FaBuilding className="w-5 h-5" />,
      description: 'Workspace',
      sceneValue: 2
    },
    {
      id: 'restaurant',
      label: 'Restaurant',
      icon: <FaUtensils className="w-5 h-5" />,
      description: 'Dining',
      sceneValue: 3
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
      {!isMobile && <h3 className="text-base font-bold text-white mb-4 font-['Amenti']">Environment</h3>}
      <div className="grid grid-cols-4 gap-4">
        {environments.map((environment) => (
          <motion.button
            key={environment.id}
            className={`
              flex flex-col items-center p-4 rounded-xl transition-all duration-300 min-w-0 group
             
            `}
            onClick={() => handleEnvironmentSelect(environment)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`
              w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-all duration-300
              ${config.environment === environment.id 
                ? 'bg-emerald-500/30 border-2 border-emerald-400' 
                : 'bg-gray-700/60 border-2 border-gray-600 group-hover:border-emerald-400/50 group-hover:bg-emerald-500/10'
              }
            `}>
              {environment.icon}
            </div>
          
          </motion.button>
        ))}
      </div>
    </div>
  );
};
