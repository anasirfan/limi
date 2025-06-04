"use client";
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VerticalNavBar from './VerticalNavBar';
import HorizontalOptionsBar from './HorizontalOptionsBar';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import PlayCanvasViewer from '../PlayCanvasViewer';
import { ConfigurationTypeSelector } from './navComponents/ConfigurationTypeSelector';
import { Breadcrumb } from './navComponents/Breadcrumb';
import { PreviewControls } from './PreviewControls';
import { SaveConfigModal } from './SaveConfigModal';

const ConfiguratorLayout = () => {
  // Main configuration state
  const [config, setConfig] = useState({
    lightType: 'ceiling',
    baseType: 'round',
    configurationType: 'pendant', // 'pendant' or 'system'
    lightAmount: 1,
    systemType: 'bar',
    systemBaseDesign: 'nexus', // Default system base design
    pendants: [],
    selectedPendants: [],
    lightDesign: 'radial',
    cableColor: 'black',
    cableLength: '2mm',
  });
  
  // Preview mode state
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  // Save modal state
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [configToSave, setConfigToSave] = useState(null);

  // State for saving light amounts
  const [lastCeilingLightAmount, setLastCeilingLightAmount] = useState(1);
  const [lastRoundBaseLightAmount, setLastRoundBaseLightAmount] = useState(1);
  
  // State for individual configuration
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [configuringType, setConfiguringType] = useState(null); // 'pendant' or 'system'
  const [configuringSystemType, setConfiguringSystemType] = useState(null); // 'bar', 'ball', 'universal'
  const [breadcrumbPath, setBreadcrumbPath] = useState([]);

  // Navigation state
  const [activeStep, setActiveStep] = useState('lightType');
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to generate random pendants
  const generateRandomPendants = (amount) => {
    const productCount = 4; // Number of available pendant designs
    let pendants = [];
    for (let i = 0; i < amount; i++) {
      const randomDesign = ['bumble', 'radial', 'fina', 'ripple'][Math.floor(Math.random() * 4)];
      pendants.push({
        id: i,
        design: randomDesign
      });
    }
    return pendants;
  };

  // Initialize pendants when component mounts
  useEffect(() => {
    // Create initial pendants based on light amount
    const initialPendants = generateRandomPendants(config.lightAmount);
    
    setConfig(prev => ({ ...prev, pendants: initialPendants }));
    setLastCeilingLightAmount(config.lightAmount);
    setLastRoundBaseLightAmount(config.lightAmount);
  }, []);

  // Update pendants when light amount changes
  useEffect(() => {
    // Only update if we already have pendants initialized
    if (config.pendants.length > 0) {
      let updatedPendants = [...config.pendants];
      
      if (config.lightAmount > config.pendants.length) {
        // Add new pendants
        const designOptions = ['bumble', 'radial', 'fina', 'ripple'];
        
        for (let i = config.pendants.length; i < config.lightAmount; i++) {
          updatedPendants.push({
            id: i,
            design: designOptions[Math.floor(Math.random() * designOptions.length)],
          });
        }
      } else if (config.lightAmount < config.pendants.length) {
        // Remove excess pendants
        updatedPendants = updatedPendants.slice(0, config.lightAmount);
      }
      
      setConfig(prev => ({ ...prev, pendants: updatedPendants }));
    }
  }, [config.lightAmount]);

  // Listen for app:ready1 message from PlayCanvas iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'app:ready1') {
        console.log('PlayCanvas app is ready');
        setIsLoading(false);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Handle light type change
  const handleLightTypeChange = (type) => {
    // Save current ceiling light amount if switching from ceiling
    if (config.lightType === 'ceiling' && type !== 'ceiling') {
      setLastCeilingLightAmount(config.lightAmount);
    }
    
    // Set default values based on light type
    let newAmount = config.lightAmount;
    let newPendants = [];
    
    if (type === 'wall') {
      newAmount = 1;
      newPendants = generateRandomPendants(1);
    } else if (type === 'floor') {
      newAmount = 3;
      newPendants = generateRandomPendants(3);
    } else if (type === 'ceiling') {
      // Restore last ceiling light amount when switching back to ceiling
      if (config.baseType === 'rectangular') {
        newAmount = 3;
      } else {
        newAmount = lastCeilingLightAmount;
      }
      newPendants = generateRandomPendants(newAmount);
    }
    
    setConfig(prev => ({ 
      ...prev, 
      lightType: type,
      lightAmount: newAmount,
      pendants: newPendants
    }));
    
    // Send messages to iframe
    setTimeout(() => {
      // Send light type message
      sendMessageToPlayCanvas(`light_type:${type}`);
      
      // Send light amount message
      sendMessageToPlayCanvas(`light_amount:${newAmount}`);
      
      // For multiple pendants, send individual pendant messages
      newPendants.forEach((pendant, index) => {
        const productId = pendant.design === 'bumble' ? 'product_1' : 
                       pendant.design === 'radial' ? 'product_2' : 
                       pendant.design === 'fina' ? 'product_3' : 'product_5';
        
        sendMessageToPlayCanvas(`pendant_${index}:${productId}`);
      });
    }, 0);
  };

  // Handle base type change
  const handleBaseTypeChange = (type) => {
    // Save current round base light amount if switching from round
    if (config.baseType === 'round' && type !== 'round') {
      setLastRoundBaseLightAmount(config.lightAmount);
    }
    
    let newAmount;
    let newPendants;
    
    // If changing to rectangular, force light amount to 3
    if (type === 'rectangular') {
      newAmount = 3;
      newPendants = generateRandomPendants(3);
    } else if (type === 'round') {
      // Restore last round base light amount when switching back to round
      newAmount = lastRoundBaseLightAmount;
      newPendants = generateRandomPendants(newAmount);
    }
    
    setConfig(prev => ({ 
      ...prev, 
      baseType: type,
      lightAmount: newAmount,
      pendants: newPendants
    }));
    
    // Send messages to iframe
    setTimeout(() => {
      // Send base type message
      sendMessageToPlayCanvas(`base_type:${type}`);
      
      // Send light amount message
      sendMessageToPlayCanvas(`light_amount:${newAmount}`);
      
      // Send individual pendant messages
      newPendants.forEach((pendant, index) => {
        const productId = pendant.design === 'bumble' ? 'product_1' : 
                       pendant.design === 'radial' ? 'product_2' : 
                       pendant.design === 'fina' ? 'product_3' : 'product_5';
        
        sendMessageToPlayCanvas(`pendant_${index}:${productId}`);
      });
    }, 0);
  };

  // Handle configuration type change
  const handleConfigurationTypeChange = useCallback((type) => {
    setConfig(prev => {
      const newConfig = { ...prev, configurationType: type };
      
      // Send message to iframe
      setTimeout(() => {
        if (type === 'system') {
          // For system configuration, send base type and system type
          sendMessageToPlayCanvas(`base_type:${newConfig.baseType}`);
          sendMessageToPlayCanvas(`system:${newConfig.systemType}`);
          
          // Check if base is round, then send light_amount:1 message
          if (newConfig.baseType === 'round') {
            sendMessageToPlayCanvas('light_amount:1');
          }
        } else {
          // For pendant configuration, send light type and amount
          sendMessageToPlayCanvas(`light_type:${newConfig.lightType}`);
          sendMessageToPlayCanvas(`light_amount:${newConfig.lightAmount}`);
          
          // Send individual pendant messages
          newConfig.pendants.forEach((pendant, index) => {
            const productId = pendant.design === 'bumble' ? 'product_1' : 
                           pendant.design === 'radial' ? 'product_2' : 
                           pendant.design === 'fina' ? 'product_3' : 'product_5';
            
            sendMessageToPlayCanvas(`pendant_${index}:${productId}`);
          });
        }
      }, 0);
      
      return newConfig;
    });
  }, []);

  // Handle light amount change
  const handleLightAmountChange = (amount) => {
    // Update the appropriate saved light amount based on current configuration
    if (config.lightType === 'ceiling') {
      setLastCeilingLightAmount(amount);
    }
    if (config.baseType === 'round') {
      setLastRoundBaseLightAmount(amount);
    }
    
    // Generate random pendants for the new amount
    const newPendants = generateRandomPendants(amount);
    
    // Filter selectedPendants to only include valid indices for the new amount
    const filteredSelectedPendants = config.selectedPendants ? 
      config.selectedPendants.filter(index => index < amount) : 
      [];
    
    setConfig(prev => ({ 
      ...prev, 
      lightAmount: amount, 
      pendants: newPendants,
      selectedPendants: filteredSelectedPendants // Update selectedPendants state
    }));
    
    // Send messages to iframe
    setTimeout(() => {
      // Send light amount message
      sendMessageToPlayCanvas(`light_amount:${amount}`);
      
      // For multiple pendants, send individual pendant messages
      newPendants.forEach((pendant, index) => {
        const productId = pendant.design === 'bumble' ? 'product_1' : 
                       pendant.design === 'radial' ? 'product_2' : 
                       pendant.design === 'fina' ? 'product_3' : 'product_5';
        
        sendMessageToPlayCanvas(`pendant_${index}:${productId}`);
      });
    }, 0);
  };

  // Handle system type change
  const handleSystemTypeChange = (system) => {
    setConfig(prev => ({ ...prev, systemType: system }));
    
    // Send messages to iframe
    setTimeout(() => {
      // Send base type message first to ensure correct context
      sendMessageToPlayCanvas(`base_type:${config.baseType}`);
      
      // Send system type message
      sendMessageToPlayCanvas(`system:${system}`);
      
      // For round base, send light_amount:1 as requested
      // if (config.baseType === 'round') {
      //   sendMessageToPlayCanvas('light_amount:1');
      // }
    }, 0);
  };

  // Handle pendant selection
  const handlePendantSelection = useCallback((pendantIds) => {
    setConfig(prev => ({ ...prev, selectedPendants: pendantIds }));
    
    // If a single pendant is selected, show the type selector
    if (pendantIds.length === 1) {
      setSelectedLocation(pendantIds[0]);
      setShowTypeSelector(true);
    } else {
      setShowTypeSelector(false);
    }
  }, []);
  
  // Handle location selection for individual configuration
  const handleLocationSelection = (locationId) => {
    setSelectedLocation(locationId);
    setShowTypeSelector(true);
  };
  
  // Handle configuration type selection from the floating selector
  const handleConfigTypeSelection = (type) => {
    setConfiguringType(type);
    setShowTypeSelector(false);
    
    if (type === 'pendant') {
      setBreadcrumbPath([{ id: 'configurePendant', label: 'Configure Pendant' }]);
    } else if (type === 'system') {
      setBreadcrumbPath([{ id: 'system', label: 'System' }]);
      setConfiguringSystemType('bar'); // Default system type
    }
  };
  
  // Handle breadcrumb navigation
  const handleBreadcrumbNavigation = (level) => {
    if (level === 'home') {
      // Reset to cable locations view
      setConfiguringType(null);
      setConfiguringSystemType(null);
      setBreadcrumbPath([]);
      setSelectedLocation(null);
    } else if (level === 'system') {
      // Go back to system level
      setConfiguringSystemType(null);
      setBreadcrumbPath([{ id: 'system', label: 'System' }]);
    }
  };
  
  // Handle system type selection
  const handleIndividualSystemTypeSelection = (type) => {
    setConfiguringSystemType(type);
    setBreadcrumbPath([
      { id: 'system', label: 'System' },
      { id: type, label: type.charAt(0).toUpperCase() + type.slice(1) }
    ]);
    
    // Call handleSystemTypeChange to update state and send message to iframe
    if (type) {
      handleSystemTypeChange(type);
    }
  };

  // Handle pendant design change
  const handlePendantDesignChange = useCallback((pendantIds, design) => {
    // First update the config state with the new design
    setConfig(prev => {
      const updatedPendants = [...prev.pendants];
      
      // Update designs for selected pendants
      pendantIds.forEach(id => {
        if (id >= 0 && id < updatedPendants.length) {
          updatedPendants[id] = {
            ...updatedPendants[id],
            design: design
          };
        }
      });
      
      return { ...prev, pendants: updatedPendants };
    });
    
    // Then send messages to iframe in a separate operation
    // This ensures we don't have race conditions between state updates and messaging
    setTimeout(() => {
      const productId = design === 'bumble' ? 'product_1' : 
                      design === 'radial' ? 'product_2' : 
                      design === 'fina' ? 'product_3' : 'product_5';
      
      // Send messages for each selected pendant
      pendantIds.forEach(id => {
        console.log(`Updating pendant ${id} to design ${design} (${productId})`);
        sendMessageToPlayCanvas(`pendant_${id}:${productId}`);
      });
    }, 10); // Slight delay to ensure state is updated first
  }, []);

  // Handle system base design change
  const handleSystemBaseDesignChange = useCallback((design) => {
    setConfig(prev => ({ ...prev, systemBaseDesign: design }));
    
    // Send message to PlayCanvas iframe
    setTimeout(() => {
      // Map design names to product IDs for the iframe
      const designMap = {
        'nexus': 'system_base_1',
        'vertex': 'system_base_2',
        'quantum': 'system_base_3',
        'fusion': 'system_base_4'
      };
      
      const baseId = designMap[design] || 'system_base_1';
      console.log(`Updating system base design to ${design} (${baseId})`);
      
      // Get the selected cable number(s)
      const selectedCables = config.selectedPendants && config.selectedPendants.length > 0 
        ? config.selectedPendants 
        : [0]; // Default to cable 0 if none selected
      
      // Send message for each selected cable
      selectedCables.forEach(cableNo => {
        sendMessageToPlayCanvas(`system_${cableNo}:${baseId}`);
        console.log(`Sending system_${cableNo}:${baseId} to iframe`);
      });
    }, 10);
  }, [config.selectedPendants]);

  // Helper function to send messages to PlayCanvas iframe
  const sendMessageToPlayCanvas = (message) => {
    const iframe = document.getElementById('playcanvas-app');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(message, "*");
    }
  };
  
  // Prepare configuration for saving
  const prepareConfigForSave = () => {
    // Create a summary of the current configuration
    const configSummary = {
      light_type: config.lightType,
      light_amount: config.lightAmount,
      cables: {}
    };
    
    // Only include base_type for ceiling lights
    if (config.lightType === 'ceiling') {
      configSummary.base_type = config.baseType;
    }
    
    // Add individual cable configurations
    config.pendants.forEach((pendant, index) => {
      configSummary.cables[index] = {};
      
      // Determine if this is a pendant or system
      if (pendant.design === 'bumble' || pendant.design === 'radial' || 
          pendant.design === 'fina' || pendant.design === 'ripple') {
        // It's a pendant
        const productId = pendant.design === 'bumble' ? 'product_1' : 
                       pendant.design === 'radial' ? 'product_2' : 
                       pendant.design === 'fina' ? 'product_3' : 'product_5';
        
        configSummary.cables[index] = {
          pendant: productId
        };
      } else {
        // It's a system
        const systemType = pendant.systemType || config.systemType;
        const baseDesign = pendant.systemBaseDesign || config.systemBaseDesign;
        const baseId = baseDesign === 'nexus' ? 'system_base_1' : 
                    baseDesign === 'vertex' ? 'system_base_2' : 
                    baseDesign === 'quantum' ? 'system_base_3' : 'system_base_4';
        
        configSummary.cables[index] = {
          system_type: systemType,
          system_base: baseId
        };
      }
    });
    
    return configSummary;
  };
  
  // Save configuration function
  const handleSaveConfig = () => {
    const configSummary = prepareConfigForSave();
    setConfigToSave(configSummary);
    setIsSaveModalOpen(true);
  };
  
  // Final save with name
  const handleFinalSave = (configName) => {
    if (!configToSave) return;
    
    // Add name to the configuration
    const finalConfig = {
      ...configToSave,
      name: configName
    };
    
    // Log the configuration summary
    console.log('Saved Configuration:', finalConfig);
    
    // Close modal and show success toast
    setIsSaveModalOpen(false);
    toast.success('Configuration saved successfully');
    
    // In a real application, you would save this to localStorage, a database, or an API
    // localStorage.setItem('limiConfig', JSON.stringify(finalConfig));
  };
  
  // Load configuration function
  const handleLoadConfig = () => {
    // In a real application, you would load from localStorage, a database, or an API
    // const savedConfig = JSON.parse(localStorage.getItem('limiConfig'));
    
    // For now, just log that the load function was called
    console.log('Load configuration function called');
    toast.info('Load configuration function called');
    
    // Example of how you would load a configuration
    // if (savedConfig) {
    //   setConfig({
    //     ...config,
    //     lightType: savedConfig.light_type,
    //     baseType: savedConfig.base_type,
    //     lightAmount: savedConfig.light_amount,
    //     // etc.
    //   });
    // }
  };

  return (
    <div className="relative w-full h-full bg-transparent overflow-hidden">
      {/* 3D Viewer */}
      <div className="w-full h-full">
        <PlayCanvasViewer 
          config={config}
          isDarkMode={true}
          className="w-full h-full"
          loadcanvas={isLoading}
        />
      </div>
      
      {/* Preview Controls - Always visible */}
      <PreviewControls 
        isPreviewMode={isPreviewMode}
        setIsPreviewMode={setIsPreviewMode}
        config={config}
        onSaveConfig={handleSaveConfig}
        onLoadConfig={handleLoadConfig}
      />
      
      {/* Only show UI elements when not in preview mode */}
      {!isPreviewMode && (
        <>
          {/* Vertical Navigation Bar */}
          {!isLoading && 
          <VerticalNavBar 
            activeStep={activeStep} 
            setActiveStep={setActiveStep} 
            config={config}
            onLightTypeChange={handleLightTypeChange}
            onBaseTypeChange={handleBaseTypeChange}
            onConfigurationTypeChange={handleConfigurationTypeChange}
            onLightAmountChange={handleLightAmountChange}
            onSystemTypeChange={handleSystemTypeChange}
            onPendantSelection={handlePendantSelection}
            onPendantDesignChange={handlePendantDesignChange}
            onSystemBaseDesignChange={handleSystemBaseDesignChange}
            pendants={config.pendants}
            selectedPendants={config.selectedPendants || []}
            setSelectedPendants={(pendantIds) => handlePendantSelection(pendantIds)}
            onLocationSelection={handleLocationSelection}
            configuringType={configuringType}
            configuringSystemType={configuringSystemType}
            breadcrumbPath={breadcrumbPath}
            onBreadcrumbNavigation={handleBreadcrumbNavigation}
            onSystemTypeSelection={handleIndividualSystemTypeSelection}
          />
          }
          
          {/* Configuration Type Selector */}
          <AnimatePresence>
            {/* {showTypeSelector && selectedLocation !== null && (
              <ConfigurationTypeSelector 
                onSelectType={handleConfigTypeSelection}
                onClose={() => setShowTypeSelector(false)}
              />
            )} */}
          </AnimatePresence>
          
          {/* Horizontal Options Bar */}
          {/* {!isLoading && !configuringType && 
          <HorizontalOptionsBar 
            config={config}
            onLightTypeChange={handleLightTypeChange}
            onBaseTypeChange={handleBaseTypeChange}
            onLightAmountChange={handleLightAmountChange}
            onSystemTypeChange={handleSystemTypeChange}
          />
          } */}
        </>
      )}
      
      {/* Save Configuration Modal */}
      <AnimatePresence>
        {isSaveModalOpen && (
          <SaveConfigModal
            isOpen={isSaveModalOpen}
            onClose={() => setIsSaveModalOpen(false)}
            onSave={handleFinalSave}
            configSummary={configToSave}
          />
        )}
      </AnimatePresence>
      
      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  );
};
export default ConfiguratorLayout;
