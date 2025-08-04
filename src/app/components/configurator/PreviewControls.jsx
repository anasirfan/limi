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
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromFavorites,
  clearFavorites,
} from "../../redux/slices/favoritesSlice";
import { motion, AnimatePresence } from "framer-motion";

export const PreviewControls = ({
  isPreviewMode,
  setIsPreviewMode,
  config,
  cables,
  onSaveConfig,
  onLoadConfig,
  handleOpenSaveModal,
  sendMessageToPlayCanvas,
  onPendantDesignChange,
  selectedPendants,
  selectedLocation,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow] = useState(3); // Number of items to show at once
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLightingPanelOpen, setIsLightingPanelOpen] = useState(false);
  const [lightingOn, setLightingOn] = useState(true);
  const [colorTemperature, setColorTemperature] = useState(50); // 0-100 (warm to cool)
  const [brightness, setBrightness] = useState(75); // 0-100
  const brightnessDebounceTimeout = useRef();
  const colorTempDebounceTimeout = useRef();

  const wishlistRef = useRef(null);
  const carouselRef = useRef(null);
  const onboardingTimeoutRef = useRef(null);
  const lightingRef = useRef(null);
  const debounceTimeout = useRef(null);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  // Reset when favorites change
  useEffect(() => {
    console.log("selectedPendants", selectedPendants);
    // No need for carousel state anymore
  }, [favorites, selectedPendants]);

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

  const guideRef = useRef(null);

  useEffect(() => {
    // Check if mobile device
    console.log("favorites", favorites);
    const checkIfMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

// --- Replace your current brightness useEffect with this ---
useEffect(() => {
  if (brightnessDebounceTimeout.current) clearTimeout(brightnessDebounceTimeout.current);
  brightnessDebounceTimeout.current = setTimeout(() => {
    sendMessageToPlayCanvas("brightness:" + brightness);
  });
  return () => clearTimeout(brightnessDebounceTimeout.current);
}, [brightness]);

// --- Add this new useEffect for colorTemperature ---
useEffect(() => {
  if (colorTempDebounceTimeout.current) clearTimeout(colorTempDebounceTimeout.current);
  colorTempDebounceTimeout.current = setTimeout(() => {
    sendMessageToPlayCanvas("colorTemperature:" + Math.round(
      2700 + (colorTemperature / 100) * (6500 - 2700)
    ));
  });
  return () => clearTimeout(colorTempDebounceTimeout.current);
}, [colorTemperature]);


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

        {/* Lighting Control Button */}

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

      <div className="absolute top-40 left-8 z-50 flex gap-2" ref={lightingRef}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-3 rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm border ${
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
              size={18}
              className={lightingOn ? "text-yellow-300" : ""}
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
              className="absolute top-16 bg-gray-900/95 backdrop-blur-md border border-gray-600/50 rounded-xl shadow-2xl p-5 w-72 z-50"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <FaLightbulb
                    className={`${
                      lightingOn ? "text-yellow-400" : "text-gray-400"
                    } transition-colors`}
                  />
                  <h3 className="text-white font-semibold text-lg">Lighting</h3>
                </div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    lightingOn ? "bg-green-400" : "bg-red-400"
                  } animate-pulse`}
                ></div>
              </div>

              {/* Power Toggle */}
              <div className="flex items-center justify-between mb-6 p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-gray-200 font-medium">Power</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      lightingOn
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    } transition-colors duration-300`}
                  >
                    {lightingOn ? "ON" : "OFF"}
                  </span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={lightingOn}
                  onClick={() => {
                    const newState = !lightingOn;
                    setLightingOn(newState);
                    // Send message to PlayCanvas when power state changes
                    const message = newState ? "lighting:on" : "lighting:off";
                    const iframe = document.getElementById("playcanvas-app");
                    if (iframe && iframe.contentWindow) {
                      console.log(`Sending message to PlayCanvas: ${message}`);
                      iframe.contentWindow.postMessage(message, "*");
                    }
                  }}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                    lightingOn ? "bg-emerald-500" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`${
                      lightingOn ? "translate-x-8" : "translate-x-1"
                    } inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ease-in-out`}
                  />
                </button>
              </div>

              {/* Color Temperature Control */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-gray-200 font-medium">
                    Color Temperature
                  </label>
                  <span className="text-xs  px-2 py-1 rounded text-white font-medium">
                    {Math.round(
                      2700 + (colorTemperature / 100) * (6500 - 2700)
                    )}
                    K
                  </span>
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
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer slider-enhanced"
                    style={{
                      background: `linear-gradient(to right, 
                          #fb923c 0%, 
                          #fde047 50%, 
                          #60a5fa 100%
                        )`,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Warm</span>
                    <span>Neutral</span>
                    <span>Cool</span>
                  </div>
                </div>
              </div>

              {/* Brightness Control */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-gray-200 font-medium">
                    Brightness
                  </label>
                  <span className="text-xs px-2 py-1 rounded text-white font-medium">
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
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer slider-enhanced"
                    style={{
                      background: `linear-gradient(to right, 
            #374151 0%, 
            #fbbf24 ${brightness}%, 
            #374151 ${brightness}%
          )`,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span className="flex items-center gap-1">
                      <span className="text-gray-500">🌙</span> Dim
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-yellow-400">☀️</span> Bright
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="mt-4 pt-4 border-t border-gray-700">
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

              <div className="max-h-80 flex">
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
                  <div className="flex flex-nowrap overflow-x-auto pb-4 px-2">
                    {favorites.map((pendant) => {
                      const barBaseIds = [
                        "prism",
                        "helix",
                        "orbit",
                        "zenith",
                        "pulse",
                        "vortex",
                        "nexus",
                        "quasar",
                        "nova",
                      ];
                      const universalBaseIds = [
                        "atom",
                        "nebula",
                        "cosmos",
                        "stellar",
                        "eclipse",
                        "aurora",
                        "solstice",
                        "quantum",
                        "vertex",
                        "horizon",
                        "zoneith",
                        "equinox",
                        "meridian",
                        "polaris",
                        "pulsar",
                        "quasar",
                        "supernova",
                        "galaxy",
                        "comet",
                        "meteor",
                        "asteroid",
                        "celestial",
                        "orbital",
                        "lunar",
                        "solar",
                        "nova",
                        "photon",
                        "gravity",
                        "spectrum",
                        "infinity",
                      ];
                      return (
                        <div
                          key={pendant.id}
                          className="group relative p-2 "
                          onClick={() => {
                            if (barBaseIds.includes(pendant.id)) {
                              sendMessageToPlayCanvas(`system:bar`);
                              selectedPendants.forEach((idx) => {
                                sendMessageToPlayCanvas(
                                  `cable_${idx}:system_base_${
                                    barBaseIds.indexOf(pendant.id) + 1
                                  }`
                                );
                              });
                            } else if (universalBaseIds.includes(pendant.id)) {
                              sendMessageToPlayCanvas(`system:universal`);
                              selectedPendants.forEach((idx) => {
                                sendMessageToPlayCanvas(
                                  `cable_${idx}:system_base_${
                                    universalBaseIds.indexOf(pendant.id) + 1
                                  }`
                                );
                              });
                            } else {
                              selectedPendants.forEach((idx) => {
                                sendMessageToPlayCanvas(
                                  `cable_${idx}:${pendant.message}`
                                );
                              });
                            }
                          }}
                        >
                          <div className="flex flex-col items-center text-center">
                            {pendant.image ? (
                              <div className="relative h-14 w-14 rounded-full bg-gray-900 overflow-visible mb-1 group">
                                <img
                                  src={pendant.image}
                                  alt={pendant.name}
                                  className="h-full w-full object-cover"
                                />
                                <button
                                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-rose-500 rounded-full text-white text-xs font-bold hover:bg-rose-600 transition-colors"
                                  title="Remove from Wishlist"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(removeFromFavorites(pendant.id));
                                  }}
                                >
                                  ×
                                </button>
                              </div>
                            ) : (
                              <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                                <FaHeart className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                            <p className="text-xs font-medium text-white line-clamp-2 h-8 flex items-center">
                              {pendant.name}
                            </p>
                          </div>
                        </div>
                      );
                    })}
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
