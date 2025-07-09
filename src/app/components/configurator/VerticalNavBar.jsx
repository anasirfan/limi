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
  usePendantSelection,
} from './navComponents';
import { IndividualConfigurationPanel } from './navComponents/IndividualConfigurationPanel';
import { ConfigPanel } from './navComponents/ConfigPanel';
import BaseColorPanel from './navComponents/BaseColorPanel';
const VerticalNavBar = ({ 
  activeStep, 
  setActiveStep, 
  config,
  cables, // Add cables prop
  onCableSizeChange, // Add cable size change handler
  onLightTypeChange,
  onBaseTypeChange,
  onBaseColorChange,
  onConfigurationTypeChange,
  onLightAmountChange,
  onSystemTypeChange,
  onPendantSelection,
  onPendantDesignChange,
  onSystemBaseDesignChange,
  pendants,
  selectedPendants,
  setSelectedPendants,
  onLocationSelection,
  configuringType,
  configuringSystemType,
  breadcrumbPath,
  onBreadcrumbNavigation,

  
  onSystemTypeSelection,
  containerDimensions,
  onShadeSelect // Add onShadeSelect prop
}) => {
  // Define colors from LIMI brand palette
  const emerald = '#50C878';
  const charlestonGreen = '#2B2D2F';
  const textColor = '#FFFFFF';
  
  const [isMobile, setIsMobile] = useState(false);
  const sendMessageToPlayCanvas = (message) => {
    console.log("Sending message to PlayCanvas iframe:", message);
    const iframe = document.getElementById("playcanvas-app");
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(message, "*");
    }
  };

  
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
    console.log("handleStepClick", stepId);
    if (localConfiguringType) {
      setLocalConfiguringType(null);
      // Also reset in parent component
      if (onConfigurationTypeChange) {
        onConfigurationTypeChange(null);
      }
    }
    if(stepId === 'pendantSelection'){
      sendMessageToPlayCanvas(`hotspot:on`);
    }else{
      sendMessageToPlayCanvas(`hotspot:off`);
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
      if (onConfigurationTypeChange) {
        onConfigurationTypeChange(null);
      }
    }
    
    if (openDropdown === stepId) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(stepId);
    }
  };
  
  // Configuration type selector state
  const [showConfigurationTypeSelector, setShowConfigurationTypeSelector] = useState(false);
  
  // Local state for configuration type (will be synced with parent component)
  const [localConfiguringType, setLocalConfiguringType] = useState(configuringType);
  
  // Update local state when prop changes
  useEffect(() => {
    setLocalConfiguringType(configuringType);
  }, [configuringType]);
  
  // Pendant selection functionality
  const {
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
    getPendantDesignImageNumber
  } = usePendantSelection(pendants, selectedPendants, setSelectedPendants, onPendantDesignChange);
  
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
                
                {/* Configuration type dropdown removed */}
                
                {step?.id === 'systemType' && openDropdown === step?.id && (
                  <SystemTypeDropdown 
                    config={config}
                    onSystemTypeChange={onSystemTypeChange}
                    setActiveStep={setActiveStep}
                    setOpenDropdown={setOpenDropdown}
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
                    pendants={pendants}
                    selectedPendants={selectedPendants}
                    cables={cables} // Pass cables prop to child component
                    currentDesign={currentDesign}
                    setCurrentDesign={setCurrentDesign}
                    carouselRef={carouselRef}
                    onCableSizeChange={onCableSizeChange}
                    getPendantDesignImageNumber={getPendantDesignImageNumber}
                    scrollCarousel={scrollCarousel}
                    togglePendantSelection={(locationIndex) => {
                      handlePendantLocationClick(locationIndex);
                    }}
                    selectAllPendants={selectAllPendants}
                    clearSelections={clearSelections}
                    applyDesignToSelected={applyDesignToSelected}
                    applyToAllPendants={applyToAllPendants}
                    getDesignImageNumber={getDesignImageNumber}
                    handleSaveConfig={handleSaveConfig}
                    configuringType={localConfiguringType}
                    configuringSystemType={configuringSystemType}
                    breadcrumbPath={breadcrumbPath}
                    onBreadcrumbNavigation={onBreadcrumbNavigation}
                    onSystemTypeSelection={onSystemTypeSelection}
                    selectedLocation={selectedPendants[0]}
                    onPendantDesignChange={onPendantDesignChange}
                    onSystemBaseDesignChange={onSystemBaseDesignChange}
                    onSelectConfigurationType={(type) => {
                      // This matches the original handleConfigTypeSelection function
                      setLocalConfiguringType(type);
             
                      // if(type == 'pendant' || type == 'system'){
                      //   setShowConfigurationTypeSelector(false);
                      // }
                      
                      // Update the active step based on the configuration type
                      if (type === 'pendant') {
                        setActiveStep('pendantSelection');
                      } else if (type === 'system') {
                        setActiveStep('systemType');
                      } 
                      
                      // Call the parent component's handler if it exists
                      if (onConfigurationTypeChange) {
                        onConfigurationTypeChange(type);
                      }
                    }}
                    onClose={() => {
                      setShowConfigurationTypeSelector(false);
                      // Call parent handler to reset configuration type
                      if (onConfigurationTypeChange) {
                        onConfigurationTypeChange(null);
                      }
                    }}
                    
                  />
                )}
                
                
              </NavButton>
             
            ))}
          </motion.div>
        </div>
      )}
      
      {/* Configuration Panel */}
      <AnimatePresence>
        {(showConfigurationTypeSelector || localConfiguringType) && selectedPendants.length > 0 && !isMobile && (
          <ConfigPanel
            configuringType={localConfiguringType}
            configuringSystemType={configuringSystemType}
            breadcrumbPath={breadcrumbPath}
            onBreadcrumbNavigation={onBreadcrumbNavigation}
            onSystemTypeSelection={onSystemTypeSelection}
            selectedLocation={selectedPendants[0]}
            selectedPendants={selectedPendants}
            cables={cables}
            onCableSizeChange={onCableSizeChange}
            onPendantDesignChange={onPendantDesignChange}
            onSystemBaseDesignChange={onSystemBaseDesignChange}
            onShadeSelect={onShadeSelect}
            currentShade={null}
            onSelectConfigurationType={(type) => {
              // This matches the original handleConfigTypeSelection function
              setLocalConfiguringType(type);
     
              // if(type == 'pendant' || type == 'system'){
              //   setShowConfigurationTypeSelector(false);
              // }
              
              // Update the active step based on the configuration type
              if (type === 'pendant') {
                setActiveStep('pendantSelection');
              } else if (type === 'system') {
                setActiveStep('systemType');
              } 
              
              // Call the parent component's handler if it exists
              if (onConfigurationTypeChange) {
                onConfigurationTypeChange(type);
              }
            }}
            onClose={() => {
              setShowConfigurationTypeSelector(false);
              // Call parent handler to reset configuration type
              if (onConfigurationTypeChange) {
                onConfigurationTypeChange(null);
              }
            }}
          />
        )}
      </AnimatePresence>
      
      {showSaveModal && (
        <SaveConfigurationModal 
          onClose={() => setShowSaveModal(false)}
          config={config}
          currentDesign={currentDesign}
          isSaving={isSaving}
          setShowSaveModal={setShowSaveModal}
          saveConfigToSystem={saveConfigToSystem}
        />
      )}
    </>
  );
};

export default VerticalNavBar;
