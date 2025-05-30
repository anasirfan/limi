"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLightbulb, 
  FaLayerGroup, 
  FaRegLightbulb, 
  FaObjectGroup, 
  FaList,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaChevronUp,
  FaChevronDown,
  FaArrowsAltH,
  FaHandPaper,
  FaSave,
  FaShoppingCart,
  FaUser
} from "react-icons/fa";
import { Tooltip } from './Tooltip';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useRouter } from 'next/router';

const VerticalNavBar = ({ 
  activeStep, 
  setActiveStep, 
  config,
  onLightTypeChange,
  onBaseTypeChange,
  onConfigurationTypeChange,
  onLightAmountChange,
  onSystemTypeChange,
  onPendantSelection,
  onPendantDesignChange,
  pendants,
  selectedPendants,
  setSelectedPendants
}) => {
  // Function to get dynamic navigation icons with fallbacks
  const getNavIcon = (step) => {
    try {
      switch(step) {
        case 'lightType':
          return `/images/navIcons/lightType/${config.lightType}_pendant.png`;
        case 'baseType':
          return `/images/navIcons/baseType/${config.baseType}.png`;
        case 'configurationType':
          return `/images/navIcons/configurationType/${config.configurationType}.png`;
        case 'lightAmount':
          return `/images/navIcons/lightAmount/${config.lightType}_${config.lightAmount}.png`;
        case 'pendantSelection':
          // For pendant selection, we'll use the same icon as lightAmount for now
          return `/images/navIcons/lightAmount/${config.lightType}_${config.lightAmount}.png`;
        default:
          return null;
      }
    } catch (error) {
      console.error(`Error getting nav icon for ${step}:`, error);
      return null;
    }
  };

  // State for dropdown visibility
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentDesign, setCurrentDesign] = useState('radial');
  const dropdownRefs = useRef({});
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && dropdownRefs.current[openDropdown] && 
          !dropdownRefs.current[openDropdown].contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);
  
  // Define navigation steps
  const steps = [
    { 
      id: 'lightType', 
      icon: <FaLightbulb />, 
      label: 'Light Type',
      tooltip: 'Select light type (wall, ceiling, floor)',
      isActive: true // Always active
    },
    { 
      id: 'baseType', 
      icon: <FaLayerGroup />, 
      label: 'Base Type',
      tooltip: 'Select base type (round, rectangular)',
      isActive: config.lightType === 'ceiling' // Only active for ceiling lights
    },
    { 
      id: 'configurationType', 
      icon: <FaObjectGroup />, 
      label: 'Configuration Type',
      tooltip: 'Configure pendants or system',
      isActive: true // Always active
    },
    { 
      id: 'lightAmount', 
      icon: <FaRegLightbulb />, 
      label: config.configurationType === 'pendant' ? 'Light Amount' : 'System Type',
      tooltip: config.configurationType === 'pendant' 
        ? 'Select number of lights' 
        : 'Select system type',
      isActive: true // Always active
    },
    { 
      id: 'pendantSelection', 
      icon: <FaList />, 
      label: config.configurationType === 'pendant' ? 'Select Pendants' : 'Select Systems',
      tooltip: config.configurationType === 'pendant' 
        ? 'Configure individual pendants' 
        : 'Configure system options',
      isActive: true // Always active - fixed to allow switching back
    }
  ];

  // Handle step click - toggle dropdown or navigate to step
  const handleStepClick = (stepId) => {
    // Always set this step as the active step
    setActiveStep(stepId);
    
    // Toggle the dropdown for this step
    setOpenDropdown(openDropdown === stepId ? null : stepId);
    
    // Close any other dropdowns
    if (openDropdown && openDropdown !== stepId) {
      setOpenDropdown(null);
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = (stepId) => {
    // Set this as the active step
    setActiveStep(stepId);
    
    // Toggle the dropdown
    setOpenDropdown(openDropdown === stepId ? null : stepId);
  };
  
  // Helper functions for pendant selection
  const togglePendantSelection = (pendantId) => {
    if (selectedPendants.includes(pendantId)) {
      setSelectedPendants(selectedPendants.filter(id => id !== pendantId));
    } else {
      setSelectedPendants([...selectedPendants, pendantId]);
    }
  };
  
  const selectAllPendants = () => {
    const allPendants = pendants.map((_, index) => index);
    setSelectedPendants(allPendants);
  };
  
  const clearSelections = () => {
    setSelectedPendants([]);
  };
  
  // Carousel scroll functionality
  const carouselRef = useRef(null);
  
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  // Modal state for save configuration
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [configName, setConfigName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would be connected to your auth system
  const [isSaving, setIsSaving] = useState(false);
  
  // Handle save configuration
  const handleSaveConfig = () => {
    setShowSaveModal(true);
    setConfigName(`${config.lightType.charAt(0).toUpperCase() + config.lightType.slice(1)} Light Configuration`);
  };
  
  // Save configuration to system
  const saveConfigToSystem = () => {
    if (!configName.trim()) {
      // You would show a toast notification here
      return;
    }
    
    setIsSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setShowSaveModal(false);
      setIsSaving(false);
      // You would show a success notification here
    }, 1500);
  };
  
  // Helper function to map design names to their corresponding image numbers
  const getDesignImageNumber = (designName) => {
    const designMap = {
      'bumble': '1.png',
      'radial': '2.png',
      'fina': '3.png',
      'ripple': '5.png',
      // Add any other design mappings here
    };
    
    return designMap[designName] || `${designName}.jpg`; // Fallback to the design name if not found
  };
  
  const applyDesignToSelected = (design) => {
    if (selectedPendants.length === 0) return;
    onPendantDesignChange(selectedPendants, design);
  };

  const applyToAllPendants = (design) => {
    if (selectedPendants.length === 0) return;
    onPendantDesignChange(pendants.map((_, index) => index), design);
  };

  // Calculate progress based on active step
  const calculateProgress = () => {
    const stepIndex = steps.findIndex(s => s.id === activeStep);
    return ((stepIndex + 1) / steps.length) * 100;
  };

  // Define colors from LIMI brand palette
  const emerald = '#50C878';
  const charlestonGreen = '#2B2D2F';
  const textColor = '#FFFFFF';
  
  return (
    <>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50">
    
          {/* Vertical progress indicator */}
          <div className="absolute right-0 top-0 bottom-0 w-1 rounded-full bg-gray-700 -translate-y-[5%] translate-x-[20px] h-[110%]">
            <motion.div 
              className="absolute top-0 left-0 w-full rounded-full" 
              style={{ 
                backgroundColor: emerald,
                height: `${calculateProgress()}%`,
                transition: 'height 0.3s ease-out'
              }}
            />
          </div>
          
          <motion.div
          className="p-3 rounded-full flex flex-col gap-4"
          style={{ 
            backgroundColor: charlestonGreen,
            boxShadow: `0 4px 20px rgba(0,0,0,0.2), 0 0 0 1px ${emerald}20`
          }}
        >
          <div className="flex flex-col gap-6">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Tooltip only shows when dropdown is closed */}
                {openDropdown !== step.id && (
                  <Tooltip content={step.tooltip} position="left">
                    <div className="relative group">
                      <motion.button
                        className={`rounded-full flex items-center justify-center transition-all duration-300 w-10 h-10`}
                        style={{
                          backgroundColor: openDropdown === step.id ? emerald : 
                                          activeStep === step.id ? emerald : 'transparent',
                          color: openDropdown === step.id ? '#FFFFFF' : 
                                activeStep === step.id ? '#FFFFFF' : 
                                step.isActive ? `${textColor}80` : `${textColor}40`
                        }}
                        onClick={() => handleStepClick(step.id)}
                        whileHover={step.isActive ? { scale: 1.1 } : {}}
                        whileTap={step.isActive ? { scale: 0.95 } : {}}
                        disabled={!step.isActive}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 300, 
                          damping: 20,
                          delay: 0.1 * index 
                        }}
                      >
                        {getNavIcon(step.id) ? (
                          <Image 
                            src={getNavIcon(step.id)}
                            alt={step.label}
                            width={32}
                            height={32}
                            className="object-contain"
                            onError={(e) => {
                              // Fallback to the original icon if image fails to load
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'block';
                            }}
                          />
                        ) : null}
                        <div className={getNavIcon(step.id) ? 'hidden' : ''}>
                          {step.icon}
                        </div>
                      </motion.button>
                    </div>
                  </Tooltip>
                )}
                
                {/* Button without tooltip when dropdown is open */}
                {openDropdown === step.id && (
                  <motion.button
                    className={`rounded-full flex items-center justify-center transition-all duration-300 w-10 h-10`}
                    style={{
                      backgroundColor: emerald,
                      color: '#FFFFFF'
                    }}
                    onClick={() => toggleDropdown(step.id)}
                    whileTap={{ scale: 0.95 }}
                  >
                    {getNavIcon(step.id) ? (
                      <Image 
                        src={getNavIcon(step.id)}
                        alt={step.label}
                        width={32}
                        height={32}
                        className="object-contain"
                        onError={(e) => {
                          // Fallback to the original icon if image fails to load
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    ) : null}
                    <div className={getNavIcon(step.id) ? 'hidden' : ''}>
                      {step.icon}
                    </div>
                  </motion.button>
                )}
                
                {/* Dropdown content */}
                <AnimatePresence>
                  {openDropdown === step.id && (
                    <motion.div
                      ref={el => dropdownRefs.current[step.id] = el}
                      className="absolute right-full mr-3 top-0 bg-gray-800 rounded-lg shadow-xl z-50 overflow-hidden"
                      style={{ 
                        width: '280px',
                        boxShadow: `0 4px 20px rgba(0,0,0,0.3), 0 0 0 1px ${emerald}20`
                      }}
                      initial={{ opacity: 0, x: 20, width: 0 }}
                      animate={{ opacity: 1, x: 0, width: '280px' }}
                      exit={{ opacity: 0, x: 20, width: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      {/* Light Type Dropdown */}
                      {step.id === 'lightType' && (
                        <div className="p-4">
                          <h3 className="text-base font-bold text-white mb-3 font-['Amenti']">{step.label}</h3>
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
                                    onLightTypeChange(type);
                                    // Don't automatically switch to next tab
                                    // setActiveStep('baseType');
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
                      )}
                      
                      {/* Base Type Dropdown */}
                      {step.id === 'baseType' && (
                        <div className="p-4">
                          <h3 className="text-base font-bold text-white mb-3 font-['Amenti']">{step.label}</h3>
                          <div className="flex space-x-3">
                            {['round', 'rectangular'].map((type) => (
                                <motion.button
                                  key={type}
                                  className={`flex flex-col items-center ${config.baseType === type ? 'text-emerald-500' : 'text-gray-300 hover:text-white'}`}
                                  onClick={() => {
                                    onBaseTypeChange(type);
                                    setActiveStep('configurationType');
                                    setOpenDropdown(null);
                                  }}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <div className={`w-16 h-16 rounded-full overflow-hidden relative ${config.baseType === type ? 'ring-2 ring-emerald-500' : ''}`}>
                                    <Image 
                                      src={`/images/configbase/${type}.png`}
                                      alt={`${type} base`}
                                      fill
                                      className="object-cover"
                                      priority
                                    />
                                  </div>
                                  <span className="text-xs">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                                </motion.button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Configuration Type Dropdown */}
                      {step.id === 'configurationType' && (
                        <div className="p-4">
                          <h3 className="text-base font-bold text-white mb-3 font-['Amenti']">{step.label}</h3>
                          <div className="flex space-x-3">
                            {['pendant', 'system'].map((type) => {
                              // Determine the correct image path based on light type
                              let imagePath = '';
                              
                              // For ceiling lights, we need lightAmount_baseType_systemType.png
                              if (config.lightType === 'ceiling') {
                                // Default to 1 light if not set
                                const lightAmount = config.baseType === 'rectangular' ? 3 : 1;
                                // Default to round base if not set
                                const baseType = config.baseType || 'round';
                                imagePath = `/images/configtype/${config.lightType}/${lightAmount}_${baseType}_${type}.png`;
                              } 
                              // For floor and wall lights, we need lightAmount_systemType.png
                              else {
                                // Default to appropriate light amount based on type
                                const lightAmount = config.lightType === 'wall' ? 1 : 3;
                                imagePath = `/images/configtype/${config.lightType}/${lightAmount}_${type}.png`;
                              }
                              console.log("image path " , imagePath)
                              
                              return (
                                <motion.button
                                  key={type}
                                  className={`flex flex-col items-center ${config.configurationType === type ? 'text-emerald-500' : 'text-gray-300 hover:text-white'}`}
                                  onClick={() => {
                                    onConfigurationTypeChange(type);
                                    setActiveStep('lightAmount');
                                    setOpenDropdown(null);
                                  }}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <div className={`w-16 h-16 rounded-full overflow-hidden relative ${config.configurationType === type ? 'ring-2 ring-emerald-500' : ''}`}>
                                    <Image 
                                      src={imagePath}
                                      alt={`${type} configuration`}
                                      fill
                                      className="object-cover"
                                      priority
                                    />
                                  </div>
                                  <span className="text-xs mt-1">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      
                      {/* Light Amount / System Type Dropdown */}
                      {step.id === 'lightAmount' && (
                        <div className="p-4">
                          <h3 className="text-base font-bold text-white mb-3 font-['Amenti']">
                            {config.configurationType === 'pendant' ? 'Light Amount' : 'System Type'}
                          </h3>
                          
                          {config.configurationType === 'pendant' ? (
                            <div className="flex flex-wrap gap-3">
                              {/* Different light amounts based on light type */}
                              {(() => {
                                // Define available light amounts based on light type
                                let lightAmounts = [];
                                if (config.lightType === 'wall') {
                                  lightAmounts = [1];
                                } else if (config.lightType === 'floor') {
                                  lightAmounts = [3];
                                } else if (config.lightType === 'ceiling') {
                                  lightAmounts = [1, 3, 6, 24];
                                }
                                
                                return lightAmounts.map((amount) => (
                                  <motion.button
                                    key={amount}
                                    className={`flex flex-col items-center ${config.lightAmount === amount ? 'text-emerald-500' : 'text-gray-300 hover:text-white'}`}
                                    onClick={() => {
                                      onLightAmountChange(amount);
                                      setActiveStep('pendantSelection');
                                      setOpenDropdown(null);
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <div className={`w-16 h-16 rounded-full overflow-hidden relative ${config.lightAmount === amount ? 'ring-2 ring-emerald-500' : ''}`}>
                                      <Image 
                                        src={`/images/configIcons/${config.lightType}/${amount}.png`}
                                        alt={`${amount} light${amount !== 1 ? 's' : ''}`}
                                        fill
                                        className="object-cover"
                                        priority
                                      />
                                    </div>
                                    {/* <span className="text-xs mt-1">{amount} Light{amount !== 1 ? 's' : ''}</span> */}
                                  </motion.button>
                                ));
                              })()} 
                            </div>
                          ) : (
                            <div className="flex space-x-3">
                              {['line', 'grid'].map((type) => (
                                <motion.button
                                  key={type}
                                  className={`flex flex-col items-center ${config.systemType === type ? 'text-emerald-500' : 'text-gray-300 hover:text-white'}`}
                                  onClick={() => {
                                    onSystemTypeChange(type);
                                    setActiveStep('pendantSelection');
                                    setOpenDropdown(null);
                                  }}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <div className={`w-16 h-16 rounded-full overflow-hidden relative ${config.systemType === type ? 'ring-2 ring-emerald-500' : ''}`}>
                                    <Image 
                                      src={`/images/configIcons/system/${type}.png`}
                                      alt={`${type} system`}
                                      fill
                                      className="object-cover"
                                      priority
                                    />
                                  </div>
                                  <span className="text-xs mt-1">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                                </motion.button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Pendant Selection Dropdown */}
                      {step.id === 'pendantSelection' && config.configurationType === 'pendant' && (
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
                          {selectedPendants.length > 0 && (
                            <motion.div 
                              className="p-3 rounded-lg bg-black"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="text-sm font-bold text-white">
                                  Select Design
                                </h4>
                              </div>
                              
                              <div className="flex space-x-3 overflow-x-auto hide-scrollbar py-2">
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
                                      onPendantDesignChange(selectedPendants, design.id);
                                    }}
                                  >
                                    <div className={`w-12 h-12 rounded-full overflow-hidden relative ${currentDesign === design.id ? 'ring-2 ring-emerald-500 ring-offset-1' : ''}`}>
                                      <Image
                                        src={design.image}
                                        alt={design.name}
                                        fill
                                        className="object-cover"
                                      />
                                      {currentDesign === design.id && (
                                        <div className="absolute inset-0 bg-emerald-500/30 flex items-center justify-center">
                                          <FaCheck className="text-white text-sm" />
                                        </div>
                                      )}
                                    </div>
                                    <p className="text-center text-xs mt-1 text-gray-300">{design.name}</p>
                                  </motion.div>
                                ))}
                              </div>
                              
                              {/* Apply to all button */}
                              {selectedPendants.length > 0 && selectedPendants.length < pendants.length && (
                                <motion.button
                                  onClick={() => applyToAllPendants(currentDesign)}
                                  className="mt-3 w-full py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-500 rounded-lg flex items-center justify-center gap-2 text-sm"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <FaCheck size={12} /> Apply to All Pendants
                                </motion.button>
                              )}
                              
                              {/* Save and Preview buttons */}
                              <div className="flex justify-between mt-4 gap-2">
                                <motion.button 
                                  onClick={handleSaveConfig}
                                  className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors text-xs"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <FaSave size={12} /> Save
                                </motion.button>
                                <motion.button 
                                  onClick={() => {
                                    // Handle add to cart
                                    console.log('Add to cart');
                                  }}
                                  className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-lg transition-colors text-xs"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <FaShoppingCart size={12} /> Add to Cart
                                </motion.button>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      )}
                      
                      {/* System Configuration Dropdown */}
                      {step.id === 'pendantSelection' && config.configurationType === 'system' && (
                        <div className="p-4">
                          <h3 className="text-base font-bold text-white mb-3 font-['Amenti']">System Options</h3>
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-300">System Type</span>
                              <span className="text-white font-medium capitalize">{config.systemType}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-300">Base Type</span>
                              <span className="text-white font-medium capitalize">{config.baseType}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Save Configuration Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#2B2D2F] rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold text-white mb-4">Save Your Configuration</h3>
            
            {!isLoggedIn ? (
              <div className="text-center py-4">
                <div className="mb-4 text-gray-300">
                  <FaUser className="text-4xl mx-auto mb-3 text-[#50C878]" />
                  <p>You need to be logged in to save configurations.</p>
                </div>
                <div className="flex gap-3 justify-center">
                  <motion.button
                    onClick={() => window.location.href = '/portal'}
                    className="bg-[#50C878] hover:bg-[#3da861] text-white px-4 py-2 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Log In
                  </motion.button>
                  <motion.button
                    onClick={() => setShowSaveModal(false)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Configuration Name</label>
                  <input 
                    type="text" 
                    value={configName}
                    onChange={(e) => setConfigName(e.target.value)}
                    placeholder="My Perfect Lighting Setup"
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#50C878]"
                  />
                </div>
                
                <div className="p-3 bg-gray-800 rounded-lg mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Configuration Summary</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-400">
                    <div>Type: <span className="text-white capitalize">{config.lightType}</span></div>
                    <div>Amount: <span className="text-white">{config.lightAmount}</span></div>
                    <div>Design: <span className="text-white capitalize">{currentDesign}</span></div>
                    <div>Configuration: <span className="text-white capitalize">{config.configurationType}</span></div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <motion.button
                    onClick={() => setShowSaveModal(false)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={saveConfigToSystem}
                    className="bg-[#50C878] hover:bg-[#3da861] text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaCheck /> Save
                      </>
                    )}
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default VerticalNavBar;
