"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VerticalNavBar from "./VerticalNavBar";
import HorizontalOptionsBar from "./HorizontalOptionsBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlayCanvasViewer from "../PlayCanvasViewer";
import { ConfigurationTypeSelector } from "./navComponents/ConfigurationTypeSelector";
import { Breadcrumb } from "./navComponents/Breadcrumb";
import { PreviewControls } from "./PreviewControls";
import { SaveConfigModal } from "./SaveConfigModal";
import { LoadConfigModal } from "./LoadConfigModal";
import BaseColorPanel from "./navComponents/BaseColorPanel";
import { useSelector, useDispatch } from "react-redux";
import { saveConfiguration } from "../../../app/redux/slices/userSlice.js";
import { useRouter, useSearchParams } from "next/navigation";
import ConfigurationSummary from "../lightConfigurator/ConfigurationSummary";
import { fetchUserByToken } from "../../../app/redux/slices/userSlice.js";
import { listenForCableMessages, listenForMouseOutMessages, listenForMouseOverMessages,listenForOffconfigMessages } from "../../util/iframeCableMessageHandler";
import { listenForWallbaseColorMessages } from "../../util/iframeCableMessageHandler";
import { listenForSelectedCableMessages } from "../../util/iframeCableMessageHandler";


const ConfiguratorLayout = () => {
  
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const searchParams = useSearchParams();

  // State for loading configuration from URL
  const [isLoadingFromUrl, setIsLoadingFromUrl] = useState(false);
  const [configFromUrl, setConfigFromUrl] = useState(null);
  const [hasConfigIdParam, setHasConfigIdParam] = useState(false);
  const [localSavedConfig,setLocalSavedConfig] = useState({});
  const [localSavedCables,setLocalSavedCables] = useState({});
  const [cableMessage, setCableMessage] = useState('');
  const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);

const handleOpenSaveModal = () => {
  setConfiguringType("save");
  setShowConfigurationTypeSelector(false);
};
// Helper functions for localStorage persistence
const loadFromLocalStorage = (key, defaultValue) => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return defaultValue;
  }
};
const iframe = document.getElementById('playcanvas-app');
// useEffect(() => {
//   // Handler to set cursor to hand/grab/drag
//   const handleMouseOver = () => {

  
//     const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
//     if (iframeDoc) {
//       iframeDoc.body.style.cursor = 'grab';
//     }
//   };
//   const cleanup = listenForMouseOverMessages((message, event) => {
//     console.log('[ConfigPanel] Received mouse over message:', message,event.data);
//     handleMouseOver();
//   });
 
//   return cleanup;
// }, []);
// useEffect(() => {

//   // Handler to revert cursor to default
//   const handleMouseOut = () => {
  
//      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
//     if (iframeDoc) {
//       iframeDoc.body.style.cursor = 'default';
//     }
//   };

//   const cleanup2 = listenForMouseOutMessages((message, event) => {
//     // Do something with the message, e.g. open UI, update state, etc.
//     console.log('[ConfigPanel] Received mouse out message:', message,event.data);
//     // Example: open a modal, update config, etc.
//     handleMouseOut();
//   });
//   return cleanup2;
// }, []);


const saveToLocalStorage = (key, value) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error writing to localStorage", error);
  }
};
  // Main configuration state - load from localStorage or use defaults
  const [config, setConfig] = useState(() => {
    const savedConfig = loadFromLocalStorage("lightConfig", {
      lightType: "ceiling",
      baseType: "round",
      configurationType: "pendant",
      lightAmount: 1,
      systemType: "bar",
      systemBaseDesign: "nexus",
      baseColor: "black",
      connectorColor: "black",
      pendants: [],
      selectedPendants: [],
      lightDesign: "radial",
      hotspot: "off",
      cableColor: "black",
      cableLength: "2mm",
      systemConfigurations: {},
      shades: {},
      lighting: true,
      colorTemperature: 50,
      brightness: 50,
    });
    return savedConfig;
  });
 console.log("cable selected", cableMessage);
  // Cables state with localStorage persistence
  const [cables, setCables] = useState(() => {
    return loadFromLocalStorage("lightCables", [
      {
        isSystem: false,
        systemType: "", 
        design: "Radial",
        designId: "product_2",
        size: "2mm",
      },
    ]);
  }); 


  const [brightness, setBrightness] = useState(config.brightness ?? 50);
  const [colorTemperature, setColorTemperature] = useState(config.colorTemperature ?? 50);
  const [lighting, setLighting] = useState(
    typeof config.lighting === "boolean" ? config.lighting : true
  );

  useEffect(() => {
    setConfig(prev => ({
      ...prev,
      brightness,
      colorTemperature,
      lighting
    }));
  }, [brightness, colorTemperature, lighting]);

  useEffect(() => {
  if (mounted && config.pendants.length === 0) {
    const initialPendants = getDefaultPendantAssignments(config.lightAmount);
    const initialSystems = getDefaultSystemAssignments(config.lightAmount);
    setConfig(prev => ({
      ...prev,
      pendants: initialPendants,
      systemConfigurations: initialSystems,
    }));
  }
}, [mounted, config.lightAmount]);
  // Save to localStorage whenever config or cables change
 

useEffect(() => {
  console.log("config",config);
  console.log("cables",cables);
  saveToLocalStorage('lightConfig', config);
  saveToLocalStorage('lightCables', cables);
}, [config, cables]);

useEffect(() => {
  // Set up cable message listener
  const cleanup = listenForCableMessages((message, event) => {
    // Do something with the message, e.g. open UI, update state, etc.
    console.log('[ConfigPanel] Received cable message:', message,event.data);
    // Example: open a modal, update config, etc.
    // setIsCableModalOpen(true);
    setCableMessage(message);
  });
  return cleanup;
}, []);

