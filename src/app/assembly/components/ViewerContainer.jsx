import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { barAssignments } from '../../components/configurator/pendantSystemData';

const ViewerContainer = ({ isLoaded, viewerRef, sendMessagesForDesign, sendMessageToPlayCanvas, trackAssemblyEvent, appReady, barAssignments: propBarAssignments }) => {
  const [activeCardIndex, setActiveCardIndex] = useState(1); // Start with middle card active
  const [selectedDesign, setSelectedDesign] = useState(null); // Track selected design like SensorOptionsPanel
  const [isProcessing, setIsProcessing] = useState(false); // Loading state for sensor selection
  
  // Use prop data if available, otherwise fall back to imported data
  const dataSource = propBarAssignments || barAssignments || [];
  
  // Map data from barAssignments instead of hardcoded strings
  const carouselItems = [
    { id: 1, label: 'Camera', icon: '/assemblyImages/sens1.png', designName: 'bar cam', barData: { design: 'bar cam' } },
    { id: 2, label: 'Motion', icon: '/assemblyImages/sens2.png', designName: 'motion sens', barData: { design: 'motion sens' } },
    { id: 3, label: 'Speaker', icon: '/assemblyImages/sens3.png', designName: 'speaker', barData: { design: 'speaker' } },
    { id: 4, label: 'Temperature', icon: '/assemblyImages/sens4.png', designName: 'temperature', barData: { design: 'temperature' } }
  ];

  // Listen for iframe messages to handle loading states
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'loadingOff') {
        setIsProcessing(false);
      } else if (event.data === 'app:ready1') {
        // Close the overlay when app is ready
        setIsProcessing(false);
        if (appReady) {
          appReady();
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Handle bar click with same logic as SensorOptionsPanel
  const handleBarClick = (bar) => {
    if (selectedDesign === bar.design) {
      // Deselect if clicking the already selected bar
      setSelectedDesign(null);
      setIsProcessing(false);
      trackAssemblyEvent('Bar Deselected', bar.design);
    } else {
      // Select the clicked bar and show loading
      setSelectedDesign(bar.design);
      setIsProcessing(true);
      sendMessagesForDesign(bar.design, [0,1,2]);
      trackAssemblyEvent('Bar Selected', bar.design);
    }
  };

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const cardHeight = 120; // Height per card including spacing
    const newIndex = Math.round(scrollTop / cardHeight);
    const clampedIndex = Math.max(0, Math.min(carouselItems.length - 1, newIndex));
    setActiveCardIndex(clampedIndex);
  };

  // Get visible cards (current, previous, next)
  const getVisibleCards = () => {
    const visibleCards = [];
    for (let i = activeCardIndex - 1; i <= activeCardIndex + 1; i++) {
      if (i >= 0 && i < carouselItems.length) {
        visibleCards.push({ ...carouselItems[i], index: i });
      }
    }
    return visibleCards;
  };

  return (
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
    
   

    {/* Processing Overlay  */}
    {isProcessing && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-20"
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#54bb74]/30 border-t-[#54bb74] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading Sensor Configuration...</p>
          <p className="text-gray-300 text-sm mt-2">Please wait while we update the 3D model</p>
        </div>
      </motion.div>
    )}
    <div className="w-full h-full relative">
      <iframe
        id='assembly-playcanvas-app'
        src="https://playcanv.as/e/p/7c2273a2/"
        className="w-full h-full border-0 rounded-xl"
        title="LIMI 3D Interactive Viewer"
        allowFullScreen
      />
    </div>

    {/* Vertical Carousel - Right Side Overlay */}
    <div className="absolute right-6 top-0 h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-8 h-96">
        {getVisibleCards().map((item, arrayIndex) => {
          const isActive = item.index === activeCardIndex;
          const isSelected = selectedDesign === item.barData.design;
          const position = item.index - activeCardIndex; // -1, 0, 1
          
          return (
            <motion.div
              key={item.id}
              className={`flex flex-col items-center justify-center rounded-xl cursor-pointer backdrop-blur-md ${
                isActive 
                  ? 'w-32 h-40 bg-white/20 shadow-2xl' 
                  : 'w-28 h-36 bg-white/10 shadow-lg'
              }`}
              initial={false}
              animate={{
                scale: isActive ? 1.1 : 0.85,
                y: position * 8, // Enhanced vertical offset for better depth
                opacity: isActive ? 1 : 0.7,
                rotateX: position * 5, // Subtle 3D rotation effect
                z: isActive ? 10 : 0, // Z-axis depth
              }}
              transition={{ 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smooth motion
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              whileHover={{ 
                scale: isActive ? 1.15 : 1.05,
                y: position * 8 - 8, // Lift effect on hover
                boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
                transition: { 
                  duration: 0.3,
                  ease: "easeOut"
                }
              }}
              whileTap={{ 
                scale: isActive ? 1.05 : 0.8,
                transition: { duration: 0.1 }
              }}
              onClick={() => {
                setActiveCardIndex(item.index);
                // Use the same logic as SensorOptionsPanel
                handleBarClick(item.barData);
              }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: 1000,
                borderTop: isActive ? '2px solid rgba(255,255,255,0.8)' : '1px solid rgba(255,255,255,0.4)',
                borderLeft: isActive ? '1.5px solid rgba(255,255,255,0.6)' : '0.8px solid rgba(255,255,255,0.3)',
                borderRight: isActive ? '1.5px solid rgba(255,255,255,0.6)' : '0.8px solid rgba(255,255,255,0.3)',
                borderBottom: 'none'
              }}
            >
              <motion.span 
                className={`text-sm font-semibold text-center`}
                animate={{
                  color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                  opacity: isActive ? 1 : 0.8
                }}
                transition={{ 
                  duration: 0.4, 
                  ease: "easeOut" 
                }}
              >
                {item.label}
              </motion.span>
              <motion.div 
                className={`relative ${isActive ? 'w-20 h-20' : 'w-16 h-16'} flex items-center justify-center`}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  filter: isActive ? 'brightness(1.2) saturate(1.3)' : 'brightness(0.8) saturate(0.7)'
                }}
                transition={{ 
                  duration: 0.4, 
                  ease: "easeOut" 
                }}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={isActive ? 80 : 64}
                  height={isActive ? 80 : 64}
                  className={`transition-all duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-70'
                  }`}
                />
              </motion.div>
            </motion.div>
          );
        })}
        
    
      </div>
    </div>
  </div>
  );
};

export default ViewerContainer;
