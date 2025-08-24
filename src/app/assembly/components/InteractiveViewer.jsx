'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaExpand, FaRedo, FaEye, FaCog, FaPlay } from 'react-icons/fa';
import { HiCube, HiLightBulb, HiWifi } from 'react-icons/hi';
import { trackAssemblyEvent } from '../../utils/umamiTracking';
import SectionHeader from './SectionHeader';
import FeatureCards from './FeatureCards';
import ViewerContainer from './ViewerContainer';
import SensorOptionsPanel from './SensorOptionsPanel';


const InteractiveViewer = () => {
    const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentView, setCurrentView] = useState('assembly');
  const [showWiring, setShowWiring] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSensorOptions, setShowSensorOptions] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [appReady, setAppReady] = useState(false);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });

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
      'light_type:ceiling',
      'light_amount:3',
      'base_type:round',
      'system:bar',
      'cable_0:system_base_2',
      'system:ball',
      'cable_1:system_base_1',
      'system:bar',
      'cable_2:system_base_2'
    ];
    function handleAppReady(event) {
      if (typeof event.data === 'string' && event.data.startsWith('app:ready1')) {
        setAppReady(true);
        messages.forEach((message, index) => {
          setTimeout(() => {
            sendMessageToPlayCanvas(message);
          }, index * 100);
        });
      }
    }
    window.addEventListener('message', handleAppReady);
    return () => {
      window.removeEventListener('message', handleAppReady);
    };
  }, [isInView]);

  // Listen for iframe messages to toggle SensorOptionsPanel
  useEffect(() => {
    function handleSensorPanelToggle(event) {
      if (typeof event.data === 'string') {
        if (event.data.startsWith('offconfig')) {
          setShowSensorOptions(false);
        } else if (event.data.includes('cable_')) {
          setShowSensorOptions(true);
        }
      }
    }
    window.addEventListener('message', handleSensorPanelToggle);
    return () => {
      window.removeEventListener('message', handleSensorPanelToggle);
    };
  }, []);

  const viewModes = [
    { id: 'assembly', label: 'Assembly View', icon: HiCube },
    { id: 'lighting', label: 'Base Demo', icon: HiLightBulb },
    { id: 'sensors', label: 'Sensor Network', icon: HiWifi }
  ];

  const hotspots = [
    {
      id: 'base',
      position: { x: 50, y: 30 },
      title: 'Intelligent Base',
      description: 'Central processing unit with power management'
    },
    {
      id: 'cable',
      position: { x: 50, y: 50 },
      title: 'Smart Cable',
      description: 'Data and power transmission system'
    },
    {
      id: 'pendant',
      position: { x: 50, y: 70 },
      title: 'Design Pendant',
      description: 'Customizable lighting element'
    },
    {
      id: 'module',
      position: { x: 30, y: 60 },
      title: 'Sensor Module',
      description: 'AI-powered sensing capabilities'
    }
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
    trackAssemblyEvent('View Mode Changed', viewId);
    // Here you would trigger PlayCanvas scene changes
    console.log(`Switching to ${viewId} view`);
  };

  const toggleWiring = () => {
    setShowWiring(!showWiring);
    trackAssemblyEvent('Wiring View Toggled', showWiring ? 'On' : 'Off');
    // Here you would toggle wiring visibility in PlayCanvas
    console.log(`Wiring view: ${!showWiring}`);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    trackAssemblyEvent('Fullscreen Toggled', isFullscreen ? 'On' : 'Off');
    if (!isFullscreen) {
      viewerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const handleHotspotClick = (hotspotId) => {
    trackAssemblyEvent('Hotspot Clicked', hotspotId);
  };

  const handleCTAClick = () => {
    trackAssemblyEvent('CTA Clicked', 'Start Tour');
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-20 bg-gradient-to-b from-[#1a1a1a] to-[#f3ebe2] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <SectionHeader isInView={isInView} />

        {/* 3D Viewer Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
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
          />
          <SensorOptionsPanel
            showSensorOptions={showSensorOptions}
            sendMessageToPlayCanvas={sendMessageToPlayCanvas}
            trackAssemblyEvent={trackAssemblyEvent}
            selectedSensor={selectedSensor}
            setSelectedSensor={setSelectedSensor}
          />
        </motion.div>
          {/* Feature Cards */}
          <FeatureCards isInView={isInView} />
      </div>
    </section>
  );
};

export default InteractiveViewer;
