"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { saveConfiguration } from '../../../app/redux/slices/userSlice.js';
import { useRouter } from 'next/navigation';

const ConfiguratorLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(state => state.user);
console.log(localStorage)
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
      if (newAmount > 1) {
      newPendants.forEach((pendant, index) => {
        const productId = pendant.design === 'bumble' ? 'product_1' : 
                       pendant.design === 'radial' ? 'product_2' : 
                       pendant.design === 'fina' ? 'product_3' : 'product_5';
        
        sendMessageToPlayCanvas(`pendant_${index}:${productId}`);
      });
    } else {
      const productId = newPendants.design === 'bumble' ? 'product_1' : 
                       newPendants.design === 'radial' ? 'product_2' : 
                       newPendants.design === 'fina' ? 'product_3' : 'product_5';
      sendMessageToPlayCanvas(`pendant_design:${productId}`);
    }
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
      if (newAmount > 1) {
      newPendants.forEach((pendant, index) => {
        const productId = pendant.design === 'bumble' ? 'product_1' : 
                       pendant.design === 'radial' ? 'product_2' : 
                       pendant.design === 'fina' ? 'product_3' : 'product_5';
        
        sendMessageToPlayCanvas(`pendant_${index}:${productId}`);
      });
    } else {
      const productId = newPendants.design === 'bumble' ? 'product_1' : 
                       newPendants.design === 'radial' ? 'product_2' : 
                       newPendants.design === 'fina' ? 'product_3' : 'product_5';
      
      sendMessageToPlayCanvas(`pendant_design:${productId}`);
    }
    }, 0);
  };

  // Handle configuration type change
  const handleConfigurationTypeChange = useCallback((type) => {
    setConfig(prev => {
      const newConfig = { ...prev, configurationType: type };
      
      // Send message to iframe
      // setTimeout(() => {
      //   if (type === 'system') {
      //     // For system configuration, send base type and system type
      //     sendMessageToPlayCanvas(`base_type:${newConfig.baseType}`);
      //     sendMessageToPlayCanvas(`system:${newConfig.systemType}`);
          
      //     // Check if base is round, then send light_amount:1 message
      //     if (newConfig.baseType === 'round') {
      //       sendMessageToPlayCanvas('light_amount:1');
      //     }
      //   } else {
      //     // For pendant configuration, send light type and amount
      //     sendMessageToPlayCanvas(`light_type:${newConfig.lightType}`);
      //     sendMessageToPlayCanvas(`light_amount:${newConfig.lightAmount}`);
          
      //     // Send individual pendant messages
      //     newConfig.pendants.forEach((pendant, index) => {
      //       const productId = pendant.design === 'bumble' ? 'product_1' : 
      //                      pendant.design === 'radial' ? 'product_2' : 
      //                      pendant.design === 'fina' ? 'product_3' : 'product_5';
            
      //       sendMessageToPlayCanvas(`pendant_${index}:${productId}`);
      //     });
      //   }
      // }, 0);
      
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
      
      if (amount > 1) {
      // For multiple pendants, send individual pendant messages
      newPendants.forEach((pendant, index) => {
        const productId = pendant.design === 'bumble' ? 'product_1' : 
                       pendant.design === 'radial' ? 'product_2' : 
                       pendant.design === 'fina' ? 'product_3' : 'product_5';
        
        sendMessageToPlayCanvas(`pendant_${index}:${productId}`);
      });
    } else {
      const productId = newPendants.design === 'bumble' ? 'product_1' : 
                       newPendants.design === 'radial' ? 'product_2' : 
                       newPendants.design === 'fina' ? 'product_3' : 'product_5';
      sendMessageToPlayCanvas(`pendant_design:${productId}`);
    }
    }, 0);
  };

  // Handle system type change
  const handleSystemTypeChange = (system) => {
    setConfig(prev => ({ ...prev, systemType: system }));
    
    // Send messages to iframe
    // setTimeout(() => {
    //   // Send base type message first to ensure correct context
    //   sendMessageToPlayCanvas(`base_type:${config.baseType}`);
      
    //   // Send system type message
    //   sendMessageToPlayCanvas(`system:${system}`);
      
    //   // For round base, send light_amount:1 as requested
    //   // if (config.baseType === 'round') {
    //   //   sendMessageToPlayCanvas('light_amount:1');
    //   // }
    // }, 0);
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
        'nexus': 'product_6',
        'vertex': 'product_8',
        'quantum': 'product_7',
        'fusion': 'product_9',
        'aurora': 'product_10'
      };
      
      const baseId = designMap[design] || 'product_6';
      console.log(`Updating system base design to ${design} (${baseId})`);
      
      // Get the selected cable number(s)
      const selectedCables = config.selectedPendants && config.selectedPendants.length > 0 
        ? config.selectedPendants 
        : [0]; // Default to cable 0 if none selected
      
      // Send message for each selected cable
      selectedCables.forEach(cableNo => {
        sendMessageToPlayCanvas(`pendant_${cableNo}:${baseId}`);
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

  // Save configuration function
  const handleSaveConfig = (configParam) => {
    console.log("in handleSaveConfig");
    // Log all configuration details
    console.log('Configuration Details:');
    console.log('Light Type:', configParam.lightType);
    console.log('Base Type:', configParam.baseType);
    console.log('Light Amount:', configParam.lightAmount);
    console.log('System Type:', configParam.systemType);
    console.log('System Base Design:', configParam.systemBaseDesign);
    console.log('Selected Pendants:', configParam.selectedPendants);
    console.log('All Pendants:', configParam.pendants);
    console.log('Cable Color:', configParam.cableColor);
    console.log('Cable Length:', configParam.cableLength);
    
    // Check if user is logged in
    if (!isLoggedIn) {
      toast.info('Please log in to save your configuration');
      // Redirect to login page
      setTimeout(() => {
        router.push('/portal');
      }, 1500);
      return;
    }
    
    // User is logged in, prepare config and show save modal
    const configSummary = prepareConfigForSave();
    console.log('Config Summary for Save:', configSummary);
    setConfigToSave(configSummary);
    setIsSaveModalOpen(true);
  };
  
  // Prepare configuration for saving
  const prepareConfigForSave = () => {
    // Create a summary of the current configuration
    console.log("in prepareConfigForSave")
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
        const baseId = baseDesign === 'nexus' ? 'product_6' : 
                    baseDesign === 'vertex' ? 'product_8' : 
                    baseDesign === 'quantum' ? 'product_7' : 
                    baseDesign === 'aurora' ? 'product_10' : 'product_9';
        
        configSummary.cables[index] = {
          system_type: systemType,
          product: baseId
        };
      }
    });
    
    return configSummary;
  };
  
  // Handle final save after user enters configuration name
  const handleFinalSave = async (configName) => {
    console.log('handleFinalSave called with configName:', configName);
    console.log('configToSave:', configToSave);
    
    if (!configToSave) {
      console.error('configToSave is null or undefined');
      return;
    }
    
    // Add name to the configuration
    const finalConfig = {
      ...configToSave,
      name: configName,
      date: new Date().toISOString()
    };
    
    // Generate a random ID
    const generateRandomId = () => {
      return 'config_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };
    
    // Prepare data for API
    const apiPayload = {
      name: configName,
      thumbnail: "", // This could be updated later with an actual thumbnail
      config: configToSave, // Using the configSummary we created
      user_id: user?.data?._id || "" ,// Get user_id from Redux store
      iframe:{},
      date: new Date().toISOString(),
      id: generateRandomId() // Generate a random ID
    };
    
    console.log('API payload to send:', apiPayload);
    
    try {
      // Get dashboardToken from localStorage
      const dashboardToken = localStorage.getItem('limiToken');
      console.log('Using dashboardToken:', dashboardToken);
      
      // Send data to backend API
      const response = await fetch('https://api1.limitless-lighting.co.uk/admin/products/light-configs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${dashboardToken}` // Include token in authorization header
        },
        body: JSON.stringify(apiPayload)
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API response:', data);
      
      // Save configuration to Redux store
      dispatch(saveConfiguration(finalConfig));
      console.log('saveConfiguration action dispatched');
      
      // Close modal and show success toast
      setIsSaveModalOpen(false);
      toast.success('Configuration saved successfully');
    } catch (error) {
      console.error('Error saving configuration to API:', error);
      toast.error('Failed to save configuration. Please try again.');
      setIsSaveModalOpen(false);
    }
  };
  
  // Load configuration function
  const handleLoadConfig = () => {
    // Check if user is logged in
    if (!isLoggedIn) {
      toast.info('Please log in to load your saved configurations');
      // Redirect to login page
      setTimeout(() => {
        router.push('/portal');
      }, 1500);
      return;
    }
    
    // User is logged in, check if they have saved configurations
    if (!user || !user.savedConfigurations || user.savedConfigurations.length === 0) {
      toast.info('You have no saved configurations');
      return;
    }
    
    // In a real application, you would show a modal with saved configurations
    // For now, just log that the load function was called
    console.log('Load configuration function called');
    toast.info('Load configuration feature coming soon!');
    
    // Example of how you would load a configuration
    // const savedConfig = user.savedConfigurations[0];
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

  // Create ref for the container
  const containerRef = useRef(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0, top: 0, left: 0 });
  
  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerDimensions({
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left
        });
      }
    };
    
    // Initial update
    updateDimensions();
    
    // Add resize listener
    window.addEventListener('resize', updateDimensions);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full max-sm:h-[90vh] bg-transparent overflow-hidden"
    >
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
            containerDimensions={containerDimensions}
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
