import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaCheck, FaShoppingCart, FaSave } from "react-icons/fa";

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
  handleSaveConfig
}) => {
  return (
    <div className="p-4">
      <h3 className="text-base font-bold text-white mb-3 font-['Amenti']">Configure Pendants</h3>
      
      {/* Pendant selection controls */}
      <div className="flex justify-between mb-3">
        <button 
          onClick={selectAllPendants}
          className="px-3 py-1 rounded-lg text-xs bg-gray-700 hover:bg-gray-600 text-white"
        >
          Select All
        </button>
        
        {selectedPendants.length > 0 && (
          <button 
            onClick={clearSelections}
            className="px-3 py-1 rounded-lg text-xs bg-gray-700 hover:bg-gray-600 text-white"
          >
            Clear ({selectedPendants.length})
          </button>
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
          {pendants.map((pendant, index) => (
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
                      src={`/images/configOptions/${getDesignImageNumber(pendant.design)}`}
                      alt={pendant.design}
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
        
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <button 
            onClick={() => scrollCarousel('right')}
            className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      </div>
      
      {/* Design selection for selected pendants */}
    
    </div>
  );
};
