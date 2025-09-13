import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { barAssignments } from '../../components/configurator/pendantSystemData';

const SensorOptionsPanel = ({ showSensorOptions, sendMessagesForDesign, trackAssemblyEvent }) => {
  const [selectedDesign, setSelectedDesign] = useState(null);
  const carouselRef = useRef(null);

  const handleBarClick = (bar) => {
    if (selectedDesign === bar.design) {
      // Deselect if clicking the already selected bar
      setSelectedDesign(null);
      trackAssemblyEvent('Bar Deselected', bar.design);
    } else {
      // Select the clicked bar
      setSelectedDesign(bar.design);
      sendMessagesForDesign(bar.design, 0);
      trackAssemblyEvent('Bar Selected', bar.design);
    }
  };

  // Handler for deselecting all bars
  const handleDeselectAll = () => {
    setSelectedDesign(null);
    trackAssemblyEvent('All Bars Deselected', 'all');
  };

  // Carousel navigation functions
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  return (
    showSensorOptions && (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute bottom-2 bg-black/80 w-full md:w-[35%] rounded-lg left-0 right-0 mx-auto"
      >
        {/* Cross button top right */}
        {/* <button
          aria-label="Deselect all sensors"
          onClick={handleDeselectAll}
          className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-700 hover:bg-red-500 text-white transition-colors duration-200 shadow-lg z-20"
        >
          <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="5" x2="15" y2="15" strokeLinecap="round" />
            <line x1="15" y1="5" x2="5" y2="15" strokeLinecap="round" />
          </svg>
        </button> */}

        {/* Carousel Container */}
        <div className="relative flex items-center">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors duration-200 shadow-lg"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>

          {/* Scrollable Options Container */}
          <div
            ref={carouselRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide px-10 py-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {barAssignments.filter(bar => bar.design !== 'luga').map((bar, index) => (
              <motion.button
                key={bar.design}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex-shrink-0 flex flex-col items-center justify-center p-2 transition-transform duration-200"
                onClick={() => handleBarClick(bar)}
              >
                <div className="relative">
                  {/* Circular Image */}
                  {bar.media?.image?.url ? (
                    <img 
                      src={bar.media.image.url} 
                      alt={bar.design}
                      className={`w-16 h-16 object-cover rounded-full border-2 transition-all duration-200 ${
                        selectedDesign === bar.design 
                          ? 'border-[#54bb74] shadow-lg shadow-[#54bb74]/50' 
                          : 'border-gray-300 hover:border-[#54bb74]/50'
                      }`}
                    />
                  ) : (
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-medium transition-all duration-200 ${
                      selectedDesign === bar.design 
                        ? 'border-[#54bb74] bg-[#54bb74] text-white shadow-lg shadow-[#54bb74]/50' 
                        : 'border-gray-300 bg-gray-200 text-gray-600 hover:border-[#54bb74]/50'
                    }`}>
                      {bar.design.charAt(0).toUpperCase()}
                    </div>
                  )}
                  
                  {/* Check mark for selected */}
                  {selectedDesign === bar.design && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#54bb74] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </div>
                
                {/* Name below image */}
                <span className={`text-xs text-center leading-tight mt-1 max-w-[60px] truncate transition-colors duration-200 ${
                  selectedDesign === bar.design ? 'text-[#54bb74] font-medium' : 'text-white'
                }`}>
                  {bar.design}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors duration-200 shadow-lg"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </div>
      </motion.div>
    )
  );
};

export default SensorOptionsPanel;
