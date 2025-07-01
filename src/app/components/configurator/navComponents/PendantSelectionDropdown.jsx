import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaCheck, FaShoppingCart, FaSave } from "react-icons/fa";
import { ConfigPanel } from './ConfigPanel';

export const PendantSelectionDropdown = ({ 
  pendants, 
  selectedPendants, 
  currentDesign,
  setCurrentDesign,
  carouselRef,
  scrollCarousel,
  togglePendantSelection,
  selectAllPendants,
  clearSelections,
  applyDesignToSelected,
  applyToAllPendants,
  getDesignImageNumber,
  getPendantDesignImageNumber,
  handleSaveConfig,
  configuringType,
  configuringSystemType,
  breadcrumbPath,
  onBreadcrumbNavigation,
  onSystemTypeSelection,
  selectedLocation,
  onPendantDesignChange,
  onSystemBaseDesignChange,
  onSelectConfigurationType,
  onClose,
  cables

}) => {
  // State to track active tab on mobile
  const [activeTab, setActiveTab] = useState('configure'); // 'configure' or 'design'
  const [isMobile, setIsMobile] = useState(false);
  
  // Effect to check screen size and update on resize
  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      // Initial check
      setIsMobile(window.innerWidth < 640);
      
      // Function to update on resize
      const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
      };
      
      // Add event listener
      window.addEventListener('resize', handleResize);
      
      // Clean up
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);
  
  return (
    <div className="p-4" onClick={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}>
      {/* Mobile tabs - only show on mobile */}
      {isMobile && (
        <div className="mb-4">
          <div className="flex rounded-lg overflow-hidden border border-gray-700">
            <button 
              className={`flex-1 py-2 text-center text-sm font-medium ${
                activeTab === 'configure' 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setActiveTab('configure')}
            >
              Configure Pendants
            </button>
            <button 
              className={`flex-1 py-2 text-center text-sm font-medium ${
                activeTab === 'design' 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setActiveTab('design')}
            >
              Select Design
            </button>
          </div>
        </div>
      )}
      
      {/* Desktop title - always visible on desktop */}
      {!isMobile && (
        <div>
          <h3 className="text-base font-bold text-white mb-3 font-['Amenti']">Configure Pendants</h3>
        </div>
      )}
      
      {/* Configure Pendants Tab Content */}
      {(!isMobile || activeTab === 'configure') && (
        <>
          {/* Pendant selection controls */}
          <div className="flex justify-between mb-3">
            {selectedPendants.length > 0 && (
              <>
                <button 
                  onClick={selectAllPendants}
                  className="px-3 py-1 rounded-lg text-xs bg-gray-700 hover:bg-gray-600 text-white"
                >
                  Select All
                </button>
                
                <button 
                  onClick={clearSelections}
                  className="px-3 py-1 rounded-lg text-xs bg-gray-700 hover:bg-gray-600 text-white"
                >
                  Clear ({selectedPendants.length})
                </button>
              </>
            )}
          </div>
          
          {/* Pendant selector carousel */}
          <div className="relative mb-4">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <button 
                onClick={() => scrollCarousel('left')}
                className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <FaChevronLeft size={14} />
              </button>
            </div>
            
            <div 
              ref={carouselRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-8 max-w-full"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {cables && cables.length > 0 ? cables.map((pendant, index) => (
                <motion.div 
                  key={index}
                  className="flex-shrink-0 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => togglePendantSelection(index)}
                  style={{ userSelect: 'none' }}
                >
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all overflow-hidden relative ${selectedPendants.includes(index) 
                      ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-gray-800' 
                      : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                  >
                    {/* Show pendant design as background if it has one */}
                    {pendant.design && (
                      <div className="absolute inset-0 opacity-30">
                        <Image 
                          src={`/images/configOptions/${getDesignImageNumber(pendant.design , pendant.systemType)}`}
                          alt={pendant.design}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span className="relative z-10">{index + 1}</span>
                  </div>
                </motion.div>
              )) : (pendants.map((pendant, index) => (
                <motion.div 
                  key={index}
                  className="flex-shrink-0 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => togglePendantSelection(index)}
                  style={{ userSelect: 'none' }}
                >
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all overflow-hidden relative ${selectedPendants.includes(index) 
                      ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-gray-800' 
                      : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                  >
                    {/* Show pendant design as background if it has one */}
                    {pendant.design && (
                      <div className="absolute inset-0 opacity-30">
                        <Image 
                          src={`/images/configOptions/${getPendantDesignImageNumber(pendant.design)}`}
                          alt={pendant.design}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span className="relative z-10">{index + 1}</span>
                  </div>
                </motion.div>
              )))}
            </div>
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <button 
                onClick={() => scrollCarousel('right')}
                className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <FaChevronRight size={14} />
              </button>
            </div>
          </div>
          
          {/* Desktop - Design selection button */}
          {/* {!isMobile && (
            <div className="mt-4">
              {selectedPendants.length > 0 && (
                <button
                  onClick={() => setActiveTab('design')}
                  className="w-full py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center justify-center gap-2"
                >
                  <span>Select Design</span>
                  <FaChevronRight size={12} />
                </button>
              )}
            </div>
          )} */}
        </>
      )}
      
      {/* Select Design Tab Content */}
      {(isMobile && activeTab === 'design') && (
        <div className="max-sm:w-full max-sm:h-auto max-sm:relative">
          {/* <h3 className="text-base font-bold text-white mb-3 font-['Amenti']">Select Design</h3> */}
          
          {/* Wrap ConfigPanel in a div with mobile-specific styles */}
          <div className="max-sm:relative max-sm:w-full max-sm:h-auto max-sm:bg-transparent max-sm:border-0 max-sm:shadow-none">
            <ConfigPanel
              configuringType={configuringType}
              configuringSystemType={configuringSystemType}
              breadcrumbPath={breadcrumbPath}
              onBreadcrumbNavigation={onBreadcrumbNavigation}
              onSystemTypeSelection={onSystemTypeSelection}
              selectedLocation={selectedLocation}
              selectedPendants={selectedPendants}
              onPendantDesignChange={onPendantDesignChange}
              onSystemBaseDesignChange={onSystemBaseDesignChange}
              onSelectConfigurationType={onSelectConfigurationType}
              onShadeSelect={() => {}}
              currentShade={null}
              onClose={onClose}
              className="max-sm:static max-sm:transform-none max-sm:w-full max-sm:h-auto max-sm:bg-transparent max-sm:shadow-none max-sm:border-0"
            />
          </div>
        </div>
      )}
    </div>
  );
};
