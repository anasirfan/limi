import React from 'react';
import { motion } from 'framer-motion';
import { LightTypeDropdown } from './LightTypeDropdown';
import { BaseTypeDropdown } from './BaseTypeDropdown';
import  BaseColorPanel  from './BaseColorPanel';
import { LightAmountDropdown } from './LightAmountDropdown';
import { PendantSelectionDropdown } from './PendantSelectionDropdown';
import { SystemTypeDropdown } from './SystemTypeDropdown';
import { SystemConfigurationDropdown } from './SystemConfigurationDropdown';
import MobilePendantConfig from './MobilePendantConfig';

const MobileBottomMenu = ({
  isOpen,
  activeStep,
  onClose,
  // Props for different components
  config,
  onLightTypeChange,
  onBaseTypeChange,
  onBaseColorChange,
  onConnectorColorChange,
  onLightAmountChange,
  onSystemTypeChange,
  setActiveStep,
  setOpenDropdown,
  tourState,
  handleTourSubSelection,
  // Pendant selection props
  pendants,
  setShowConfigurationTypeSelector,
  setLocalConfiguringType,
  selectedPendants,
  cables,
  currentDesign,
  setOpenBase,
  setCurrentDesign,
  carouselRef,
  onCableSizeChange,
  scrollCarousel,
  handlePendantLocationClick,
  selectAllPendants,
  clearSelections,
  setSelectedPendants,
  applyDesignToSelected,
  applyToAllPendants,
  getImageSrc,
  handleSaveConfig,
  localConfiguringType,
  configuringSystemType,
  breadcrumbPath,
  onBreadcrumbNavigation,
  onSystemTypeSelection,
  onPendantDesignChange,
  onSystemBaseDesignChange,
  sendMessageToPlayCanvas,
  onConfigurationTypeChange
}) => {
  const getTitle = () => {
    switch (activeStep) {
      case 'lightType': return 'Light Type';
      case 'baseType': return 'Base Type';
      case 'baseColor': return 'Base Color';
      case 'lightAmount': return 'Light Amount';
      case 'pendantSelection': return 'Pendant Selection';
      case 'systemType': return 'System Type';
      case 'systemConfiguration': return 'System Configuration';
      default: return 'Configuration';
    }
  };

  const renderContent = () => {
    switch (activeStep) {
      case 'lightType':
        return (
          <LightTypeDropdown
            config={config}
            onLightTypeChange={onLightTypeChange}
            setActiveStep={setActiveStep}
            setOpenDropdown={setOpenDropdown}
            tourActive={tourState.isActive}
            onTourSelection={handleTourSubSelection}
          />
        );
      
      case 'baseType':
        return (
          <BaseTypeDropdown
            config={config}
            onBaseTypeChange={onBaseTypeChange}
            setActiveStep={setActiveStep}
            setOpenDropdown={setOpenDropdown}
            tourActive={tourState.isActive}
            onTourSelection={handleTourSubSelection}
          />
        );
      
      case 'baseColor':
        return (
          <BaseColorPanel
            config={config}
            onBaseColorChange={onBaseColorChange}
            onConnectorColorChange={onConnectorColorChange}
            setActiveStep={setActiveStep}
            setOpenDropdown={setOpenDropdown}
            tourActive={tourState.isActive}
            onTourSelection={handleTourSubSelection}
            activeTab="base"
            setActiveTab={() => {}}
          />
        );
      
      case 'lightAmount':
        return (
          <LightAmountDropdown
            config={config}
            onLightAmountChange={onLightAmountChange}
            setActiveStep={setActiveStep}
            setOpenDropdown={setOpenDropdown}
            tourActive={tourState.isActive}
            onTourSelection={handleTourSubSelection}
          />
        );
      
      case 'pendantSelection':
        return (
          <MobilePendantConfig
            pendants={pendants}
            getImageSrc={getImageSrc}
            selectAllPendants={selectAllPendants}
            clearSelections={clearSelections}
            selectedPendants={selectedPendants}
            setSelectedPendants={setSelectedPendants}
            cables={cables}
            onPendantDesignChange={onPendantDesignChange}
            onSystemBaseDesignChange={onSystemBaseDesignChange}
            setShowConfigurationTypeSelector={setShowConfigurationTypeSelector}
            setActiveStep={setActiveStep}
            sendMessageToPlayCanvas={sendMessageToPlayCanvas}
            onConfigurationTypeChange={onConfigurationTypeChange}
            localConfiguringType={localConfiguringType}
            setLocalConfiguringType={setLocalConfiguringType}
            onSystemTypeSelection={onSystemTypeSelection}
            onClose={onClose}
          />
        );
      
      case 'systemType':
        return (
          <SystemTypeDropdown
            config={config}
            onSystemTypeChange={onSystemTypeChange}
            setActiveStep={setActiveStep}
            setOpenDropdown={setOpenDropdown}
            tourActive={tourState.isActive}
            onTourSelection={handleTourSubSelection}
          />
        );
      
      case 'systemConfiguration':
        return (
          <SystemConfigurationDropdown
            config={config}
            setActiveStep={setActiveStep}
            setOpenDropdown={setOpenDropdown}
            tourActive={tourState.isActive}
            onTourSelection={handleTourSubSelection}
          />
        );
      
      default:
        return <div className="p-4 text-white">Select a configuration option</div>;
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] z-[9999] h-30 rounded-t-2xl border-t border-gray-700"
    >
      {/* Header - only show for non-pendant selection steps */}
      {activeStep !== 'pendantSelection' && (
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex-1">
            <h3 className="text-white font-medium text-lg">
              {getTitle()}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      )}
      
      {/* Content */}
      <div className={`flex-1 overflow-y-auto ${activeStep === 'pendantSelection' ? 'p-0' : 'p-4'}`}>
        {renderContent()}
      </div>
    </motion.div>
  );
};

export default MobileBottomMenu;
