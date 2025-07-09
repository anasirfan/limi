import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaCheck, FaChevronLeft, FaChevronRight, FaSave, FaShoppingCart, FaTimes } from "react-icons/fa";
import { useRef, useState, useEffect } from 'react';

export const SystemConfigurationDropdown = ({ config, onSystemBaseDesignChange, setActiveStep, setOpenDropdown, handleSaveConfig }) => {
  // Create a state for selected systems similar to selected pendants
  const [selectedSystems, setSelectedSystems] = useState([]);
  const [currentDesign, setCurrentDesign] = useState('nexus');
  const [showDesignSelector, setShowDesignSelector] = useState(false);
  const carouselRef = useRef(null);
  
  // Mock system data - in a real app, this would come from props
  const systems = [
    { id: 0, type: config.systemType || 'bar', design: config.systemBaseDesign || '' },
    { id: 1, type: config.systemType || 'bar', design: config.systemBaseDesign || '' },
    { id: 2, type: config.systemType || 'bar', design: config.systemBaseDesign || '' },
    { id: 3, type: config.systemType || 'bar', design: config.systemBaseDesign || '' },
  ];
  
  // Toggle system selection
  const toggleSystemSelection = (systemId) => {
    // Clear previous selections and select only this system
    setSelectedSystems([systemId]);
    // Show the design selector at the bottom of the screen
    setShowDesignSelector(true);
  };
  
  // Select all systems
  const selectAllSystems = () => {
    const allSystems = systems.map((system) => system.id);
    setSelectedSystems(allSystems);
    setShowDesignSelector(true);
  };
  
  // Clear selections
  const clearSelections = () => {
    setSelectedSystems([]);
    setShowDesignSelector(false);
  };
  
  // Carousel scroll functionality
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  // Apply design to selected systems
  const applyDesignToSelected = (design) => {
    if (selectedSystems.length === 0) return;
  
    onSystemBaseDesignChange(design);
    // Keep the design selector open after selection
  };
  
  // Apply to all systems
  const applyToAllSystems = (design) => {
    onSystemBaseDesignChange(design);
  };
  
  // Using handleSaveConfig from props
  
  return (
    <>
      <div className="p-4">
        <h3 className="text-base font-bold text-white mb-3 font-['Amenti']">Configure Systems</h3>
        
        {/* System selection controls */}
        <div className="flex justify-between mb-3">
          <button 
            onClick={selectAllSystems}
            className="px-3 py-1 rounded-lg text-xs bg-gray-700 hover:bg-gray-600 text-white"
          >
            Select All
          </button>
          
          {selectedSystems.length > 0 && (
            <button 
              onClick={clearSelections}
              className="px-3 py-1 rounded-lg text-xs bg-gray-700 hover:bg-gray-600 text-white"
            >
              Clear ({selectedSystems.length})
            </button>
          )}
        </div>
        
        {/* System selector carousel */}
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
            {systems.map((system, index) => (
              <motion.div 
                key={index}
                className="flex-shrink-0 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleSystemSelection(index)}
                style={{ userSelect: 'none' }}
              >
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all overflow-hidden relative ${selectedSystems.includes(index) 
                    ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-gray-800' 
                    : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                >
                  {/* Show system design as background if it has one */}
                  {system.design && (
                    <div className="absolute inset-0 opacity-30">
                      <Image 
                        src={`/images/configOptions/system/${system.design}.png`}
                        alt={system.design}
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
      </div>
      
      {/* Floating design selector at the bottom of the screen */}
      <AnimatePresence>
        {showDesignSelector && selectedSystems.length > 0 && (
          <motion.div 
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-auto max-w-md"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="p-4 rounded-xl bg-black/90 backdrop-blur-md shadow-lg border border-gray-800">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-bold text-white">
                  Select Design for System {selectedSystems.map(id => id + 1).join(', ')}
                </h4>
                <button 
                  onClick={() => setShowDesignSelector(false)}
                  className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700"
                >
                  <FaTimes size={10} className="text-gray-400" />
                </button>
              </div>
              
              <div className="flex space-x-4 overflow-x-auto hide-scrollbar py-2">
                {(() => {
                  // Define available designs based on system type
                  const systemTypeDesigns = {
                    'bar': [
                      { id: 'nexus', name: 'Nexus', image: `/images/configOptions/bar/0.png` }
                    ],
                    'ball': [
                      { id: 'quantum', name: 'Quantum', image: `/images/configOptions/ball/0.png` }
                    ],
                    'universal': [
                      { id: 'vertex', name: 'Vertex', image: `/images/configOptions/universal/0.png` },
                      { id: 'fusion', name: 'Fusion', image: `/images/configOptions/universal/1.png` },
                      { id: 'aurora', name: 'Aurora', image: `/images/configOptions/universal/2.png` }
                    ]
                  };
                  
                  // Get designs for current system type or default to universal
                  const systemType = config.systemType || 'universal';
                  const designs = systemTypeDesigns[systemType] || systemTypeDesigns.universal;
                  
                  return designs;
                })().map((design) => (
                  <motion.div
                    key={design.id}
                    className="flex-shrink-0 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentDesign(design.id);
                      applyDesignToSelected(design.id);
                    }}
                  >
                    <div className={`w-16 h-16 rounded-full overflow-hidden relative ${currentDesign === design.id ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-gray-800' : ''}`}>
                      <Image
                        src={design.image}
                        alt={design.name}
                        fill
                        className="object-cover"
                      />
                      {currentDesign === design.id && (
                        <div className="absolute inset-0 bg-emerald-500/30 flex items-center justify-center">
                          <FaCheck className="text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-center text-xs mt-2 text-gray-300">{design.name}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Apply to all button */}
              {selectedSystems.length === 1 && systems.length > 1 && (
                <motion.button
                  onClick={() => applyToAllSystems(currentDesign)}
                  className="mt-4 w-full py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-500 rounded-lg flex items-center justify-center gap-2 text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaCheck size={12} /> Apply to All Systems
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
