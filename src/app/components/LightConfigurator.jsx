"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaSave, FaShoppingCart, FaInfoCircle, FaQuestionCircle, FaSun, FaMoon, FaPlus, FaMinus, FaChevronDown } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlayCanvasViewer from "./PlayCanvasViewer";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Theme Toggle Component
const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <motion.button
      className={`fixed top-24 right-4 z-50 p-3 rounded-full shadow-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isDarkMode ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-indigo-600" />}
    </motion.button>
  );
};

// Light Type Component
const LightTypeSelector = ({ selectedType, onTypeChange, isDarkMode }) => {
  const types = [
    { id: "wall", name: "Wall Light", icon: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300" },
    { id: "ceiling", name: "Ceiling Light", icon: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=300" },
    { id: "floor", name: "Floor Light", icon: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=300" },
  ];

  return (
    <motion.div 
      className={`mb-6 ${isDarkMode ? 'text-white' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-bold mb-3 font-['Amenti']">Light Type</h3>
      <div className="flex space-x-4">
        {types.map((type) => (
          <motion.div
            key={type.id}
            className={`relative cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} p-2 rounded-lg`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTypeChange(type.id)}
          >
            <div className={`w-20 h-20 rounded-lg overflow-hidden relative ${selectedType === type.id ? 'ring-2 ring-emerald-500 ring-offset-2' : ''}`}>
              <Image
                src={type.icon}
                alt={type.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-center text-sm mt-2">{type.name}</p>
            {selectedType === type.id && (
              <motion.div 
                className="absolute -bottom-1 left-0 right-0 h-1 bg-emerald-500 rounded-full"
                layoutId="activeTypeIndicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Light Amount Selector Component
const LightAmountSelector = ({ amount, onAmountChange, isDarkMode }) => {
  const amounts = [1, 2, 3, 5, 10];

  return (
    <motion.div 
      className={`mb-6 ${isDarkMode ? 'text-white' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h3 className="text-lg font-bold mb-3 font-['Amenti']">Light Amount</h3>
      <div className="flex flex-wrap gap-3">
        {amounts.map((num) => (
          <motion.div
            key={num}
            className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer ${amount === num
              ? "bg-emerald-500 text-white shadow-lg"
              : isDarkMode 
                ? "bg-gray-700 hover:bg-gray-600 text-white" 
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAmountChange(num)}
            layout
          >
            {num}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Light Design Selector Component
const LightDesignSelector = ({ selectedDesign, onDesignChange, pendantIndex = null, isDarkMode }) => {
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const designs = [
    { id: "bumble", name: "Bumble", image: "/images/configOptions/1.png" },
    { id: "radial", name: "Radial", image: "/images/configOptions/2.png" },
    { id: "fina", name: "Fina", image: "/images/configOptions/3.png" },
    { id: "ico", name: "Ico", image: "/images/configOptions/4.png" },
    { id: "ripple", name: "Ripple", image: "/images/configOptions/5.png" },
  ];

  useEffect(() => {
    if (scrollContainerRef.current) {
      setMaxScroll(
        scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
      );
    }

    // Add window resize listener
    const handleResize = () => {
      if (scrollContainerRef.current) {
        setMaxScroll(
          scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
        );
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  const scrollToLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollToRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Drag to scroll functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
    
    if (!isDragging) return;
    
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseEnter = () => {
    setShowCursor(true);
  };

  const handleMouseLeave = () => {
    setShowCursor(false);
    setIsDragging(false);
  };

  const title = pendantIndex !== null 
    ? `Pendant ${pendantIndex + 1} Design` 
    : "Light Design";

  return (
    <motion.div 
      className={`mb-6 relative ${isDarkMode ? 'text-white' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: pendantIndex ? 0.1 * pendantIndex : 0.2 }}
    >
      <h3 className="text-lg font-bold mb-3 font-['Amenti']">{title}</h3>
      
      {/* Mobile swipe indicator */}
      <div className="md:hidden flex justify-center items-center mb-2">
        <div className={`flex items-center gap-2 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200/70'} backdrop-blur-sm rounded-full px-3 py-1 text-xs animate-pulse`}>
          <FaChevronLeft className={`${isDarkMode ? 'text-white/70' : 'text-gray-600/70'} animate-pulse-slow`} />
          <span className={isDarkMode ? 'text-white/90' : 'text-gray-700/90'}>Swipe</span>
          <FaChevronRight className={`${isDarkMode ? 'text-white/70' : 'text-gray-600/70'} animate-pulse-slow`} />
        </div>
      </div>
      
      <div className="relative">
        <motion.button
          onClick={scrollToLeft}
          className={`absolute left-0 top-0 bottom-0 flex items-center justify-center w-12 z-10 bg-transparent ${
            scrollPosition <= 10 ? "opacity-30 cursor-not-allowed" : "opacity-100"
          }`}
          disabled={scrollPosition <= 10}
          whileTap={{ scale: 0.95 }}
        >
          <FaChevronLeft className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
        </motion.button>
        
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto hide-scrollbar py-4 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {designs.map((design) => (
            <motion.div
              key={design.id}
              className={`flex-shrink-0 cursor-pointer select-none mx-8`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDesignChange(design.id, pendantIndex)}
            >
              <div className={`w-24 h-24 rounded-full overflow-hidden relative ${selectedDesign === design.id ? 'ring-2 ring-emerald-500 ring-offset-2' : ''}`}>
                <Image
                  src={design.image}
                  alt={design.name}
                  fill
                  className="object-cover select-none"
                  draggable={false}
                />
              </div>
              <p className="text-center text-sm mt-2">{design.name}</p>
              {selectedDesign === design.id && (
                <motion.div 
                  className="h-1 bg-emerald-500 rounded-full mt-1 mx-auto w-12"
                  layoutId={`designIndicator${pendantIndex !== null ? `-${pendantIndex}` : ''}`}
                ></motion.div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.button
          onClick={scrollToRight}
          className={`absolute right-0 top-0 bottom-0 flex items-center justify-center w-12 z-10 bg-transparent ${
            scrollPosition >= maxScroll - 10 ? "opacity-30 cursor-not-allowed" : "opacity-100"
          }`}
          disabled={scrollPosition >= maxScroll - 10}
          whileTap={{ scale: 0.95 }}
        >
          <FaChevronRight className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
        </motion.button>
        
        {/* No gradient overlays - removed for cleaner design */}
      </div>
    </motion.div>
  );
};

// Per-Pendant Configuration Component with Pagination
const PendantConfigurator = ({ pendants, updatePendantDesign, isDarkMode }) => {
  const [expandedPendant, setExpandedPendant] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pendantsPerPage = 3;
  
  // Calculate total pages
  const totalPages = Math.ceil(pendants.length / pendantsPerPage);
  
  // Get current page pendants
  const getCurrentPagePendants = () => {
    const startIndex = currentPage * pendantsPerPage;
    return pendants.slice(startIndex, startIndex + pendantsPerPage);
  };
  
  // Navigate to next/previous page
  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      setExpandedPendant(null); // Close any expanded pendant when changing page
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setExpandedPendant(null); // Close any expanded pendant when changing page
    }
  };
  
  // Toggle pendant expansion
  const togglePendant = (index) => {
    const actualIndex = index + (currentPage * pendantsPerPage);
    setExpandedPendant(expandedPendant === actualIndex ? null : actualIndex);
  };
  
  // Get the current pendants to display
  const currentPendants = getCurrentPagePendants();
  
  return (
    <motion.div 
      className={`mt-6 pt-4 border-t ${isDarkMode ? 'border-gray-700 text-white' : 'border-gray-200'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold font-['Amenti']">Individual Pendant Configuration</h3>
        
        {/* Total pendants info */}
        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {pendants.length} pendant{pendants.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      {/* Pagination Controls - Top */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            className={`px-3 py-1 rounded-lg flex items-center gap-1 ${
              currentPage === 0 
                ? isDarkMode ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            <FaChevronLeft className="text-xs" /> Previous
          </button>
          
          <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Page {currentPage + 1} of {totalPages}
          </div>
          
          <button 
            onClick={goToNextPage}
            disabled={currentPage >= totalPages - 1}
            className={`px-3 py-1 rounded-lg flex items-center gap-1 ${
              currentPage >= totalPages - 1 
                ? isDarkMode ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            Next <FaChevronRight className="text-xs" />
          </button>
        </div>
      )}
      
      {/* Pendant list with collapsible sections */}
      <div className="space-y-3 pr-2">
        {currentPendants.map((pendant, index) => {
          const actualIndex = index + (currentPage * pendantsPerPage);
          const isExpanded = expandedPendant === actualIndex;
          
          return (
            <motion.div 
              key={actualIndex} 
              className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* Pendant header - always visible and clickable */}
              <div 
                className={`p-3 flex items-center justify-between cursor-pointer hover:brightness-110 transition-all ${isExpanded ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-200') : ''}`}
                onClick={() => togglePendant(index)}
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded-full flex-shrink-0" 
                    style={{ 
                      backgroundImage: `url(/images/configOptions/${pendant.design === 'bumble' ? '1' : pendant.design === 'radial' ? '2' : pendant.design === 'fina' ? '3' : pendant.design === 'ico' ? '4' : '5'}.png)`,
                      backgroundSize: "cover"
                    }}
                  ></div>
                  <h4 className="font-medium">Pendant {actualIndex + 1}</h4>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm capitalize">{pendant?.design || 'bumble'}</span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="text-xs" />
                  </motion.div>
                </div>
              </div>
              
              {/* Expandable content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-2">
                      <LightDesignSelector 
                        selectedDesign={pendant?.design || 'bumble'} 
                        onDesignChange={(designId) => updatePendantDesign(designId, actualIndex)}
                        pendantIndex={actualIndex}
                        isDarkMode={isDarkMode}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      
      {/* Pagination Controls - Bottom */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-1">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentPage(index);
                setExpandedPendant(null);
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentPage === index
                  ? 'bg-emerald-500 text-white'
                  : isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};



// Cable Options Component
const CableOptions = ({ selectedCableColor, selectedCableLength, onCableChange, isDarkMode }) => {
  const cableColors = [
    { id: "black", name: "Black" },
    { id: "white", name: "White" }
  ];
  
  const cableLengths = [
    { id: "2mm", name: "2mm" },
    { id: "3mm", name: "3mm" },
    { id: "5mm", name: "5mm" }
  ];

  return (
    <motion.div 
      className={`mb-6 ${isDarkMode ? 'text-white' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="text-lg font-bold mb-3 font-['Amenti']">Cable Options</h3>
      
      {/* Cable Color Selection */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Color</h4>
        <div className="flex space-x-3">
          {cableColors.map((color) => (
            <motion.div
              key={color.id}
              className={`cursor-pointer p-2 rounded-lg ${selectedCableColor === color.id 
                ? isDarkMode ? 'bg-gray-700 ring-2 ring-emerald-500' : 'bg-gray-100 ring-2 ring-emerald-500'
                : isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50 border border-gray-200'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCableChange(color.id, selectedCableLength)}
            >
              <div className="flex items-center space-x-2">
                <div 
                  className={`w-5 h-5 rounded-full ${color.id === 'black' ? 'bg-black' : 'bg-white border border-gray-300'}`}
                ></div>
                <span>{color.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Cable Length Selection */}
      <div>
        <h4 className="text-sm font-medium mb-2">Length</h4>
        <div className="flex space-x-3">
          {cableLengths.map((length) => (
            <motion.div
              key={length.id}
              className={`cursor-pointer py-2 px-4 rounded-lg ${selectedCableLength === length.id 
                ? isDarkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white'
                : isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50 border border-gray-200'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCableChange(selectedCableColor, length.id)}
            >
              {length.name}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Selected Configuration */}
      <div className={`mt-3 p-2 rounded text-sm ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <p>Selected: {selectedCableColor.charAt(0).toUpperCase() + selectedCableColor.slice(1)} cable, {selectedCableLength} length</p>
      </div>
    </motion.div>
  );
};

// Additional Information Section
const AdditionalInfo = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('installation');
  
  // Installation steps animation reference
  const stepsRef = useRef(null);
  
  useEffect(() => {
    if (stepsRef.current && activeTab === 'installation') {
      const steps = stepsRef.current.querySelectorAll('.step-item');
      gsap.fromTo(steps, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  return (
    <motion.div 
      className={`mt-12 pt-12 ${isDarkMode ? 'border-t border-gray-700 text-white' : 'border-t border-gray-200'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-3xl font-bold mb-8 font-['Amenti'] text-center">
        Additional Information
      </h2>
      
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8 overflow-x-auto pb-2">
        <div className={`inline-flex rounded-lg p-1 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          {['installation', 'delivery', 'specifications', 'reviews'].map((tab) => (
            <motion.button
              key={tab}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${activeTab === tab 
                ? isDarkMode ? 'bg-emerald-700 text-white' : 'bg-emerald-500 text-white'
                : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab === 'installation' && 'Installation Guide'}
              {tab === 'delivery' && 'What\'s Included'}
              {tab === 'specifications' && 'Technical Specs'}
              {tab === 'reviews' && 'Customer Reviews'}
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Tab Content */}
      <div className={`rounded-xl shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Installation Guide */}
        {activeTab === 'installation' && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold mb-4 font-['Amenti'] text-emerald-500">Installation Guide</h3>
                <p className="mb-6">Our lights are designed for easy installation, but we recommend following these steps for best results:</p>
                
                <div ref={stepsRef} className="space-y-4">
                  {[
                    { step: 1, title: "Turn off power", desc: "Always ensure the power is off at the circuit breaker before beginning installation." },
                    { step: 2, title: "Mount the bracket", desc: "Secure the mounting bracket to the ceiling or wall junction box." },
                    { step: 3, title: "Connect the wires", desc: "Connect the fixture wires to your home wiring according to the included instructions." },
                    { step: 4, title: "Attach the fixture", desc: "Secure the light fixture to the mounting bracket." },
                    { step: 5, title: "Install bulbs & test", desc: "Install the bulbs and restore power to test the fixture." }
                  ].map((item) => (
                    <motion.div 
                      key={item.step}
                      className="step-item flex items-start gap-3"
                      whileHover={{ x: 5 }}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-emerald-700' : 'bg-emerald-100'}`}>
                        <span className={isDarkMode ? 'text-white' : 'text-emerald-700'}>{item.step}</span>
                      </div>
                      <div>
                        <h4 className="font-bold">{item.title}</h4>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <p className="text-sm">For detailed instructions, refer to the installation manual included with your purchase.</p>
                  <button className={`mt-4 px-4 py-2 rounded-lg flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                    <FaInfoCircle /> Download Installation PDF
                  </button>
                </div>
              </div>
              
              <div className="md:w-1/2 relative min-h-[300px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-700 opacity-20 rounded-lg"></div>
                <div className="p-6 relative z-10 h-full flex flex-col justify-center">
                  <h4 className="text-lg font-bold mb-2">Professional Installation</h4>
                  <p className="mb-4">For ceiling and wall lights, we recommend professional installation for the best results and safety.</p>
                  
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <h5 className="font-bold mb-2">Installation Requirements</h5>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Standard junction box</li>
                      <li>Basic electrical tools</li>
                      <li>Wire connectors (included)</li>
                      <li>Mounting hardware (included)</li>
                      <li>Screwdriver and pliers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* What's Included */}
        {activeTab === 'delivery' && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold mb-4 font-['Amenti'] text-emerald-500">What's Included</h3>
                <p className="mb-6">Every LIMI light package contains everything you need for a complete installation:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {[
                    { title: "Light Fixture(s)", desc: "Your configured pendant light(s)" },
                    { title: "Mounting Hardware", desc: "Brackets, screws, and anchors" },
                    { title: "Power Cable", desc: "Your selected cable length and color" },
                    { title: "LED Bulbs", desc: "Energy-efficient smart bulbs" },
                    { title: "Installation Guide", desc: "Step-by-step instructions" },
                    { title: "Warranty Card", desc: "5-year manufacturer warranty" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                      whileHover={{ scale: 1.03 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h4 className="font-bold">{item.title}</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
                
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-emerald-50'} border-l-4 border-emerald-500`}>
                  <h4 className="font-bold mb-1">Shipping Information</h4>
                  <p className="text-sm">All orders are carefully packaged and shipped within 2-3 business days. Delivery typically takes 5-7 business days depending on your location.</p>
                </div>
              </div>
              
              <div className="md:w-1/2 relative min-h-[300px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 rounded-lg"></div>
                <div className="p-6 relative z-10 h-full flex flex-col justify-center">
                  <h4 className="text-lg font-bold mb-2">Package Contents</h4>
                  
                  <div className={`p-4 rounded-lg mb-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <h5 className="font-bold mb-2">Smart Features</h5>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Compatible with LIMI mobile app for remote control</li>
                      <li>Works with voice assistants (Alexa, Google Home)</li>
                      <li>Scheduling and automation capabilities</li>
                      <li>Color temperature and brightness control</li>
                    </ul>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <h5 className="font-bold mb-2">Care Instructions</h5>
                    <p className="text-sm mb-2">To maintain the beauty of your LIMI lights:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Clean with a soft, dry cloth</li>
                      <li>Avoid chemical cleaners</li>
                      <li>Dust regularly to maintain brightness</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Technical Specifications */}
        {activeTab === 'specifications' && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold mb-4 font-['Amenti'] text-emerald-500">Technical Specifications</h3>
                <p className="mb-6">LIMI lights are designed with premium materials and advanced technology:</p>
                
                <div className="space-y-4 mb-6">
                  {[
                    { title: "Bulb Type", value: "E26/E27 socket, LED smart bulbs included" },
                    { title: "Power", value: "9W - 12W per bulb (60W equivalent)" },
                    { title: "Voltage", value: "110-240V AC, 50/60Hz" },
                    { title: "Color Temperature", value: "2700K-6500K (adjustable)" },
                    { title: "Brightness", value: "800-1100 lumens per bulb" },
                    { title: "Connectivity", value: "Wi-Fi, Bluetooth" },
                    { title: "Materials", value: "Aircraft-grade aluminum, premium glass" },
                    { title: "Lifespan", value: "25,000+ hours" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex justify-between items-center border-b last:border-0 pb-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="font-medium">{item.title}</span>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.value}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-emerald-50'} border-l-4 border-emerald-500`}>
                  <h4 className="font-bold mb-1">Energy Efficiency</h4>
                  <p className="text-sm">LIMI lights are Energy Star certified, consuming up to 85% less energy than traditional incandescent bulbs while providing the same brightness.</p>
                </div>
              </div>
              
              <div className="md:w-1/2 relative min-h-[300px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-10 rounded-lg"></div>
                <div className="p-6 relative z-10 h-full flex flex-col justify-center">
                  <h4 className="text-lg font-bold mb-2">Socket & Bulb Information</h4>
                  
                  <div className={`p-4 rounded-lg mb-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <h5 className="font-bold mb-2">Smart Bulb Features</h5>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Full color spectrum (16 million colors)</li>
                      <li>Adjustable white temperature (warm to cool)</li>
                      <li>Dimmable from 1% to 100%</li>
                      <li>Scene presets for different moods and activities</li>
                      <li>Energy usage monitoring</li>
                    </ul>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <h5 className="font-bold mb-2">Dimensions</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="font-medium">Pendant Size:</p>
                        <p>Diameter: 120mm - 200mm</p>
                        <p>Height: 140mm - 180mm</p>
                      </div>
                      <div>
                        <p className="font-medium">Cable Length:</p>
                        <p>Standard: 2m</p>
                        <p>Extended: 3m, 5m</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Customer Reviews */}
        {activeTab === 'reviews' && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold mb-4 font-['Amenti'] text-emerald-500">Customer Reviews</h3>
                
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-400 text-2xl">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-xl">4.9/5</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Based on 128 reviews</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  {[
                    { name: "Jane D.", rating: 5, comment: "The configurator made it so easy to visualize exactly what I wanted. The lights look even better in person!" },
                    { name: "Mark T.", rating: 5, comment: "Exceptional quality and the smart features work flawlessly with my home system. The app is intuitive and reliable." },
                    { name: "Sarah L.", rating: 4, comment: "Beautiful design and excellent build quality. Installation was straightforward with the included instructions." }
                  ].map((review, index) => (
                    <motion.div 
                      key={index}
                      className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold">{review.name}</h4>
                        <div className="flex text-yellow-400">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className={`text-sm italic ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>"{review.comment}"</p>
                    </motion.div>
                  ))}
                </div>
                
                <button className={`px-4 py-2 rounded-lg flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  View All Reviews
                </button>
              </div>
              
              <div className="md:w-1/2 relative min-h-[300px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-10 rounded-lg"></div>
                <div className="p-6 relative z-10 h-full flex flex-col justify-center">
                  <h4 className="text-lg font-bold mb-4">Customer Satisfaction</h4>
                  
                  <div className="space-y-3 mb-6">
                    {[
                      { label: "Overall Quality", percentage: 98 },
                      { label: "Smart Features", percentage: 96 },
                      { label: "Ease of Installation", percentage: 92 },
                      { label: "Customer Service", percentage: 97 }
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{item.label}</span>
                          <span>{item.percentage}%</span>
                        </div>
                        <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <motion.div 
                            className="h-full rounded-full bg-emerald-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <h5 className="font-bold mb-2">Awards & Recognition</h5>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>2024 Design Innovation Award</li>
                      <li>Smart Home Product of the Year</li>
                      <li>Energy Efficiency Excellence</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Main Component
const LightConfigurator = () => {
  // State for configuration options
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lightType, setLightType] = useState("ceiling");
  const [lightAmount, setLightAmount] = useState(3);
  const [lightDesign, setLightDesign] = useState("bumble");
  const [cableColor, setCableColor] = useState("black");
  const [cableLength, setCableLength] = useState("2mm");
  const [totalPrice, setTotalPrice] = useState(0);
  const [pendants, setPendants] = useState([]);
  const [productSlug, setProductSlug] = useState(null);
  const [productOptions, setProductOptions] = useState({});
  
  // Refs
  const previewBoxRef = useRef(null);
  const configuratorRef = useRef(null);

  // Parse URL parameters on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const productParam = params.get('product');
      const optionsParam = params.get('options');
      
      if (productParam) {
        setProductSlug(productParam);
        
        // You could fetch product data based on slug here
        // For now, we'll just set a default configuration based on product type
        if (productParam.includes('pendant')) {
          setLightType('ceiling');
          setLightDesign('bumble');
        } else if (productParam.includes('wall')) {
          setLightType('wall');
        } else if (productParam.includes('floor')) {
          setLightType('floor');
        }
        
        // If options are provided in URL, parse and apply them
        if (optionsParam) {
          try {
            const options = JSON.parse(decodeURIComponent(optionsParam));
            setProductOptions(options);
            
            // Apply options to configurator
            if (options.design) setLightDesign(options.design);
            if (options.amount) setLightAmount(parseInt(options.amount));
            if (options.cableColor) setCableColor(options.cableColor);
            if (options.cableLength) setCableLength(options.cableLength);
          } catch (error) {
            console.error('Error parsing options from URL:', error);
          }
        }
        
        // Show notification that configuration was loaded from product
        toast.info(`Configuration loaded from ${productParam.replace(/-/g, ' ')}`, {
          position: "bottom-right",
          autoClose: 3000,
          theme: isDarkMode ? "dark" : "light"
        });
      }
    }
  }, [isDarkMode]);

  // Initialize pendants when amount changes
  useEffect(() => {
    const newPendants = Array.from({ length: lightAmount }, (_, i) => ({
      id: i,
      design: i === 0 ? lightDesign : ['bumble', 'radial', 'fina', 'ico', 'ripple'][Math.floor(Math.random() * 5)],
      color: '#50C878'
    }));
    setPendants(newPendants);
  }, [lightAmount, lightDesign]);

  // Calculate price whenever configuration changes
  useEffect(() => {
    // Base price calculation
    const basePrice = 195;
    const typeMultiplier = lightType === "floor" ? 1.2 : lightType === "wall" ? 1.1 : 1;
    
    // Calculate price based on individual pendant designs
    let totalDesignPrice = 0;
    pendants.forEach(pendant => {
      const designPrice = pendant.design === "fina" || pendant.design === "bumble" ? 20 : 0;
      totalDesignPrice += basePrice + designPrice;
    });
    
    // Cable price
    const cableLengthPrice = cableLength === "5mm" ? 15 : cableLength === "3mm" ? 8 : 0;
    
    const calculatedPrice = (totalDesignPrice * typeMultiplier) + cableLengthPrice;
    setTotalPrice(calculatedPrice.toFixed(2));
  }, [lightType, pendants, cableColor, cableLength]);

  // Initial animation for preview box
  useEffect(() => {
    if (previewBoxRef.current) {
      gsap.fromTo(
        previewBoxRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);
  
  // ScrollTrigger for pinning - separate effect to refresh when pendants change
  useEffect(() => {
    let pinInstance;
    
    // Wait a bit for DOM to update with new pendants
    const timer = setTimeout(() => {
      if (previewBoxRef.current && configuratorRef.current) {
        // Create pinning with ScrollTrigger
        const previewSection = document.getElementById('light-configurator');
        
        if (previewSection) {
          // Kill any existing instance first
          if (pinInstance) pinInstance.kill();
          
          // Use CSS sticky positioning instead of GSAP pinning
          // This avoids the opacity flickering issues
          ScrollTrigger.create({
            trigger: previewSection,
            start: "top top",
            endTrigger: "#pricing-section",
            end: "top bottom",
            invalidateOnRefresh: true,
            onRefresh: () => {
              // Force refresh when ScrollTrigger updates
              if (previewBoxRef.current) {
                previewBoxRef.current.style.visibility = 'visible';
              }
            }
          });
          
          // Force a refresh of all ScrollTriggers
          ScrollTrigger.refresh();
        }
      }
    }, 100); // Short delay to ensure DOM is updated
    
    // Cleanup on unmount or when dependencies change
    return () => {
      clearTimeout(timer);
      if (pinInstance) pinInstance.kill();
    };
  }, [pendants.length, lightAmount]); // Refresh when pendants or light amount changes

  // Toggle dark/light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    
    // Apply animation to the entire configurator
    if (configuratorRef.current) {
      gsap.fromTo(
        configuratorRef.current,
        { opacity: 0.8 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  };

  // Handle light type change
  const handleLightTypeChange = (type) => {
    setLightType(type);
    
    // Send message to PlayCanvas - only once
    const iframe = document.getElementById('playcanvas-app');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(`light_type:${type}`, "*");
    }
    
    toast.info(`Light type changed to ${type}`, {
      position: "bottom-right",
      autoClose: 1500,
      theme: isDarkMode ? "dark" : "light"
    });
  };

  // Handle light amount change
  const handleLightAmountChange = (amount) => {
    setLightAmount(amount);
    
    // Update pendants array based on new amount
    if (amount > pendants.length) {
      // Add new pendants with default design
      const newPendants = [...pendants];
      for (let i = pendants.length; i < amount; i++) {
        newPendants.push({ design: lightDesign || 'bumble', color: 'white' });
      }
      setPendants(newPendants);
    } else if (amount < pendants.length) {
      // Remove excess pendants
      setPendants(pendants.slice(0, amount));
    }
    
    // If only one pendant, update its design to match the global design
    if (amount === 1 && pendants.length > 0 && lightDesign) {
      const updatedPendants = [...pendants];
      updatedPendants[0] = {
        ...updatedPendants[0],
        design: lightDesign
      };
      setPendants(updatedPendants);
    }
    
    // Send message to PlayCanvas
    const iframe = document.getElementById('playcanvas-app');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(`light_amount:${amount}`, "*");
    }
    
    toast.info(`Light amount changed to ${amount}`, {
      position: "bottom-right",
      autoClose: 1500,
      theme: isDarkMode ? "dark" : "light"
    });
  };
  
  // Handle light design change
  const handleLightDesignChange = (design, pendantIndex = null) => {
    if (pendantIndex !== null && pendantIndex >= 0 && pendantIndex < pendants.length) {
      // Update specific pendant design
      const updatedPendants = [...pendants];
      if (updatedPendants[pendantIndex]) {
        updatedPendants[pendantIndex] = {
          ...updatedPendants[pendantIndex],
          design: design
        };
        setPendants(updatedPendants);
        
        // Send message to PlayCanvas
        const iframe = document.getElementById('playcanvas-app');
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage(`pendant_${pendantIndex}_design:${design}`, "*");
        }
        
        toast.info(`Pendant ${pendantIndex + 1} design changed to ${design}`, {
          position: "bottom-right",
          autoClose: 1500,
          theme: isDarkMode ? "dark" : "light"
        });
      }
    } else {
      // Update default design
      setLightDesign(design);
      
      // If only one pendant, update its design too
      if (lightAmount === 1 && pendants.length > 0) {
        const updatedPendants = [...pendants];
        updatedPendants[0] = {
          ...updatedPendants[0],
          design: design
        };
        setPendants(updatedPendants);
      }
      
      // Send message to PlayCanvas
      const iframe = document.getElementById('playcanvas-app');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(`pendant_design:${design}`, "*");
      }
      
      toast.info(`Light design changed to ${design}`, {
        position: "bottom-right",
        autoClose: 1500,
        theme: isDarkMode ? "dark" : "light"
      });
    }
  };

  // Handle cable options change
  const handleCableChange = (type, value) => {
    if (type === 'color') {
      setCableColor(value);
      
      // Send message to PlayCanvas
      const iframe = document.getElementById('playcanvas-app');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(`cable_color:${value}`, "*");
      }
      
      toast.info(`Cable color changed to ${value}`, {
        position: "bottom-right",
        autoClose: 1500,
        theme: isDarkMode ? "dark" : "light"
      });
    } else if (type === 'length') {
      setCableLength(value);
      
      // Send message to PlayCanvas
      const iframe = document.getElementById('playcanvas-app');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(`cable_length:${value}`, "*");
      }
      
      toast.info(`Cable length changed to ${value}`, {
        position: "bottom-right",
        autoClose: 1500,
        theme: isDarkMode ? "dark" : "light"
      });
    }
  };

  // Save configuration
  const saveConfiguration = () => {
    toast.success("Configuration saved successfully!", {
      position: "bottom-right",
      autoClose: 2000,
      theme: isDarkMode ? "dark" : "light"
    });
  };

  // Add to cart
  const addToCart = () => {
    toast.success("Added to cart!", {
      position: "bottom-right",
      autoClose: 2000,
      theme: isDarkMode ? "dark" : "light"
    });
  };

  // Customer support
  const openSupportChat = () => {
    toast.info("Support chat would open here", {
      position: "bottom-right",
      autoClose: 2000,
      theme: isDarkMode ? "dark" : "light"
    });
  };



  return (
    <section 
      id="light-configurator" 
      ref={configuratorRef}
      className={`py-16 transition-colors duration-300 ${isDarkMode ? 'bg-[#232B2B] text-white' : 'bg-gray-50 text-gray-800'}`}
    >
      {/* Theme Toggle */}
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-3 font-['Amenti']">
            LIMI Light Configurator
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Design your perfect lighting solution. Customize every aspect and visualize in real-time.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Preview Box (Left Side - Sticky) */}
          <motion.div 
            className="lg:w-2/5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Wrapper div for pinning */}
            <div ref={previewBoxRef} className="sticky top-24" style={{ willChange: 'transform' }}>
              <div 
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl overflow-hidden aspect-square`}
              >
              {/* PlayCanvas 3D Viewer */}
              <PlayCanvasViewer 
                config={{
                  lightType,
                  lightAmount,
                  lightDesign,
                  cableColor,
                  cableLength,
                  pendants
                }}
                isDarkMode={isDarkMode}
                className="w-full h-full"
              />
              
              {/* Overlay to prevent interaction issues during loading */}
              <div className="absolute inset-0 pointer-events-none z-10"></div>
              </div>
            </div>
          </motion.div>

          {/* Configuration Panel (Right Side) */}
          <motion.div 
            className={`lg:w-3/5 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 flex flex-col`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-['Amenti']">Configure Your Light</h3>
            
            {/* Configuration Options Container */}
            <div className="flex-1">
            <LightTypeSelector 
              selectedType={lightType} 
              onTypeChange={handleLightTypeChange} 
              isDarkMode={isDarkMode} 
            />
            <LightAmountSelector 
              amount={lightAmount} 
              onAmountChange={handleLightAmountChange} 
              isDarkMode={isDarkMode} 
            />
            
            {lightAmount === 1 ? (
              <LightDesignSelector 
                selectedDesign={lightDesign} 
                onDesignChange={handleLightDesignChange} 
                isDarkMode={isDarkMode} 
              />
            ) : (
              <PendantConfigurator 
                pendants={pendants} 
                updatePendantDesign={handleLightDesignChange} 
                isDarkMode={isDarkMode} 
              />
            )}
            
            {/* Cable Options hidden as requested */}
            
            </div>
            
            {/* Customer Support - Outside scrollable area */}
            <div className={`mt-8 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <motion.button 
                onClick={openSupportChat}
                className={`w-full flex items-center justify-center gap-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} p-3 rounded-lg transition-colors`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaQuestionCircle /> Have Questions? Chat with an Expert
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Price and Configuration Summary Section */}
        <motion.div 
          id="pricing-section"
          className={`w-full mt-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            {/* Price Information */}
            <div className="md:w-1/3">
              <h3 className="text-xl font-bold mb-3 font-['Amenti']">Your Selection</h3>
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Price</p>
                <p className="text-3xl font-bold">€{totalPrice}</p>
              </div>
              <div className={`mt-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <p>Estimated delivery: 2-3 weeks</p>
                <p>Free shipping on orders over €500</p>
              </div>
            </div>
            
            {/* Configuration Summary */}
            <div className="md:w-2/3">
              <div className={`p-4 rounded-lg text-sm ${isDarkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                <h4 className="font-bold mb-2">Configuration Summary</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Type:</span> 
                    <span className="capitalize">{lightType}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Amount:</span> 
                    <span>{lightAmount} pendant{lightAmount > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Cable:</span> 
                    <span className="capitalize">{cableColor}, {cableLength}</span>
                  </div>
                  {lightAmount === 1 && (
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Design:</span> 
                      <div className="flex items-center gap-1">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ 
                            backgroundImage: `url(/images/configOptions/${pendants[0]?.design === 'bumble' ? '1' : pendants[0]?.design === 'radial' ? '2' : pendants[0]?.design === 'fina' ? '3' : pendants[0]?.design === 'ico' ? '4' : '5'}.png)`,
                            backgroundSize: "cover"
                          }}
                        ></div>
                        <span className="capitalize">{pendants[0]?.design || 'bumble'}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {lightAmount > 1 && (
                  <div className="mt-2">
                    <p className="font-medium mb-1">Pendant Designs:</p>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                      {pendants.map((pendant, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs">
                          <div 
                            className="w-3 h-3 rounded-full flex-shrink-0" 
                            style={{ 
                              backgroundImage: `url(/images/configOptions/${pendant.design === 'bumble' ? '1' : pendant.design === 'radial' ? '2' : pendant.design === 'fina' ? '3' : pendant.design === 'ico' ? '4' : '5'}.png)`,
                              backgroundSize: "cover"
                            }}
                          ></div>
                          <span>Pendant {index + 1}: {pendant.design}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end mt-4 gap-3">
            <motion.button 
              onClick={saveConfiguration}
              className={`flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} px-4 py-2 rounded-lg transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSave /> Save Configuration
            </motion.button>
            <motion.button 
              onClick={addToCart}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaShoppingCart /> Add to Cart
            </motion.button>
          </div>
        </motion.div>
        
        {/* Additional Information Section */}
        <AdditionalInfo isDarkMode={isDarkMode} />
        
        {/* End marker for ScrollTrigger pinning */}
        <div id="configurator-end-marker"></div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default LightConfigurator;
