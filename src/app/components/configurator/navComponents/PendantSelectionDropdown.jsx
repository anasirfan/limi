import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaCheck, FaShoppingCart, FaSave } from "react-icons/fa";
import { ConfigPanel } from './ConfigPanel';

export const PendantSelectionDropdown = ({ 
  cables, 
  selectedCableIndexes, 
  onToggleCableSelection,
  onSelectAllCables,
  onClearCableSelections,
  onApplyDesignToSelected,
  onCableDesignChange,
  onClose
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
          {/* Cable selection controls */}
          <div className="flex justify-between mb-3">
            {selectedCableIndexes.length > 0 && (
              <>
                <button 
                  onClick={onSelectAllCables}
                  className="px-3 py-1 rounded-lg text-xs bg-gray-700 hover:bg-gray-600 text-white"
                >
                  Select All
                </button>
                <button 
                  onClick={onClearCableSelections}
                  className="px-3 py-1 rounded-lg text-xs bg-gray-700 hover:bg-gray-600 text-white"
                >
                  Clear ({selectedCableIndexes.length})
                </button>
              </>
            )}
          </div>
          {/* Cable selector carousel */}
          <div className="relative mb-4">
            {/* Carousel arrows can be implemented if needed */}
            <div 
              className="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-8 max-w-full"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {cables.map((cable, index) => (
                <motion.div 
                  key={index}
                  className="flex-shrink-0 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onToggleCableSelection(index)}
                  style={{ userSelect: 'none' }}
                >
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all overflow-hidden relative ${selectedCableIndexes.includes(index) 
                      ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-gray-800' 
                      : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                  >
                    {/* Show cable design as background if it has one */}
                    {cable.design && (
                      <div className="absolute inset-0 opacity-30">
                        <Image 
                          src={`/images/configOptions/${cable.design}.png`}
                          alt={cable.design}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span className="relative z-10">{index + 1}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}
      
      {/* Select Design Tab Content */}
      {(isMobile && activeTab === 'design') && (
        <div className="max-sm:w-full max-sm:h-auto max-sm:relative">
          <div className="max-sm:relative max-sm:w-full max-sm:h-auto max-sm:bg-transparent max-sm:border-0 max-sm:shadow-none">
            <ConfigPanel
              configuringType={configuringType}
              configuringSystemType={configuringSystemType}
              breadcrumbPath={breadcrumbPath}
              onBreadcrumbNavigation={onBreadcrumbNavigation}
              onSystemTypeSelection={onSystemTypeSelection}
              selectedLocation={selectedLocation}
              selectedCableIndexes={selectedCableIndexes}
              onCableDesignChange={onCableDesignChange}
              onSystemBaseDesignChange={onSystemBaseDesignChange}
              onSelectConfigurationType={() => {}}
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
