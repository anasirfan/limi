'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaExpand, FaRedo, FaEye, FaCog, FaPlay } from 'react-icons/fa';
import { HiCube, HiLightBulb, HiWifi } from 'react-icons/hi';
import { trackAssemblyEvent } from '../../utils/umamiTracking';


const InteractiveViewer = () => {
    const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentView, setCurrentView] = useState('assembly');
  const [showWiring, setShowWiring] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSensorOptions, setShowSensorOptions] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);
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
  useEffect(() => {
    if (isInView && !prevInView.current) {
      // Send configuration messages when entering the section
      const messages = [
        'light_type:ceiling',
        'light_amount:3',
        'base_type:round',
        'system:bar',
        'cable_0:system_base_3',
        'system:bar',
        'cable_1:system_base_3',
        'system:bar',
        'cable_2:system_base_3'
      ];
      
      messages.forEach((message, index) => {
        setTimeout(() => {
          sendMessageToPlayCanvas(message);
        }, index * 100); // Small delay between messages
      });
    }
    // if (!isInView && prevInView.current) {
    //   sendMessageToPlayCanvas('view all');
    // }
    prevInView.current = isInView;
  }, [isInView]);

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
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black text-[#fafafa] mb-6">
            INTERACTIVE
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#54bb74] to-[#93cfa2]">
              {' '}3D VIEWER
            </span>
          </h2>
          <p className="text-xl text-[#fafafa]/80 max-w-3xl mx-auto">
            Explore every component in detail. Rotate, zoom, and discover how our modular system works from the inside out.
          </p>
        </motion.div>

        {/* 3D Viewer Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          <div 
            ref={viewerRef}
            className="relative w-full h-[600px] bg-gradient-to-br from-[#292929] to-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl border border-[#54bb74]/20"
          >
            {/* Loading State */}
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#292929]">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-[#54bb74]/30 border-t-[#54bb74] rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white text-lg">Loading 3D Model...</p>
                  <p className="text-gray-400 text-sm mt-2">Initializing PlayCanvas Engine</p>
                </div>
              </div>
            )}

            {/* PlayCanvas Placeholder */}
            <div className="w-full h-full relative">
              {/* This would be replaced with actual PlayCanvas canvas */}
              <iframe
                id='assembly-playcanvas-app'
                src="https://playcanv.as/e/p/7c2273a2/"
                className="w-full h-full border-0 rounded-xl"
                title="LIMI 3D Interactive Viewer"
                allowFullScreen
              />

              {/* Interactive Hotspots */}
              {/* {hotspots.map((hotspot) => (
                <motion.div
                  key={hotspot.id}
                  className="absolute group cursor-pointer"
                  style={{
                    left: `${hotspot.position.x}%`,
                    top: `${hotspot.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleHotspotClick(hotspot.id)} */}
                {/* > */}
                  {/* Hotspot Marker */}
                  {/* <div className="w-6 h-6 bg-[#54bb74] rounded-full border-2 border-white shadow-lg animate-pulse">
                    <div className="w-full h-full bg-[#54bb74] rounded-full animate-ping"></div>
                  </div> */}

                  {/* Tooltip */}
                  {/* <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-[#292929] text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-xl border border-[#54bb74]/20">
                      <div className="font-semibold">{hotspot.title}</div>
                      <div className="text-gray-300 text-xs">{hotspot.description}</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#292929] rotate-45"></div>
                    </div>
                  </div>
                </motion.div>
              ))} */}
            </div>


            {/* Main Control Button - Right Center */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSensorOptions(!showSensorOptions)}
                className="w-16 h-16 bg-black/70 backdrop-blur-md text-white rounded-full flex items-center justify-center shadow-xl border border-[#54bb74]/30 hover:border-[#54bb74] transition-all duration-300"
              >
                <FaCog className={`text-xl transition-transform duration-300 ${showSensorOptions ? 'rotate-45' : ''}`} />
              </motion.button>
            </div>

            {/* Sensor Options Panel - Bottom */}
            {showSensorOptions && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute bottom-2 left-[39%] transform -translate-x-1/2 bg-black/80 backdrop-blur-md border-t border-[#54bb74]/30 px-6 py-4 rounded-2xl shadow-2xl"
                style={{ minWidth: 'auto', width: 'auto', maxWidth: '100vw' }}
              >
                <div className="flex justify-center space-x-6">
                  {['sensor:1', 'sensor:2', 'sensor:3'].map((sensor, index) => (
                    <motion.button
                      key={sensor}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-16 h-16 bg-[#54bb74] text-white rounded-full flex items-center justify-center text-sm font-medium shadow-lg hover:bg-[#54bb74]/80 transition-colors duration-300"
                      onClick={() => {
                        sendMessageToPlayCanvas(`${sensor}`);
                        trackAssemblyEvent('Sensor Selected', sensor);
                        setSelectedSensor(sensor);
                      }}
                    >
                      <span className="relative flex items-center justify-center w-full h-full">
                        S{index + 1}
                        {selectedSensor === sensor && (
                          <span className="absolute top-1 right-1">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        )}
                      </span>
                    </motion.button>
                  ))}
                </div>
                {/* <div className="text-center mt-4">
                  <p className="text-white/70 text-sm">Select a sensor to view details</p>
                </div> */}
              </motion.div>
            )}
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: 'Real-time Rendering',
                description: 'High-quality 3D visualization with dynamic lighting',
                icon: HiLightBulb
              },
              {
                title: 'Interactive Controls',
                description: 'Intuitive navigation and component exploration',
                icon: FaCog
              },
              {
                title: 'Technical Details',
                description: 'Detailed specifications and assembly instructions',
                icon: FaEye
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="p-6 bg-white/80 backdrop-blur-md rounded-xl border border-[#54bb74]/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="text-xl text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#292929] mb-2">{feature.title}</h3>
                <p className="text-[#292929]/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveViewer;
