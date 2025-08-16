"use client";
import { useState, useRef, useEffect } from "react";
import {
  FaEye,
  FaSave,
  FaFolderOpen,
  FaMousePointer,
  FaMouse,
  FaArrowsAlt,
  FaSearchPlus,
  FaSearchMinus,
  FaInfo,
  FaHeart,
  FaHandPaper,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromFavorites,
  clearFavorites,
} from "../../redux/slices/favoritesSlice";

export const PreviewControls = ({
  isPreviewMode,
  setIsPreviewMode,
  config,
  cables,
  onSaveConfig,
  onLoadConfig,
  handleOpenSaveModal,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow] = useState(3); // Number of items to show at once
  const [showOnboarding, setShowOnboarding] = useState(false);

  const wishlistRef = useRef(null);
  const carouselRef = useRef(null);
  const onboardingTimeoutRef = useRef(null);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  // Reset when favorites change
  useEffect(() => {
    // No need for carousel state anymore
  }, [favorites]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wishlistRef.current && !wishlistRef.current.contains(event.target)) {
        setShowWishlistModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wishlistRef]);

  const guideRef = useRef(null);

  useEffect(() => {
    // Check if mobile device
    console.log("favorites", favorites.items);
    const checkIfMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Onboarding animation logic
  useEffect(() => {
    // Start animation after 1500ms delay
    const startDelay = setTimeout(() => {
      setShowOnboarding(true);
    }, 3000);

    // Hide animation after 3000ms of running (total 4500ms from page load)
    const hideDelay = setTimeout(() => {
      setShowOnboarding(false);
    }, 8000);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(hideDelay);
    };
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
      {/* Onboarding Animation */}
      {showOnboarding && (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="relative">
            {/* Horizontal Guide Line with Arrows and Sliding Hand */}
            <div className="relative flex items-center justify-center">
              {/* Horizontal Line */}
              <div className="w-48 h-0.5 bg-gray-400 relative">
                {/* Left Arrow */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-gray-700">
                    <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12Z"/>
                  </svg>
                </div>
                
                {/* Right Arrow */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-gray-700">
                    <path d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12Z"/>
                  </svg>
                </div>
                
                {/* Sliding Hand Icon */}
                <div 
                  className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
                  style={{
                    animation: 'slideOnLine 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}
                >
                  <div className="bg-white rounded-full p-2 shadow-lg border border-gray-200">
                    <FaHandPaper className="text-gray-600 text-lg" />
                  </div>
                </div>
              </div>
              
              {/* Instruction text */}
              <div 
                className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 whitespace-nowrap"
                style={{
                  animation: 'fadeInUp 0.5s ease-out 0.5s both'
                }}
              >
                <div className="flex items-center gap-2">
                  {isMobile ? (
                    <>
                      <span className="text-blue-500">👆</span>
                      <span>Touch and drag to rotate</span>
                    </>
                  ) : (
                    <>
                      <span className="text-blue-500">🖱️</span>
                      <span>Click and drag to rotate</span>
                    </>
                  )}
                </div>
                {/* Small arrow pointing up */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white border-l border-t border-gray-200 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Guide */}
      <div
        className="absolute top-24 left-8 z-50 flex gap-2"
        ref={guideRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouch}
      >
        <button
          className={`p-2 rounded-full bg-[#50C878] text-white transition-all shadow-lg ${
            isHovered ? "bg-gray-700" : "hover:scale-110 hover:bg-gray-700"
          }`}
          title="View Navigation Guide"
          aria-expanded={isHovered}
        >
          <FaInfo size={16} />
        </button>

        {(isHovered || (isMobile && isHovered)) && (
          <div className="absolute -left-4 top-12 z-[101] w-64 p-4 bg-white rounded-lg shadow-xl border border-gray-200 animate-fadeIn">
            <h3 className="font-bold text-gray-800 mb-3">Navigation Guide</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {isMobile ? (
                <>
                  <li className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-medium shrink-0">
                      👆
                    </span>
                    <span>One finger drag to rotate</span>
                  </li>
                  {/* <li className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-medium shrink-0">✌️</span>
                    <span>Two fingers drag to pan</span>
                  </li> */}
                  <li className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-medium shrink-0">
                      🤏
                    </span>
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
          type="button"
          className="p-2 rounded-full bg-gray-800 text-gray-300 hover:opacity-90 transition-all"
          onClick={() => {
            onSaveConfig(config, cables);
            handleOpenSaveModal(); // This will hide the nav
          }}
          title="Save Configuration"
        >
          <FaSave size={16} />
        </button>

        <button
          className="p-2 rounded-full bg-gray-800 text-gray-300 hover:opacity-90 transition-all"
          onClick={() => {
            onLoadConfig();
            handleOpenSaveModal();
          }}
          title="Load Configuration"
        >
          <FaFolderOpen size={16} />
        </button>
      </div>

      {/* Onboarding CSS Animations */}
      <style jsx>{`
        @keyframes slideOnLine {
          0% {
            left: 50%;
            transform: translateY(-50%) translateX(-50%);
          }
          20% {
            left: 85%;
            transform: translateY(-50%) translateX(-50%) scale(1.05);
          }
          25% {
            left: 90%;
            transform: translateY(-50%) translateX(-50%) scale(1.1);
          }
          30% {
            left: 85%;
            transform: translateY(-50%) translateX(-50%) scale(1.05);
          }
          45% {
            left: 50%;
            transform: translateY(-50%) translateX(-50%);
          }
          65% {
            left: 15%;
            transform: translateY(-50%) translateX(-50%) scale(1.05);
          }
          70% {
            left: 10%;
            transform: translateY(-50%) translateX(-50%) scale(1.1);
          }
          75% {
            left: 15%;
            transform: translateY(-50%) translateX(-50%) scale(1.05);
          }
          90% {
            left: 50%;
            transform: translateY(-50%) translateX(-50%);
          }
          100% {
            left: 50%;
            transform: translateY(-50%) translateX(-50%);
          }
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0px);
          }
        }
      `}</style>
    </>
  );
};

export default PreviewControls;
