  "use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import {
  NavButton,
  ProgressIndicator,
  LightTypeDropdown,
  BaseTypeDropdown,
  LightAmountDropdown,
  SystemTypeDropdown,
  PendantSelectionDropdown,
  SystemConfigurationDropdown,
  SaveConfigurationModal,
  useNavSteps,
  useNavDropdown,
  usePendantSelection
} from './navComponents';
import { IndividualConfigurationPanel } from './navComponents/IndividualConfigurationPanel';
import { ConfigPanel } from './navComponents/ConfigPanel';
import BaseColorPanel from './navComponents/BaseColorPanel';

const VerticalNavBar = ({ 
  containerDimensions,
  activeStep,
  setActiveStep,
  config,
  cables,
  onLightTypeChange,
  onBaseTypeChange,
  onBaseColorChange,
  onLightAmountChange,
  onSystemTypeChange,
  onPendantDesignChange
}) => {
  // Define colors from LIMI brand palette
  const emerald = '#50C878';
  const charlestonGreen = '#2B2D2F';
  const textColor = '#FFFFFF';

  
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
  // Get navigation steps
  const { steps } = useNavSteps(config);
  
  // Custom dropdown state management with auto-close config panel functionality
  const { 
    openDropdown, 
    setOpenDropdown, 
    dropdownRefs
  } = useNavDropdown(setActiveStep);
  
  // Handle step click in vertical nav - with auto-close config panel
  const handleStepClick = (stepId) => {
    // Auto-close config panel when clicking on any vertical navbar option
    if (localConfiguringType) {
      setLocalConfiguringType(null);
      // Also reset in parent component
      // if (onConfigurationTypeChange) {
      //   onConfigurationTypeChange(null);
      // }
    }
    
    // Always set this step as the active step
    setActiveStep(stepId);
    
    // Toggle the dropdown for this step
    setOpenDropdown(openDropdown === stepId ? null : stepId);
    
    // Close any other dropdowns
    if (openDropdown && openDropdown !== stepId) {
      setOpenDropdown(null);
    }
  };
  
  // Toggle dropdown for a step - with auto-close config panel
  const toggleDropdown = (stepId) => {
    // Auto-close config panel when toggling any dropdown in vertical navbar
    if (localConfiguringType) {
      setLocalConfiguringType(null);
      // Also reset in parent component
      // if (onConfigurationTypeChange) {
      //   onConfigurationTypeChange(null);
      // }
    }
    
    if (openDropdown === stepId) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(stepId);
    }
  };
  
  // Configuration type selector state
  const [showConfigurationTypeSelector, setShowConfigurationTypeSelector] = useState(false);
  
  // Remove localConfiguringType and all legacy config type logic.
  // Use config and cables as the single source of truth.
  // If you need to track selection, use local state here or keep it in config.

  // Update local state when prop changes
  useEffect(() => {
    setLocalConfiguringType(configuringType);
  }, [configuringType]);
  
  // --- Unified cable selection state and handlers ---
  // These should be managed in the parent (ConfiguratorLayout), but here is the interface:
  // cables: array of all cables (pendants/systems)
  // selectedCableIndexes: array of selected cable indexes
  // onToggleCableSelection, onSelectAllCables, onClearCableSelections, onApplyDesignToSelected, onCableDesignChange: handlers
  //
  // Remove legacy pendant/selectedPendants usage entirely.
  // All selection and config actions now use cables and selectedCableIndexes.
  //
  // The following props must be passed to this component:
  // cables, selectedCableIndexes, onToggleCableSelection, onSelectAllCables, onClearCableSelections, onApplyDesignToSelected, onCableDesignChange
  //
  // Remove usePendantSelection and legacy pendant state.

  
  // Handle pendant location selection to show configuration type selector
  const handlePendantLocationClick = (locationIndex) => {
    // Only show configuration type selector when clicking a pendant location
    // but don't reset the multi-selection functionality
    if (!selectedPendants.includes(locationIndex)) {
      // If not already selected, add to selection and show config selector
      setSelectedPendants([...selectedPendants, locationIndex]);
      setShowConfigurationTypeSelector(true);
    } else {
      // If already selected, just toggle selection without showing config selector
      const newSelection = selectedPendants.filter(id => id !== locationIndex);
      setSelectedPendants(newSelection);
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
  
  // Calculate progress based on active step
  const calculateProgress = () => {
    const currentStepIndex = steps.findIndex(step => step.id === activeStep);
    return (currentStepIndex + 1) / steps.length;
  };
  
  // Function to get icon for navigation buttons
  const getNavIcon = (stepId) => {
    // Find the step with this ID
    const step = steps.find(s => s.id === stepId);
    
    // Return the image path if it exists, otherwise null to use the React icon
    return step?.image || null;
  };

  // Determine if we should show the vertical nav bar
  const showVerticalNav = !configuringType;
  
  return (
    <>
      {/* Only show vertical nav when not configuring individual pendant/system */}
      {showVerticalNav && (
        <div 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-[100] pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <ProgressIndicator progress={calculateProgress()} emerald={emerald} />
          <motion.div 
            className="p-3 rounded-full flex flex-col gap-4" 
            style={{ backgroundColor: charlestonGreen }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            
            {steps.filter(step => {
              // Hide baseType step when not ceiling light type
              if (step.id === 'baseType' && config.lightType !== 'ceiling') {
                return false;
              }
              return true;
            }).map((step, index) => (
              
              <NavButton
                key={step.id}
                step={step}
                index={index}
                activeStep={activeStep}
                openDropdown={openDropdown}
                handleStepClick={handleStepClick}
                toggleDropdown={toggleDropdown}
                getNavIcon={getNavIcon}
                emerald={emerald}
                charlestonGreen={charlestonGreen}
                textColor={textColor}
                dropdownRefs={dropdownRefs}
                containerDimensions={containerDimensions}
              >
                {step?.id === 'lightType' && openDropdown === step?.id && (
                  <LightTypeDropdown 
                    config={config}
                    onLightTypeChange={onLightTypeChange}
                    setActiveStep={setActiveStep}
                    setOpenDropdown={setOpenDropdown}
                  />
                )}
                
                {step?.id === 'baseType' && openDropdown === step?.id && (
                  <BaseTypeDropdown 
                    config={config}
                    onBaseTypeChange={onBaseTypeChange}
                    setActiveStep={setActiveStep}
                    setOpenDropdown={setOpenDropdown}
                  />
                )}
                
                {step?.id === 'baseColor' && openDropdown === step?.id && (
                  <BaseColorPanel 
                    currentBaseColor={config.baseColor}
                    onBaseColorChange={onBaseColorChange}
                  />
                )}
                
                {step?.id === 'lightAmount' && openDropdown === step?.id && (
                  <LightAmountDropdown 
                    config={config}
                    onLightAmountChange={onLightAmountChange}
                    setActiveStep={setActiveStep}
                    setOpenDropdown={setOpenDropdown}
                  />
                )}
                
                {step?.id === 'pendantSelection' && openDropdown === step?.id && (
  <PendantSelectionDropdown
    cables={cables}
    // If you need cable selection, manage it here or in config
    onCableDesignChange={onPendantDesignChange}
    onClose={() => setOpenDropdown(null)}
  />
)}
                
              </NavButton>
            
          ))}
        </motion.div>
      </div>
    )}
    
    {/* Configuration Panel */}
    <AnimatePresence>
      {(showConfigurationTypeSelector || localConfiguringType) && selectedCableIndexes.length > 0 && !isMobile && (
        <ConfigPanel
  cables={cables}
  // If you need cable selection, manage it here or in config
  onCableDesignChange={onPendantDesignChange}
  onClose={() => setOpenDropdown(null)}
/>
      )}
    </AnimatePresence>
    </>
  );
};

export default VerticalNavBar;
