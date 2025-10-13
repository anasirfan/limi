import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaHome, FaBan, FaBuilding, FaUtensils, FaStore, FaGraduationCap, FaHospital, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const EnvironmentDropdown = ({ config, onEnvironmentChange, setActiveStep, setOpenDropdown, tourActive, onTourSelection, sendMessageToPlayCanvas }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      id: 'no_scene',
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
    },
    {
      id: 'retail',
      label: 'Retail',
      icon: <FaStore className="w-5 h-5" />,
      description: 'Store',
      sceneValue: 4
    },
    {
      id: 'education',
      label: 'Education',
      icon: <FaGraduationCap className="w-5 h-5" />,
      description: 'School',
      sceneValue: 5
    },
    {
      id: 'healthcare',
      label: 'Healthcare',
      icon: <FaHospital className="w-5 h-5" />,
      description: 'Medical',
      sceneValue: 6
    }
  ];

  const itemsPerPage = isMobile ? 3 : 4;
  const totalPages = Math.ceil(environments.length / itemsPerPage);

  const handleEnvironmentSelect = (environment) => {
    // If tour is active, call tour selection handler
    if (tourActive && onTourSelection) {
      onTourSelection('environment', environment.id);
    }
    
    // Call the environment change handler
    onEnvironmentChange(environment.id);
    
    // Send multiple configuration messages to PlayCanvas
    if (sendMessageToPlayCanvas) {
      // Send camera constraints
      // sendMessageToPlayCanvas('minYaw:42');
      // sendMessageToPlayCanvas('maxYaw:-42');
      // sendMessageToPlayCanvas('minZoom:1');
      // sendMessageToPlayCanvas('maxZoom:42');
      
      // Send scene URL if it's not the empty scene
      if (environment.id !== 'no_scene') {
        sendMessageToPlayCanvas(`sceneLink:https://dev.api1.limitless-lighting.co.uk/configurator_dynamic/models/Kitchen_1760348535795.glb`);
      } else {
        // For no scene, just send the scene value
        sendMessageToPlayCanvas(`scene:${environment.sceneValue}`);
      }
    }
    
    // Close dropdown
    setOpenDropdown(null);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentItems = () => {
    const startIndex = currentIndex * itemsPerPage;
    return environments.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div 
      className="max-sm:left-0 max-sm:w-full p-4"
      onClick={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      {!isMobile && <h3 className="text-base font-bold text-white mb-4 font-['Amenti']">Environment</h3>}
      
      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Arrows */}
        {totalPages > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-8 h-8 bg-gray-700/80 hover:bg-emerald-500/30 rounded-full flex items-center justify-center transition-all duration-300 text-white hover:text-emerald-400"
            >
              <FaChevronLeft className="w-3 h-3" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-8 h-8 bg-gray-700/80 hover:bg-emerald-500/30 rounded-full flex items-center justify-center transition-all duration-300 text-white hover:text-emerald-400"
            >
              <FaChevronRight className="w-3 h-3" />
            </button>
          </>
        )}

        {/* Carousel Content */}
        <div className="overflow-hidden">
          <div 
            className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-4'} gap-4`}
            
          >
            {getCurrentItems().map((environment) => (
              <button
                key={environment.id}
                className={`
                  flex flex-col items-center rounded-xl transition-all duration-300 min-w-0 group
                `}
                onClick={() => handleEnvironmentSelect(environment)}
        
       
              
              >
                <div className={`
                  w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-all duration-300
                  ${config.environment === environment.id 
                    ? 'bg-emerald-500/30 border-2 border-emerald-400 text-emerald-400' 
                    : 'bg-gray-700/60 border-2 border-gray-600 group-hover:border-emerald-400/50 group-hover:bg-emerald-500/10 text-white group-hover:text-emerald-400'
                  }
                `}>
                  {environment.icon}
                </div>
            
              </button>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${index === currentIndex 
                    ? 'bg-emerald-400' 
                    : 'bg-gray-600 hover:bg-gray-500'
                  }
                `}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
