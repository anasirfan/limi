"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaLightbulb, FaLayerGroup, FaObjectGroup, FaRegObjectGroup, FaRegLightbulb, FaChevronLeft, FaChevronRight, FaCheck, FaChevronUp, FaChevronDown, FaArrowsAltH, FaHandPaper } from 'react-icons/fa';
import { toast } from 'react-toastify';

const HorizontalOptionsBar = ({ 
  activeStep, 
  config, 
  onLightTypeChange, 
  onBaseTypeChange, 
  onConfigurationTypeChange,
  onLightAmountChange,
  onSystemTypeChange,
  onPendantSelection,
  onPendantDesignChange
}) => {
  // State for minimized bottom bar
  const [isMinimized, setIsMinimized] = useState(false);
  
  // Scroll container ref for scrollable content
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  
  // For pendant selection
  const [selectedPendants, setSelectedPendants] = useState([]);
  const [currentDesign, setCurrentDesign] = useState('bumble');
  
  // Toggle minimized state
  const toggleMinimized = () => {
    setIsMinimized(prev => !prev);
  };
  
  // Update maxScroll when content changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      setMaxScroll(
        scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
      );
    }
    
    // Add window resize listener
    const handleResize = () => {
      if (scrollContainerRef.current) {
        setMaxScroll(
          scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
        );
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeStep, config.pendants?.length]);
  
  // Handle scroll
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };
  
  // Scroll controls
  const scrollToLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollToRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };
  
  // Toggle pendant selection
  const togglePendantSelection = (index) => {
    setSelectedPendants(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };
  
  // Select all pendants
  const selectAllPendants = () => {
    setSelectedPendants(config.pendants.map((_, index) => index));
  };
  
  // Clear all selections
  const clearSelections = () => {
    setSelectedPendants([]);
  };
  
  // Apply design to selected pendants
  const applyDesignToSelected = () => {
    if (selectedPendants.length === 0) {
      toast.info('Please select at least one pendant first');
      return;
    }
    
    // Call parent handler with the current design
    onPendantDesignChange(selectedPendants, currentDesign);
    
    // Show success message
    toast.success(`Applied ${currentDesign} design to ${selectedPendants.length} pendant(s)`);
  };
  
  // Get title based on active step
  const getStepTitle = (step) => {
    switch(step) {
      case 'lightType':
        return 'Select Light Type';
      case 'baseType':
        return 'Select Base Type';
      case 'configurationType':
        return config.configurationType === 'pendant' ? 'Pendant Configuration' : 'System Configuration';
      case 'lightAmount':
        return config.configurationType === 'pendant' ? 'Select Light Amount' : 'Select System Type';
      case 'pendantSelection':
        return config.configurationType === 'pendant' ? 'Configure Pendants' : 'Configure System';
      default:
        return 'Light Configurator';
    }
  };
  
  // Apply design to all pendants
  const applyDesignToAll = (design) => {
    // Create array of all pendant indices
    const allIndices = Array.from({ length: config.pendants.length }, (_, i) => i);
    
    // Update current design state
    setCurrentDesign(design);
    
    // Call parent handler
    onPendantDesignChange(allIndices, design);
    
    // Show toast notification
    toast.success(`Applied ${design} design to all pendants`, {
      position: "bottom-right",
      autoClose: 2000
    });
  };
  
  // Update parent component with selected pendants when selection changes
  useEffect(() => {
    onPendantSelection(selectedPendants);
  }, [selectedPendants, onPendantSelection]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center pb-4">
      <motion.div 
        className="relative max-w-3xl w-full mx-auto rounded-xl overflow-hidden backdrop-blur-sm bg-gray-900/80 border border-gray-800 shadow-xl"
        animate={{
          height: isMinimized ? '40px' : 'auto',
          opacity: 1
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Toggle button - now inside the box on the right */}
        <button 
          onClick={toggleMinimized}
          className="absolute top-1 right-1 w-8 h-8 rounded-lg flex items-center justify-center text-white  z-10"
        >
          {isMinimized ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
        </button>
        {/* Title bar shown when minimized */}
        {isMinimized && (
          <div className="h-10 flex items-center justify-center px-4">
            <span className="text-sm font-medium text-white">{getStepTitle(activeStep)}</span>
          </div>
        )}
      {!isMinimized && (
        <AnimatePresence mode="wait">
        {/* Light Type Options */}
        {activeStep === 'lightType' && (
          <motion.div 
            className="py-3 px-4"
            key="lightType"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-bold text-white font-['Amenti']">Light Type</h3>
            </div>
            
            <div 
              ref={scrollContainerRef}
              className="flex space-x-4 overflow-x-auto hide-scrollbar py-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onScroll={handleScroll}
            >
              {[
                { id: "wall", name: "Wall Light", icon: "/images/configrenders/wall.jpg" },
                { id: "ceiling", name: "Ceiling Light", icon: "/images/configrenders/ceiling.jpg" },
                { id: "floor", name: "Floor Light", icon: "/images/configrenders/floor.jpg" },
              ].map((type) => (
                <motion.div
                  key={type.id}
                  className="relative cursor-pointer hover:bg-gray-700/60 p-2 rounded-lg flex-shrink-0"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onLightTypeChange(type.id)}
                >
                  <div className={`w-16 h-16 rounded-lg overflow-hidden relative ${config.lightType === type.id ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-gray-900' : ''}`}>
                    <Image
                      src={type.icon}
                      alt={type.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-center text-xs mt-2 text-white">{type.name}</p>
                  {config.lightType === type.id && (
                    <motion.div 
                      className="absolute -bottom-1 left-0 right-0 h-1 bg-emerald-500 rounded-full"
                      layoutId="activeTypeIndicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Base Type Options - Only visible for ceiling lights */}
        {activeStep === 'baseType' && config.lightType === 'ceiling' && (
          <motion.div 
            className="p-4"
            key="baseType"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h3 className="text-lg font-bold mb-3 text-white font-['Amenti']">Base Type</h3>
            <div className="flex space-x-6">
              {[
                { id: "round", name: "Round Base" },
                { id: "rectangular", name: "Rectangular Base" }
              ].map((type) => (
                <motion.div
                  key={type.id}
                  className={`cursor-pointer p-4 rounded-lg ${config.baseType === type.id 
                    ? 'bg-emerald-700 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onBaseTypeChange(type.id)}
                >
                  <p className="text-center font-medium">{type.name}</p>
                  {config.baseType === type.id && (
                    <motion.div 
                      className="h-1 bg-emerald-500 rounded-full mt-2"
                      layoutId="baseTypeIndicator"
                    ></motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Configuration Type Options */}
        {activeStep === 'configurationType' && (
          <motion.div 
            className="p-4"
            key="configurationType"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h3 className="text-lg font-bold mb-3 text-white font-['Amenti']">Configuration Type</h3>
            <div className="flex space-x-6">
              {[
                { id: "pendant", name: "Configure Pendants" },
                { id: "system", name: "Configure System" }
              ].map((type) => (
                <motion.div
                  key={type.id}
                  className={`cursor-pointer p-4 rounded-lg ${config.configurationType === type.id 
                    ? 'bg-emerald-700 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onConfigurationTypeChange(type.id)}
                >
                  <p className="text-center font-medium">{type.name}</p>
                  {config.configurationType === type.id && (
                    <motion.div 
                      className="h-1 bg-emerald-500 rounded-full mt-2"
                      layoutId="configTypeIndicator"
                    ></motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Light Amount Options - For pendant configuration */}
        {activeStep === 'lightAmount' && config.configurationType === 'pendant' && (
          <motion.div 
            className="p-4"
            key="lightAmount"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h3 className="text-lg font-bold mb-3 text-white font-['Amenti']">Light Amount</h3>
            <div className="flex flex-wrap gap-4">
              {(() => {
                // Determine available amounts based on light type and base type
                let amounts = [];
                
                switch(config.lightType) {
                  case 'wall':
                    amounts = [1]; // Wall lights only have 1 option
                    break;
                  case 'floor':
                    amounts = [3]; // Floor lights have 3 options
                    break;
                  case 'ceiling':
                    // If ceiling with rectangular base, only show 3 option
                    amounts = config.baseType === 'rectangular' ? [3] : [1, 3, 6, 24];
                    break;
                  default:
                    amounts = [1, 3, 6, 24];
                }
                
                return amounts.map((num) => (
                  <motion.div
                    key={num}
                    className={`w-20 h-20 rounded-full flex items-center justify-center cursor-pointer overflow-hidden ${config.lightAmount === num
                      ? "ring-4 ring-emerald-500 ring-offset-2 ring-offset-charleston-green shadow-xl"
                      : "bg-gray-700 hover:bg-gray-600"
                    }`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onLightAmountChange(num)}
                  >
                    {/* Use images or text */}
                    <div className="text-white text-2xl font-bold">{num}</div>
                  </motion.div>
                ));
              })()}
            </div>
          </motion.div>
        )}
        
        {/* System Type Options - For system configuration */}
        {activeStep === 'lightAmount' && config.configurationType === 'system' && (
          <motion.div 
            className="p-4"
            key="systemType"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h3 className="text-lg font-bold mb-3 text-white font-['Amenti']">System Type</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(() => {
                // Define all available systems
                const allSystems = [
                  { id: "bar", name: "Bar System" },
                  { id: "ball", name: "Ball System" },
                  { id: "universal", name: "Universal System" },
                  { id: "chandeliers", name: "Chandeliers" },
                ];
                
                // Filter systems based on baseType - hide chandeliers when base is round
                const systems = config.baseType === 'round' 
                  ? allSystems.filter(system => system.id !== 'chandeliers')
                  : allSystems;
                
                return systems.map((system) => (
                  <motion.div
                    key={system.id}
                    className={`cursor-pointer p-4 rounded-lg ${config.systemType === system.id 
                      ? 'bg-emerald-700 text-white' 
                      : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSystemTypeChange(system.id)}
                  >
                    <p className="text-center font-medium">{system.name}</p>
                    {config.systemType === system.id && (
                      <motion.div 
                        className="h-1 bg-emerald-500 rounded-full mt-2"
                        layoutId="systemTypeIndicator"
                      ></motion.div>
                    )}
                  </motion.div>
                ));
              })()}
            </div>
          </motion.div>
        )}
        
        {/* Pendant Selection Options */}
        {activeStep === 'pendantSelection' && config.configurationType === 'pendant' && (
          <motion.div 
            className="p-4"
            key="pendantSelection"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-between items-center mb-3 ">
              <h3 className="text-lg font-bold text-white font-['Amenti']">Select Pendants to Configure</h3>
              <div className="text-xs pr-8 text-gray-400">
                {config.pendants.length} pendant{config.pendants.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            {/* Pendant selection controls */}
            <div className="flex justify-between mb-3">
              <button 
                onClick={selectAllPendants}
                className="px-3 py-1 rounded-lg text-sm bg-gray-700 hover:bg-gray-600 text-white"
              >
                Select All
              </button>
              
              {selectedPendants.length > 0 && (
                <button 
                  onClick={clearSelections}
                  className="px-3 py-1 rounded-lg text-sm bg-gray-700 hover:bg-gray-600 text-white"
                >
                  Clear Selection ({selectedPendants.length})
                </button>
              )}
            </div>
            
            {/* Draggable indicator and instructions */}
            <div className="flex items-center justify-center mb-2 text-gray-400 text-sm">
              <FaHandPaper className="mr-2 animate-pulse" />
              <span>Drag to scroll</span>
              <FaArrowsAltH className="ml-2" />
            </div>
            
            {/* Scrollable pendant selector with slider */}
            <div className="relative mb-4">
              {maxScroll > 10 && (
                <motion.button
                  onClick={scrollToLeft}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white shadow-md ${scrollPosition <= 10 ? 'opacity-40 cursor-not-allowed' : 'opacity-100'}`}
                  disabled={scrollPosition <= 10}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaChevronLeft />
                </motion.button>
              )}
              
              <div 
                ref={scrollContainerRef}
                className="flex overflow-x-auto hide-scrollbar py-4 px-10 relative"
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  cursor: 'grab',
                  WebkitOverflowScrolling: 'touch',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none'
                }}
                onScroll={handleScroll}
                onMouseDown={(e) => {
                  if (e.currentTarget) {
                    const container = e.currentTarget;
                    const startX = e.pageX - container.offsetLeft;
                    const scrollLeft = container.scrollLeft;
                    
                    const handleMouseMove = (e) => {
                      const x = e.pageX - container.offsetLeft;
                      const walk = (x - startX) * 2; // Scroll speed multiplier
                      container.scrollLeft = scrollLeft - walk;
                    };
                    
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                      container.style.cursor = 'grab';
                    };
                    
                    container.style.cursor = 'grabbing';
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }
                }}
              >
              
                {config.pendants.map((pendant, index) => (
                  <motion.div 
                    key={index}
                    className="flex-shrink-0 mx-2 cursor-pointer"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => togglePendantSelection(index)}
                    style={{ userSelect: 'none' }}
                  >
                    <div 
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold transition-all overflow-hidden relative ${selectedPendants.includes(index) 
                        ? 'ring-2 ring-emerald-500 ring-offset-2' 
                        : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                    >
                      {/* Background image of pendant design */}
                      {pendant?.design && (
                        <div 
                          className="absolute inset-0 w-full h-full opacity-80"
                          style={{
                            backgroundImage: `url(/images/configOptions/${pendant.design === 'bumble' ? '1' : pendant.design === 'radial' ? '2' : pendant.design === 'fina' ? '3' : '5'}.png)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                          }}
                        ></div>
                      )}
                      
                      {/* Overlay for better text visibility */}
                      <div className={`absolute inset-0 ${selectedPendants.includes(index) ? 'bg-emerald-500/70' : 'bg-gray-800/50'}`}></div>
                      
                      {/* Pendant number */}
                      <span className="relative z-10 text-white">
                        {index + 1}
                      </span>
                    </div>
                    <div className="text-center text-xs mt-1 text-gray-300">
                      <span className="capitalize">{pendant?.design || 'bumble'}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {maxScroll > 10 && (
                <motion.button
                  onClick={scrollToRight}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white shadow-md ${scrollPosition >= maxScroll - 10 ? 'opacity-40 cursor-not-allowed' : 'opacity-100'}`}
                  disabled={scrollPosition >= maxScroll - 10}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaChevronRight />
                </motion.button>
              )}
            </div>
            
            {/* Design selection for selected pendants */}
            {selectedPendants.length > 0 && (
              <motion.div 
                className="p-4 rounded-lg bg-gray-800"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-white">
                    Configure {selectedPendants.length === config.pendants.length ? 'All' : selectedPendants.length} Pendant{selectedPendants.length !== 1 ? 's' : ''}
                  </h4>
                  
                  {selectedPendants.length < config.pendants.length && (
                    <button 
                      onClick={() => applyDesignToAll(currentDesign)}
                      className="px-3 py-1 text-sm bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg"
                    >
                      Apply to All
                    </button>
                  )}
                </div>
                
                <div className="flex space-x-4 overflow-x-auto hide-scrollbar py-2">
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
                        // First update the design, then apply it in a separate step
                        // to ensure we're using the latest value
                        setCurrentDesign(design.id);
                        // Use the design.id directly instead of relying on currentDesign state
                        // which might not be updated yet
                        onPendantDesignChange(selectedPendants, design.id);
                        toast.success(`Applied ${design.name} design to ${selectedPendants.length} pendant(s)`);
                      }}
                    >
                      <div className={`w-16 h-16 rounded-full overflow-hidden relative ${currentDesign === design.id ? 'ring-2 ring-emerald-500 ring-offset-2' : ''}`}>
                        <Image
                          src={design.image}
                          alt={design.name}
                          fill
                          className="object-cover"
                        />
                        {currentDesign === design.id && (
                          <div className="absolute inset-0 bg-emerald-500/30 flex items-center justify-center">
                            <FaCheck className="text-white text-xl" />
                          </div>
                        )}
                      </div>
                      <p className="text-center text-xs mt-1 text-gray-300">{design.name}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Show message when no pendants are selected */}
            {selectedPendants.length === 0 && (
              <div className="p-4 rounded-lg text-center bg-gray-800">
                <p className="text-sm text-gray-300">Select one or more pendants above to configure them.</p>
              </div>
            )}
          </motion.div>
        )}
        
        {/* System Configuration Options */}
        {activeStep === 'pendantSelection' && config.configurationType === 'system' && (
          <motion.div 
            className="p-4"
            key="systemConfig"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h3 className="text-lg font-bold mb-3 text-white font-['Amenti']">System Configuration</h3>
            <div className="p-4 rounded-lg bg-gray-800  ">
              <p className="text-center text-gray-300">System configuration options for {config.systemType} system</p>
              
              {/* Placeholder for system-specific options */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                {[
                  { id: "spacing", name: "Spacing", options: ["Compact", "Standard", "Wide"] },
                  { id: "arrangement", name: "Arrangement", options: ["Linear", "Cluster", "Staggered"] }
                ].map((option) => (
                  <div key={option.id} className="bg-gray-700 p-3 rounded-lg">
                    <h4 className="text-sm font-medium mb-2 text-white">{option.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {option.options.map((value, i) => (
                        <button 
                          key={i}
                          className={`px-3 py-1 text-xs rounded-full ${i === 0 ? 'bg-emerald-600 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'}`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      )}
      </motion.div>
    </div>
  );
};

export default HorizontalOptionsBar;
