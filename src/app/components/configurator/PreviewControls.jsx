"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
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
  FaLightbulb,
  FaRoute,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromFavoritesAndSync,
  clearFavorites,
  fetchFavorites,
  syncFavoritesWithSystemAssignments,
} from "../../redux/slices/favoritesSlice";
import { motion, AnimatePresence } from "framer-motion";
import { listenForAppReady1 } from "../../util/iframeCableMessageHandler";
import { systemAssignments } from "./pendantSystemData";
import { listenForOffconfigMessages, listenForLoadingMessages } from "../../util/iframeCableMessageHandler";
import LoadingScreen from "./LoadingScreen";

export const PreviewControls = ({
  isPreviewMode,
  setIsPreviewMode,
  config,
  isLightingPanelOpen,
  setIsLightingPanelOpen,
  cables,
  onSaveConfig,
  onLoadConfig,
  handleOpenSaveModal,
  sendMessageToPlayCanvas,
  onPendantDesignChange,
  selectedPendants,
  selectedLocation,
  cableMessage,
  showPendantLoadingScreen,
  setShowPendantLoadingScreen,

  brightness,
  setBrightness,
  colorTemperature,
  sendMessagesForDesign,
  setColorTemperature,
  lighting,
  setLighting,
  setCables,
  onStartTour, // Add tour callback prop
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow] = useState(3); // Number of items to show at once
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const brightnessDebounceTimeout = useRef();
  const colorTempDebounceTimeout = useRef();
  const prevLightingPanelWasOpenRef = useRef(false);

  const wishlistRef = useRef(null);
  const carouselRef = useRef(null);
  const onboardingTimeoutRef = useRef(null);
  const lightingRef = useRef(null);
  const debounceTimeout = useRef(null);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  // Reset when favorites change
  useEffect(() => {
    // No need for carousel state anymore
  }, [favorites, selectedPendants]);
  useEffect(() => {
    // Listen for "app:ready1" messages
    const cleanup = listenForAppReady1(() => {
      setShowOnboarding(true);
      // Hide after 5s (adjust as needed)
      setTimeout(() => setShowOnboarding(false), 5000);
    });
    return cleanup;
  }, []);
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wishlistRef.current && !wishlistRef.current.contains(event.target)) {
        setShowWishlistModal(false);
      }
      if (lightingRef.current && !lightingRef.current.contains(event.target)) {
        setIsLightingPanelOpen(false);
      }
    }
  }, []);
  // Listen for 'loadingoff' message from iframe
  useEffect(() => {
    const cleanup = listenForLoadingMessages((msg) => {
      if (msg === "loadingOff" || msg === "loadingoff") {
        console.log(`🟢 Received '${msg}' message from iframe. Hiding loading screen.`);
        setShowPendantLoadingScreen(false);
        console.log("🟠 showPendantLoadingScreen should now be FALSE.");
      } else {
        console.log("🔵 Received loading message:", msg);
      }
    });
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, [setShowPendantLoadingScreen]);
  // Close lighting panel when navigation guide is hovered
  useEffect(() => {
    // If lighting panel is open and info is hovered, close the panel

    if (isLightingPanelOpen && isHovered) {
      setIsLightingPanelOpen(false);
    }
    // If lighting panel was open and hover ends, reopen it
    else if (!isHovered && prevLightingPanelWasOpenRef.current) {
      setIsLightingPanelOpen(true);
    }
    // Track if the panel was open before hover
    if (isHovered && isLightingPanelOpen) {
      prevLightingPanelWasOpenRef.current = true;
    } else if (!isHovered) {
      prevLightingPanelWasOpenRef.current = false;
    }
  }, [isHovered, isLightingPanelOpen]);

  useEffect(() => {
    const cleanup = listenForOffconfigMessages((data, event) => {
      setShowWishlistModal(false);
    });
    return cleanup;
  }, [cableMessage]);

  // Listen for loading screen messages
  useEffect(() => {
    const cleanup = listenForLoadingMessages((message, event) => {
      if (message === "loadingOpen") {
        setShowLoadingScreen(true);
      } else if (message === "loadingOff") {
        setShowLoadingScreen(false);
      }
    });
    return cleanup;
  }, []);
  const guideRef = useRef(null);

  useEffect(() => {
    // Check if mobile device
    const checkIfMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    dispatch(fetchFavorites()).then((action) => {
      if (action.payload) {
        dispatch(syncFavoritesWithSystemAssignments(action.payload));
      }
    });
  }, [dispatch]);

  // --- Replace your current brightness useEffect with this ---
  useEffect(() => {
    if (lighting == true) {
      if (brightnessDebounceTimeout.current)
        clearTimeout(brightnessDebounceTimeout.current);
      brightnessDebounceTimeout.current = setTimeout(() => {
        sendMessageToPlayCanvas("brightness:" + brightness);
      });
      return () => clearTimeout(brightnessDebounceTimeout.current);
    }
  }, [brightness]);

  // --- Add this new useEffect for colorTemperature ---
  useEffect(() => {
    if (lighting == true) {
      if (colorTempDebounceTimeout.current)
        clearTimeout(colorTempDebounceTimeout.current);
      colorTempDebounceTimeout.current = setTimeout(() => {
        sendMessageToPlayCanvas(
          "colorTemperature:" +
            Math.round(2700 + (colorTemperature / 100) * (6500 - 2700))
        );
      });
      return () => clearTimeout(colorTempDebounceTimeout.current);
    }
  }, [colorTemperature]);

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
    <div className="noselect">
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
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-gray-700"
                  >
                    <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12Z" />
                  </svg>
                </div>

                {/* Right Arrow */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-gray-700"
                  >
                    <path d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12Z" />
                  </svg>
                </div>

                {/* Sliding Hand Icon */}
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
                  style={{
                    animation:
                      "slideOnLine 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
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
                  animation: "fadeInUp 0.5s ease-out 0.5s both",
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
        className="absolute top-24 left-4 sm:left-8 z-50 flex gap-2"
        ref={guideRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouch}
      >
        <button
          className={`p-2 rounded-full bg-gray-700 text-white transition-all shadow-lg ${
            isHovered
              ? " hover:bg-[#50C878]"
              : "hover:scale-110 hover:bg-[#50C878]"
          }`}
          title="View Navigation Guide"
          aria-expanded={isHovered}
        >
          <FaInfo size={16} />
        </button>

        {/* Lighting Control Button */}

        {(isHovered || (isMobile && isHovered)) && (
          <div className="absolute -left-2 sm:-left-4 top-10 sm:top-12 z-[101] w-64 p-4 bg-white rounded-lg shadow-xl border border-gray-200 animate-fadeIn">
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

      <div
        className="absolute left-14 sm:left-[4.5rem] top-[5.94rem] z-50 flex gap-2"
        ref={lightingRef}
      >
        <motion.button
          whileHover={{ scale: 0.95 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm border ${
            isLightingPanelOpen
              ? "bg-blue-600/90 border-blue-400 text-white"
              : "bg-gray-900/80 border-gray-600 text-gray-300 hover:bg-gray-800/90 hover:border-gray-500"
          }`}
          onClick={() => setIsLightingPanelOpen(!isLightingPanelOpen)}
          title="Lighting Controls"
        >
          <motion.div
            animate={{ rotate: isLightingPanelOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaLightbulb
              size={16}
              className={lighting ? "text-yellow-300" : ""}
            />
          </motion.div>
        </motion.button>

        {/* Lighting Control Panel */}
        <AnimatePresence>
          {isLightingPanelOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-10 -left-12 sm:left-0 sm:top-16 
                         bg-[#1d1e1f] sm:bg-gray-900/95 
                         backdrop-blur-xl sm:backdrop-blur-md 
                         border border-white/20 sm:border-gray-600/50 
                         rounded-2xl sm:rounded-xl 
                         shadow-2xl shadow-black/40 sm:shadow-2xl
                         before:absolute before:inset-0 before:rounded-2xl sm:before:rounded-xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none sm:before:hidden
                         p-2 sm:p-5 w-56 sm:w-72 z-50"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-2 sm:mb-5">
                <div className="flex items-center gap-1 sm:gap-2">
                  <FaLightbulb
                    className={`${
                      lighting ? "text-yellow-400" : "text-gray-400"
                    } transition-colors text-sm sm:text-base`}
                    size={16}
                  />
                  <h3 className="text-white font-semibold text-sm sm:text-lg">
                    Lighting
                  </h3>
                </div>

                {/* Mobile: Toggle in header, Desktop: Status indicator */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={lighting}
                    onClick={() => {
                      const newState = !lighting;
                      setLighting(newState);
                      // Send message to PlayCanvas when power state changes
                      const message = newState ? "lighting:on" : "lighting:off";
                      const iframe = document.getElementById("playcanvas-app");
                      if (iframe && iframe.contentWindow) {
                        console.log(
                          `Sending message to PlayCanvas: ${message}`
                        );
                        iframe.contentWindow.postMessage(message, "*");
                        if (newState) {
                          // Also send brightness and color temperature when turning ON
                          iframe.contentWindow.postMessage(
                            `brightness:${brightness}`,
                            "*"
                          );
                          iframe.contentWindow.postMessage(
                            `colorTemperature:${Math.round(
                              2700 + (colorTemperature / 100) * (6500 - 2700)
                            )}`,
                            "*"
                          );
                        }
                      }
                    }}
                    className={`sm:hidden relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                      lighting ? "bg-emerald-500" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`${
                        lighting ? "translate-x-6" : "translate-x-0.5"
                      } inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ease-in-out`}
                    />
                  </button>

                  <div
                    className={`hidden sm:block w-2 h-2 rounded-full ${
                      lighting ? "bg-green-400" : "bg-red-400"
                    } animate-pulse`}
                  ></div>
                </div>
              </div>

              {/* Power Toggle - Desktop Only */}
              <div className="hidden sm:flex items-center justify-between mb-6 p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-gray-200 font-medium">Power</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      lighting
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    } transition-colors duration-300`}
                  >
                    {lighting ? "ON" : "OFF"}
                  </span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={lighting}
                  onClick={() => {
                    const newState = !lighting;
                    setLighting(newState);
                    // Send message to PlayCanvas when power state changes
                    const message = newState ? "lighting:on" : "lighting:off";
                    const iframe = document.getElementById("playcanvas-app");
                    if (iframe && iframe.contentWindow) {
                      console.log(`Sending message to PlayCanvas: ${message}`);
                      iframe.contentWindow.postMessage(message, "*");
                      if (newState) {
                        // Also send brightness and color temperature when turning ON
                        iframe.contentWindow.postMessage(
                          `brightness:${brightness}`,
                          "*"
                        );
                        iframe.contentWindow.postMessage(
                          `colorTemperature:${Math.round(
                            2700 + (colorTemperature / 100) * (6500 - 2700)
                          )}`,
                          "*"
                        );
                      }
                    }
                  }}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                    lighting ? "bg-emerald-500" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`${
                      lighting ? "translate-x-8" : "translate-x-1"
                    } inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ease-in-out`}
                  />
                </button>
              </div>

              {/* Color Temperature Control */}
              {lighting && (
                <div className="mb-3 sm:mb-6">
                  <div className="flex items-center justify-between mb-1 sm:mb-3">
                    <label className="text-gray-200 font-medium text-xs sm:text-base">
                      Color Temp
                    </label>
                    {/* <span className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-white font-medium">
                      {Math.round(
                        2700 + (colorTemperature / 100) * (6500 - 2700)
                      )}
                      K
                    </span> */}
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={colorTemperature}
                      onChange={(e) =>
                        setColorTemperature(Number(e.target.value))
                      }
                      className="w-full h-2.5 sm:h-3 rounded-lg appearance-none cursor-pointer slider-enhanced"
                      style={{
                        background: `linear-gradient(to right, 
                          #60a5fa 0%, 
                          #fde047 50%, 
                          #fb923c 100%
                        )`,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                      }}
                    />
                    <div className="hidden sm:flex justify-between text-xs text-gray-400 mt-2">
                      <span>Cool</span>
                      <span>Neutral</span>
                      <span>Warm</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Brightness Control */}
              {lighting && (
                <div className="mb-1 sm:mb-3">
                  <div className="flex items-center justify-between mb-1 sm:mb-3">
                    <label className="text-gray-200 font-medium text-xs sm:text-base">
                      Brightness
                    </label>
                    <span className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-white font-medium">
                      {brightness}%
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={brightness}
                      onChange={(e) => setBrightness(Number(e.target.value))}
                      className="w-full h-2.5 sm:h-3 rounded-lg appearance-none cursor-pointer slider-enhanced"
                      style={{
                        background: `linear-gradient(to right, 
            #374151 0%, 
            #fbbf24 ${brightness}%, 
            #374151 ${brightness}%
          )`,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                      }}
                    />
                    <div className="hidden sm:flex justify-between text-xs text-gray-400 mt-2">
                      <span className="flex items-center gap-1">
                        <span className="text-gray-500">🌙</span> Dim
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-yellow-400">☀️</span> Bright
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Presets - Desktop Only */}
              {lighting && (
                <div className="hidden sm:block mt-4 pt-4 border-t border-gray-700">
                  <label className="text-gray-200 font-medium text-sm mb-2 block">
                    Quick Presets
                  </label>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setColorTemperature(20);
                        setBrightness(80);
                      }}
                      className="flex-1 px-3 py-2 bg-orange-500/20 border border-orange-500/30 rounded-lg text-orange-300 text-xs font-medium hover:bg-orange-500/30 transition-all"
                    >
                      Cozy
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setColorTemperature(50);
                        setBrightness(100);
                      }}
                      className="flex-1 px-3 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-300 text-xs font-medium hover:bg-yellow-500/30 transition-all"
                    >
                      Natural
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setColorTemperature(80);
                        setBrightness(90);
                      }}
                      className="flex-1 px-3 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 text-xs font-medium hover:bg-blue-500/30 transition-all"
                    >
                      Focus
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute top-24 right-8 z-50 flex gap-2">
        <button
          className="p-2 rounded-full bg-gray-800 text-gray-300 hover:opacity-90 transition-all"
          onClick={() => setIsPreviewMode(!isPreviewMode)}
          title={isPreviewMode ? "Exit Preview Mode" : "Enter Preview Mode"}
        >
          <FaEye size={16} />
        </button>

        {/* Tour Guide Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-lg"
          onClick={() => onStartTour && onStartTour()}
          title="Start Guided Tour"
        >
          <FaRoute size={16} />
        </motion.button>

        {/* Wishlist Button */}
        <div className="relative" ref={wishlistRef}>
          <button
            className={`p-2 rounded-full ${
              showWishlistModal
                ? "bg-rose-500 text-white"
                : "bg-gray-800 text-rose-400 hover:bg-rose-900"
            } transition-all relative`}
            onClick={() => setShowWishlistModal(!showWishlistModal)}
            title="View Wishlist"
          >
            <FaHeart size={16} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>

          {showWishlistModal && (
            <div className="absolute -right-14 sm:right-12 mt-2 w-80 bg-black rounded-lg shadow-xl z-50">
              <div className="p-3 flex justify-between items-center">
                <h3 className="text-sm font-medium text-white flex items-center gap-2">
                  <FaHeart className="text-rose-500" /> Wishlist
                  {favorites.length > 0 && (
                    <span className="text-xs font-normal text-white">
                      ({favorites.length}{" "}
                      {favorites.length === 1 ? "item" : "items"})
                    </span>
                  )}
                </h3>
                {favorites.length > 0 && (
                  <button
                    className="text-xs text-rose-600 hover:text-rose-700 font-medium px-2 py-1 rounded hover:bg-rose-50 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(clearFavorites());
                    }}
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="max-h-80 relative">
                {favorites.length === 0 ? (
                  <div className="p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 mb-3">
                      <FaHeart className="h-6 w-6 text-rose-500" />
                    </div>
                    <p className="text-sm text-gray-500">
                      No pendants in your wishlist yet.
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    {/* Left Navigation Button */}
                    <button
                      onClick={() => {
                        const container =
                          document.querySelector(".wishlist-scroll");
                        container.scrollBy({ left: -100, behavior: "smooth" });
                      }}
                      className="absolute left-1 top-[35%] -translate-y-1/2 z-10 w-8 h-8 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>

                    <div
                      className="wishlist-scroll flex flex-nowrap overflow-x-auto  px-2 scrollbar-hide"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      {favorites.map((pendant) => {
                        // Find full pendant/system object from shared data (by id or designId)
                        const assignment = systemAssignments.find(
                          (item) => pendant.id == item.design
                        );
                        return (
                          <div
                            key={pendant.id}
                            className="group relative p-2 "
                            onClick={() => {
                              // Build a mapping of design to indices
                              const designToIds = {};
                              selectedPendants.forEach((idx) => {
                                const design = assignment.design; // Use the assignment's design
                                if (!designToIds[design])
                                  designToIds[design] = [];
                                designToIds[design].push(idx);
                              });
                              // Call sendMessagesForDesign for each unique design
                              Object.entries(designToIds).forEach(
                                ([design, ids]) => {
                                  sendMessagesForDesign(
                                    design,
                                    ids.length === 1 ? ids[0] : ids
                                  );
                                }
                              );
                              // Update cables for all selected indices
                              setCables((prev) => {
                                const updatedCables = [...prev];
                                selectedPendants.forEach((idx) => {
                                  updatedCables[idx] = {
                                    ...updatedCables[idx],
                                    design: assignment.design,
                                  };
                                });
                                return updatedCables;
                              });
                            }}
                          >
                            <div className="flex flex-col items-center text-center">
                              <div className="relative h-14 w-14 rounded-full bg-gray-900 overflow-visible mb-1 group">
                                <img
                                  src={
                                    assignment.media &&
                                    assignment.media.image &&
                                    assignment.media.image.url
                                      ? assignment.media.image.url
                                      : ""
                                  }
                                  alt={assignment.name}
                                  className="h-full w-full object-cover"
                                />
                                <button
                                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-rose-500 rounded-full text-white text-xs font-bold hover:bg-rose-600 transition-colors"
                                  title="Remove from Wishlist"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(
                                      removeFromFavoritesAndSync(
                                        assignment.design
                                      )
                                    );
                                  }}
                                >
                                  ×
                                </button>
                              </div>
                              <p className="text-xs font-medium text-white line-clamp-2 h-8 flex items-center">
                                {/* Use assignment.design for pendant/system name */}
                                {assignment ? assignment.design : pendant.name}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Right Navigation Button */}
                    <button
                      onClick={() => {
                        const container =
                          document.querySelector(".wishlist-scroll");
                        container.scrollBy({ left: 100, behavior: "smooth" });
                      }}
                      className="absolute right-1 top-[35%] -translate-y-1/2 z-10 w-8 h-8 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

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
        .noselect {
          user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          -moz-user-select: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

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

      {/* Loading Screen */}
      <LoadingScreen 
        isVisible={showPendantLoadingScreen} 
        onHide={() => setShowPendantLoadingScreen(false)}
      />
    </div>
  );
};

export default PreviewControls;
