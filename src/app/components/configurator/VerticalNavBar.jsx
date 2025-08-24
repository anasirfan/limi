  "use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
// Add these imports at the top with other imports
import { createPortal } from 'react-dom';
import { FiX, FiChevronLeft, FiChevronRight, FiHelpCircle } from 'react-icons/fi';
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
  showConfigurationTypeSelector,
  setShowConfigurationTypeSelector,

  config,
  cables, // Add cables prop
  onCableSizeChange, // Add cable size change handler
  onLightTypeChange,
  onBaseTypeChange,
  onBaseColorChange,
  onConnectorColorChange,
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
  cableMessage,
  setCableMessage,

  
  onSystemTypeSelection,
  containerDimensions,
  onShadeSelect // Add onShadeSelect prop
}) => {
  // Define colors from LIMI brand palette
  const emerald = '#50C878';
  const charlestonGreen = '#2B2D2F';
  const textColor = '#FFFFFF';
  
  const [isMobile, setIsMobile] = useState(false);
  const [currentGuideStep, setCurrentGuideStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showTooltip, setShowTooltip] = useState(true);
  // Add these state variables after other state declarations
const [tourStep, setTourStep] = useState(0);
const [isTourActive, setIsTourActive] = useState(true);
const [highlightedElement, setHighlightedElement] = useState(null);
const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
const [targetElement, setTargetElement] = useState(null);
const [openingBase, setOpenBase] = useState(false);
// Welcome modal state
const [showWelcomeModal, setShowWelcomeModal] = useState(false);
const [activeTab, setActiveTab] = useState('base'); 
  

const handleSetActiveTab = (tab) => {
  setActiveTab(tab);
};
  // Define the order of steps for the guided tour
  const guidedSteps = [
    { id: 'lightType', message: 'First, select your light type' },
    { id: 'baseType', message: 'Now, choose the base type' },
    { id: 'baseColor', message: 'Select a base color' },
    { id: 'lightAmount', message: 'How many lights do you need?' },
    { id: 'pendantSelection', message: 'Finally, customize your pendant selection' }
  ];


  useEffect(() => {
    const cleanup = listenForWallbaseColorMessages((data, event) => {
      // handle wallbaseColor message here
      console.log('[ConfigPanel] Received wallbaseColor message:', data,event.data);
      // Example: open a modal, update config, etc.
      setActiveStep('baseColor');
      setOpenDropdown('baseColor');
      handleSetActiveTab('base');
      setShowConfigurationTypeSelector(false);
      setOpenBase(true);
    });
    return cleanup;
  }, []);
  useEffect(() => {
    const cleanup = listenForConnectorColorMessages((data, event) => {
      // handle wallbaseColor message here
      console.log('[ConfigPanel] Received connectorColor message:', data,event.data);
      // Example: open a modal, update config, etc.
      setOpenDropdown('baseColor');
      setActiveStep('baseColor');
      handleSetActiveTab('connector');
      setShowConfigurationTypeSelector(false);
      setOpenBase(true);
    });
    return cleanup;
  }, []);

  useEffect(()=> {
    if(activeStep === 'pendantSelection'){
      setOpenBase(false);
      setShowConfigurationTypeSelector(true);
    }
  },[activeStep])

  useEffect(() => {
    const cleanup = listenForOffconfigMessages((data, event) => {
    // if (cableMessage && cableMessage.startsWith('offconfig')) {
      setShowConfigurationTypeSelector(false);
      setOpenBase(false);
      setOpenDropdown(false);
      setActiveStep(null);
      setCableMessage('');
    })
    return cleanup;
  }, [cableMessage]);

 
  
  useEffect(() => {
    if (cableMessage && cableMessage.startsWith('cable_')) {
      const match = cableMessage.match(/^cable_(\d+)/);
      if (match) {
        const cableId = Number(match[1]);
        if (config.lightAmount === 1) {
          setShowConfigurationTypeSelector(false);
          setOpenBase(false);
          // 1. Open the pendant selection step
          setActiveStep('pendantSelection');
          // 2. Select the pendant with the extracted id
          setSelectedPendants([cableId]);
          // 3. Show the configuration type selector
          setTimeout(()=> {
            setShowConfigurationTypeSelector(true);
            setLocalConfiguringType(null)
          },200)
       
        } else {
          setShowConfigurationTypeSelector(false);
          setOpenBase(false);
          // 1. Open the pendant selection step
          setActiveStep('pendantSelection');
          setOpenDropdown('pendantSelection');
          // 2. Select the pendant with the extracted id
          setSelectedPendants([cableId]);
          // 3. Show the configuration type selector
          setTimeout(()=> {
            setShowConfigurationTypeSelector(true);
            setLocalConfiguringType(null)
          },200)
        }
        setCableMessage('');
      }
    }
  }, [cableMessage, setActiveStep, setSelectedPendants, setCableMessage]);
 

// Define tour steps
const tourSteps = [
  {
    id: 'lightType',
    title: 'Select Light Type',
    description: 'Start by choosing your preferred light type from the options available.',
    position: 'right'
  },
  {
    id: 'baseType',
    title: 'Choose Base Type',
    description: 'Next, select the base type that fits your needs.',
    position: 'right'
  },
  {
    id: 'lightAmount',
    title: 'Configure Light Amount',
    description: 'Specify how many lights you need for your setup.',
    position: 'right'
  },
  {
    id: 'pendantSelection',
    title: 'Customize Pendants',
    description: 'Finally, customize your pendant selection and configuration.',
    position: 'right'
  }
];

  
  // Check if current step is completed
  const isStepCompleted = (stepId) => completedSteps.includes(stepId);
  
  // Mark step as completed
  const completeStep = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
      
      // Move to next step in the guide
      const currentIndex = guidedSteps.findIndex(step => step.id === stepId);
      if (currentIndex < guidedSteps.length - 1) {
        setCurrentGuideStep(currentIndex + 1);
      }
    }
  };
  
  // Check if a step is currently being guided
  const isGuidedStep = (stepId) => {
    return guidedSteps[currentGuideStep]?.id === stepId;
  };
  
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
    console.log("handleStepClick", stepId);
    // If this is the guided step, complete it when clicked
    if (isGuidedStep(stepId)) {
      completeStep(stepId);
    }

    // Auto-close config panel when clicking on any vertical navbar option
    console.log("handleStepClick", stepId)
    if(stepId !== 'pendantSelection') {
      setShowConfigurationTypeSelector(false);
    }
    ;
    if (localConfiguringType) {
      setLocalConfiguringType(null);
      // Also reset in parent component
      if (onConfigurationTypeChange) {
        onConfigurationTypeChange(null);
      }
    }


    console.log("openDropdown", openDropdown);
    // Handle hotspot - on for pendant selection, off for everything else
    if (stepId === 'pendantSelection') {
      sendMessageToPlayCanvas(`hotspot:on`);
    } else {
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
  } = usePendantSelection(pendants, selectedPendants, setSelectedPendants, onPendantDesignChange,setShowConfigurationTypeSelector,setOpenBase);
  
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
      {/* Welcome Modal */}
      <WelcomeTourModal
        isOpen={showWelcomeModal}
        onSkip={() => {
          setShowWelcomeModal(false);
          setIsTourActive(false);
        }}
        onStart={() => {
          setShowWelcomeModal(false);
          setTourStep(0); // Reset to first step
          setIsTourActive(true);
        }}
      />
      {/* Guided Tour Overlay is disabled by request
      {!isTourActive && !showWelcomeModal && (
        <GuidedTourOverlay
          isActive={isTourActive}
          step={tourSteps[tourStep]}
          stepIndex={tourStep}
          totalSteps={tourSteps.length}
          targetSelector={`[data-tour-step="${tourSteps[tourStep]?.id}"]`}
          onNext={() => setTourStep((prev) => Math.min(prev + 1, tourSteps.length - 1))}
          onPrev={() => setTourStep((prev) => Math.max(prev - 1, 0))}
          onClose={() => setIsTourActive(false)}
        />
      )}
      */}
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
            {console.log(
              'in steps',
              "step id ",steps,
              "config",config,
            )}
            {/* Render NavButtons with data-tour-step for guided tour */}
            {steps.filter(step => {
              if ((step.id === 'baseType' || step.id === 'baseColor') && (config.lightType !== 'ceiling')) {
                console.log("working if")
                return false;
              }
              if ((step.id === 'baseColor') && (config.baseType !== 'round')) {
                console.log("working if")
                return false;
              }
              return true;
            }).map((step, index) => (
              <div className="relative" key={step.id}>
                <NavButton
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
                  isGuided={isGuidedStep(step.id)}
                  isCompleted={isStepCompleted(step.id)}
                  data-tour-step={step.id}
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
                    currentConnectorColor={config?.connectorColor}
                    onConnectorColorChange={onConnectorColorChange}
                    setActiveTab={handleSetActiveTab}
                    activeTab={activeTab}
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
                    setOpenBase={setOpenBase}
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
              </div>
             
            ))}
          </motion.div>
        </div>
      )}
      
      {/* Configuration Panel */}
  
      <AnimatePresence>
        {(showConfigurationTypeSelector) && !openingBase && selectedPendants.length > 0 && !isMobile && (
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
            showConfigurationTypeSelector={showConfigurationTypeSelector}
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

// GuidedTourOverlay component
import { useLayoutEffect } from 'react';
import { listenForConnectorColorMessages, listenForWallbaseColorMessages, listenForOffconfigMessages } from '../../util/iframeCableMessageHandler';

function GuidedTourOverlay({ isActive, step, stepIndex, totalSteps, targetSelector, onNext, onPrev, onClose }) {
  const [highlightRect, setHighlightRect] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [actionCompleted, setActionCompleted] = useState(false);

  // Find and track the position of the highlighted element
  useLayoutEffect(() => {
    if (!isActive || !targetSelector) {
      setHighlightRect(null);
      return;
    }
    const el = document.querySelector(targetSelector);
    if (el) {
      const rect = el.getBoundingClientRect();
      setHighlightRect(rect);
      // Position tooltip to the right of the button
      setTooltipPos({
        top: rect.top + rect.height / 2,
        left: rect.right + 24,
      });
    }
  }, [isActive, step, targetSelector]);

  // Escape to close
  useEffect(() => {
    if (!isActive) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isActive, onClose]);

  // --- BEGIN: Auto-advance logic for required actions ---
  useEffect(() => {
    if (!isActive || !step?.requiredAction || !step.targetSelector) return;
    const el = document.querySelector(step.targetSelector);
    if (!el) return;
    let handler;
    if (step.requiredAction.type === 'click') {
      handler = () => {
        setActionCompleted(true);
        setTimeout(() => {
          setActionCompleted(false);
          onNext();
        }, 700);
      };
      el.addEventListener('click', handler);
    } else if (step.requiredAction.type === 'change') {
      handler = () => {
        setActionCompleted(true);
        setTimeout(() => {
          setActionCompleted(false);
          onNext();
        }, 700);
      };
      el.addEventListener('change', handler);
    }
    return () => {
      if (handler) {
        if (step.requiredAction.type === 'click') el.removeEventListener('click', handler);
        if (step.requiredAction.type === 'change') el.removeEventListener('change', handler);
      }
    };
  }, [isActive, step, onNext]);
  // --- END: Auto-advance logic ---

  if (!isActive || !highlightRect) return null;

  return createPortal(
    <>
      {/* Overlay */}
      {/* Fullscreen blurred overlay with SVG 'cut-out hole' spotlight effect */}
      <svg
        className="fixed inset-0 z-[10000] pointer-events-none"
        width={typeof window !== 'undefined' ? window.innerWidth : 0}
        height={typeof window !== 'undefined' ? window.innerHeight : 0}
        style={{ width: '100vw', height: '100vh', display: 'block', pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <defs>
          <mask id="spotlight-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {highlightRect && (
              <circle
                cx={highlightRect.left + highlightRect.width / 2}
                cy={highlightRect.top + highlightRect.height / 2}
                r={Math.max(highlightRect.width, highlightRect.height) / 2 + 24}
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(16,20,24,0.75)"
          style={{ backdropFilter: 'blur(6px)', pointerEvents: 'none' }}
          mask="url(#spotlight-mask)"
        />
      </svg>
      {/* Highlight Glow + Tooltip */}
      <div
        className="fixed z-[10010] pointer-events-none"
        style={{
          top: highlightRect.top - 24,
          left: highlightRect.left - 24,
          width: highlightRect.width + 48,
          height: highlightRect.height + 48,
          pointerEvents: 'none',
        }}
      >
        {/* Glowing effect */}
        <div className="absolute inset-0 rounded-full shadow-[0_0_0_8px_rgba(16,185,129,0.25),0_0_0_24px_rgba(16,185,129,0.15)] animate-pulse-glow pointer-events-none" />
        {/* Action completed checkmark */}
        {actionCompleted && (
          <div className="absolute top-0 right-0 p-2 bg-emerald-500 text-white rounded-full shadow-md animate-fadeIn">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}
      </div>
      {/* Tooltip */}
      <div
        className="fixed z-[10002] bg-gradient-to-br from-white to-gray-50 text-gray-800 rounded-xl shadow-2xl px-6 py-5 flex flex-col gap-3 w-[340px] animate-fadeIn border border-gray-100"
        style={{
          top: Math.max(tooltipPos.top - 70, 24),
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'auto',
        }}
        role="dialog"
        aria-modal="true"
>
  {/* Header with close button */}
  <div className="flex justify-between items-center">
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="font-bold text-gray-900 text-lg">{step?.title || ''}</span>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
          Step {stepIndex + 1} of {totalSteps}
        </span>
      </div>
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
        <div 
          className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300 ease-out" 
          style={{ 
            width: `${((stepIndex + 1) / totalSteps) * 100}%` 
          }}
        />
      </div>
    </div>
    <button
      onClick={onClose}
      className="ml-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700"
      aria-label="Close tour"
      tabIndex={0}
    >
      <FiX size={18} />
    </button>
  </div>

  {/* Description */}
  <div className="text-sm text-gray-600 leading-relaxed">
    {step?.description || ''}
  </div>

  {/* Navigation buttons */}
  <div className="flex items-center justify-between gap-3 mt-2">
    <button
      onClick={onPrev}
      disabled={stepIndex === 0}
      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center ${
        stepIndex === 0
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-emerald-600 hover:bg-emerald-50 hover:shadow-sm'
      }`}
    >
      <FiChevronLeft size={18} className="mr-1" />
      Back
    </button>

    {stepIndex === totalSteps - 1 ? (
      <button
        onClick={onClose}
        className="px-5 py-2 rounded-lg font-medium text-sm bg-emerald-600 text-white hover:bg-emerald-700 transition-colors duration-200 flex-1 text-center shadow-sm hover:shadow-md"
      >
        Finish Tour
      </button>
    ) : (
      <button
        onClick={onNext}
        className="px-5 py-2 rounded-lg font-medium text-sm bg-emerald-600 text-white hover:bg-emerald-700 transition-colors duration-200 flex-1 text-center shadow-sm hover:shadow-md flex items-center justify-center"
      >
        Continue <FiChevronRight size={18} className="ml-1.5" />
      </button>
    )}
  </div>
</div>
    </>,
    document.body
  );
}
// WelcomeTourModal component
function WelcomeTourModal({ isOpen, onSkip, onStart }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[11000] flex items-center justify-center bg-black bg-opacity-60 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl px-8 py-8 flex flex-col items-center gap-4 max-w-[90vw] w-[380px]">
        <div className="text-2xl font-bold mb-2 text-emerald-600">Are you new to the configurator?</div>
        <div className="text-gray-700 text-base mb-4 text-center">We can walk you through the main features step by step.<br/>Would you like a quick tour?</div>
        <div className="flex gap-4 mt-2 w-full">
          <button
            className="flex-1 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
            onClick={onSkip}
          >
            Skip
          </button>
          <button
            className="flex-1 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
            onClick={onStart}
          >
            Start Tour
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerticalNavBar;
