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
import {
  updateCable,
  updateConfig,
  generateCables,
} from "../../utils/configHelpers";
import { designIdMap } from "../../utils/designIdMap";
import {
  sendToIframe,
  sendCableConfig,
  sendFullConfig,
} from "../../utils/iframeMessenger";
import { replayIframeMessages } from "../../utils/iframeReplay";

const ConfiguratorLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const searchParams = useSearchParams();

  // State for loading configuration from URL
  const [isLoadingFromUrl, setIsLoadingFromUrl] = useState(false);
  const [configFromUrl, setConfigFromUrl] = useState(null);
  const [hasConfigIdParam, setHasConfigIdParam] = useState(false);

  // Main configuration state (single source of truth)
  const [config, setConfig] = useState({
    lightType: "ceiling",
    baseType: "round",
    baseColor: "black",
    cableColor: "black",
    cableLength: "2mm",
    lightAmount: 1,
    cables: [
      // Initial: one pendant
      { isSystem: false, design: "Ico", designId: "product_0" },
    ],
  });

  // Preview mode state
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Modal states
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
  const [configToSave, setConfigToSave] = useState(null);

  // Navigation state
  const [activeStep, setActiveStep] = useState("lightType");
  const [isLoading, setIsLoading] = useState(true);

  const sendMessageToPlayCanvas = (message) => {
    const iframe = document.getElementById("playcanvas-app");
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(message, "*");
    }
  };
  // Helper to update a cable
  const handleCableChange = (index, changes, config, setConfig) => {
    setConfig((prev) => updateCable(prev, index, changes));
    // Send cable config to iframe
    sendCableConfig(index, { ...config.cables[index], ...changes });
  };

  // Helper function to generate random pendants
  const generateRandomPendants = (amount) => {
    const designOptions = ["bumble", "radial", "fina", "ico", "piko"];
    let pendants = [];

    for (let i = 0; i < amount; i++) {
      const randomIndex = Math.floor(Math.random() * designOptions.length);
      const randomDesign = designOptions[randomIndex]; 
      
      pendants.push({
        isSystem: false,
        design: randomDesign,
        designId: `product_${randomIndex +1}`,
      });
    }
    return pendants;
  };

  // Helper function to generate random system configurations
  // const generateRandomSystems = (amount) => {
  //   // Available system types and their base designs
  //   const systemTypes = ['bar', 'universal'];
  //   const baseDesigns = {
  //     'bar': ['prism', 'helix', 'orbit', 'zenith', 'pulse', 'vortex', 'nexus', 'quasar', 'nova'],
  //     'universal': ['atom', 'nebula', 'cosmos', 'stellar', 'eclipse'],
  //   };

  //     let systems = {};

  //     for (let i = 0; i < amount; i++) {
  //       // Randomly select system type
  //       const randomSystemType = systemTypes[Math.floor(Math.random() * systemTypes.length)];

  //       // Randomly select base design for this system type
  //       const availableDesigns = baseDesigns[randomSystemType];
  //       const randomDesign = availableDesigns[Math.floor(Math.random() * availableDesigns.length)];

  //       // Store the system configuration for this cable
  //       systems[i] = {
  //         systemType: randomSystemType,
  //         baseDesign: randomDesign
  //       };
  //     }

  //     return systems;
  //   };

  // Initialize pendants when component mounts
  useEffect(() => {
    // Check if we have a configId in the URL
    // If so, don't send default initialization messages as they'll be overridden
    if (!hasConfigIdParam) {
      // Create initial pendants based on light amount
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
  //       }
  //     } else if (config.lightAmount < config.pendants.length) {
  //       // Remove excess pendants
  //       updatedPendants = updatedPendants.slice(0, config.lightAmount);
  //     }

  //     setConfig(prev => ({ ...prev, pendants: updatedPendants }));
  //   }
  // }, [config.lightAmount]);

  // Listen for app:ready1 message from PlayCanvas iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === "app:ready1") {
        console.log("PlayCanvas app is ready");
        setIsLoading(false);
        playCanvasReadyRef.current = true;

        // If we have a configuration from URL, load it now
        if (configFromUrl) {
          console.log(
            "Loading configuration from URL now that PlayCanvas is ready"
          );
          handleLoadSpecificConfig(configFromUrl);
          setIsLoadingFromUrl(false);
        } else {
          const initialPendants = generateRandomPendants(config.lightAmount);
          console.log("initialPendants", initialPendants);
          // Create initial systems based on light amount
          // const initialSystems = generateRandomSystems(config.lightAmount);

          setConfig((prev) => ({
            ...prev,
            pendants: initialPendants,
          }));

          // setLastCeilingLightAmount(config.lightAmount);
          // setLastRoundBaseLightAmount(config.lightAmount);

          // Send initial messages to PlayCanvas if no configId in URL

          // Send default configuration messages
          sendMessageToPlayCanvas(`light_type:${config.lightType}`);
          console.log("light_type", config.lightType);
          sendMessageToPlayCanvas(`light_amount:${config.lightAmount}`);
          console.log("light_amount", config.lightAmount);
          sendMessageToPlayCanvas(`base_type:${config.baseType}`);
          console.log("base_type", config.baseType);

          // Send default pendant messages
          initialPendants.forEach((pendant, index) => {
            console.log("pendant", pendant);
            sendMessageToPlayCanvas(`cable_${index}:${pendant.designId}`);
          });
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [configFromUrl]);

  // Handle light type change
  const handleLightTypeChange = (type) => {
    let newAmount = type === "wall" ? 1 : type === "floor" ? 3 : 1;
    config.lightAmount = newAmount;
    const newCables = generateCables(
      type,
      newAmount,
      generateRandomPendants(newAmount)
    );
    setConfig((prev) =>
      updateConfig(prev, {
        lightType: type,
        lightAmount: newAmount,
        cables: newCables,
      })
    );
    sendToIframe("light_type", type);
    sendToIframe("light_amount", newAmount);
    newCables.forEach((cable, i) => sendCableConfig(i, cable));
  };
  // Handle base type change
  const handleBaseTypeChange = (baseType) => {
    setConfig((prev) => updateConfig(prev, { baseType }));
    sendToIframe("base_type", baseType);
    config.lightAmount = baseType === "rectangular" ? 3 : 1;
    const newCables = generateCables(
      config.lightType,
      config.lightAmount,
      generateRandomPendants(config.lightAmount)
    );
    setConfig((prev) =>
      updateConfig(prev, {
        cables: newCables,
        baseType: baseType,
      })
    );
    sendToIframe("light_amount", config.lightAmount);
    newCables.forEach((cable, i) => sendCableConfig(i, cable));
  };

  // Handle base color change
  const handleBaseColorChange = (baseColor) => {
    setConfig((prev) => updateConfig(prev, { baseColor }));
    sendToIframe("base_color", baseColor);
  };
  // Handle light amount change
  const handleLightAmountChange = (amount) => {
    config.lightAmount = amount;
    const newCables = generateCables(config.lightType, amount, generateRandomPendants(config.lightAmount));
    console.log("newCables", newCables);
    setConfig((prev) =>
      updateConfig(prev, {
        lightAmount: amount,
        cables: newCables,
      })
    );
    sendToIframe("light_amount", amount);
    newCables.forEach((cable, i) => sendCableConfig(i, cable));
  };
  // Handle system type change (example: update all cables or a specific cable)
  const handleSystemTypeChange = (index, systemType) => {
    setConfig((prev) =>
      updateCable(prev, index, { isSystem: true, systemType })
    );
    sendToIframe("system", systemType);
    sendCableConfig(index, {
      ...config.cables[index],
      isSystem: true,
      systemType,
    });
    setTimeout(() => {
      // Send system type message to iframe
      sendMessageToPlayCanvas(`system:${system}`);
      console.log(`Sending system:${system} to iframe`);
      setShowTypeSelector(false);
    }, 10);
  };

  // Handle location selection for individual configuration
  const handleLocationSelection = (locationId) => {
    setSelectedLocation(locationId);
    setShowTypeSelector(true);
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
      console.log("pendantIds", pendantIds);
      console.log("design", design);
      setConfig((prev) => {
        const updatedPendants = [...prev.pendants];
        console.log("updatedPendants", updatedPendants);
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

      // Then send messages to iframe in a separate operation
      // This ensures we don't have race conditions between state updates and messaging
      setTimeout(() => {
        const productId =
          design === "bumble"
            ? "product_1"
            : design === "radial"
            ? "product_2"
            : design === "fina"
            ? "product_3"
            : design === "ico"
            ? "product_4"
            : design === "piko"
            ? "product_5"
            : "product_2";

        // Check if we have only 1 pendant or multiple pendants
        if (config.lightAmount === 1) {
          // For single pendant, send a global pendant design message
          console.log(
            `Updating single pendant to design ${design} (${productId})`
          );
          sendMessageToPlayCanvas(`cable_0:${productId}`);
        } else {
          // For multiple pendants, send individual pendant messages
          pendantIds.forEach((id) => {
            console.log(
              `Updating pendant ${id} to design ${design} (${productId})`
            );
            sendMessageToPlayCanvas(`cable_${id}:${productId}`);
          });
        }
      }, 10); // Slight delay to ensure state is updated first
    },
    [config.lightAmount]
  );

  // Handle pendant selection
  const handlePendantSelection = useCallback((pendantIds) => {
    console.log("Selected pendants:", pendantIds);

    // Update config state with selected pendants
    setConfig((prev) => ({
      ...prev,
      selectedPendants: pendantIds,
    }));
  }, []);

  // Save configuration function
  const handleSaveConfig = () => {
    if (!isLoggedIn) {
      toast.info("Please log in to save your configuration");
      setTimeout(() => router.push("/portal"), 1500);
      return;
    }
    // Prepare iframe message array
    const iframeMessages = [];
    iframeMessages.push(["light_type", config.lightType]);
    iframeMessages.push(["light_amount", config.lightAmount]);
    iframeMessages.push(["base_type", config.baseType]);
    iframeMessages.push(["base_color", config.baseColor]);
    iframeMessages.push(["cable_color", config.cableColor]);
    iframeMessages.push(["cable_length", config.cableLength]);
    config.cables.forEach((cable, i) => {
      if (cable.isSystem) {
        iframeMessages.push(["system", cable.systemType]);
        iframeMessages.push(["cable", cable.designId, i]);
      } else {
        iframeMessages.push(["cable", cable.designId, i]);
      }
    });
    // Save config with iframe array
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
      const isLastCableWithSystem =
        index === config.pendants.length - 1 && config.systemType;

      // Get the system type for this specific cable or use the default
      const cableSystemType =
        cableSystemTypes[index] || config.systemType || "";

      // Determine if this is a pendant or system
      if (isSelectedForSystem) {
        // It's a system
        console.log(
          `Cable ${index} identified as system type: ${cableSystemType}`
        );
        const baseDesign = config.systemBaseDesign || "fusion";

        // Get the base design map for this system type
        const designMap =
          systemTypeBaseMap[cableSystemType] || systemTypeBaseMap.universal;

        // Get the base ID for this design within the current system type
        const baseId = designMap[baseDesign] || "system_base_0";

        console.log(
          `System cable ${index} using ${cableSystemType} system with ${baseDesign} design (${baseId})`
        );

        configSummary.cables[index] = {
          system_type: cableSystemType,
          product: baseId,
        };
      } else if (
        pendant.design === "bumble" ||
        pendant.design === "radial" ||
        pendant.design === "fina" ||
        pendant.design === "ico" ||
        pendant.design === "piko"
      ) {
        // It's a pendant
        console.log(
          `Cable ${index} identified as pendant type: ${pendant.design}`
        );
        const productId =
          pendant.design === "bumble"
            ? "product_1"
            : pendant.design === "radial"
            ? "product_2"
            : pendant.design === "fina"
            ? "product_3"
            : pendant.design === "ico"
            ? "product_4"
            : pendant.design === "piko"
            ? "product_5"
            : "product_2";

        configSummary.cables[index] = {
          pendant: productId,
        };
      } else {
        // Default to system if design is not recognized
        console.log(
          `Cable ${index} defaulting to system type (no recognized design)`
        );

        // Get the base design map for this specific cable's system type
        const designMap =
          systemTypeBaseMap[cableSystemType] || systemTypeBaseMap.universal;

        // Get the base ID for this design within the current system type
        // Use a valid default value based on the system type
        const baseDesign =
          config.systemBaseDesign ||
          (cableSystemType === "bar"
            ? "prism"
            : cableSystemType === "universal"
            ? "atom"
            : "atom");

        // Get the base ID using the design map
        const baseId = designMap[baseDesign] || "system_base_1";

        configSummary.cables[index] = {
          system_type: cableSystemType,
          product: baseId,
        };
      }
    });

    return configSummary;
  };

  // Handle final save after user enters configuration name
  const handleFinalSave = async (configName) => {
    console.log("configToSave:", configToSave);

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

    // Generate a random ID
    const generateRandomId = () => {
      return (
        "config_" +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      );
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
          console.log(
            `Added pendant cable message: cable_${index}:${cable.pendant}`
          );
        }
      });

      // Then add all system cables with their system type immediately before
      Object.entries(configToSave.cables).forEach(([index, cable]) => {
        if (cable.product && cable.system_type) {
          // It's a system cable - add system type immediately before cable
          iframeMessagesArray.push(`system:${cable.system_type}`);
          console.log(
            `Added system type message: system:${cable.system_type} for cable ${index}`
          );

          // Then add the cable message
          iframeMessagesArray.push(`cable_${index}:${cable.product}`);
          console.log(
            `Added system cable message: cable_${index}:${cable.product}`
          );
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

    console.log("Iframe messages array:", iframeMessagesArray);

    // Prepare UI-friendly config for display
    const uiConfig = {
      light_type:
        configToSave.light_type.charAt(0).toUpperCase() +
        configToSave.light_type.slice(1),
      light_amount: configToSave.light_amount,
      cables: {},
    };

    // Add base type if it exists
    if (configToSave.base_type) {
      uiConfig.base_type =
        configToSave.base_type.charAt(0).toUpperCase() +
        configToSave.base_type.slice(1);
    }

    // Format cable information for UI display
    if (configToSave.cables) {
      Object.entries(configToSave.cables).forEach(([index, cable]) => {
        const cableNumber = parseInt(index) + 1;

        // For pendant type
        if (cable.pendant) {
          // Map product IDs to friendly names
          const pendantNameMap = {
            product_1: "Bumble",
            product_2: "Radial",
            product_3: "Fina",
            product_4: "Ico",
            product_5: "Piko",
          };

          const pendantName = pendantNameMap[cable.pendant] || "Unknown";
          uiConfig.cables[index] = `Cable ${cableNumber}: ${pendantName}`;
        }
        // For system type
        else if (cable.system_type && cable.product) {
          // Map system base IDs to friendly names
          const baseNameMap = {
            system_base_0: "Nexus",
            system_base_1: "Fusion",
            system_base_2: "Aurora",
            system_base_4: "Vertex",
            system_base_6: "Quantum",
          };

          const baseName = baseNameMap[cable.product] || "Unknown";
          const systemType =
            cable.system_type.charAt(0).toUpperCase() +
            cable.system_type.slice(1);

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
        url: "",
        public_id: "",
      }, // Will be updated after screenshot upload
      config: uiConfig, // UI-friendly structured data for display
      user_id: user?.data?._id || "", // Get user_id from Redux store
      iframe: iframeMessagesArray, // Raw messages from iframe in sequence
    };

    console.log("API payload to send:", apiPayload);

    try {
      // Get dashboardToken from localStorage
      const dashboardToken = localStorage.getItem("limiToken");

      // Take screenshot of the configurator area
      const configuratorElement = document.getElementById("playcanvas-app");

      // Log the API payload for debugging
      console.log("Final API payload:", JSON.stringify(apiPayload, null, 2));

      // Send data to backend API
      const response = await fetch(
        "https://api1.limitless-lighting.co.uk/admin/products/light-configs",
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
      console.log("API response status:", response.status);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data);

      // Save configuration to Redux store
      dispatch(saveConfiguration(finalConfig));
      console.log("saveConfiguration action dispatched");

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
    console.log("Opening load configuration modal");

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
  const handleLoadSpecificConfig = (configData) => {
    if (
      !configData ||
      !configData.iframe ||
      !Array.isArray(configData.iframe)
    ) {
      toast.error("Invalid configuration data");
      return;
    }
    replayIframeMessages(configData.iframe);
    // Update config state
    setConfig(configData);
  };

  // Container ref for PlayCanvas viewer
  const containerRef = useRef(null);

  // Ref for tracking if PlayCanvas is ready
  const playCanvasReadyRef = useRef(false);

  // Check for configId in URL parameters on initial load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
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
          {!isLoading && (
            <VerticalNavBar
              containerDimensions={containerDimensions}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              config={config}
              cables={config.cables}
              onLightTypeChange={handleLightTypeChange}
              onBaseTypeChange={handleBaseTypeChange}
              onBaseColorChange={handleBaseColorChange}
              // onConfigurationTypeChange={handleConfigurationTypeChange}
              onLightAmountChange={handleLightAmountChange}
              onSystemTypeChange={handleSystemTypeChange}
              onPendantDesignChange={handlePendantDesignChange}
             
            />
          )}
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
    </div>
  );
};
export default ConfiguratorLayout;
