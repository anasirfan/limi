import { motion } from 'framer-motion';

const ViewerContainer = ({ isLoaded, viewerRef, showSensorOptions, setShowSensorOptions, selectedSensor, setSelectedSensor, sendMessageToPlayCanvas, trackAssemblyEvent, appReady }) => (
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
    
    {/* App Ready Overlay */}
    {isLoaded && !appReady && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-10"
      >
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-[#54bb74]/50 border-t-[#54bb74] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Initializing Experience...</p>
          <p className="text-gray-300 text-sm mt-2">Preparing interactive components</p>
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
    {/* Main Control Button - Right Center */}
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowSensorOptions(!showSensorOptions)}
        className="w-16 h-16 bg-black/70 backdrop-blur-md text-white rounded-full flex items-center justify-center shadow-xl border border-[#54bb74]/30 hover:border-[#54bb74] transition-all duration-300"
      >
        <span className={`text-xl transition-transform duration-300 ${showSensorOptions ? 'rotate-45' : ''}`}>⚙️</span>
      </motion.button>
    </div>
  </div>
);

export default ViewerContainer;