useEffect(() => {
  // Set up cable message listener
  const cleanup = listenForOffconfigMessages((message, event) => {
    // Do something with the message, e.g. open UI, update state, etc.
    console.log('[ConfigPanel] Received offconfig message:', message,event.data);
    // Example: open a modal, update config, etc.
    // setIsCableModalOpen(true);
    setCableMessage(message);
  });
  return cleanup;
}, []);




  // Handler for cable size change
  const handleCableSizeChange = (size, selectedCables) => {
    setCables((prev) => {
      const updated = [...prev];
      (selectedCables || []).forEach((idx) => {
        if (updated[idx]) updated[idx] = { ...updated[idx], size };
      });
      return updated;
    });
    // Send a message for each selected cable
    (selectedCables || []).forEach((idx) => {
      sendMessageToPlayCanvas(`cable_${idx}:size_${size}`);
    });
  };

  // Handler for shade selection
  const handleShadeSelect = (designId, shadeId, systemType, shadeIndex) => {
    setCables((prev) => {
      const updated = [...prev];
      (config.selectedPendants || []).forEach((idx) => {
        if (updated[idx]) {
          updated[idx] = {
            ...updated[idx],
            design: `${designId} (${shadeId})`,
            designId: `system_base_${designId}_${shadeIndex + 1}`,
          };
        }
      });
      return updated;
    });
    (config.selectedPendants || []).forEach((idx) => {
      sendMessageToPlayCanvas(
        `cable_${idx}:system_base_${designId}_${shadeIndex + 1}`
      );
    });
  };

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
  const [showConfigurationTypeSelector, setShowConfigurationTypeSelector] = useState(false);
  // Navigation state
  const [activeStep, setActiveStep] = useState("lightType");
  const [isLoading, setIsLoading] = useState(true);

  const handleCloseSaveModal = () => {
    setConfiguringType(null);
    setShowConfigurationTypeSelector(true);
  };
  // Deterministic pendant assignments for 1, 3, 6 lights
const getDefaultPendantAssignments = (amount) => {
  switch (amount) {
    case 1:
      return [{ id: 0, systemType: "bar", design: "helix" ,isSystem: true, designId: "system_base_2"}];
    case 3:
      return [
        { id: 0, systemType: "bar", design: "orbit" , designId: "system_base_1", isSystem: true},
        { id: 1, systemType: "", design: "bumble" , designId: "product_2", isSystem: false},
        { id: 2, systemType: "universal", design: "aurora" , designId: "system_base_6", isSystem: true},
      ];
    case 6:
      return [
        { id: 0, systemType: "", design: "bumble" , designId: "product_2", isSystem: false},
        { id: 1, systemType: "", design: "piko" , designId: "product_5", isSystem: false},
        { id: 2, systemType: "bar", design: "helix" , designId: "system_base_2", isSystem: true},
        { id: 3, systemType: "bar", design: "zenith" , designId: "system_base_4", isSystem: true},
        { id: 4, systemType: "universal", design: "equinox" , designId: "system_base_12", isSystem: true},
        { id: 5, systemType: "universal", design: "stellar" , designId: "system_base_4", isSystem: true},
      ];
  }
};

// Deterministic system assignments for 1, 3, 6 lights
const getDefaultSystemAssignments = (amount) => {
  switch (amount) {
    case 1:
      return [{ id: 0, systemType: "bar", design: "helix" ,isSystem: true, designId: "system_base_2"}];
    case 3:
      return [
        { id: 0, systemType: "bar", design: "orbit" , designId: "system_base_1", isSystem: true},
        { id: 1, systemType: "", design: "bumble" , designId: "product_2", isSystem: false},
        { id: 2, systemType: "universal", design: "aurora" , designId: "system_base_6", isSystem: true},
      ];
    case 6:
      return [
        { id: 0, systemType: "", design: "bumble" , designId: "product_2", isSystem: false},
        { id: 1, systemType: "", design: "piko" , designId: "product_5", isSystem: false},
        { id: 2, systemType: "bar", design: "helix" , designId: "system_base_2", isSystem: true},
        { id: 3, systemType: "bar", design: "zenith" , designId: "system_base_4", isSystem: true},
        { id: 4, systemType: "universal", design: "equinox" , designId: "system_base_12", isSystem: true},
        { id: 5, systemType: "universal", design: "stellar" , designId: "system_base_4", isSystem: true},
      ];
   }
};

// Helper to map pendant design to productId for PlayCanvas
const getProductIdForDesign = (design) => {
  switch (design) {
    case "bumble": return "product_1";
    case "radial": return "product_2";
    case "ico": return "product_4";
    case "piko": return "product_5";
    default: return "product_2";
  }
};

  // Initialize pendants when component mounts
 // Initialize pendants when component mounts
