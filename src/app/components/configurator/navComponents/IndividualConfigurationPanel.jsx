import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaCheck, FaCubes } from "react-icons/fa";
import { Breadcrumb } from './Breadcrumb';

export const IndividualConfigurationPanel = ({
  configuringType,
  configuringSystemType,
  breadcrumbPath,
  onBreadcrumbNavigation,
  onSystemTypeSelection,
  selectedLocation,
  onPendantDesignChange,
  onSystemBaseDesignChange
}) => {
  const [currentDesign, setCurrentDesign] = useState(null);
  const carouselRef = useRef(null);
  
  // Carousel scroll functionality
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  // Helper function to map design names to their corresponding image numbers
  const getDesignImageNumber = (designName) => {
    const designMap = {
      'bumble': '1.png',
      'radial': '2.png',
      'fina': '3.png',
      'ripple': '5.png',
      'nexus': 'system_base_1.png',
      'vertex': 'system_base_2.png',
      'quantum': 'system_base_3.png',
      'fusion': 'system_base_4.png',
    };
    
    return designMap[designName] || `${designName}.jpg`;
  };
  
  // Render system type selection
  const renderSystemTypeSelection = () => {
    return (
      <div className="px-4 py-2">
        <div className="flex items-center justify-between mb-2">
          <Breadcrumb path={breadcrumbPath} onNavigate={onBreadcrumbNavigation} />
          <h3 className="text-sm font-medium text-white font-['Amenti']">System Type</h3>
        </div>
        
        <div className="flex space-x-3 overflow-x-auto hide-scrollbar py-1">
          {['bar', 'ball', 'universal'].map((type) => (
            <motion.div
              key={type}
              className="cursor-pointer flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSystemTypeSelection(type)}
            >
              <div className={`w-12 h-12 rounded-full overflow-hidden relative flex items-center justify-center bg-gray-800 ${
                configuringSystemType === type ? 'ring-2 ring-emerald-500' : ''
              }`}>
                <FaCubes size={16} className="text-emerald-500" />
                {configuringSystemType === type && (
                  <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                    <FaCheck className="text-white text-xs" />
                  </div>
                )}
              </div>
              <p className="text-center text-xs mt-1 text-gray-300 capitalize">{type}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render pendant design selection
  const renderPendantDesignSelection = () => {
    return (
      <div className="px-4 py-2">
        <div className="flex items-center justify-between mb-2">
          <Breadcrumb path={breadcrumbPath} onNavigate={onBreadcrumbNavigation} />
          <h3 className="text-sm font-medium text-white font-['Amenti']">Pendant Design</h3>
        </div>
        
        {/* Design carousel */}
        <div className="relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <button 
              onClick={() => scrollCarousel('left')}
              className="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <FaChevronLeft size={10} />
            </button>
          </div>
          
          <div 
            ref={carouselRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide py-1 px-6 max-w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[
              { id: 'bumble', name: 'Bumble', image: '/images/configOptions/1.png' },
              { id: 'radial', name: 'Radial', image: '/images/configOptions/2.png' },
              { id: 'fina', name: 'Fina', image: '/images/configOptions/3.png' },
              { id: 'ripple', name: 'Ripple', image: '/images/configOptions/5.png' },
            ].map((design) => (
              <motion.div
                key={design.id}
                className="flex-shrink-0 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentDesign(design.id);
                  onPendantDesignChange([selectedLocation], design.id);
                }}
              >
                <div className={`w-12 h-12 rounded-full overflow-hidden relative ${currentDesign === design.id ? 'ring-2 ring-emerald-500' : ''}`}>
                  <Image
                    src={design.image}
                    alt={design.name}
                    fill
                    className="object-cover"
                  />
                  {currentDesign === design.id && (
                    <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                      <FaCheck className="text-white text-xs" />
                    </div>
                  )}
                </div>
                <p className="text-center text-xs mt-1 text-gray-300">{design.name}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <button 
              onClick={() => scrollCarousel('right')}
              className="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <FaChevronRight size={10} />
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Render system base design selection
  const renderSystemBaseDesignSelection = () => {
    return (
      <div className="px-4 py-2">
        <div className="flex items-center justify-between mb-2">
          <Breadcrumb path={breadcrumbPath} onNavigate={onBreadcrumbNavigation} />
          <h3 className="text-sm font-medium text-white font-['Amenti']">System Base Design</h3>
        </div>
        
        {/* Design carousel */}
        <div className="relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <button 
              onClick={() => scrollCarousel('left')}
              className="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <FaChevronLeft size={10} />
            </button>
          </div>
          
          <div 
            ref={carouselRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide py-1 px-6 max-w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[
              { id: 'nexus', name: 'Nexus', image: '/images/configOptions/system_base_1.png' },
              { id: 'vertex', name: 'Vertex', image: '/images/configOptions/system_base_2.png' },
              { id: 'quantum', name: 'Quantum', image: '/images/configOptions/system_base_3.png' },
              { id: 'fusion', name: 'Fusion', image: '/images/configOptions/system_base_4.png' },
            ].map((design) => (
              <motion.div
                key={design.id}
                className="flex-shrink-0 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentDesign(design.id);
                  onSystemBaseDesignChange(design.id);
                }}
              >
                <div className={`w-12 h-12 rounded-full overflow-hidden relative ${currentDesign === design.id ? 'ring-2 ring-emerald-500' : ''}`}>
                  <Image
                    src={design.image}
                    alt={design.name}
                    fill
                    className="object-cover"
                  />
                  {currentDesign === design.id && (
                    <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                      <FaCheck className="text-white text-xs" />
                    </div>
                  )}
                </div>
                <p className="text-center text-xs mt-1 text-gray-300">{design.name}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <button 
              onClick={() => scrollCarousel('right')}
              className="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <FaChevronRight size={10} />
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Determine which panel to render based on configuration type and system type
  const renderPanel = () => {
    if (configuringType === 'pendant') {
      return renderPendantDesignSelection();
    } else if (configuringType === 'system') {
      if (!configuringSystemType) {
        return renderSystemTypeSelection();
      } else {
        return renderSystemBaseDesignSelection();
      }
    }
    return null;
  };
  
  return (
    <motion.div 
      className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-gray-800 z-40"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ type: 'spring', damping: 25 }}
    >
      {renderPanel()}
    </motion.div>
  );
};
