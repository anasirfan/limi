import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
    { id: "piko", name: "Piko", image: "/images/configOptions/5.png" },
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
      className="mb-6 relative text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: pendantIndex ? 0.1 * pendantIndex : 0.2 }}
    >
      <h3 className="text-lg font-bold mb-3 font-['Amenti'] text-emerald-light">{title}</h3>
      
      {/* Mobile swipe indicator */}
      <div className="md:hidden flex justify-center items-center mb-2">
        <div className="flex items-center gap-2 bg-charleston-green-light/50 backdrop-blur-sm rounded-full px-3 py-1 text-xs animate-pulse">
          <FaChevronLeft className="text-white/70 animate-pulse-slow" />
          <span className="text-white/90">Swipe</span>
          <FaChevronRight className="text-white/70 animate-pulse-slow" />
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
          <FaChevronLeft className="text-xl text-emerald" />
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
              <div className={`w-24 h-24 rounded-full overflow-hidden relative ${selectedDesign === design.id ? 'ring-2 ring-emerald ring-offset-2 ring-offset-charleston-green-dark' : ''}`}>
                <Image
                  src={design.image}
                  alt={design.name}
                  fill
                  className="object-cover select-none"
                  draggable={false}
                />
              </div>
              <p className="text-center text-sm mt-2 text-eton-blue">{design.name}</p>
              {selectedDesign === design.id && (
                <motion.div 
                  className="h-1 bg-emerald rounded-full mt-1 mx-auto w-12"
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
          <FaChevronRight className="text-xl text-emerald" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LightDesignSelector;
