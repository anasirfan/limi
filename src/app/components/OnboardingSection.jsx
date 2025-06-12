"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import OnboardingWizard from "./onboarding/OnboardingWizard";
import PlayCanvasViewer from "./PlayCanvasViewer";

// Helper: Detect mobile using user agent and screen size
function isMobileDevice() {
  if (typeof window === "undefined") return false;
  
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(
    userAgent.toLowerCase()
  );
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 800;
  
  return isMobileUA || hasTouch || isSmallScreen;
}

export default function OnboardingSection() {
  const router = useRouter();
  const iframeRef = useRef(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardSelections, setWizardSelections] = useState({});
  const [homepageMessageSent, setHomepageMessageSent] = useState(false);
  const [currentType, setCurrentType] = useState("");
  const [lightAmount, setLightAmount] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [loadingTimedOut, setLoadingTimedOut] = useState(false);
  const [iframeKey, setIframeKey] = useState(0); // For force re-mounting iframe on mobile
  const [iframeError, setIframeError] = useState(false);
  const [showTapToLoad, setShowTapToLoad] = useState(false);
  const [showMobileBlackScreenHelp, setShowMobileBlackScreenHelp] =
    useState(false);

  // Detect mobile devices (user agent + screen size)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(isMobileDevice());
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle iframe messages
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMessage = (event) => {
      try {
        if (event.data === "app:ready1") {
          setIframeLoaded(true);
          // Send 'homepage' message when app is ready (only once)
          if (
            iframeRef.current &&
            iframeRef.current.contentWindow &&
            !homepageMessageSent
          ) {
            iframeRef.current.contentWindow.postMessage("homepage", "*");
            iframeRef.current.contentWindow.postMessage(
              "cable_0:product_2",
              "*"
            );
            setHomepageMessageSent(true);
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error handling iframe message:", error);
      }
    };

    window.addEventListener("message", handleMessage);

    // Set a timeout to handle cases where the app:ready1 message might not be received
    // This is especially important for mobile browsers
    // const readyTimeout = setTimeout(
    //   () => {
    //     if (!iframeLoaded) {
    //       setIframeLoaded(true);
    //       setLoadingTimedOut(true);
    //       // Try to send homepage message anyway
    //       if (
    //         iframeRef.current &&
    //         iframeRef.current.contentWindow &&
    //         !homepageMessageSent
    //       ) {
    //         try {
    //           iframeRef.current.contentWindow.postMessage("homepage", "*");
    //           iframeRef.current.contentWindow.postMessage(
    //             "cable_0:product_2",
    //             "*"
    //           );
    //           setHomepageMessageSent(true);
    //         } catch (error) {
    //           // eslint-disable-next-line no-console
    //           console.error("Error sending message after timeout:", error);
    //         }
    //       }
    //     }
    //   },
    //   isMobile ? 12000 : 15000
    // );

    return () => {
      window.removeEventListener("message", handleMessage);
      // clearTimeout(readyTimeout);
    };
  }, [homepageMessageSent, iframeLoaded, isMobile, iframeKey]);

  // Function to send configuration to PlayCanvas based on step
  const sendConfigToPlayCanvas = (step, selections) => {
    try {
      if (
        !iframeRef.current ||
        !iframeRef.current.contentWindow ||
        !iframeLoaded
      ) {
        return;
      }
      // We're only sending the specific data for each step, no light amount
      switch (step) {
        case 1:
          if (selections.lightCategory) {
            const lightTypeMap = {
              ceiling: "ceiling",
              wall: "wall",
              floor: "floor",
            };
            const lightType =
              lightTypeMap[selections.lightCategory] || "ceiling";
            setCurrentType(lightType);

            iframeRef.current.contentWindow.postMessage(
              `light_type:${lightType}`,
              "*"
            );
            if (lightType === "floor") {
              iframeRef.current.contentWindow.postMessage(
                "light_amount:3",
                "*"
              );
            }

            if (lightType === "floor") {
              iframeRef.current.contentWindow.postMessage(
                "cable_0:product_2",
                "*"
              );
              iframeRef.current.contentWindow.postMessage(
                "cable_1:product_2",
                "*"
              );
              iframeRef.current.contentWindow.postMessage(
                "cable_2:product_2",
                "*"
              );
            } else {
              iframeRef.current.contentWindow.postMessage(
                "cable_0:product_2",
                "*"
              );
            }
          }
          break;

        case 2:
          if (selections.lightStyle) {
            const vibeMessage = selections.lightStyle;
            let lightAmount = 1;
            if (currentType === "ceiling") {
              if (vibeMessage === "coolLux") {
                lightAmount = "1";
              } else if (vibeMessage === "dreamGlow") {
                lightAmount = "3";
              } else if (vibeMessage === "shadowHue") {
                lightAmount = "6";
              } else {
                lightAmount = "24";
              }
              setLightAmount(lightAmount);
              iframeRef.current.contentWindow.postMessage(
                "light_type:ceiling",
                "*"
              );
              iframeRef.current.contentWindow.postMessage(
                `light_amount:${lightAmount}`,
                "*"
              );
              for (let i = 0; i < lightAmount; i++) {
                if (lightAmount === "1") {
                  iframeRef.current.contentWindow.postMessage(
                    `cable_0:product_2`,
                    "*"
                  );
                  break;
                }
                iframeRef.current.contentWindow.postMessage(
                  `cable_${i}:product_2`,
                  "*"
                );
              }
            } else if (currentType === "floor") {
              setLightAmount(3);
              iframeRef.current.contentWindow.postMessage(
                `light_amount:3`,
                "*"
              );
              for (let i = 0; i < 3; i++) {
                iframeRef.current.contentWindow.postMessage(
                  `cable_${i}:product_2`,
                  "*"
                );
              }
            } else if (currentType === "wall") {
              iframeRef.current.contentWindow.postMessage(
                `light_amount:1`,
                "*"
              );
            }
          }
          break;

        case 3:
          if (selections.designAesthetic) {
            const aestheticMessage = selections.designAesthetic;
            let pendantDesign = "";
            if (aestheticMessage === "modern_style") {
              pendantDesign = "product_1";
            } else if (aestheticMessage === "aesthetic") {
              pendantDesign = "product_2";
            } else if (aestheticMessage === "industrial") {
              pendantDesign = "product_3";
            } else if (aestheticMessage === "scandinavian") {
              pendantDesign = "product_5";
            }
            for (let i = 0; i < lightAmount; i++) {
              if (currentType === "wall") {
                iframeRef.current.contentWindow.postMessage(
                  `light_amount:1`,
                  "*"
                );
                iframeRef.current.contentWindow.postMessage(
                  `cable_0:${pendantDesign}`,
                  "*"
                );
                break;
              } else if (currentType === "floor") {
                iframeRef.current.contentWindow.postMessage(
                  `cable_${i}:${pendantDesign}`,
                  "*"
                );
              } else {
                iframeRef.current.contentWindow.postMessage(
                  `cable_${i}:${pendantDesign}`,
                  "*"
                );
              }
            }
          }
          break;

        case 4:
          if (selections.lightCategory) {
            const lightTypeMap = {
              ceiling: "ceiling",
              wall: "wall",
              floor: "floor",
            };
            const lightType =
              lightTypeMap[selections.lightCategory] || "ceiling";
          }
          if (selections.lightStyle) {
          }
          if (selections.designAesthetic) {
            const formattedAesthetic =
              selections.designAesthetic === "modern_style"
                ? "modern"
                : selections.designAesthetic;
          }
          break;

        default:
          break;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error sending configuration to PlayCanvas:", error);
    }
  };

  // Handle step changes - only store selections, don't send to PlayCanvas yet
  const handleStepChange = (step, stepSelections) => {
    setCurrentStep(step);
    setWizardSelections(stepSelections);
    if (iframeLoaded && step > 0) {
      sendConfigToPlayCanvas(step, stepSelections);
    }
  };

  // Handle completion
  const handleComplete = (finalSelections) => {
    if (iframeLoaded) {
      sendConfigToPlayCanvas(4, finalSelections);
    }
    localStorage.setItem(
      "configuratorSelections",
      JSON.stringify(finalSelections)
    );
    router.push("/configurator");
  };

  // --- MOBILE IFRAME LOAD FIX ---
  // On mobile, PlayCanvas iframe sometimes doesn't load due to browser restrictions.
  // We'll force a re-mount of the iframe if it fails to load after a timeout.
  useEffect(() => {
    if (!isMobile) return;
    if (iframeLoaded) return;
    // If not loaded after 15s, try to reload the iframe (force re-mount)
    const reloadTimeout = setTimeout(() => {
      if (!iframeLoaded) {
        setIframeKey((k) => k + 1);
        setHomepageMessageSent(false);
        setLoadingTimedOut(false);
        setIframeLoaded(false);
      }
    }, 15000);
    return () => clearTimeout(reloadTimeout);
  }, [isMobile, iframeLoaded, iframeKey]);
  useEffect(() => {
    if (isMobile) {
      const handleFirstTouch = () => {
        document.body.style.overflow = "auto";
        document.removeEventListener("touchstart", handleFirstTouch);
      };
      document.addEventListener("touchstart", handleFirstTouch);
      return () => document.removeEventListener("touchstart", handleFirstTouch);
    }
  }, [isMobile]);
  // --- MOBILE IFRAME TAP TO LOAD ---
  // On some mobile browsers (especially iOS/Safari), iframes with 3D content will not render until user interacts.
  // Show a "Tap to Load 3D Preview" overlay on mobile if not loaded after 2s.
  useEffect(() => {
    if (!isMobile) {
      setShowTapToLoad(false);
      setShowMobileBlackScreenHelp(false);
      return;
    }
    if (iframeLoaded) {
      setShowTapToLoad(false);
      setShowMobileBlackScreenHelp(false);
      return;
    }
    const tapTimeout = setTimeout(() => {
      if (!iframeLoaded) setShowTapToLoad(true);
    }, 2000);

    // If after 5 seconds the iframe is still not loaded, show black screen help
    const blackScreenTimeout = setTimeout(() => {
      if (!iframeLoaded) setShowMobileBlackScreenHelp(true);
    }, 5000);

    return () => {
      clearTimeout(tapTimeout);
      clearTimeout(blackScreenTimeout);
    };
  }, [isMobile, iframeLoaded, iframeKey]);

  // We'll use the embed URL for both mobile and desktop for maximum compatibility.
  const playcanvasEmbedUrl = "https://playcanv.as/e/p/cW2W3Amn/";

  return (
    <section className="bg-[#2B2D2F] text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#F2F0E6]">Design Your</span>{" "}
            <span className="text-[#50C878]">Perfect Light</span>
          </motion.h2>

          <motion.p
            className="text-[#87CEAB] text-base max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="hidden md:inline">
              Follow our simple steps to create a lighting solution that
              perfectly matches your space and style.
            </span>
            <span className="inline md:hidden">
              Create your perfect lighting in minutes.
            </span>
          </motion.p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 items-center">
          {/* First Column (first on mobile): 3D Configurator Iframe */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#1e2022] w-full order-1"
          >
            <div
  className="aspect-square md:aspect-auto md:h-[500px]"
  style={{
    WebkitTransform: "translateZ(0)",
    transform: "translateZ(0)",
    willChange: "transform"
  }}
>
              {/* Loading overlay */}
              {!iframeLoaded && (
                <div
                  id="playcanvas-loader"
                  className="absolute inset-0 flex flex-col items-center justify-center bg-charleston-green z-10 overflow-hidden"
                >
                  {/* Background animated pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute bg-emerald-500 rounded-full"
                          style={{
                            width: `${Math.random() * 10 + 5}px`,
                            height: `${Math.random() * 10 + 5}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.5 + 0.25,
                            animation: `float ${
                              Math.random() * 10 + 10
                            }s infinite linear`,
                            animationDelay: `${Math.random() * 5}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="relative w-4/5 max-w-md aspect-square mb-8">
                    {/* Ceiling */}
                    <div className="absolute top-0 w-full h-8 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-t-lg shadow-md">
                      {/* Ceiling mount */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-3 bg-gray-600 rounded-md"></div>
                    </div>

                    {/* Multiple pendants hanging from ceiling */}
                    <div className="absolute top-0 left-1/4 w-1/5 aspect-square">
                      {/* Pendant cable */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-20 bg-gray-600 origin-top animate-sway-slow"></div>
                      {/* Pendant light */}
                      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full aspect-square rounded-full bg-gradient-to-br from-gray-700 to-gray-800 shadow-lg overflow-hidden animate-sway-slow">
                        <div className="absolute inset-2 rounded-full bg-emerald-500 opacity-20 animate-pulse-slow"></div>
                      </div>
                    </div>

                    {/* Main pendant being loaded */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 aspect-square">
                      {/* Pendant cable with loading animation */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-24 bg-gradient-to-b from-gray-600 to-gray-700 origin-top animate-sway-reverse-slow">
                        {/* Cable loading indicator */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                          <div className="w-full h-2 bg-emerald-500 opacity-40 animate-cable-loading"></div>
                        </div>
                      </div>

                      {/* Main pendant light */}
                      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full aspect-square rounded-full bg-gradient-to-br from-gray-700 to-gray-800 shadow-lg overflow-hidden origin-top animate-sway-reverse-slow">
                        {/* Pendant light effect */}
                        <div className="absolute inset-2 rounded-full bg-emerald-500 opacity-30 animate-pulse-slow"></div>

                        {/* Pendant detail */}
                        <div className="absolute inset-4 rounded-full border border-gray-600"></div>

                        {/* Loading indicator inside pendant */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-1/2 h-1/2 rounded-full border-2 border-transparent border-t-emerald-500 animate-spin"></div>
                        </div>
                      </div>
                    </div>

                    {/* Another pendant on the right */}
                    <div className="absolute top-0 right-1/4 w-1/5 aspect-square">
                      {/* Pendant cable */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-gray-600 origin-top animate-sway-medium"></div>
                      {/* Pendant light */}
                      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-full aspect-square rounded-full bg-gradient-to-br from-gray-700 to-gray-800 shadow-lg overflow-hidden animate-sway-medium">
                        <div className="absolute inset-2 rounded-full bg-emerald-500 opacity-20 animate-pulse-slow"></div>
                      </div>
                    </div>

                    {/* Glowing circle under main pendant */}
                    <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/4 rounded-full bg-emerald-500 opacity-10 animate-ping-slow blur-md"></div>

                    {/* Skeleton floor with reflection */}
                    <div className="absolute bottom-0 w-full h-1/6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-lg shadow-md">
                      {/* Floor reflection */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-emerald-500 opacity-20 blur-sm"></div>
                    </div>

                    {/* Skeleton controls with hover effect */}
                    <div className="absolute bottom-[-80px] w-full flex justify-center space-x-6">
                      {[1, 2, 3].map((num) => (
                        <div
                          key={num}
                          className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 shadow-md flex items-center justify-center group cursor-pointer"
                          style={{ animationDelay: `${num * 0.2}s` }}
                        >
                          <div className="w-12 h-12 rounded-full bg-gray-800 group-hover:bg-emerald-900 transition-colors duration-300 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-gray-700 group-hover:bg-emerald-800 transition-colors duration-300 animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center px-4 pb-4 relative z-10">
                    {/* Loading text with animated dots */}
                    <div className="h-8 flex items-center justify-center mb-3">
                      <div className="text-emerald-500 text-xl font-bold">
                        Loading 3D Preview
                      </div>
                      <div className="loading-dots ml-2">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm mb-2 animate-pulse">
                      {isMobile
                        ? "This may take a moment on mobile devices"
                        : "Preparing your LIMI experience"}
                    </div>

                    {/* Progress bar */}
                    <div className="mt-6 w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
                      <div className="h-full bg-emerald-500 animate-progress-indeterminate"></div>
                    </div>

                    {/* Mobile options */}
                    {isMobile && (
                      <div className="mt-4 space-y-2">
                        <p className="text-xs text-gray-400">
                          If the 3D preview doesn't load, try these options:
                        </p>
                        <button
                          onClick={() => {
                            setIframeLoaded(true);
                            setIframeError(false);
                            if (
                              !homepageMessageSent &&
                              iframeRef.current &&
                              iframeRef.current.contentWindow
                            ) {
                              try {
                                iframeRef.current.contentWindow.postMessage(
                                  "homepage",
                                  "*"
                                );
                                iframeRef.current.contentWindow.postMessage(
                                  "cable_0:product_2",
                                  "*"
                                );
                                setHomepageMessageSent(true);
                              } catch (error) {
                                // eslint-disable-next-line no-console
                                console.error(
                                  "Error sending message after button click:",
                                  error
                                );
                              }
                            }
                          }}
                          className="w-full px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                        >
                          Continue Anyway
                        </button>
                        <button
                          onClick={() => {
                            setIframeKey((k) => k + 1);
                            setHomepageMessageSent(false);
                            setLoadingTimedOut(false);
                            setIframeLoaded(false);
                            setIframeError(false);
                          }}
                          className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          Try Reload 3D Preview
                        </button>
                      </div>
                    )}
                    {/* Show error if iframe fails to load */}
                    {iframeError && (
                      <div className="mt-4 text-red-400 text-xs">
                        Failed to load 3D preview. Please try reloading or check
                        your connection.
                      </div>
                    )}
                    {/* Show mobile black screen help if on mobile and iframe is not loaded */}
                    {showMobileBlackScreenHelp && isMobile && !iframeLoaded && (
                      <div className="mt-4 text-yellow-300 text-xs bg-black/70 rounded-lg px-3 py-2">
                        <strong>Why am I seeing a black screen?</strong>
                        <br />
                        On some mobile browsers (especially iOS/Safari), 3D
                        previews in iframes may not display until you tap the
                        screen or interact with the page.
                        <br />
                        <span className="block mt-2">
                          <span className="font-semibold">What to do:</span>
                          <ul className="list-disc list-inside text-yellow-200 text-xs mt-1">
                            <li>
                              Tap the "Tap to Load 3D Preview" overlay if you
                              see it.
                            </li>
                            <li>
                              If you still see a black screen, try the "Continue
                              Anyway" or "Try Reload 3D Preview" buttons above.
                            </li>
                            <li>
                              If it still doesn't work, try reloading the page
                              or using a different browser.
                            </li>
                          </ul>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tap to load overlay for mobile (iOS/Safari fix) */}
              {showTapToLoad && !iframeLoaded && isMobile && (
                <div
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80"
                  onClick={() => {
                    setShowTapToLoad(false);
                    setIframeKey((k) => k + 1);
                    setIframeLoaded(false);
                    setIframeError(false);
                    setHomepageMessageSent(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="text-emerald-400 text-lg font-bold mb-2">
                    Tap to Load 3D Preview
                  </div>
                  <div className="text-gray-300 text-sm mb-4">
                    Some mobile browsers require a tap to start 3D content.
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-emerald-400 flex items-center justify-center animate-bounce">
                    <svg
                      className="w-8 h-8 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {/* Black screen help overlay for mobile if iframe is not loaded */}
              {showMobileBlackScreenHelp && isMobile && !iframeLoaded && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/90 px-4">
                  <div className="text-yellow-300 text-base font-semibold mb-2 text-center">
                    Why am I seeing a black screen?
                  </div>
                  <div className="text-yellow-100 text-sm mb-4 text-center">
                    On some mobile browsers (especially iOS/Safari), 3D previews
                    in iframes may not display until you tap the screen or
                    interact with the page.
                  </div>
                  <div className="text-yellow-200 text-xs mb-4 text-center">
                    <span className="font-semibold">What to do:</span>
                    <ul
                      className="list-disc list-inside text-yellow-200 text-xs mt-1 text-left mx-auto"
                      style={{ maxWidth: 320 }}
                    >
                      <li>
                        Tap the "Tap to Load 3D Preview" overlay if you see it.
                      </li>
                      <li>
                        If you still see a black screen, try the "Continue
                        Anyway" or "Try Reload 3D Preview" buttons below.
                      </li>
                      <li>
                        If it still doesn't work, try reloading the page or
                        using a different browser.
                      </li>
                    </ul>
                  </div>
                  <div className="w-full max-w-xs space-y-2">
                    <button
                      onClick={() => {
                        setIframeLoaded(true);
                        setIframeError(false);
                        if (
                          !homepageMessageSent &&
                          iframeRef.current &&
                          iframeRef.current.contentWindow
                        ) {
                          try {
                            iframeRef.current.contentWindow.postMessage(
                              "homepage",
                              "*"
                            );
                            iframeRef.current.contentWindow.postMessage(
                              "cable_0:product_2",
                              "*"
                            );
                            setHomepageMessageSent(true);
                          } catch (error) {
                            // eslint-disable-next-line no-console
                            console.error(
                              "Error sending message after button click:",
                              error
                            );
                          }
                        }
                      }}
                      className="w-full px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                      Continue Anyway
                    </button>
                    <button
                      onClick={() => {
                        setIframeKey((k) => k + 1);
                        setHomepageMessageSent(false);
                        setLoadingTimedOut(false);
                        setIframeLoaded(false);
                        setIframeError(false);
                      }}
                      className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Try Reload 3D Preview
                    </button>
                  </div>
                </div>
              )}

              {/* 3D Viewer Iframe */}
              <iframe
              key={iframeKey}
              ref={iframeRef}
              src={playcanvasEmbedUrl}
              className="w-full h-full border-0 bg-transparent"
              title="LIMI 3D Configurator"
              allow="accelerometer; autoplay; camera; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              importance="high"
              loading="eager"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock"
              onLoad={() => {
                // setIframeLoaded(true);
                setIframeError(false);
                // Set initial quality for desktop
                if (!isMobile && iframeRef.current && iframeRef.current.contentWindow) {
                  iframeRef.current.contentWindow.postMessage("highdis", "*");
                }
              }}
              onError={() => {
                setIframeError(true);
                setIframeLoaded(false);
              }}
              style={{
                minHeight: isMobile ? 320 : 500,
                background: "transparent"
              }}
            ></iframe>

              {/* Interaction hint */}
              <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs flex items-center z-10 animate-pulse">
                <svg
                  className="w-3 h-3 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 15L19 19M19 19V15M19 19H15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 9L5 5M5 5V9M5 5H9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Drag to rotate</span>
              </div>
            </div>
          </motion.div>

          {/* Second Column (second on mobile): Onboarding Wizard */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-2"
          >
            <OnboardingWizard
              onComplete={handleComplete}
              onStepChange={handleStepChange}
              lightType={currentType}
            />
          </motion.div>
        </div>

        {/* Description Text - More compact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="max-w-3xl mx-auto bg-[#3a3d42]/50 rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-2 text-[#87CEAB]">
              Why Use Our Configurator?
            </h3>
            <p className="text-[#F2F0E6] text-sm">
              The LIMI 3D configurator allows you to visualize and customize
              your lighting solution in real-time, making it easy to experiment
              with different styles until you find the perfect lighting for your
              space.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
