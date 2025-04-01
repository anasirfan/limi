'use client';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * LightingScene component that displays an interactive scene with day/night modes and controllable lights
 * 
 * @param {Object} props - Component props
 * @param {string|null} props.userType - The type of user (customer, distributor, or null)
 * @returns {JSX.Element|null} The LightingScene component or null if not visible
 */
const LightingScene = ({ userType }) => {
  // Register ScrollTrigger plugin
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // State for controlling day/night mode and lights
  const [isDayMode, setIsDayMode] = useState(false);
  const [isTopLightOn, setIsTopLightOn] = useState(true);
  const [isMiddleLightOn, setIsMiddleLightOn] = useState(true);
  
  // Refs for GSAP animations
  const sceneRef = useRef(null);
  const topLightRef = useRef(null);
  const middleLightRef = useRef(null);
  const buttonRef = useRef(null);
  const headerRef = useRef(null);
  const clipPathRef = useRef(null);

  // Setup scroll animation for triangular clip path
  useEffect(() => {
    if (clipPathRef.current && headerRef.current) {
      // Set initial state - hidden with triangular clip path
      gsap.set(clipPathRef.current, {
        clipPath: 'polygon(0% 0%, 100% 30%, 100% 100%, 0% 100%)',
        opacity: 0,
        y: 50 // Start slightly below final position
      });

      // Create animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: 'top center',
          end: 'top 20%',
          scrub: true
        }
      });

      // Add animations to timeline
      tl.to(clipPathRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        opacity: 1,
        y: 0,
        ease: 'power2.out'
      });
    }
  }, []);

  // GSAP animations for smooth transitions
  useEffect(() => {
    // Animate scene based on day/night mode
    if (sceneRef.current) {
      gsap.to(sceneRef.current, {
        backgroundImage: `url(/images/configImages/${isDayMode ? 'day' : 'night'}.jpg)`,
        duration: 0.8,
        ease: 'power2.out'
      });
    }

    // Animate button based on day/night mode
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        backgroundColor: isDayMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
        color: isDayMode ? 'white' : 'black',
        duration: 0.8,
        ease: 'power2.out'
      });
    }
  }, [isDayMode]);

  // Animate top light
  /**
   * Updates the top light's appearance and animation based on its on/off state
   * and the current day/night mode.
   */
  useEffect(() => {
    if (topLightRef.current) {
      // Update the light image based on day/night mode
      topLightRef.current.style.backgroundImage = `url(/images/configImages/${isDayMode ? 'day' : 'night'}_ceiling.jpg)`;
      
      gsap.to(topLightRef.current, {
        opacity: isTopLightOn ? 0.4 : 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }, [isTopLightOn, isDayMode]);

  // Animate middle light
  useEffect(() => {
    if (middleLightRef.current) {
      // Update the light image based on day/night mode
      middleLightRef.current.style.backgroundImage = `url(/images/configImages/${isDayMode ? 'day' : 'night'}_wall.jpg)`;
      
      gsap.to(middleLightRef.current, {
        opacity: isMiddleLightOn ? 0.4 : 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }, [isMiddleLightOn, isDayMode]);

  return (
    <div 
      id="lighting"
      ref={sceneRef}
      className="relative h-[90vh] w-full overflow-hidden bg-black"
      style={{
        backgroundImage: `url(/images/configImages/${isDayMode ? 'day' : 'night'}.jpg)`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 0.8s ease'
      }}
    >
      {/* Clip path container for triangular animation */}
      <div 
        ref={clipPathRef}
        className="absolute top-0 left-0 w-full h-full z-10"
      >
        {/* Large themed heading at the top */}
        <div 
          ref={headerRef}
          className="w-full bg-gradient-to-r from-[#2d4133] to-[#1a2a20] py-4 sm:py-6 px-6 sm:px-10 z-50"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">
            Visualize Your Space
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white text-center mt-2 max-w-3xl mx-auto">
            Experience our lighting solutions in your own environment. Use the controls below to toggle day/night modes and individual lights to find your perfect ambiance.
          </p>
        </div>
      </div>

      <div 
        ref={topLightRef}
        className="absolute inset-0 mix-blend-screen"
        style={{
          backgroundImage: `url(/images/configImages/${isDayMode ? 'day' : 'night'}_ceiling.jpg)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0
        }}
      />

      <div 
        ref={middleLightRef}
        className="absolute inset-0 mix-blend-screen"
        style={{
          backgroundImage: `url(/images/configImages/${isDayMode ? 'day' : 'night'}_wall.jpg)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0
        }}
      />

      <div className="absolute top-4 sm:top-6 md:top-10 left-4 sm:left-6 md:left-10 z-50">
        <div className="flex flex-col items-start">
          <h3 className="text-white text-xs sm:text-sm font-semibold tracking-widest uppercase mb-1 sm:mb-2">
            Layers of Light
            <div className="w-12 sm:w-16 h-0.5 bg-yellow-400 mt-1"></div>
          </h3>
 
          <button className=" sm:mt-6 bg-white text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center text-xs sm:text-sm">
            Explore More Collections
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="max-sm:right-0 absolute bottom-8 sm:bottom-12 md:bottom-16 right-4 sm:right-6 md:right-10 flex flex-col max-sm:flex-row max-sm:space-y-0 max-sm:space-x-4 max-sm:justify-between max-sm:bg-[#2d4133] max-sm:shadow-glass max-sm:p-2 max-sm:w-full sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-8 items-center z-50 transform-none sm:-translate-x-1/2">
        {/* Vanity Light Toggle */}
        <div className="flex flex-col items-center">
          <div 
            className="w-12 sm:w-16 h-6 sm:h-8 bg-black rounded-full p-1 relative cursor-pointer"
            onClick={() => {
              setIsMiddleLightOn(!isMiddleLightOn);
            }}
          >
            <div 
              className={`w-4 sm:w-6 h-4 sm:h-6 bg-white rounded-full absolute transition-all duration-300 ${
                isMiddleLightOn ? 'right-1' : 'left-1'
              }`}
            />
          </div>
          <span className="text-white text-xs sm:text-sm mt-1 sm:mt-2">Wall Pendant</span>
        </div>

        {/* Sconce/Toe Kick Lighting Toggle */}
        <div className="flex flex-col items-center">
          <div 
            className="w-12 sm:w-16 h-6 sm:h-8 bg-black rounded-full p-1 relative cursor-pointer"
            onClick={() => {
              setIsTopLightOn(!isTopLightOn);
            }}
          >
            <div 
              className={`w-4 sm:w-6 h-4 sm:h-6 bg-white rounded-full absolute transition-all duration-300 ${
                isTopLightOn ? 'right-1' : 'left-1'
              }`}
            />
          </div>
          <span className="text-white text-xs sm:text-sm mt-1 sm:mt-2">Ceiling Pendant</span>
        </div>

        {/* Day/Night Toggle */}
        <div className="flex flex-col items-center">
          <div 
            className="w-12 sm:w-16 h-6 sm:h-8 bg-black rounded-full p-1 relative cursor-pointer"
            onClick={() => {
              setIsDayMode(!isDayMode);
            }}
          >
            <div 
              className={`w-4 sm:w-6 h-4 sm:h-6 bg-white rounded-full absolute transition-all duration-300 ${
                isDayMode ? 'right-1' : 'left-1'
              }`}
            />
          </div>
          <span className="text-white text-xs sm:text-sm mt-1 sm:mt-2">Night / Day</span>
        </div>
      </div>
    </div>
  );
};

export default LightingScene;
