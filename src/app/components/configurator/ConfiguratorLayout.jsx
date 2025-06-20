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
import { LoadConfigModal } from './LoadConfigModal';
import BaseColorPanel from './navComponents/BaseColorPanel';
import { useSelector, useDispatch } from 'react-redux';
import { saveConfiguration } from '../../../app/redux/slices/userSlice.js';
import { useRouter, useSearchParams } from 'next/navigation';
import ConfigurationSummary from '../lightConfigurator/ConfigurationSummary';

const ConfiguratorLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(state => state.user);
  const searchParams = useSearchParams();
  
  // State for loading configuration from URL
  const [isLoadingFromUrl, setIsLoadingFromUrl] = useState(false);
  const [configFromUrl, setConfigFromUrl] = useState(null);
  const [hasConfigIdParam, setHasConfigIdParam] = useState(false);
console.log(user)
  // Main configuration state
  const [config, setConfig] = useState({
    lightType: 'ceiling',
    baseType: 'round',
    configurationType: 'pendant', // 'pendant' or 'system'
    lightAmount: 1,
    systemType: 'bar',
    systemBaseDesign: 'nexus', // Default system base design
    baseColor: 'black',    // color of the base (black, gold, silver, midnight blue)
    pendants: [],
    selectedPendants: [],
    lightDesign: 'radial',
    cableColor: 'black',
    cableLength: '2mm',
    systemConfigurations: {}
  });
  
  // Preview mode state
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  // Modal states
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
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
      const randomDesign = ['bumble', 'radial', 'fina','ico', 'piko' ][Math.floor(Math.random() * 5)];
      pendants.push({
        id: i,
        design: randomDesign
      });
    }
    return pendants;
  };

  // Helper function to generate random system configurations
  const generateRandomSystems = (amount) => {
    // Available system types and their base designs
    const systemTypes = ['bar', 'universal'];
    const baseDesigns = {
      'bar': ['prism', 'helix', 'orbit', 'zenith', 'pulse', 'vortex', 'nexus', 'quasar', 'nova'],
      'universal': ['atom', 'nebula', 'cosmos', 'stellar', 'eclipse']
    };
    
    let systems = {};
    
    for (let i = 0; i < amount; i++) {
      // Randomly select system type
      const randomSystemType = systemTypes[Math.floor(Math.random() * systemTypes.length)];
      
      // Randomly select base design for this system type
      const availableDesigns = baseDesigns[randomSystemType];
      const randomDesign = availableDesigns[Math.floor(Math.random() * availableDesigns.length)];
      
      // Store the system configuration for this cable
      systems[i] = {
        systemType: randomSystemType,
        baseDesign: randomDesign
      };
    }
    
    return systems;
  };

  // Initialize pendants when component mounts
  useEffect(() => {
    // Check if we have a configId in the URL
    // If so, don't send default initialization messages as they'll be overridden
    if (!hasConfigIdParam) {
      // Create initial pendants based on light amount
      const initialPendants = generateRandomPendants(config.lightAmount);
      
      // Create initial systems based on light amount
      const initialSystems = generateRandomSystems(config.lightAmount);
      
      setConfig(prev => ({ 
        ...prev, 
        pendants: initialPendants,
        systemConfigurations: initialSystems
      }));
      
      setLastCeilingLightAmount(config.lightAmount);
      setLastRoundBaseLightAmount(config.lightAmount);
      
      // Send initial messages to PlayCanvas if no configId in URL
      if (playCanvasReadyRef.current) {
        // Send default configuration messages
        sendMessageToPlayCanvas(`light_type:${config.lightType}`);
        sendMessageToPlayCanvas(`light_amount:${config.lightAmount}`);
        sendMessageToPlayCanvas(`base_type:${config.baseType}`);
        
        // Send default pendant messages
        initialPendants.forEach((pendant, index) => {
          const productId = pendant.design === 'bumble' ? 'product_1' : 
                        pendant.design === 'radial' ? 'product_2' : 
                        pendant.design === 'fina' ? 'product_3' : 
                        pendant.design === 'ico' ? 'product_4' : 
                        pendant.design === 'piko' ? 'product_5' : 'product_2';
          
          sendMessageToPlayCanvas(`cable_${index}:${productId}`);
        });
      }
    }
  }, [hasConfigIdParam]);
      


  // Update pendants when light amount changes
  useEffect(() => {
    // Only update if we already have pendants initialized
    if (config.pendants.length > 0) {
      let updatedPendants = [...config.pendants];
      
      if (config.lightAmount > config.pendants.length) {
        // Add new pendants
        const designOptions = ['bumble', 'radial', 'fina', 'ico', 'piko'];
        
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
        playCanvasReadyRef.current = true;
        
        // If we have a configuration from URL, load it now
        if (configFromUrl) {
          console.log('Loading configuration from URL now that PlayCanvas is ready');
          handleLoadSpecificConfig(configFromUrl);
          setIsLoadingFromUrl(false);
        }
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [configFromUrl]);

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
    //   if (newAmount > 0) {
      newPendants.forEach((pendant, index) => {
        const productId = pendant.design === 'bumble' ? 'product_1' : 
                       pendant.design === 'radial' ? 'product_2' : 
                       pendant.design === 'fina' ? 'product_3' : 
                       pendant.design === 'ico' ? 'product_4' : 
                       pendant.design === 'piko' ? 'product_5' : 'product_2';
        
        sendMessageToPlayCanvas(`cable_${index}:${productId}`);
      });
    // } else {
    //   const productId = newPendants.design === 'bumble' ? 'product_1' : 
    //                    newPendants.design === 'radial' ? 'product_2' : 
    //                    newPendants.design === 'fina' ? 'product_3' : 'product_2';
    //   sendMessageToPlayCanvas(`cable_design:${productId}`);
    // }
    }, 0);
  };

  // Handle base type change
 
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
      //                      pendant.design === 'fina' ? 'product_3' : 'product_2';
            
      //       sendMessageToPlayCanvas(`cable_${index}:${productId}`);
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
                       pendant.design === 'fina' ? 'product_3' : 
                       pendant.design === 'ico' ? 'product_4' : 
                       pendant.design === 'piko' ? 'product_5' : 'product_2';
        
        sendMessageToPlayCanvas(`cable_${index}:${productId}`);
      });
    } else {
      const productId = newPendants.design === 'bumble' ? 'product_1' : 
                       newPendants.design === 'radial' ? 'product_2' : 
                       newPendants.design === 'fina' ? 'product_3' : 
                       newPendants.design === 'ico' ? 'product_4' : 
                       newPendants.design === 'piko' ? 'product_5' : 'product_2';
      sendMessageToPlayCanvas(`cable_0:${productId}`);
    }
    }, 0);
  };

  // Handle system type change
  const handleSystemTypeChange = (system) => {
    // Update the global system type
    setConfig(prev => ({ ...prev, systemType: system }));
    
    // Get the selected cable number(s)
    const selectedCables = config.selectedPendants && config.selectedPendants.length > 0 
      ? config.selectedPendants 
      : [0]; // Default to cable 0 if none selected
    
    // Update system type for each selected cable
    setConfig(prev => {
      // Create or update the cableSystemTypes object
      const cableSystemTypes = { ...(prev.cableSystemTypes || {}) };
      
      // Update system type for each selected cable
      selectedCables.forEach(cableNo => {
        cableSystemTypes[cableNo] = system;
        console.log(`Setting cable ${cableNo} system type to ${system}`);
      });
      
      return {
        ...prev,
        cableSystemTypes
      };
    });
    
    // Send messages to iframe
    setTimeout(() => {
      // Send system type message to iframe
      sendMessageToPlayCanvas(`system:${system}`);
      console.log(`Sending system:${system} to iframe`);
      setShowTypeSelector(false);
    }, 10);
  }
  
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
      { id: type, label: type?.charAt(0)?.toUpperCase() + type?.slice(1) }
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
                      design === 'fina' ? 'product_3' : 
                      design === 'ico' ? 'product_4' : 
                      design === 'piko' ? 'product_5' : 'product_2';
      
      // Check if we have only 1 pendant or multiple pendants
      if (config.lightAmount === 1) {
        // For single pendant, send a global pendant design message
        console.log(`Updating single pendant to design ${design} (${productId})`);
        sendMessageToPlayCanvas(`cable_0:${productId}`);
      } else {
        // For multiple pendants, send individual pendant messages
        pendantIds.forEach(id => {
          console.log(`Updating pendant ${id} to design ${design} (${productId})`);
          sendMessageToPlayCanvas(`cable_${id}:${productId}`);
        });
      }
    }, 10); // Slight delay to ensure state is updated first
  }, [config.lightAmount]);

  // Handle base type change
  const handleBaseTypeChange = useCallback((baseType) => {
    console.log(`Changing base type to: ${baseType}`);
    
    // Update config state
    setConfig(prev => ({
      ...prev,
      lightAmount: baseType === 'rectangular' ? 3 : 1,
      baseType
    }));
    
    // Send message to PlayCanvas iframe
    sendMessageToPlayCanvas(`base_type:${baseType}`);

    if(baseType === 'rectangular') {
      sendMessageToPlayCanvas(`light_amount:3`);

      sendMessageToPlayCanvas(`cable_0:product_2`);
      sendMessageToPlayCanvas(`cable_1:product_2`);
      sendMessageToPlayCanvas(`cable_2:product_2`);
    } else {
      sendMessageToPlayCanvas(`light_amount:1`);
      sendMessageToPlayCanvas(`cable_0:product_2`);
    }
    
    // Move to next step
    setActiveStep('baseColor');
  }, []);
  
  // Handle base color change
  const handleBaseColorChange = useCallback((baseColor) => {
    console.log(`Changing base color to: ${baseColor}`);
    
    // Update config state
    setConfig(prev => ({
      ...prev,
      baseColor
    }));
    
    // Send message to PlayCanvas iframe
    sendMessageToPlayCanvas(`base_color:${baseColor}`);
    
    // Move to next step
    setActiveStep('systemType');
  }, []);
  
  // Handle pendant selection
  const handlePendantSelection = useCallback((pendantIds) => {
    console.log('Selected pendants:', pendantIds);
    
    // Update config state with selected pendants
    setConfig(prev => ({
      ...prev,
      selectedPendants: pendantIds
    }));
  }, []);

  // Handle system base design change
  const handleSystemBaseDesignChange = useCallback((design) => {
    // Update the system base design in the config
    setConfig(prev => ({ ...prev, systemBaseDesign: design }));
    
    // Send message to PlayCanvas iframe
    setTimeout(() => {
      // Map design names to product IDs for the iframe based on system type
      // Each system type (bar/ball/universal) has its own set of base designs with specific IDs
      const systemTypeBaseMap = {
        'bar': {
          // Bar system uses baseNumbers 0-8
          'prism': 'system_base_1',
          'helix': 'system_base_2',
          'orbit': 'system_base_3',
          'zenith': 'system_base_4',
          'pulse': 'system_base_5',
          'vortex': 'system_base_6',
          'nexus': 'system_base_7',
          'quasar': 'system_base_8',
          'nova': 'system_base_9'
        },
        'universal': {
          // Universal system uses baseNumbers 1-15
          'atom': 'system_base_1',
          'nebula': 'system_base_2',
          'cosmos': 'system_base_3',
          'stellar': 'system_base_4',
          'eclipse': 'system_base_5',
          'aurora': 'system_base_6',
          'solstice': 'system_base_7',
          'quantum': 'system_base_8',
          'vertex': 'system_base_9',
          'horizon': 'system_base_10',
          'zenith': 'system_base_11',
          'equinox': 'system_base_12',
          'meridian': 'system_base_13',
          'polaris': 'system_base_14',

        }
      };
      
      // Get the selected cable number(s)
      const selectedCables = config.selectedPendants && config.selectedPendants.length > 0 
        ? config.selectedPendants 
        : [0]; // Default to cable 0 if none selected
      
      // Process each selected cable
      selectedCables.forEach(cableNo => {
        // Get the system type for this specific cable or use the default
        const cableSystemType = config.cableSystemTypes?.[cableNo] || config.systemType || 'universal';
        
        // Get the base design map for this system type
        const designMap = systemTypeBaseMap[cableSystemType] || systemTypeBaseMap.universal;
        
        // Get the base ID for this design within the current system type
        const baseId = designMap[design] || 'system_base_0';
        
        console.log(`Updating cable ${cableNo} base design to ${design} for system type ${cableSystemType} (${baseId})`);
        
        // Send system type message first for this cable
        sendMessageToPlayCanvas(`system:${cableSystemType}`);
        console.log(`Sending system:${cableSystemType} to iframe for cable ${cableNo}`);
        
        // Then send the cable base design message
        sendMessageToPlayCanvas(`cable_${cableNo}:${baseId}`);
        console.log(`Sending cable_${cableNo}:${baseId} to iframe`);
      });
    }, 10);
  }, [config.selectedPendants, config.systemType, config.cableSystemTypes]);

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
    console.log('Preparing config for save, config state:', config);

    const configSummary = {
      light_type: config.lightType,
      light_amount: config.lightAmount,
      base_color: config.baseColor,
      cables: {}
    };
    
    // Only include base_type for ceiling lights
    if (config.lightType === 'ceiling') {
      configSummary.base_type = config.baseType;
    }
    
    // Check if we have selected pendants that should be systems
    const selectedPendants = config.selectedPendants || [];
    
    // Map system types to their base design options
    const systemTypeBaseMap = {
      'bar': {
        'prism': 'system_base_1',
        'helix': 'system_base_2',
        'orbit': 'system_base_3',
        'zenith': 'system_base_4',
        'pulse': 'system_base_5',
        'vortex': 'system_base_6',
        'nexus': 'system_base_7',
        'quasar': 'system_base_8',
        'nova': 'system_base_9'
      },
      'universal': {
        'atom': 'system_base_1',
        'nebula': 'system_base_2',
        'cosmos': 'system_base_3',
        'stellar': 'system_base_4',
        'eclipse': 'system_base_5',
        'aurora': 'system_base_6',
        'solstice': 'system_base_7',
        'quantum': 'system_base_8',
        'vertex': 'system_base_9',
        'horizon': 'system_base_10',
        'zenith': 'system_base_11',
        'equinox': 'system_base_12',
        'meridian': 'system_base_13',
        'polaris': 'system_base_14',

      }
    };
    
    // Track cable system types for each cable
    const cableSystemTypes = {};
    
    // First, check if any cables have specific system types assigned
    if (config.cableSystemTypes) {
      Object.assign(cableSystemTypes, config.cableSystemTypes);
    }
    
    // Add individual cable configurations
    config.pendants.forEach((pendant, index) => {
      configSummary.cables[index] = {};
      
      // Check if this cable is selected for system configuration
      const isSelectedForSystem = selectedPendants.includes(index);
      
      // Special case: if this is the last cable and we have a systemType, make it a system
      const isLastCableWithSystem = (index === config.pendants.length - 1) && config.systemType;
      
      // Get the system type for this specific cable or use the default
      const cableSystemType = cableSystemTypes[index] || config.systemType || 'universal';
      
      // Determine if this is a pendant or system
      if (isSelectedForSystem || isLastCableWithSystem) {
        // It's a system
        console.log(`Cable ${index} identified as system type: ${cableSystemType}`);
        const baseDesign = config.systemBaseDesign || 'fusion';
        
        // Get the base design map for this system type
        const designMap = systemTypeBaseMap[cableSystemType] || systemTypeBaseMap.universal;
        
        // Get the base ID for this design within the current system type
        const baseId = designMap[baseDesign] || 'system_base_0';
        
        console.log(`System cable ${index} using ${cableSystemType} system with ${baseDesign} design (${baseId})`);
        
        configSummary.cables[index] = {
          system_type: cableSystemType,
          product: baseId
        };
      } else if (pendant.design === 'bumble' || pendant.design === 'radial' || 
          pendant.design === 'fina' || pendant.design === 'ico' || pendant.design === 'piko') {
        // It's a pendant
        console.log(`Cable ${index} identified as pendant type: ${pendant.design}`);
        const productId = pendant.design === 'bumble' ? 'product_1' : 
                       pendant.design === 'radial' ? 'product_2' : 
                       pendant.design === 'fina' ? 'product_3' : 
                       pendant.design === 'ico' ? 'product_4' : 
                       pendant.design === 'piko' ? 'product_5' : 'product_2';
        
        configSummary.cables[index] = {
          pendant: productId
        };
      } else {
        // Default to system if design is not recognized
        console.log(`Cable ${index} defaulting to system type (no recognized design)`);
        
        // Get the base design map for this specific cable's system type
        const designMap = systemTypeBaseMap[cableSystemType] || systemTypeBaseMap.universal;
        
        // Get the base ID for this design within the current system type
        // Use a valid default value based on the system type
        const baseDesign = config.systemBaseDesign || 
                          (cableSystemType === 'bar' ? 'prism' : 
                           cableSystemType === 'universal' ? 'atom' : 'atom');
        
        // Get the base ID using the design map
        const baseId = designMap[baseDesign] || 'system_base_1';
        
        configSummary.cables[index] = {
          system_type: cableSystemType,
          product: baseId
        };
      }
    });
    
    return configSummary;
  };
  
  // Handle final save after user enters configuration name
  const handleFinalSave = async (configName) => {
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

    // Collect all iframe messages in the sequence they would be sent to the iframe
    const iframeMessagesArray = [];

    // Add light type message
    iframeMessagesArray.push(`light_type:${configToSave.light_type}`);

    // Add light amount message
    iframeMessagesArray.push(`light_amount:${configToSave.light_amount}`);

    // Add base type message if it exists
    if (configToSave.base_type) {
      iframeMessagesArray.push(`base_type:${configToSave.base_type}`);
    }

    // Add all cable messages in the correct sequence
    // For system cables, send system type message immediately before the cable message
    if (configToSave.cables) {
      // First add all pendant cables
      Object.entries(configToSave.cables).forEach(([index, cable]) => {
        if (cable.pendant) {
          // It's a pendant cable - add it directly
          iframeMessagesArray.push(`cable_${index}:${cable.pendant}`);
          console.log(`Added pendant cable message: cable_${index}:${cable.pendant}`);
        }
      });
      
      // Then add all system cables with their system type immediately before
      Object.entries(configToSave.cables).forEach(([index, cable]) => {
        if (cable.product && cable.system_type) {
          // It's a system cable - add system type immediately before cable
          iframeMessagesArray.push(`system:${cable.system_type}`);
          console.log(`Added system type message: system:${cable.system_type} for cable ${index}`);
          
          // Then add the cable message
          iframeMessagesArray.push(`cable_${index}:${cable.product}`);
          console.log(`Added system cable message: cable_${index}:${cable.product}`);
        }
      });
    }
    
    // Add any additional parameters that might be needed
    if (configToSave.base_color) {
      iframeMessagesArray.push(`base_color:${configToSave.base_color}`);
    }
    
    if (configToSave.cable_color) {
      iframeMessagesArray.push(`cable_color:${configToSave.cable_color}`);
    }
    
    if (configToSave.cable_length) {
      iframeMessagesArray.push(`cable_length:${configToSave.cable_length}`);
    }
    
    console.log('Iframe messages array:', iframeMessagesArray);
    
    // Prepare UI-friendly config for display
    const uiConfig = {
      light_type: configToSave.light_type.charAt(0).toUpperCase() + configToSave.light_type.slice(1),
      light_amount: configToSave.light_amount,
      cables: {}
    };
    
    // Add base type if it exists
    if (configToSave.base_type) {
      uiConfig.base_type = configToSave.base_type.charAt(0).toUpperCase() + configToSave.base_type.slice(1);
    }
    
    // Format cable information for UI display
    if (configToSave.cables) {
      Object.entries(configToSave.cables).forEach(([index, cable]) => {
        const cableNumber = parseInt(index) + 1;
        
        // For pendant type
        if (cable.pendant) {
          // Map product IDs to friendly names
          const pendantNameMap = {
            'product_1': 'Bumble',
            'product_2': 'Radial',
            'product_3': 'Fina',
            'product_4': 'Ico',
            'product_5': 'Piko'
          };
          
          const pendantName = pendantNameMap[cable.pendant] || 'Unknown';
          uiConfig.cables[index] = `Cable ${cableNumber}: ${pendantName}`;
        }
        // For system type
        else if (cable.system_type && cable.product) {
          // Map system base IDs to friendly names
          const baseNameMap = {
            'system_base_0': 'Nexus',
            'system_base_1': 'Fusion',
            'system_base_2': 'Aurora',
            'system_base_4': 'Vertex',
            'system_base_6': 'Quantum'
          };
          
          const baseName = baseNameMap[cable.product] || 'Unknown';
          const systemType = cable.system_type.charAt(0).toUpperCase() + cable.system_type.slice(1);
          
          // Format the system cable information as a string with proper formatting
          uiConfig.cables[index] = `Cable ${cableNumber}: {
System Type : ${systemType}
Base Design: ${baseName}
}`;
        }
      });
    }
    
    // Prepare data for API
    const apiPayload = {
      name: configName,
      thumbnail: {
        url:"",
        public_id:""
      }, // Will be updated after screenshot upload
      config: uiConfig, // UI-friendly structured data for display
      user_id: user?.data?._id || "", // Get user_id from Redux store
      iframe: iframeMessagesArray, // Raw messages from iframe in sequence

    };
    
    console.log('API payload to send:', apiPayload);
    
    try {
      // Get dashboardToken from localStorage
      const dashboardToken = localStorage.getItem('limiToken');
      
      // Take screenshot of the configurator area
      const configuratorElement = document.getElementById('playcanvas-app');
      
     
      // Log the API payload for debugging
      console.log('Final API payload:', JSON.stringify(apiPayload, null, 2));
      
      // Send data to backend API
      const response = await fetch('https://api1.limitless-lighting.co.uk/admin/products/light-configs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${dashboardToken}` // Include token in authorization header
        },
        body: JSON.stringify(apiPayload)
      });
      
      // Log the response status
      console.log('API response status:', response.status);
      
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
      // toast.error('Failed to save configuration. Please try again.');
      setIsSaveModalOpen(false);
    }
  };
  
  // Load configuration function
  const handleLoadConfig = () => {
    console.log('Opening load configuration modal');
    
    // Check if user is logged in
    if (!isLoggedIn) {
      toast.info('Please log in to load your saved configurations');
      // Redirect to login page
      setTimeout(() => {
        router.push('/portal');
      }, 1500);
      return;
    }
    
    // User is logged in, open the load configuration modal
    setIsLoadModalOpen(true);
  };
  
  // Handle loading a specific configuration
  const handleLoadSpecificConfig = (configData) => {
    console.log('Loading specific configuration:', configData);
    
    if (!configData || !configData.iframe || !Array.isArray(configData.iframe)) {
      toast.error('Invalid configuration data');
      return;
    }
    
    // Send all iframe messages in sequence with a slight delay between each
    const sendMessagesInSequence = async (messages) => {
      for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
        console.log(`Sending iframe message ${i+1}/${messages.length}: ${message}`);
        sendMessageToPlayCanvas(message);
        
        // Wait a short time between messages to ensure proper sequence
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      toast.success('Configuration loaded successfully');
    };
    
    // Start sending messages
    sendMessagesInSequence(configData.iframe);
    
    // Update local config state based on loaded configuration
    const lightType = configData.config.light_type.toLowerCase();
    const baseType = configData.config.base_type?.toLowerCase() || 'round';
    const lightAmount = configData.config.light_amount || 1;
    const baseColor = configData.config.base_color || 'black';
    
    // Update the config state
    setConfig(prev => ({
      ...prev,
      lightType,
      baseType,
      lightAmount,
      baseColor,
      // We don't need to update pendants or other details as they will be handled by the iframe messages
    }));
  };
  
  // Container ref for PlayCanvas viewer
  const containerRef = useRef(null);
  
  // Ref for tracking if PlayCanvas is ready
  const playCanvasReadyRef = useRef(false);
  

  // Check for configId in URL parameters on initial load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const configId = urlParams.get('configId');
    if (configId) {
      setHasConfigIdParam(true);
      setIsLoadingFromUrl(true);
      // Load configuration data but don't apply it yet - wait for app:ready1
      fetch(`https://api1.limitless-lighting.co.uk/admin/products/light-configs/${configId}`)
        .then(response => response.json())
        .then(data => {
          setConfigFromUrl(data);
          // Don't call handleLoadSpecificConfig yet - wait for app:ready1
          // Just keep the loading state active
        })
        .catch(error => {
          console.error('Error loading configuration from URL:', error);
          setIsLoadingFromUrl(false);
          toast.error('Failed to load configuration');
        });
    }
  }, []);

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
      className="relative w-full h-full max-sm:h-[100vh] bg-transparent overflow-hidden"
    >
      {/* Loading overlay */}
      {isLoadingFromUrl && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-[#1e1e1e] p-8 rounded-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
            <p className="text-white text-lg">Loading your configuration...</p>
          </div>
        </div>
      )}
      
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
            onBaseColorChange={handleBaseColorChange}
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
      
      {/* Load Configuration Modal */}
      <AnimatePresence>
        {isLoadModalOpen && (
          <LoadConfigModal
            isOpen={isLoadModalOpen}
            onClose={() => setIsLoadModalOpen(false)}
            onLoad={handleLoadSpecificConfig}
            userId={user?.data?._id}
          />
        )}
      </AnimatePresence>
      
      <ToastContainer position="bottom-center" autoClose={3000} />

{/* 
      <ConfigurationSummary
        totalPrice={totalPrice}
        lightType={lightType}
        lightAmount={lightAmount}
        cableColor={cableColor}
        cableLength={cableLength}
        pendants={pendants}
        isDarkMode={isDarkMode}
      /> */}
    </div>
  );
};
export default ConfiguratorLayout;