useEffect(() => {
  // Check if we have a configId in the URL
  if (hasConfigIdParam) return;

  // Only initialize with defaults if we don't have saved state
  const savedConfig = loadFromLocalStorage('lightConfig', null);
  const savedCables = loadFromLocalStorage('lightCables', null);
  setLocalSavedConfig(savedConfig);
  setLocalSavedCables(savedCables);
  console.log("localSavedConfig",localSavedConfig);
  console.log("localSavedCables",localSavedCables); 
  console.log("savedConfig",savedConfig);
  console.log("savedCables",savedCables);

  if (!savedConfig || !savedCables) {
    console.log("initializing with defaults");
    const initialPendants = getDefaultPendantAssignments(config.lightAmount);
    const initialSystems = getDefaultSystemAssignments(config.lightAmount);
    
    setConfig(prev => ({ 
      ...prev, 
      pendants: initialPendants,
      systemConfigurations: initialSystems
    }));

    setCables(prev => [...prev, { 
      isSystem: false, 
      systemType: system.systemType, 
      design: system.design, 

      designId: system.designId 
    }]);
    setLastCeilingLightAmount(config.lightAmount);
    setLastRoundBaseLightAmount(config.lightAmount);
    
    // Send initial messages to PlayCanvas
    if (playCanvasReadyRef.current) {
      sendMessageToPlayCanvas(`light_type:${config.lightType}`);
      sendMessageToPlayCanvas(`base_type:${config.baseType}`);
      sendMessageToPlayCanvas(`light_amount:${config.lightAmount}`);

      // Send pendant messages
      initialSystems.forEach((system, index) => {
        const productId = getProductIdForDesign(system.design);
        setCables(prev => [...prev, { 
          isSystem: false, 
          systemType: system.systemType, 
          design: system.design, 
          designId: system.designId 
        }]);
        sendMessageToPlayCanvas(`system:${system.systemType}`);
        sendMessageToPlayCanvas(`cable_${index}:${system.designId}`);
      });
    }
  } else {
    console.log("loading from saved state");
    console.log("savedConfig",savedConfig);
    console.log("savedCables",savedCables);
    
    sendMessageToPlayCanvas(`light_type:${savedConfig.lightType}`);
    console.log("light_type",savedConfig.lightType);
    sendMessageToPlayCanvas(`light_amount:${savedConfig.lightAmount}`);
    sendMessageToPlayCanvas(`base_type:${savedConfig.baseType}`);
    savedCables.forEach((cable, index) => {
      if(cable.systemType){
        sendMessageToPlayCanvas(`system:${cable.systemType}`);
        sendMessageToPlayCanvas(`cable_${index}:${cable.designId}`);
      } else {
        sendMessageToPlayCanvas(`cable_${index}:${cable.designId}`);
      }
    });
    
  }
}, [hasConfigIdParam]);

  // Update pendants when light amount changes
  // useEffect(() => {
  //   // Only update if we already have pendants initialized
  //   if (config.pendants.length > 0) {
  //     let updatedPendants = [...config.pendants];

  //     if (config.lightAmount > config.pendants.length) {
  //       // Add new pendants
  //       const designOptions = ['bumble', 'radial', 'fina', 'ico', 'piko'];

  //       for (let i = config.pendants.length; i < config.lightAmount; i++) {
  //         updatedPendants.push({
  //           id: i,
  //           design: designOptions[Math.floor(Math.random() * designOptions.length)],
  //         });
  //         const productId = designOptions[Math.floor(Math.random() * designOptions.length)] === 'bumble' ? 'product_1' :
  //         designOptions[Math.floor(Math.random() * designOptions.length)] === 'radial' ? 'product_2' :
         
  //         designOptions[Math.floor(Math.random() * designOptions.length)] === 'ico' ? 'product_4' :
  //         designOptions[Math.floor(Math.random() * designOptions.length)] === 'piko' ? 'product_5' : 'product_2';
  //         setCables(prev => [...prev, { isSystem: false, systemType: "", design: designOptions[Math.floor(Math.random() * designOptions.length)], designId: productId }]);
  //       }
  //     } else if (config.lightAmount < config.pendants.length) {
  //       // Remove excess pendants
  //       updatedPendants = updatedPendants.slice(0, config.lightAmount);
  //     }

  //     setConfig(prev => ({ ...prev, pendants: updatedPendants }));
  //   }
  // }, [config.lightAmount]);

  // Listen for app:ready1 message from PlayCanvas iframe
  const handleLoadSpecificConfig = (configData) => {
    if (
      !configData ||
      !configData.iframe ||
      !Array.isArray(configData.iframe)
    ) {
      // toast.error("Invalid configuration data");
      return;
    }

    // Send all iframe messages in sequence with a slight delay between each
    const sendMessagesInSequence = async (messages) => {
      for (let i = 0; i < messages.length; i++) {
        const message = messages[i];

        sendMessageToPlayCanvas(message);

        // Wait a short time between messages to ensure proper sequence
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      toast.success("Configuration loaded successfully");
    };

    // Start sending messages
    sendMessagesInSequence(configData.iframe);

    // Update local config state based on loaded configuration
    const lightType = configData.config.light_type.toLowerCase();
    const baseType = configData.config.base_type?.toLowerCase() || "round";
    const lightAmount = configData.config.light_amount || 1;
    const baseColor = configData.config.base_color || "black";
    const connectorColor = configData.config.connector_color || "black";
    const brightness = configData.config.brightness || 75;
    const colorTemperature = configData.config.colorTemperature || 50;
    const lighting = configData.config.lighting || true;
    // Update the config state
    setConfig((prev) => ({
      ...prev,
      lightType,
      baseType,
      lightAmount,
      baseColor,
      connectorColor,
      brightness,
      colorTemperature,
      lighting,
      // We don't need to update pendants or other details as they will be handled by the iframe messages
    }));
    setCables(configData.config.cableConfig);
  };
  // Listen for app:ready1 message from PlayCanvas iframe
useEffect(() => {
  const handleMessage = (event) => {
    if (event.data === "app:ready1") {
      setIsLoading(false);
      playCanvasReadyRef.current = true;

      // Load saved configuration if available
      const savedConfig = loadFromLocalStorage('lightConfig', null);
      console.log("savedConfig", savedConfig);

      const savedCables = loadFromLocalStorage('lightCables', null);
      console.log("savedCables", savedCables)
      if (savedConfig && savedCables) {
        console.log("Loading saved configuration...");
        sendMessageToPlayCanvas(`light_type:${savedConfig.lightType}`);
        console.log("light_type", savedConfig.lightType);
        sendMessageToPlayCanvas(`base_type:${savedConfig.baseType}`);
        sendMessageToPlayCanvas(`light_amount:${savedConfig.lightAmount}`);
        sendMessageToPlayCanvas(`base_color:${savedConfig.baseColor}`);
        sendMessageToPlayCanvas(`connector_color:${savedConfig.connectorColor}`);
   
        
        savedCables.forEach((cable, index) => {
          if (cable.systemType) {
            sendMessageToPlayCanvas(`system:${cable.systemType}`);
            const parts = cable.designId.split('_'); // system_base_2_2
            if (parts.length === 4) { // [system, base, 2, 2]
              const baseDesign = parts.slice(0, 3).join('_'); // e.g., "system_base_2"
              sendMessageToPlayCanvas(`cable_${index}:${baseDesign}`);
              sendMessageToPlayCanvas(`cable_${index}:${cable.designId}`);
            } else {
              sendMessageToPlayCanvas(`cable_${index}:${cable.designId}`);
            }
            console.log("cable" , cable.size)
            sendMessageToPlayCanvas(`cable_${index}:size_${cable.size}`);

          } else {
            sendMessageToPlayCanvas(`cable_${index}:${cable.designId}`);
            sendMessageToPlayCanvas(`cable_${index}:size_${cable.size}`);
          }
        });
        sendMessageToPlayCanvas(`lighting:${savedConfig.lighting ? "on" : "off"}`);
        if (savedConfig.lighting) {
          sendMessageToPlayCanvas(`brightness:${savedConfig.brightness}`);
          sendMessageToPlayCanvas(
            "colorTemperature:" +
              Math.round(2700 + (savedConfig.colorTemperature / 100) * (6500 - 2700))
          );
        }
      }

      // If we have a configuration from URL, load it now
      if (configFromUrl) {
        handleLoadSpecificConfig(configFromUrl);
        setIsLoadingFromUrl(false);
      }
    }
  };

  window.addEventListener("message", handleMessage);
  return () => window.removeEventListener("message", handleMessage);
}, [configFromUrl, handleLoadSpecificConfig]); // Added handleLoadSpecificConfig to dependencies

  // Handle light type change
  const handleLightTypeChange = (type) => {
    // Save current ceiling light amount if switching from ceiling
    if (config.lightType === "ceiling" && type !== "ceiling") {
      setLastCeilingLightAmount(config.lightAmount);
    }

    // Set default values based on light type
    let newAmount = config.lightAmount;
    let newPendants = [];

    if (type === "wall") {
      newAmount = 1;
      setConfig((prev) => ({
        ...prev,
        lightType: type,
        lightAmount: newAmount,
      }));
      newPendants = getDefaultPendantAssignments(1);
    } else if (type === "floor") {
      newAmount = 3;
      setConfig((prev) => ({
        ...prev,
        lightType: type,
        lightAmount: newAmount,
      }));
      newPendants = getDefaultPendantAssignments(3);
    } else if (type === "ceiling") {
      // Restore last ceiling light amount when switching back to ceiling
      if (config.baseType === "rectangular") {
        newAmount = 3;
      } else {
        newAmount = lastCeilingLightAmount;
      }
      newPendants = getDefaultPendantAssignments(newAmount);
    }

    setConfig((prev) => ({
      ...prev,
      lightType: type,
      lightAmount: newAmount,
      pendants: newPendants,
    }));
    setCables([]);
    newPendants.forEach((pendant, index) => {
      const productId = getProductIdForDesign(pendant.design);
      setCables((prev) => [
        ...prev,
        {
          isSystem: false,
          systemType: "",
          design: pendant.design,
          designId: productId,
        },
      ]);
    });

    // Send messages to iframe
    setTimeout(() => {
      // Send light type message
      sendMessageToPlayCanvas(`light_type:${type}`);

      // Send light amount message
      sendMessageToPlayCanvas(`light_amount:${newAmount}`);
      //hotspot off
      sendMessageToPlayCanvas(`hotspot:'off'`);

      newPendants.forEach((pendant, index) => {
        const productId = getProductIdForDesign(pendant.design);
        sendMessageToPlayCanvas(`cable_${index}:${productId}`);
        sendMessageToPlayCanvas(`cable_${index}:size_3`);
      });
    }, 0);
  };

  // Handle base type change

  // Handle configuration type change
  const handleConfigurationTypeChange = useCallback((type) => {
    setConfig((prev) => {
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
    if (config.lightType === "ceiling") {
      setLastCeilingLightAmount(amount);
    }
    if (config.baseType === "round") {
      setLastRoundBaseLightAmount(amount);
    }

    // Use deterministic default pendants and systems for the new amount
    const newPendants = getDefaultPendantAssignments(amount);
    const newSystems = getDefaultSystemAssignments(amount);

    // Filter selectedPendants to only include valid indices for the new amount
    const filteredSelectedPendants = config.selectedPendants
      ? config.selectedPendants.filter((index) => index < amount)
      : [];

    setConfig((prev) => ({
      ...prev,
      lightAmount: amount,
      pendants: newPendants,
      systemConfigurations: newSystems,
      selectedPendants: filteredSelectedPendants, // Update selectedPendants state
    }));
    setCables(
      newSystems.map((system, idx) => ({
        isSystem: system.isSystem,
        systemType: system.systemType,
        design: system.design,
        designId: system.designId,
      }))
    );
    // Send messages to iframe
    setTimeout(() => {
      sendMessageToPlayCanvas(`light_amount:${amount}`);
      newSystems.forEach((system, index) => {
        if(system.isSystem){
          sendMessageToPlayCanvas(`system:${system.systemType}`);
        }
        sendMessageToPlayCanvas(`cable_${index}:${system.designId}`);
        // sendMessageToPlayCanvas(`cable_${index}:size_3`);
      });
    }, 0);
  };


  // Handle system type change
  const handleSystemTypeChange = (system) => {
    // Update the global system type
    setConfig((prev) => ({ ...prev, systemType: system.systemType , design: system.design , designId: system.designId }));

    // Get the selected cable number(s)
    const selectedCables =
      config.selectedPendants && config.selectedPendants.length > 0
        ? config.selectedPendants
        : [0]; // Default to cable 0 if none selected

    // Update system type for each selected cable
    setConfig((prev) => {
      // Create or update the cableSystemTypes object
      const cableSystemTypes = { ...(prev.cableSystemTypes || {}) };

      // Update system type for each selected cable
      selectedCables.forEach((cableNo) => {
        cableSystemTypes[cableNo] = system;
      });

      return {
        ...prev,
        cableSystemTypes,
      };
    });

    // Send messages to iframe
    setTimeout(() => {
      // Send system type message to iframe
      sendMessageToPlayCanvas(`system:${system}`);

      setShowTypeSelector(false);
    }, 10);
  };

  // Handle location selection for individual configuration
  const handleLocationSelection = (locationId) => {
    setSelectedLocation(locationId);
    setShowTypeSelector(true);
  };

  // Handle configuration type selection from the floating selector
  const handleConfigTypeSelection = (type) => {
    setConfiguringType(type);
    setShowTypeSelector(false);

    if (type === "pendant") {
      setBreadcrumbPath([
        { id: "configurePendant", label: "Configure Pendant" },
      ]);
    } else if (type === "system") {
      setBreadcrumbPath([{ id: "system", label: "System" }]);
      setConfiguringSystemType("bar"); // Default system type
    }
  };

  // Handle breadcrumb navigation
  const handleBreadcrumbNavigation = (level) => {
    if (level === "home") {
      // Reset to cable locations view
      setConfiguringType(null);
      setConfiguringSystemType(null);
      setBreadcrumbPath([]);
      setSelectedLocation(null);
    } else if (level === "system") {
      // Go back to system level
      setConfiguringSystemType(null);
      setBreadcrumbPath([{ id: "system", label: "System" }]);
    }
  };

  // Handle system type selection
  const handleIndividualSystemTypeSelection = (type) => {
    setConfiguringSystemType(type);
    setBreadcrumbPath([
      { id: "system", label: "System" },
      { id: type, label: type?.charAt(0)?.toUpperCase() + type?.slice(1) },
    ]);

    // Call handleSystemTypeChange to update state and send message to iframe
    if (type) {
      handleSystemTypeChange(type);
    }
  };

  // Handle pendant design change
  const handlePendantDesignChange = useCallback(
    (pendantIds, design) => {
      // First update the config state with the new design

      setConfig((prev) => {
        const updatedPendants = [...prev.pendants];

        // Update designs for selected pendants
        pendantIds.forEach((id) => {
          if (id >= 0 && id < updatedPendants.length) {
            updatedPendants[id] = {
              ...updatedPendants[id],
              design: design,
            };
          }
        });

        return { ...prev, pendants: updatedPendants };
      });

      // Update cables state in a single operation
      setCables((prev) => {
        const updatedCables = [...prev];

        // Map pendant design to product ID
        const productId =
          design === "bumble"
            ? "product_1"
            : design === "radial"
            ? "product_2"

            : design === "ico"
            ? "product_4"
            : design === "piko"
            ? "product_5"
            : "product_2";

        // Update each selected pendant in the cables state

        pendantIds.forEach((id) => {
          if (id >= 0) {
            updatedCables[id] = {
              isSystem: false,
              design: design,
              systemType: "",
              designId: productId,
            };
          }
        });

        return updatedCables;
      });

      // Then send messages to iframe in a separate operation
      // This ensures we don't have race conditions between state updates and messaging
      setTimeout(() => {
        const productId =
          design === "bumble"
            ? "product_1"
            : design === "radial"
            ? "product_2"
            
            : design === "ico"
            ? "product_4"
            : design === "piko"
            ? "product_5"
            : "product_2";

        // Check if we have only 1 pendant or multiple pendants
        if (config.lightAmount === 1) {
          // For single pendant, send a global pendant design message

          sendMessageToPlayCanvas(`cable_0:${productId}`);
        } else {
          // For multiple pendants, send individual pendant messages
          pendantIds.forEach((id) => {
            sendMessageToPlayCanvas(`cable_${id}:${productId}`);
          });
        }
      }, 10); // Slight delay to ensure state is updated first
    },
    [config.lightAmount]
  );

  // Handle base type change
  const handleBaseTypeChange = useCallback((baseType) => {
    // Update config state
    setConfig((prev) => ({
      ...prev,
      lightAmount: baseType === "rectangular" ? 3 : 1,
      baseType: baseType,
    }));

    // Send message to PlayCanvas iframe
    sendMessageToPlayCanvas(`base_type:${baseType}`);

    if (baseType === "rectangular") {
      sendMessageToPlayCanvas(`light_amount:3`);

      sendMessageToPlayCanvas(`system:bar`);
      sendMessageToPlayCanvas(`cable_0:system_base_2`);
      sendMessageToPlayCanvas(`cable_0:size_3`);
      sendMessageToPlayCanvas(`system:bar`);
      sendMessageToPlayCanvas(`cable_1:system_base_2`);
      sendMessageToPlayCanvas(`cable_1:size_3`);
      sendMessageToPlayCanvas(`cable_2:product_2`); 
      sendMessageToPlayCanvas(`cable_2:size_3`);
      setCables([
        {
          isSystem: true,
          systemType: "bar",
          design: "Helix",
          designId: "product_2",
        },
        {
          isSystem: true,
          systemType: "bar",
          design: "Helix",
          designId: "product_2",
        },
        {
          isSystem: false,
          systemType: "",
          design: "Radial",
          designId: "product_2",
        },
      ]);
    } else {
      sendMessageToPlayCanvas(`light_amount:1`);
      sendMessageToPlayCanvas(`cable_0:product_2`);
      sendMessageToPlayCanvas(`cable_0:size_3`);
      setCables([
        {
          isSystem: false,
          systemType: "",
          design: "Radial",
          designId: "product_2",
        },
      ]);
    }

    // Move to next step
    setActiveStep("baseColor");
  }, []);

  // Handle base color change
  const handleBaseColorChange = useCallback((baseColor) => {
    // Update config state
    setConfig((prev) => ({
      ...prev,
      baseColor,
    }));

    // Send message to PlayCanvas iframe
    sendMessageToPlayCanvas(`base_color:${baseColor}`);

    // Move to next step
    setActiveStep("systemType");
  }, []);
  const handleConnectorColorChange = useCallback((connectorColor) => {
    // Update config state
    setConfig((prev) => ({
      ...prev,
      connectorColor,
    }));

    // Send message to PlayCanvas iframe
    sendMessageToPlayCanvas(`connector_color:${connectorColor}`);

    // Move to next step
    setActiveStep("systemType");
  }, []);

  // Handle pendant selection
  const handlePendantSelection = useCallback((pendantIds) => {
    // Update config state with selected pendants
    setConfig((prev) => ({
      ...prev,
      selectedPendants: pendantIds,
    }));

  }, []);

  // Add this useEffect in your component:
useEffect(() => {
  const cleanup = listenForSelectedCableMessages((indexes) => {
    console.log("Selected pendants iframe message:", indexes);
    handlePendantSelection(indexes);
  });
  return cleanup;
}, [handlePendantSelection]);

  // Handle system base design change
  const handleSystemBaseDesignChange = useCallback(
    (design) => {
      // Update the system base design in the config
      setConfig((prev) => ({ ...prev, systemBaseDesign: design }));
    
    // Reset current shade when changing base design
    setCurrentShade(null);
    
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
          'zoneith': 'system_base_11',
          'equinox': 'system_base_12',
          'meridian': 'system_base_13',
          'polaris': 'system_base_14',
          'pulsar': 'system_base_15',
          'quasar': 'system_base_16',
          'supernova': 'system_base_17',
          'galaxy': 'system_base_18',
          'comet': 'system_base_19',
          'meteor': 'system_base_20',
          'asteroid': 'system_base_21',
          'celestial': 'system_base_22',
          'orbital': 'system_base_23',
          'lunar': 'system_base_24',
          'solar': 'system_base_25',
          'nova': 'system_base_26',
          'photon': 'system_base_27',
          'gravity': 'system_base_28',
          'spectrum': 'system_base_29',
          'infinity': 'system_base_30',
          // 'void': 'system_base_31',
          // 'blackhole': 'system_base_32',
          // 'singularity': 'system_base_33',
          // 'supernav': 'system_base_34',
          // 'wormhole': 'system_base_34',
          // 'black': 'system_base_35',
          // 'white': 'system_base_36',

        }
      };


      // Send message to PlayCanvas iframe
      setTimeout(() => {
        // Map design names to product IDs for the iframe based on system type
        // Each system type (bar/ball/universal) has its own set of base designs with specific IDs
        const systemTypeBaseMap = {
          bar: {
            // Bar system uses baseNumbers 0-8
            prism: "system_base_1",
            helix: "system_base_2",
            orbit: "system_base_3",
            zenith: "system_base_4",
            pulse: "system_base_5",
            vortex: "system_base_6",
            nexus: "system_base_7",
            quasar: "system_base_8",
            nova: "system_base_9",
          },
          universal: {
            // Universal system uses baseNumbers 1-15
            atom: "system_base_1",
            nebula: "system_base_2",
            cosmos: "system_base_3",
            stellar: "system_base_4",
            eclipse: "system_base_5",
            aurora: "system_base_6",
            solstice: "system_base_7",
            quantum: "system_base_8",
            vertex: "system_base_9",
            horizon: "system_base_10",
            zoneith: "system_base_11",
            equinox: "system_base_12",
            meridian: "system_base_13",
            polaris: "system_base_14",
            pulsar: "system_base_15",
            quasar: "system_base_16",
            supernova: "system_base_17",
            galaxy: "system_base_18",
            comet: "system_base_19",
            meteor: "system_base_20",
            asteroid: "system_base_21",
            celestial: "system_base_22",
            orbital: "system_base_23",
            lunar: "system_base_24",
            solar: "system_base_25",
            nova: "system_base_26",
            photon: "system_base_27",
            gravity: "system_base_28",
            spectrum: "system_base_29",
            infinity: "system_base_30",
            // void: "system_base_31",
            // blackhole: "system_base_32",
            // singularity: "system_base_33",
            // supernav: "system_base_34",
            // wormhole: "system_base_34",
            // black: "system_base_35",
            // white: "system_base_36",
            

            
          },
        };

        // Get the selected cable number(s)
        const selectedCables =
          config.selectedPendants && config.selectedPendants.length > 0
            ? config.selectedPendants
            : [0]; // Default to cable 0 if none selected

        // Update all cables in a single state update
        setCables((prev) => {
          const updatedCables = [...prev];

          // Process each selected cable
          selectedCables.forEach((cableNo) => {
            // Get the system type for this specific cable or use the default

            const cableSystemType =
              config.cableSystemTypes?.[cableNo] ||
              config.systemType ||
              "universal";

            // Get the base design map for this system type
            const designMap =
              systemTypeBaseMap[cableSystemType] || systemTypeBaseMap.universal;

            // Get the base ID for this design within the current system type
            const baseId = designMap[design] || "system_base_0";

            // Update this specific cable
            if (cableNo >= 0) {
              updatedCables[cableNo] = {
                isSystem: cableSystemType,
                systemType: cableSystemType,
                design: design,
                designId: baseId,
              };
            }
          });

          return updatedCables;
        });

        // Send messages to iframe
        selectedCables.forEach((cableNo) => {
          // Get the system type for this specific cable or use the default
          const cableSystemType =
            config.cableSystemTypes?.[cableNo] ||
            config.systemType ||
            "universal";

          // Get the base design map for this system type
          const designMap =
            systemTypeBaseMap[cableSystemType] || systemTypeBaseMap.universal;

          // Get the base ID for this design within the current system type
          const baseId = designMap[design] || "system_base_0";

          // Send system type message first for this cable
          sendMessageToPlayCanvas(`system:${cableSystemType}`);

          // Then send the cable base design message
          sendMessageToPlayCanvas(`cable_${cableNo}:${baseId}`);
        });
      }, 10);
    },
    [config.selectedPendants, config.systemType, config.cableSystemTypes]
  );
});

  // Handle shade selection

  // Helper function to send messages to PlayCanvas iframe
  const sendMessageToPlayCanvas = (message) => {
    console.log("Sending message to PlayCanvas iframe:", message);
    const iframe = document.getElementById("playcanvas-app");
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(message, "*");
    }
  };

  // Save configuration function
  const handleSaveConfig = (configParam, cablesParam) => {
    // Check if user is logged in
    if (!isLoggedIn) {
      toast.info("Please log in to save your configuration");
      // Redirect to login page
      setTimeout(() => {
        router.push("/portal");
      }, 1500);
      return;
    }

    // User is logged in, prepare config and show save modal
    const configSummary = prepareConfigForSave();

    setConfigToSave(configSummary);
    setIsSaveModalOpen(true);
  };

  // Prepare configuration for saving
  const prepareConfigForSave = () => {
    // Create a summary of the current configuration

    const configSummary = {
      light_type: config.lightType,
      light_amount: config.lightAmount,
      base_color: config.baseColor,
      connector_color: config.connectorColor,
      cables: cables,
      shades: config.shades || {}, // Include shade selections
    };

    // Only include base_type for ceiling lights
    if (config.lightType === "ceiling") {
      configSummary.base_type = config.baseType;
    }

    return configSummary;
  };

  // Handle final save after user enters configuration name
  const handleFinalSave = async (configName, thumbnail, modelId) => {

   console.log("modelId", modelId)
    if (!configToSave) {
      console.error("configToSave is null or undefined");
      return;
    }

    // Add name to the configuration
    const finalConfig = {
      ...configToSave,
      name: configName,
      date: new Date().toISOString(),
    };

    const iframeMessagesArray = [];
    iframeMessagesArray.push(`light_type:${config.lightType}`);

    if (config.baseType) {
      iframeMessagesArray.push(`base_type:${config.baseType}`);
    }
    iframeMessagesArray.push(`light_amount:${config.lightAmount}`);
  
    if (configToSave.cables && Array.isArray(configToSave.cables)) {
      configToSave.cables.forEach((cable, i) => {
        if (cable.isSystem) {
          iframeMessagesArray.push(`system:${cable.systemType}`);
          iframeMessagesArray.push(`cable_${i}:${cable.designId}`);
        } else {
          iframeMessagesArray.push(`cable_${i}:${cable.designId}`);
        }
        iframeMessagesArray.push(`cable_${i}:size_${cable.size}`);
      });
    }

    if (config.baseColor) {
      iframeMessagesArray.push(`base_color:${config.baseColor}`);
    }
    if (config.connectorColor) {
      iframeMessagesArray.push(`connector_color:${config.connectorColor}`);
    }

    if (config.cableColor) {
      iframeMessagesArray.push(`cable_color:${config.cableColor}`);
    }

    if (configToSave.cable_length) {
      iframeMessagesArray.push(`cable_length:${configToSave.cable_length}`);
    }

    // Prepare UI-friendly config for display
    const uiConfig = {
      light_type:
        config.lightType.charAt(0).toUpperCase() + config.lightType.slice(1),
      light_amount: config.lightAmount,
      cable_color: config.baseColor,
      connector_color: config.connectorColor,
      cables: {},
      cableConfig: cables,
    };

    if (config.baseType) {
      uiConfig.base_type =
        config.baseType.charAt(0).toUpperCase() + config.baseType.slice(1);
    }

    // Format cable information for UI display
    if (configToSave.cables && Array.isArray(configToSave.cables)) {
      configToSave.cables.forEach((cable, index) => {
        const cableNumber = index + 1;
        if (cable.isSystem) {
          // System cable
          const systemType = cable.systemType
            ? cable.systemType.charAt(0).toUpperCase() +
              cable.systemType.slice(1)
            : "Unknown";
          const design = cable.design
            ? cable.design.charAt(0).toUpperCase() + cable.design.slice(1)
            : "Unknown";
          uiConfig.cables[
            index
          ] = `Cable ${cableNumber}: {\n  System Type: ${systemType}\n  Base Design: ${design}\n}`;
        } else {
          // Pendant cable
          const design = cable.design
            ? cable.design.charAt(0).toUpperCase() + cable.design.slice(1)
            : "Unknown";
          uiConfig.cables[index] = `Cable ${cableNumber}: ${design}`;
        }
      });
    }

   
    // Prepare data for API
    const apiPayload = {
      name: configName,
      thumbnail: {
        url: thumbnail,
        public_id: "",
      }, // Will be updated after screenshot upload
      config: {
        ...uiConfig,
        download_Id: modelId,
      }, // UI-friendly structured data for display

      user_id: user?.data?._id || "", // Get user_id from Redux store
      iframe: iframeMessagesArray, // Raw messages from iframe in sequence
    };

    try {
      // Get dashboardToken from localStorage
      const dashboardToken = localStorage.getItem("limiToken");

      // Take screenshot of the configurator area
      const configuratorElement = document.getElementById("playcanvas-app");

      // Log the API payload for debugging

      // Send data to backend API
      const response = await fetch(
        "https://dev.api1.limitless-lighting.co.uk/admin/products/light-configs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${dashboardToken}`, // Include token in authorization header
          },
          body: JSON.stringify(apiPayload),
        }
      );

      // Log the response status

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      // Save configuration to Redux store
      dispatch(saveConfiguration(finalConfig));

      // Close modal and show success toast
      setIsSaveModalOpen(false);
      toast.success("Configuration saved successfully");
    } catch (error) {
      console.error("Error saving configuration to API:", error);
      // toast.error('Failed to save configuration. Please try again.');
      setIsSaveModalOpen(false);
    }
  };

  // Load configuration function
  const handleLoadConfig = () => {
    // Check if user is logged in
    if (!isLoggedIn) {
      toast.info("Please log in to load your saved configurations");
      // Redirect to login page
      setTimeout(() => {
        router.push("/portal");
      }, 1500);
      return;
    }

    // User is logged in, open the load configuration modal
    setIsLoadModalOpen(true);
  };

  // Handle loading a specific configuration
  

  // Container ref for PlayCanvas viewer
  const containerRef = useRef(null);

  // Ref for tracking if PlayCanvas is ready
  const playCanvasReadyRef = useRef(false);

  // Check for configId in URL parameters on initial load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");

    if (urlToken) {
      dispatch(fetchUserByToken(urlToken));
    }

    const configId = urlParams.get("configId");

    if (configId) {
      setHasConfigIdParam(true);
      setIsLoadingFromUrl(true);
      // Load configuration data but don't apply it yet - wait for app:ready1
      fetch(
        `https://api1.limitless-lighting.co.uk/admin/products/light-configs/${configId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setConfigFromUrl(data);
          // Don't call handleLoadSpecificConfig yet - wait for app:ready1
          // Just keep the loading state active
        })
        .catch((error) => {
          console.error("Error loading configuration from URL:", error);
          setIsLoadingFromUrl(false);
          toast.error("Failed to load configuration");
        });
    }
  }, []);

  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerDimensions({
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left,
        });
      }
    };

    // Initial update
    updateDimensions();

    // Add resize listener
    window.addEventListener("resize", updateDimensions);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full max-sm:h-[100vh] bg-transparent overflow-hidden"
    >
      {/* Loading overlay */}
      {/* {isLoadingFromUrl && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-[#1e1e1e] p-8 rounded-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
            <p className="text-white text-lg">Loading your configuration...</p>
          </div>
        </div>
      )} */}

      {/* 3D Viewer */}
      {mounted && (
      <div className="w-full h-full">
        <PlayCanvasViewer
          config={config}
          isDarkMode={true}
          className="w-full h-full"
          loadcanvas={isLoading}
          localSavedConfig={localSavedConfig}
          localSavedCables={localSavedCables}
        />
      </div>
      )}

      {/* Preview Controls - Always visible */}
      <PreviewControls
        isPreviewMode={isPreviewMode}
        setIsPreviewMode={setIsPreviewMode}
        config={config}
        cables={cables}
        selectedPendants={config.selectedPendants || []}
        onSaveConfig={handleSaveConfig}
        handleOpenSaveModal={handleOpenSaveModal}
        onLoadConfig={handleLoadConfig}
        sendMessageToPlayCanvas={sendMessageToPlayCanvas}
        onPendantDesignChange={handlePendantDesignChange}
        brightness={brightness}
        setBrightness={setBrightness}
        colorTemperature={colorTemperature}
        setColorTemperature={setColorTemperature}
        lighting={lighting}
        setLighting={setLighting}
      
      />

      {/* Only show UI elements when not in preview mode */}
      {!isPreviewMode && (
        <>
          {/* Vertical Navigation Bar */}
          {!isLoading && (
            <VerticalNavBar
              containerDimensions={containerDimensions}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              config={config}
              cables={cables}
              
              showConfigurationTypeSelector={showConfigurationTypeSelector}
              setShowConfigurationTypeSelector={setShowConfigurationTypeSelector}
              onLightTypeChange={handleLightTypeChange}
              onBaseTypeChange={handleBaseTypeChange}
              onBaseColorChange={handleBaseColorChange}
              onConnectorColorChange={handleConnectorColorChange}
              onConfigurationTypeChange={handleConfigurationTypeChange}
              onLightAmountChange={handleLightAmountChange}
              onSystemTypeChange={handleSystemTypeChange}
              onPendantSelection={handlePendantSelection}
              onPendantDesignChange={handlePendantDesignChange}
              onSystemBaseDesignChange={handleSystemBaseDesignChange}
              pendants={config.pendants}
              cableMessage={cableMessage}
              selectedPendants={config.selectedPendants || []}
              setSelectedPendants={(pendantIds) =>
                handlePendantSelection(pendantIds)
              }
              onLocationSelection={handleLocationSelection}
              configuringType={configuringType}
              configuringSystemType={configuringSystemType}
              breadcrumbPath={breadcrumbPath}
              onBreadcrumbNavigation={handleBreadcrumbNavigation}
              onSystemTypeSelection={handleIndividualSystemTypeSelection}
              onCableSizeChange={handleCableSizeChange}
              onShadeSelect={handleShadeSelect}
              setCableMessage={setCableMessage}
            
            />
          )}

          {/* Configuration panel for individual configuration */}
          {/* {configuringType && (
            <ConfigPanel
              configuringType={configuringType}
              configuringSystemType={configuringSystemType}
              breadcrumbPath={breadcrumbPath}
              onBreadcrumbNavigation={handleBreadcrumbNavigation}
              onSystemTypeSelection={handleIndividualSystemTypeSelection}
              selectedLocation={selectedLocation}
              selectedPendants={config.selectedPendants}
              onPendantDesignChange={handlePendantDesignChange}
              onSystemBaseDesignChange={handleSystemBaseDesignChange}
              onBaseColorChange={handleBaseColorChange}
              onSelectConfigurationType={handleConfigTypeSelection}
              onShadeSelect={handleShadeSelect}
              currentShade={currentShade}
              onClose={() => setConfiguringType(null)}
              className="max-sm:static max-sm:w-full max-sm:max-w-full max-sm:rounded-none max-sm:border-none"
            />
          )} */}
        </>
      )}

      {/* Save Configuration Modal */}
      <AnimatePresence>
        {isSaveModalOpen && (
          <SaveConfigModal
            isOpen={isSaveModalOpen}
            onClose={() => setIsSaveModalOpen(false)}
            onSave={handleFinalSave}
            handleCloseSaveModal={handleCloseSaveModal}
            configSummary={configToSave}
          />
        )}
      </AnimatePresence>

      {/* Load Configuration Modal */}
      <AnimatePresence>
        {isLoadModalOpen && (
          <LoadConfigModal
            isOpen={isLoadModalOpen}
            handleCloseSaveModal={handleCloseSaveModal}
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
