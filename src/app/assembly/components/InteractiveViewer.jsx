"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaExpand, FaRedo, FaEye, FaCog, FaPlay } from "react-icons/fa";
import { HiCube, HiLightBulb, HiWifi } from "react-icons/hi";
import { trackAssemblyEvent } from "../../utils/umamiTracking";
import SectionHeader from "./SectionHeader";
import FeatureCards from "./FeatureCards";
import ViewerContainer from "./ViewerContainer";
import SensorOptionsPanel from "./SensorOptionsPanel";
import { systemAssignments } from "../../components/configurator/pendantSystemData";

const InteractiveViewer = () => {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentView, setCurrentView] = useState("assembly");
  const [showWiring, setShowWiring] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSensorOptions, setShowSensorOptions] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [appReady, setAppReady] = useState(false);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  // Send PlayCanvas message when InteractiveViewer is visible

  const sendMessageToPlayCanvas = (message) => {
    const iframe = document.getElementById("assembly-playcanvas-app");
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(message, "*");
      console.log("Message sent to PlayCanvas: " + message);
    }
  };

  const prevInView = useRef(false);
  // Only send configuration messages after receiving 'app:ready' and in-view
  useEffect(() => {
    let appReady = false;
    let sent = false;
    const messages = [
      "light_type:ceiling",
      "light_amount:3",
      "base_color:gold",
      "cable_0",
      "bars",
      "glass_none",
      "color_gold",
      "silver_none",
      "product_https://dev.api1.limitless-lighting.co.uk/configurator_dynamic/models/Bar_1756732230450.glb",
      "cable_1",
      "bars",
      "glass_none",
      "color_gold",
      "silver_none",
      "product_https://dev.api1.limitless-lighting.co.uk/configurator_dynamic/models/Bar_1756732230450.glb",
      "cable_2",
      "bars",
      "glass_none",
      "color_gold",
      "silver_none",
      "product_https://dev.api1.limitless-lighting.co.uk/configurator_dynamic/models/Bar_1756732230450.glb",
      "allmodelsloaded",
      "lighting:on",
      "brightness:100",
      "colorTemperature:4600",
    ];
    function handleAppReady(event) {
      if (
        typeof event.data === "string" &&
        event.data.startsWith("app:ready1")
      ) {
        setAppReady(true);
        messages.forEach((message) => {
          setTimeout(() => {
            sendMessageToPlayCanvas(message);
          });
        });
      }
    }
    window.addEventListener("message", handleAppReady);
    return () => {
      window.removeEventListener("message", handleAppReady);
    };
  }, [isInView]);



  const viewModes = [
    { id: "assembly", label: "Assembly View", icon: HiCube },
    { id: "lighting", label: "Base Demo", icon: HiLightBulb },
    { id: "sensors", label: "Sensor Network", icon: HiWifi },
  ];

  const hotspots = [
    {
      id: "base",
      position: { x: 50, y: 30 },
      title: "Intelligent Base",
      description: "Central processing unit with power management",
    },
    {
      id: "cable",
      position: { x: 50, y: 50 },
      title: "Smart Cable",
      description: "Data and power transmission system",
    },
    {
      id: "pendant",
      position: { x: 50, y: 70 },
      title: "Design Pendant",
      description: "Customizable lighting element",
    },
    {
      id: "module",
      position: { x: 30, y: 60 },
      title: "Sensor Module",
      description: "AI-powered sensing capabilities",
    },
  ];

  useEffect(() => {
    // Simulate PlayCanvas loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleViewChange = (viewId) => {
    setCurrentView(viewId);
    trackAssemblyEvent("View Mode Changed", viewId);
    // Here you would trigger PlayCanvas scene changes
    console.log(`Switching to ${viewId} view`);
  };

  const toggleWiring = () => {
    setShowWiring(!showWiring);
    trackAssemblyEvent("Wiring View Toggled", showWiring ? "On" : "Off");
    // Here you would toggle wiring visibility in PlayCanvas
    console.log(`Wiring view: ${!showWiring}`);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    trackAssemblyEvent("Fullscreen Toggled", isFullscreen ? "On" : "Off");
    if (!isFullscreen) {
      viewerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const sendMessagesForDesign = (designName, idOrIds) => {
    const assignment = systemAssignments.find((a) => a.design === designName);
    if (!assignment) return;
console.log("assignmentss", assignment)
    // Helper to send all messages for a single id
    const sendAllMessages = (id) => {
      if (assignment.systemType === "bar") {
        sendMessageToPlayCanvas("barextra");
      }
      sendMessageToPlayCanvas(`cable_${id}`);
      sendMessageToPlayCanvas(
        `glass_${assignment.hasGlass ? "attached" : "none"}`
      );
      sendMessageToPlayCanvas(`color_${assignment.hasGold ? "gold" : "none"}`);
      sendMessageToPlayCanvas(
        `silver_${assignment.hasSilver ? "attached" : "none"}`
      );
      sendMessageToPlayCanvas(`product_${assignment.media?.model?.url}`);
      sendMessageToPlayCanvas(`${assignment.message}`);
      if (assignment.systemType === "chandelier") {
        sendMessageToPlayCanvas(`chandelier_clearance`);
        sendMessageToPlayCanvas(`height_set`);
      }
    };

    if (Array.isArray(idOrIds)) {
      idOrIds.forEach((id) => {
        sendAllMessages(id);
      });
      // Fire allmodelsloaded ONCE at the end
      sendMessageToPlayCanvas("allmodelsloaded");
    } else {
      sendAllMessages(idOrIds);
      // Fire allmodelsloaded after the single id
      sendMessageToPlayCanvas("allmodelsloaded");
    }
  };

  const handleHotspotClick = (hotspotId) => {
    trackAssemblyEvent("Hotspot Clicked", hotspotId);
  };

  const handleCTAClick = () => {
    trackAssemblyEvent("CTA Clicked", "Start Tour");
  };

  return (
    <section
      ref={containerRef}
      className="relative pt-24 pb-8 bg-gradient-to-b from-[#1a1a1a] to-[#f3ebe2] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <SectionHeader isInView={isInView} />

        {/* 3D Viewer Container */}
        <motion.div
          className="relative"
        >
          <ViewerContainer
            isLoaded={isLoaded}
            viewerRef={viewerRef}
            showSensorOptions={showSensorOptions}
            setShowSensorOptions={setShowSensorOptions}
            selectedSensor={selectedSensor}
            setSelectedSensor={setSelectedSensor}
            sendMessageToPlayCanvas={sendMessageToPlayCanvas}
            trackAssemblyEvent={trackAssemblyEvent}
            appReady={appReady}
            sendMessagesForDesign={sendMessagesForDesign}
          />
          <SensorOptionsPanel
            showSensorOptions={showSensorOptions}
            sendMessageToPlayCanvas={sendMessageToPlayCanvas}
            sendMessagesForDesign={sendMessagesForDesign}
            trackAssemblyEvent={trackAssemblyEvent}
            selectedSensor={selectedSensor}
            setSelectedSensor={setSelectedSensor}
          />
        </motion.div>
        {/* Feature Cards */}
        {/* <FeatureCards isInView={isInView} /> */}
      </div>
    </section>
  );
};

export default InteractiveViewer;
