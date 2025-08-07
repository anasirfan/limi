'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaExpand, FaRedo, FaEye, FaCog, FaPlay } from 'react-icons/fa';
import { HiCube, HiLightBulb, HiWifi } from 'react-icons/hi';

const InteractiveViewer = () => {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentView, setCurrentView] = useState('assembly');
  const [showWiring, setShowWiring] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const viewModes = [
    { id: 'assembly', label: 'Assembly View', icon: HiCube },
    { id: 'lighting', label: 'Lighting Demo', icon: HiLightBulb },
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
    // Here you would trigger PlayCanvas scene changes
    console.log(`Switching to ${viewId} view`);
  };

  const toggleWiring = () => {
    setShowWiring(!showWiring);
    // Here you would toggle wiring visibility in PlayCanvas
    console.log(`Wiring view: ${!showWiring}`);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      viewerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
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
          <h2 className="text-5xl md:text-6xl font-black text-[#292929] mb-6">
            INTERACTIVE
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#54bb74] to-[#93cfa2]">
              {' '}3D VIEWER
            </span>
          </h2>
          <p className="text-xl text-[#292929]/80 max-w-3xl mx-auto">
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
              <div className="w-full h-full bg-gradient-to-br from-[#292929] via-[#1a1a1a] to-[#292929] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-full flex items-center justify-center mb-6 mx-auto">
                    <HiCube className="text-5xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">3D Model Viewer</h3>
                  <p className="text-gray-400">PlayCanvas Integration Ready</p>
                </div>
              </div>

              {/* Interactive Hotspots */}
              {hotspots.map((hotspot) => (
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
                >
                  {/* Hotspot Marker */}
                  <div className="w-6 h-6 bg-[#54bb74] rounded-full border-2 border-white shadow-lg animate-pulse">
                    <div className="w-full h-full bg-[#54bb74] rounded-full animate-ping"></div>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-[#292929] text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-xl border border-[#54bb74]/20">
                      <div className="font-semibold">{hotspot.title}</div>
                      <div className="text-gray-300 text-xs">{hotspot.description}</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#292929] rotate-45"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Control Panel */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              {/* View Mode Selector */}
              <div className="flex space-x-2">
                {viewModes.map((mode) => (
                  <motion.button
                    key={mode.id}
                    onClick={() => handleViewChange(mode.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                      currentView === mode.id
                        ? 'bg-[#54bb74] text-white shadow-lg'
                        : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md'
                    }`}
                  >
                    <mode.icon className="text-sm" />
                    <span>{mode.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Control Buttons */}
              <div className="flex space-x-2">
                <motion.button
                  onClick={toggleWiring}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    showWiring
                      ? 'bg-[#54bb74] text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  } backdrop-blur-md`}
                  title="Toggle Wiring View"
                >
                  <FaEye />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/10 text-white hover:bg-white/20 rounded-lg transition-all duration-300 backdrop-blur-md"
                  title="Reset View"
                >
                  <FaRedo />
                </motion.button>

                <motion.button
                  onClick={toggleFullscreen}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/10 text-white hover:bg-white/20 rounded-lg transition-all duration-300 backdrop-blur-md"
                  title="Fullscreen"
                >
                  <FaExpand />
                </motion.button>
              </div>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/50 backdrop-blur-md rounded-lg p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-[#54bb74] rounded-full mr-2"></span>
                      Click & Drag to Rotate
                    </span>
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-[#93cfa2] rounded-full mr-2"></span>
                      Scroll to Zoom
                    </span>
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                      Click Hotspots for Details
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-[#54bb74] text-white rounded-lg text-sm font-medium hover:bg-[#54bb74]/80 transition-colors duration-300 flex items-center space-x-2"
                  >
                    <FaPlay className="text-xs" />
                    <span>Start Tour</span>
                  </motion.button>
                </div>
              </div>
            </div>
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
