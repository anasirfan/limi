"use client";
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaSave, FaShoppingCart } from "react-icons/fa";
import { NavButton } from './navComponents/NavButton';
import { ProgressIndicator } from './navComponents/ProgressIndicator';
import { LightTypeDropdown } from './navComponents/LightTypeDropdown';
import { BaseTypeDropdown } from './navComponents/BaseTypeDropdown';
import { ConfigurationTypeDropdown } from './navComponents/ConfigurationTypeDropdown';
import { LightAmountDropdown } from './navComponents/LightAmountDropdown';
import { PendantSelectionDropdown } from './navComponents/PendantSelectionDropdown';
import { SystemConfigurationDropdown } from './navComponents/SystemConfigurationDropdown';
import { SaveConfigurationModal } from './navComponents/SaveConfigurationModal';
import { useNavSteps } from './navComponents/useNavSteps';
import { useNavDropdown } from './navComponents/useNavDropdown';
import { usePendantSelection } from './navComponents/usePendantSelection';

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
  onSystemBaseDesignChange,
  pendants,
  selectedPendants,
  setSelectedPendants
}) => {
  // Define colors from LIMI brand palette
  const emerald = '#50C878';
  const charlestonGreen = '#2B2D2F';
  const textColor = '#FFFFFF';
  
  // Get navigation steps
  const { steps } = useNavSteps(config);
  
  // Dropdown state management
  const { 
    openDropdown, 
    setOpenDropdown, 
    dropdownRefs, 
    handleStepClick, 
    toggleDropdown 
  } = useNavDropdown(setActiveStep);
  
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
    getDesignImageNumber
  } = usePendantSelection(pendants, selectedPendants, setSelectedPendants, onPendantDesignChange);
  
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
    const stepIndex = steps.findIndex(s => s.id === activeStep);
    return ((stepIndex + 1) / steps.length) * 100;
  };

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
  
  return (
    <>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50">
        {/* Vertical progress indicator */}
        <ProgressIndicator progress={calculateProgress()} emerald={emerald} />
        
        <motion.div
          className="p-3 rounded-full flex flex-col gap-4"
          style={{ 
            backgroundColor: charlestonGreen,
            boxShadow: `0 4px 20px rgba(0,0,0,0.2), 0 0 0 1px ${emerald}20`
          }}
        >

          <div className="flex flex-col gap-6">
            {steps.map((step, index) => (
             
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
                textColor={textColor}
                dropdownRefs={dropdownRefs}
              > <h1>{step.id}</h1>
                {/* Dropdown content based on step.id */}
                {step.id === 'lightType' && openDropdown === step.id && (
                  <LightTypeDropdown 
                    step={step}
                    config={config}
                    onLightTypeChange={onLightTypeChange}
                    setOpenDropdown={setOpenDropdown}
                  />
                )}
                
                {step.id === 'baseType' && openDropdown === step.id && (
                  <BaseTypeDropdown 
                    step={step}
                    config={config}
                    onBaseTypeChange={onBaseTypeChange}
                    setActiveStep={setActiveStep}
                    setOpenDropdown={setOpenDropdown}
                  />
                )}
                
                {step.id === 'configurationType' && openDropdown === step.id && (
                  <ConfigurationTypeDropdown 
                    step={step}
                    config={config}
                    onConfigurationTypeChange={onConfigurationTypeChange}
                    setActiveStep={setActiveStep}
                    setOpenDropdown={setOpenDropdown}
                  />
                )}
                
                {step.id === 'lightAmount' && openDropdown === step.id && (
                  <LightAmountDropdown 
                    config={config}
                    onLightAmountChange={onLightAmountChange}
                    onSystemTypeChange={onSystemTypeChange}
                    setActiveStep={setActiveStep}
                    setOpenDropdown={setOpenDropdown}
                  />
                )}
                
                {step.id === 'pendantSelection' && openDropdown === step.id && config.configurationType === 'pendant' && (
                  <PendantSelectionDropdown 
                    pendants={pendants}
                    selectedPendants={selectedPendants}
                    currentDesign={currentDesign}
                    setCurrentDesign={setCurrentDesign}
                    carouselRef={carouselRef}
                    scrollCarousel={scrollCarousel}
                    togglePendantSelection={togglePendantSelection}
                    selectAllPendants={selectAllPendants}
                    clearSelections={clearSelections}
                    onPendantDesignChange={onPendantDesignChange}
                    applyToAllPendants={applyToAllPendants}
                    getDesignImageNumber={getDesignImageNumber}
                    handleSaveConfig={handleSaveConfig}
                  />
                )}
                
                {step.id === 'pendantSelection' && openDropdown === step.id && config.configurationType === 'system' && (
                  <SystemConfigurationDropdown 
                    config={config}
                    onSystemBaseDesignChange={onSystemBaseDesignChange}
                  />
                )}
              </NavButton>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Save Configuration Modal */}
      {showSaveModal && (
        <SaveConfigurationModal
          isLoggedIn={isLoggedIn}
          configName={configName}
          setConfigName={setConfigName}
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
