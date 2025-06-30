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
    systemConfigurations: {},
    shades: {} // Store shade selections for each pendant/system base
  });
  
  // Cables state - single source of truth for both pendants and systems
  const [cables, setCables] = useState([
    // Initial: one pendant
    { isSystem: false, systemType: "", design: "Ico", designId: "product_0" },
    { isSystem: true, systemType: "bar", design: "Prism", designId: "system_base_0" },
  ]);
  
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
  const [currentShade, setCurrentShade] = useState(null); // Currently selected shade

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
      
      systems[i] = {
        systemType: randomSystemType,
        baseDesign: randomDesign
      };
    }
    
    return systems;
  };
  
  // Helper function to generate random cables (for both pendants and systems)
  const generateRandomCables = (amount) => {
    const pendantDesigns = ['bumble', 'radial', 'fina', 'ico', 'piko'];
    const systemTypes = ['bar', 'universal'];
    const systemDesigns = {
      'bar': ['prism', 'helix', 'orbit', 'zenith', 'pulse', 'vortex', 'nexus', 'quasar', 'nova'],
      'universal': ['atom', 'nebula', 'cosmos', 'stellar', 'eclipse', 'aurora', 'solstice', 'quantum']
    };
    
    let newCables = [];
    
    for (let i = 0; i < amount; i++) {
      // 80% chance of pendant, 20% chance of system
      const isSystem = Math.random() > 0.8;
      
      if (isSystem) {
        // Generate a system cable
        const systemType = systemTypes[Math.floor(Math.random() * systemTypes.length)];
        const availableDesigns = systemDesigns[systemType];
        const design = availableDesigns[Math.floor(Math.random() * availableDesigns.length)];
        
        // Map design to designId
        const designIdMap = {
          'prism': 'system_base_1',
          'helix': 'system_base_2',
          'orbit': 'system_base_3',
          'zenith': 'system_base_4',
          'pulse': 'system_base_5',
          'vortex': 'system_base_6',
          'nexus': 'system_base_7',
          'quasar': 'system_base_8',
          'nova': 'system_base_9',
          'atom': 'system_base_1',
          'nebula': 'system_base_2',
          'cosmos': 'system_base_3',
          'stellar': 'system_base_4',
          'eclipse': 'system_base_5',
          'aurora': 'system_base_6',
          'solstice': 'system_base_7',
          'quantum': 'system_base_8'
        };
        
        newCables.push({
          isSystem: true,
          systemType: systemType,
          design: design,
          designId: designIdMap[design] || `system_base_${Math.floor(Math.random() * 9) + 1}`
        });
      } else {
        // Generate a pendant cable
        const design = pendantDesigns[Math.floor(Math.random() * pendantDesigns.length)];
        
        // Map design to designId
        const designIdMap = {
          'bumble': 'product_1',
          'radial': 'product_2',
          'fina': 'product_3',
          'ico': 'product_4',
          'piko': 'product_5'
        };
        
        newCables.push({
          isSystem: false,
          systemType: "",
          design: design,
          designId: designIdMap[design] || 'product_2'
        });
      }
    }
    
    return newCables;
  };
  
  // Reference to PlayCanvas iframe ready state
  const playCanvasReadyRef = useRef(false);
  
  // Function to send messages to PlayCanvas iframe
  const sendMessageToPlayCanvas = (message) => {
    const iframe = document.getElementById('playcanvas-app');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(message, '*');
      console.log(`Sent message to PlayCanvas: ${message}`);
    } else {
      console.warn('PlayCanvas iframe not found or not ready');
    }
  };
  
  useEffect(() => {
    // Check if we have a configId in the URL
    // If so, don't send default initialization messages as they'll be overridden
    if (!hasConfigIdParam) {
      // Create initial pendants based on light amount
      const initialPendants = generateRandomPendants(config.lightAmount);
      
      // Create initial systems based on light amount
      const initialSystems = generateRandomSystems(config.lightAmount);
      
      // Create initial cables based on light amount
      const initialCables = generateRandomCables(config.lightAmount);
      
      setConfig(prev => ({ 
        ...prev, 
        pendants: initialPendants,
        systemConfigurations: initialSystems
      }));
      
      // Update cables state
      setCables(initialCables);
      
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
      
      // Also update cables state to match new light amount
      if (config.lightAmount !== cables.length) {
        if (config.lightAmount > cables.length) {
          // Add new cables
          const newCables = [...cables];
          const additionalCables = generateRandomCables(config.lightAmount - cables.length);
          setCables([...newCables, ...additionalCables]);
        } else {
          // Remove excess cables
          setCables(cables.slice(0, config.lightAmount));
        }
      }
    }
  }, [config.lightAmount]);
  
  const handleLightTypeChange = (type) => {
    // Save current ceiling light amount if switching from ceiling
    if (config.lightType === 'ceiling' && type !== 'ceiling') {
      setLastCeilingLightAmount(config.lightAmount);
    }
    
    // Set default values based on light type
    let newAmount = config.lightAmount;
    let newPendants = [];
    let newCables = [];
    
    if (type === 'wall') {
      newAmount = 1;
      newPendants = generateRandomPendants(1);
      newCables = generateRandomCables(1);
    } else if (type === 'floor') {
      newAmount = 3;
      newPendants = generateRandomPendants(3);
      newCables = generateRandomCables(3);
    } else if (type === 'ceiling') {
      // Restore last ceiling light amount when switching back to ceiling
      if (config.baseType === 'rectangular') {
        newAmount = 3;
      } else {
        newAmount = lastCeilingLightAmount;
      }
      newPendants = generateRandomPendants(newAmount);
      newCables = generateRandomCables(newAmount);
    }
    
    setConfig(prev => ({ 
      ...prev, 
      lightType: type,
      lightAmount: newAmount,
      pendants: newPendants
    }));
    
    // Update cables state
    setCables(newCables);
    
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
                       pendant.design === 'fina' ? 'product_3' : 
                       pendant.design === 'ico' ? 'product_4' : 
                       pendant.design === 'piko' ? 'product_5' : 'product_2';
        
        sendMessageToPlayCanvas(`cable_${index}:${productId}`);
      });
    }, 0);
  };
  
  const handleConfigurationTypeChange = useCallback((type) => {
    setConfig(prev => {
      const newConfig = { ...prev, configurationType: type };
      
      // Update cables state based on configuration type
      if (type === 'system') {
        // When switching to system configuration, update cables to reflect system types
        setCables(prevCables => {
          return prevCables.map(cable => ({
            ...cable,
            isSystem: true,
            systemType: cable.systemType || config.systemType || 'bar',
            design: cable.design || 'prism',
            designId: cable.designId || 'system_base_1'
          }));
        });
      } else if (type === 'pendant') {
        // When switching to pendant configuration, update cables to reflect pendant types
        setCables(prevCables => {
          return prevCables.map(cable => ({
            ...cable,
            isSystem: false,
            systemType: "",
            design: cable.design || 'radial',
            designId: cable.designId || 'product_2'
          }));
        });
      }
      
      return newConfig;
    });
  }, [config.systemType]);
  
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
    
    // Generate new cables for the new amount
    const newCables = generateRandomCables(amount);
    
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
    
    // Update cables state
    setCables(newCables);
    
    // Send messages to iframe
    setTimeout(() => {
      // Send light amount message
      sendMessageToPlayCanvas(`light_amount:${amount}`);
      
      // For multiple pendants, send individual pendant messages
      newPendants.forEach((pendant, index) => {
        const productId = pendant.design === 'bumble' ? 'product_1' : 
                       pendant.design === 'radial' ? 'product_2' : 
                       pendant.design === 'fina' ? 'product_3' : 
                       pendant.design === 'ico' ? 'product_4' : 
                       pendant.design === 'piko' ? 'product_5' : 'product_2';
        
        sendMessageToPlayCanvas(`cable_${index}:${productId}`);
      });
    }, 0);
  };
  
  const handleBaseTypeChange = useCallback((baseType) => {
    console.log(`Changing base type to: ${baseType}`);
    
    // Set default light amount based on base type
    const newAmount = baseType === 'rectangular' ? 3 : 1;
    
    // Generate new pendants and cables for the new amount
    const newPendants = generateRandomPendants(newAmount);
    const newCables = generateRandomCables(newAmount);
    
    // Update config state
    setConfig(prev => ({
      ...prev,
      lightAmount: newAmount,
      baseType,
      pendants: newPendants
    }));
    
    // Update cables state
    setCables(newCables);
    
    // Send message to PlayCanvas iframe
    sendMessageToPlayCanvas(`base_type:${baseType}`);
    sendMessageToPlayCanvas(`light_amount:${newAmount}`);

    // Send pendant messages
    newPendants.forEach((pendant, index) => {
      const productId = pendant.design === 'bumble' ? 'product_1' : 
                     pendant.design === 'radial' ? 'product_2' : 
                     pendant.design === 'fina' ? 'product_3' : 
                     pendant.design === 'ico' ? 'product_4' : 
                     pendant.design === 'piko' ? 'product_5' : 'product_2';
      
      sendMessageToPlayCanvas(`cable_${index}:${productId}`);
    });
    
    // Move to next step
    setActiveStep('baseColor');
  }, []);
  
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
    
    // Update cables state for selected cables
    setCables(prevCables => {
      const updatedCables = [...prevCables];
      
      selectedCables.forEach(cableIndex => {
        if (cableIndex >= 0 && cableIndex < updatedCables.length) {
          updatedCables[cableIndex] = {
            ...updatedCables[cableIndex],
            isSystem: true,
            systemType: system
          };
        }
      });
      
      return updatedCables;
    });
    
    // Send messages to iframe
    setTimeout(() => {
      // Send system type message to iframe
      sendMessageToPlayCanvas(`system:${system}`);
      console.log(`Sending system:${system} to iframe`);
      setShowTypeSelector(false);
    }, 10);
  };
  
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
    
    // Update cables state for selected pendants
    setCables(prevCables => {
      const updatedCables = [...prevCables];
      
      pendantIds.forEach(id => {
        if (id >= 0 && id < updatedCables.length) {
          // Map design to designId
          const designIdMap = {
            'bumble': 'product_1',
            'radial': 'product_2',
            'fina': 'product_3',
            'ico': 'product_4',
            'piko': 'product_5'
          };
          
          updatedCables[id] = {
            ...updatedCables[id],
            isSystem: false,
            design: design,
            designId: designIdMap[design] || 'product_2'
          };
        }
      });
      
      return updatedCables;
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
  
  const handleSystemBaseDesignChange = useCallback((design) => {
    // Update the system base design in the config
    setConfig(prev => ({ ...prev, systemBaseDesign: design }));
    
    // Reset current shade when changing base design
    setCurrentShade(null);
    
    // Map design names to product IDs for the iframe based on system type
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
        'polaris': 'system_base_14'
      }
    };
    
    // Get the selected cable number(s)
    const selectedCables = config.selectedPendants && config.selectedPendants.length > 0 
      ? config.selectedPendants 
      : [0]; // Default to cable 0 if none selected
    
    // Update cables state for selected cables
    setCables(prevCables => {
      const updatedCables = [...prevCables];
      
      selectedCables.forEach(cableNo => {
        // Get the system type for this specific cable or use the default
        const cableSystemType = config.cableSystemTypes?.[cableNo] || config.systemType || 'universal';
        
        // Get the base design map for this system type
        const designMap = systemTypeBaseMap[cableSystemType] || systemTypeBaseMap.universal;
        
        // Get the base ID for this design within the current system type
        const baseId = designMap[design] || 'system_base_0';
        
        if (cableNo >= 0 && cableNo < updatedCables.length) {
          updatedCables[cableNo] = {
            ...updatedCables[cableNo],
            isSystem: true,
            systemType: cableSystemType,
            design: design,
            designId: baseId
          };
        }
      });
      
      return updatedCables;
    });
    
    // Send message to PlayCanvas iframe
    setTimeout(() => {
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
  
  const handlePendantSelection = useCallback((pendantIds) => {
    console.log('Selected pendants:', pendantIds);
    
    // Update config state with selected pendants
    setConfig(prev => ({
      ...prev,
      selectedPendants: pendantIds
    }));
  }, []);
  
  // Handle saving configuration
  const handleSaveConfig = () => {
    // Prepare configuration data for saving
    const configData = {
      light_type: config.lightType,
      light_amount: config.lightAmount,
      base_type: config.baseType,
      base_color: config.baseColor,
      configuration_type: config.configurationType,
      system_type: config.systemType,
      system_base_design: config.systemBaseDesign,
      pendants: config.pendants,
      cables: cables, // Include cables state in saved configuration
      selected_pendants: config.selectedPendants,
      cable_system_types: config.cableSystemTypes,
      shades: config.shades
    };
    
    setConfigToSave(configData);
    setIsSaveModalOpen(true);
  };
  
  // Handle loading configuration
  const handleLoadConfig = (loadedConfig) => {
    if (!loadedConfig) return;
    
    // Update config state with loaded configuration
    setConfig({
      lightType: loadedConfig.light_type || 'ceiling',
      baseType: loadedConfig.base_type || 'round',
      configurationType: loadedConfig.configuration_type || 'pendant',
      lightAmount: loadedConfig.light_amount || 1,
      systemType: loadedConfig.system_type || 'bar',
      systemBaseDesign: loadedConfig.system_base_design || 'nexus',
      baseColor: loadedConfig.base_color || 'black',
      pendants: loadedConfig.pendants || [],
      selectedPendants: loadedConfig.selected_pendants || [],
      cableSystemTypes: loadedConfig.cable_system_types || {},
      shades: loadedConfig.shades || {}
    });
    
    // Update cables state if available in loaded configuration
    if (loadedConfig.cables && Array.isArray(loadedConfig.cables)) {
      setCables(loadedConfig.cables);
    } else {
      // Generate cables based on loaded configuration if not available
      setCables(generateRandomCables(loadedConfig.light_amount || 1));
    }
    
    // Send messages to iframe to update visualization
    setTimeout(() => {
      sendMessageToPlayCanvas(`light_type:${loadedConfig.light_type}`);
      sendMessageToPlayCanvas(`light_amount:${loadedConfig.light_amount}`);
      sendMessageToPlayCanvas(`base_type:${loadedConfig.base_type}`);
      
      // Send pendant messages
      if (loadedConfig.pendants) {
        loadedConfig.pendants.forEach((pendant, index) => {
          const productId = pendant.design === 'bumble' ? 'product_1' : 
                         pendant.design === 'radial' ? 'product_2' : 
                         pendant.design === 'fina' ? 'product_3' : 
                         pendant.design === 'ico' ? 'product_4' : 
                         pendant.design === 'piko' ? 'product_5' : 'product_2';
          
          sendMessageToPlayCanvas(`cable_${index}:${productId}`);
        });
      }
    }, 100);
    
    setIsLoadModalOpen(false);
  };
  
  // Handle final save of configuration with name
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
      date: new Date().toISOString(),
      cables: cables // Include cables state in saved configuration
    };
    
    // Generate a random ID if needed
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
    
    try {
      // Save configuration to user's account if logged in
      if (isLoggedIn && user) {
        // Add user ID to configuration
        finalConfig.userId = user.id;
        
        // Dispatch save action to Redux
        await dispatch(saveConfiguration(finalConfig));
        
        toast.success(`Configuration "${configName}" saved successfully!`);
      } else {
        // For non-logged in users, save to local storage
        const savedConfigs = JSON.parse(localStorage.getItem('savedConfigurations') || '[]');
        
        // Add ID to configuration
        finalConfig.id = generateRandomId();
        
        // Add to saved configurations
        savedConfigs.push(finalConfig);
        
        // Save back to local storage
        localStorage.setItem('savedConfigurations', JSON.stringify(savedConfigs));
        
        toast.success(`Configuration "${configName}" saved to local storage!`);
      }
      
      // Close the save modal
      setIsSaveModalOpen(false);
      
    } catch (error) {
      console.error('Error saving configuration:', error);
      toast.error('Failed to save configuration. Please try again.');
    }
  };
  
  return (
    <div className="configurator-layout">
      {/* PlayCanvas Viewer */}
      <PlayCanvasViewer 
        onPlayCanvasReady={() => {
          playCanvasReadyRef.current = true;
          setIsLoading(false);
        }}
      />
      
      {/* Preview Controls */}
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
            containerDimensions={{width: 300, height: 600}} // Example dimensions
            activeStep={activeStep} 
            setActiveStep={setActiveStep} 
            config={config}
            cables={cables} // Pass cables state to VerticalNavBar
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
          
          {/* Horizontal Options Bar */}
          <HorizontalOptionsBar 
            config={config}
            cables={cables} // Pass cables state to HorizontalOptionsBar
            onLightTypeChange={handleLightTypeChange}
            onBaseTypeChange={handleBaseTypeChange}
            onConfigurationTypeChange={handleConfigurationTypeChange}
            onLightAmountChange={handleLightAmountChange}
          />
        </>
      )}
      
      {/* Save Configuration Modal */}
      {isSaveModalOpen && (
        <SaveConfigModal 
          isOpen={isSaveModalOpen}
          onClose={() => setIsSaveModalOpen(false)}
          onSave={handleFinalSave}
          isLoggedIn={isLoggedIn}
        />
      )}
      
      {/* Load Configuration Modal */}
      {isLoadModalOpen && (
        <LoadConfigModal 
          isOpen={isLoadModalOpen}
          onClose={() => setIsLoadModalOpen(false)}
          onLoad={handleLoadConfig}
          isLoggedIn={isLoggedIn}
          userId={user?.id}
        />
      )}
      
      {/* Toast Container for notifications */}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ConfiguratorLayout;
