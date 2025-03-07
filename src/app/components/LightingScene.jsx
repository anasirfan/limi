'use client';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * LightingScene component that displays an interactive scene with day/night modes and controllable lights
 * 
 * @returns {JSX.Element} The LightingScene component
 */
const LightingScene = () => {
  // State for controlling day/night mode and lights
  const [isDayMode, setIsDayMode] = useState(true);
  const [isTopLightOn, setIsTopLightOn] = useState(false);
  const [isMiddleLightOn, setIsMiddleLightOn] = useState(false);
  
  // Refs for GSAP animations
  const sceneRef = useRef(null);
  const topLightRef = useRef(null);
  const middleLightRef = useRef(null);
  const buttonRef = useRef(null);

  // GSAP animations for smooth transitions
  useEffect(() => {
    console.log("Day/Night Mode:", isDayMode);
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
    console.log("Top Light:", isTopLightOn);
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
    console.log("Middle Light:", isMiddleLightOn);
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
      {/* Top Light Layer */}
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

      {/* Middle Light Layer */}
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

      {/* Headings */}
      <div className="absolute top-4 sm:top-6 md:top-10 left-4 sm:left-6 md:left-10 z-50">
        <div className="flex flex-col items-start">
          <h3 className="text-white text-xs sm:text-sm font-semibold tracking-widest uppercase mb-1 sm:mb-2">
            Layers of Light
            <div className="w-12 sm:w-16 h-0.5 bg-yellow-400 mt-1"></div>
          </h3>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light">Adani</h2>
          <button className="mt-4 sm:mt-6 bg-white text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center text-xs sm:text-sm">
            Explore More Collections
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 right-4 sm:right-6 md:right-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-8 items-center z-50 transform-none sm:-translate-x-1/2">
        {/* Vanity Light Toggle */}
        <div className="flex flex-col items-center">
          <div 
            className="w-12 sm:w-16 h-6 sm:h-8 bg-black rounded-full p-1 relative cursor-pointer"
            onClick={() => {
              console.log("Vanity Light Clicked");
              setIsMiddleLightOn(!isMiddleLightOn);
            }}
          >
            <div 
              className={`w-4 sm:w-6 h-4 sm:h-6 bg-white rounded-full absolute transition-all duration-300 ${
                isMiddleLightOn ? 'right-1' : 'left-1'
              }`}
            />
          </div>
          <span className="text-white text-xs sm:text-sm mt-1 sm:mt-2">Vanity</span>
        </div>

        {/* Sconce/Toe Kick Lighting Toggle */}
        <div className="flex flex-col items-center">
          <div 
            className="w-12 sm:w-16 h-6 sm:h-8 bg-black rounded-full p-1 relative cursor-pointer"
            onClick={() => {
              console.log("Top Light Clicked");
              setIsTopLightOn(!isTopLightOn);
            }}
          >
            <div 
              className={`w-4 sm:w-6 h-4 sm:h-6 bg-white rounded-full absolute transition-all duration-300 ${
                isTopLightOn ? 'right-1' : 'left-1'
              }`}
            />
          </div>
          <span className="text-white text-xs sm:text-sm mt-1 sm:mt-2">Kick Lighting</span>
        </div>

        {/* Day/Night Toggle */}
        <div className="flex flex-col items-center">
          <div 
            className="w-12 sm:w-16 h-6 sm:h-8 bg-black rounded-full p-1 relative cursor-pointer"
            onClick={() => {
              console.log("Day/Night Clicked");
              setIsDayMode(!isDayMode);
            }}
          >
            <div 
              className={`w-4 sm:w-6 h-4 sm:h-6 bg-white rounded-full absolute transition-all duration-300 ${
                isDayMode ? 'right-1' : 'left-1'
              }`}
            />
          </div>
          <span className="text-white text-xs sm:text-sm mt-1 sm:mt-2">Day / Night</span>
        </div>
      </div>

      {/* Explore Now Button - Commented out as per user's last edit */}
      {/* <div className="absolute inset-0 flex items-center justify-center">
        <button 
          ref={buttonRef}
          className="px-8 py-4 text-xl font-bold rounded-full bg-black text-white hover:scale-105 transition-transform duration-300"
        >
          Explore Now
        </button>
      </div> */}
    </div>
  );
};

export default LightingScene;
