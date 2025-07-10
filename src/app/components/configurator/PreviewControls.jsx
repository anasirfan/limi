"use client";
import { useState, useRef, useEffect } from "react";
import { FaEye, FaSave, FaFolderOpen, FaMousePointer, FaMouse, FaArrowsAlt, FaSearchPlus, FaSearchMinus, FaInfo } from "react-icons/fa";
import VerticalSlider from './VerticalSlider';
import VerticalSlider2 from './VerticalSlider2';

export const PreviewControls = ({
  isPreviewMode,
  setIsPreviewMode,
  config,
  cables,
  onSaveConfig,
  onLoadConfig,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const guideRef = useRef(null);

  useEffect(() => {
    // Check if mobile device
    const checkIfMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
    }
  };

  const handleTouch = () => {
    if (isMobile) {
      setIsHovered(!isHovered);
    }
  };

  return (
    <>
      {/* Vertical Slider */}
      {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40">
        <VerticalSlider /> 
         <VerticalSlider2 />
      </div> */}
      
      {/* Navigation Guide */}
      <div className="absolute top-24 left-8 z-50 flex gap-2"
        ref={guideRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouch}>
      <button
            className={`p-2 rounded-full bg-[#50C878] text-white transition-all shadow-lg ${isHovered ? 'bg-gray-700' : 'hover:scale-110 hover:bg-gray-700'}`}
            title="View Navigation Guide"
            aria-expanded={isHovered}
          >
            <FaInfo  size={16} />
          </button>
 

        {(isHovered || (isMobile && isHovered)) && (
          <div className="absolute -left-4 top-12 z-[101] w-64 p-4 bg-white rounded-lg shadow-xl border border-gray-200 animate-fadeIn">
            <h3 className="font-bold text-gray-800 mb-3">Navigation Guide</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {isMobile ? (
                <>
                  <li className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-medium shrink-0">👆</span>
                    <span>One finger drag to rotate</span>
                  </li>
                  {/* <li className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-medium shrink-0">✌️</span>
                    <span>Two fingers drag to pan</span>
                  </li> */}
                  <li className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-medium shrink-0">🤏</span>
                    <span>Pinch to zoom in/out</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <FaMousePointer className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Left-click and drag to rotate</span>
                  </li>
                  {/* <li className="flex items-start gap-2">
                    <FaMouse className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Right-click and drag to pan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaArrowsAlt className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Middle-click and drag to zoom</span>
                  </li> */}
                  <li className="flex items-start gap-2">
                    <FaSearchPlus className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Scroll up to zoom in</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaSearchMinus className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Scroll down to zoom out</span>
                  </li>
                </>
              )}
            </ul>
              </div>
        )}

      </div>
      <div className="absolute top-24 right-8 z-50 flex gap-2">
        <button
          className="p-2 rounded-full bg-gray-800 text-gray-300 hover:opacity-90 transition-all"
          onClick={() => setIsPreviewMode(!isPreviewMode)}
          title={isPreviewMode ? "Exit Preview Mode" : "Enter Preview Mode"}
        >
          <FaEye size={16} />
        </button>

        <button
          className="p-2 rounded-full bg-gray-800 text-gray-300 hover:opacity-90 transition-all"
          onClick={() => onSaveConfig(config, cables)}
          title="Save Configuration"
        >
          <FaSave size={16} />
        </button>

        <button
          className="p-2 rounded-full bg-gray-800 text-gray-300 hover:opacity-90 transition-all"
          onClick={onLoadConfig}
          title="Load Configuration"
        >
          <FaFolderOpen size={16} />
        </button>
      </div>
    </>
  );
};

export default PreviewControls;
