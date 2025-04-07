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
  const [isBothLightsOn, setIsBothLightsOn] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Refs for GSAP animations
  const sceneRef = useRef(null);
  const buttonRef = useRef(null);
  const headerRef = useRef(null);
  const clipPathRef = useRef(null);
  
  // Refs for all image layers
  const dayRef = useRef(null);
  const dayCeilingRef = useRef(null);
  const dayWallRef = useRef(null);
  const dayBothRef = useRef(null);
  const nightRef = useRef(null);
  const nightCeilingRef = useRef(null);
  const nightWallRef = useRef(null);
  const nightBothRef = useRef(null);
  
  // Mobile image refs
  const dayMobileRef = useRef(null);
  const dayCeilingMobileRef = useRef(null);
  const dayWallMobileRef = useRef(null);
  const dayBothMobileRef = useRef(null);
  const nightMobileRef = useRef(null);
  const nightCeilingMobileRef = useRef(null);
  const nightWallMobileRef = useRef(null);
  const nightBothMobileRef = useRef(null);

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
    // We'll handle scene animation in a separate useEffect that considers all light states

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

  // Check if the device is mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Standard mobile breakpoint
    };
    
    // Check initially
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Update both lights state when individual lights change
  useEffect(() => {
    setIsBothLightsOn(isTopLightOn && isMiddleLightOn);
  }, [isTopLightOn, isMiddleLightOn]);

  // Update image visibility based on current state
  useEffect(() => {
    // Get all refs in a single array
    const allRefs = [
      dayRef, dayCeilingRef, dayWallRef, dayBothRef, 
      nightRef, nightCeilingRef, nightWallRef, nightBothRef,
      dayMobileRef, dayCeilingMobileRef, dayWallMobileRef, dayBothMobileRef,
      nightMobileRef, nightCeilingMobileRef, nightWallMobileRef, nightBothMobileRef
    ];
    
    // Determine which image to show
    let targetRef;
    
    if (isMobile) {
      // Mobile images
      if (isDayMode) {
        if (isTopLightOn && isMiddleLightOn) targetRef = dayBothMobileRef;
        else if (isTopLightOn) targetRef = dayCeilingMobileRef;
        else if (isMiddleLightOn) targetRef = dayWallMobileRef;
        else targetRef = dayMobileRef;
      } else {
        if (isTopLightOn && isMiddleLightOn) targetRef = nightBothMobileRef;
        else if (isTopLightOn) targetRef = nightCeilingMobileRef;
        else if (isMiddleLightOn) targetRef = nightWallMobileRef;
        else targetRef = nightMobileRef;
      }
    } else {
      // Desktop images
      if (isDayMode) {
        if (isTopLightOn && isMiddleLightOn) targetRef = dayBothRef;
        else if (isTopLightOn) targetRef = dayCeilingRef;
        else if (isMiddleLightOn) targetRef = dayWallRef;
        else targetRef = dayRef;
      } else {
        if (isTopLightOn && isMiddleLightOn) targetRef = nightBothRef;
        else if (isTopLightOn) targetRef = nightCeilingRef;
        else if (isMiddleLightOn) targetRef = nightWallRef;
        else targetRef = nightRef;
      }
    }
    
    // Create a single timeline for parallel animations
    const tl = gsap.timeline();
    
    // Find the currently visible image
    const currentVisibleRef = allRefs.find(ref => ref.current && getComputedStyle(ref.current).opacity > 0.5);
    
    // Parallel animations with enhanced blending
    allRefs.forEach(ref => {
      if (ref.current) {
        // Ensure consistent class names without blend modes
        ref.current.className = 'absolute inset-0';
        
        if (ref === targetRef) {
          // This is our target image - fade it in with enhanced smoothness
          tl.to(ref.current, {
            opacity: 1,
            duration: 1.5,
            ease: "sine.inOut"
          }, 0); // Start at position 0 (simultaneously)
        } else {
          // This is not our target - fade it out
          // If it's the currently visible one, use the same duration as the fade-in
          const duration = (ref === currentVisibleRef) ? 1.5 : 0.8;
          tl.to(ref.current, {
            opacity: 0,
            duration: duration,
            ease: "sine.inOut"
          }, 0); // Start at position 0 (simultaneously)
        }
      }
    });
  }, [isDayMode, isTopLightOn, isMiddleLightOn, isMobile]);

  return (
    <div 
      id="lighting"
      ref={sceneRef}
      className="relative h-[90vh] w-full overflow-hidden bg-black py-12"
      style={{
        transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
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
          className="w-full bg-gradient-to-r from-[#2d4133] to-[#1a2a20] py-4 sm:py-3 px-6 sm:px-5 z-50"
        >
          <h2 className="text-2xl sm:text-xl md:text-xl font-bold text-white text-center">
            Visualize Your Space
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white text-center mt-2 max-w-3xl md:max-w-4xl mx-auto">
          Discover our lighting solutions within your own space. Adjust the settings below to switch between day and night modes and to control individual lights, helping you create the ideal atmosphere. </p>
        </div>
      </div>

      {/* Preloaded desktop images */}
      <div 
        ref={dayRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/images/configImages/day.jpg)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: !isDayMode || isTopLightOn || isMiddleLightOn || isMobile ? 0 : 1,
          transition: 'opacity 1.5s cubic-bezier(0.445, 0.05, 0.55, 0.95)' // CSS transition as backup using sine.inOut equivalent
        }}
      />
      <div 
        ref={dayCeilingRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/images/configImages/day_ceiling.jpg)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: !isDayMode || !isTopLightOn || isMiddleLightOn || isMobile ? 0 : 1
        }}
      />
      <div 
        ref={dayWallRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/images/configImages/day_wall.jpg)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: !isDayMode || isTopLightOn || !isMiddleLightOn || isMobile ? 0 : 1
        }}
      />
      <div 
        ref={dayBothRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/images/configImages/day_both.jpg)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: !isDayMode || !isTopLightOn || !isMiddleLightOn || isMobile ? 0 : 1
        }}
      />
      <div 
        ref={nightRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/images/configImages/night.jpg)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: isDayMode || isTopLightOn || isMiddleLightOn || isMobile ? 0 : 1
        }}
      />
      <div 
        ref={nightCeilingRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/images/configImages/night_ceiling.jpg)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: isDayMode || !isTopLightOn || isMiddleLightOn || isMobile ? 0 : 1
        }}
      />
      <div 
        ref={nightWallRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/images/configImages/night_wall.jpg)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: isDayMode || isTopLightOn || !isMiddleLightOn || isMobile ? 0 : 1
        }}
      />
      <div 
        ref={nightBothRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/images/configImages/night_both.jpg)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: isDayMode || !isTopLightOn || !isMiddleLightOn || isMobile ? 0 : 1
        }}
      />
      
      {/* Preloaded mobile images */}
      <div 
        ref={dayMobileRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/images/configImages/day-mob.jpg)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: !isDayMode || isTopLightOn || isMiddleLightOn || !isMobile ? 0 : 1
        }}
      />
      <div 
        ref={dayCeilingMobileRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/images/configImages/day_ceiling-mob.jpg)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: !isDayMode || !isTopLightOn || isMiddleLightOn || !isMobile ? 0 : 1
        }}
      />
      <div 
        ref={dayWallMobileRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/images/configImages/day_wall-mob.jpg)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: !isDayMode || isTopLightOn || !isMiddleLightOn || !isMobile ? 0 : 1
        }}
      />
      <div 
        ref={dayBothMobileRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/images/configImages/day_both-mob.jpg)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: !isDayMode || !isTopLightOn || !isMiddleLightOn || !isMobile ? 0 : 1
        }}
      />
      <div 
        ref={nightMobileRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/images/configImages/night-mob.jpg)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: isDayMode || isTopLightOn || isMiddleLightOn || !isMobile ? 0 : 1
        }}
      />
      <div 
        ref={nightCeilingMobileRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/images/configImages/night_ceiling-mob.jpg)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: isDayMode || !isTopLightOn || isMiddleLightOn || !isMobile ? 0 : 1
        }}
      />
      <div 
        ref={nightWallMobileRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/images/configImages/night_wall-mob.jpg)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: isDayMode || isTopLightOn || !isMiddleLightOn || !isMobile ? 0 : 1
        }}
      />
      <div 
        ref={nightBothMobileRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/images/configImages/night_both-mob.jpg)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: isDayMode || !isTopLightOn || !isMiddleLightOn || !isMobile ? 0 : 1
        }}
      />

      <div className="absolute top-4  md:top-10 left-4 sm:left-6 md:left-10 z-50 max-sm:bottom-32 max-sm:top-auto">
        <div className="flex flex-col items-start max-sm:flex-row max-sm:space-x-4 max-sm:justify-center">
          <h3 className="text-white text-xs sm:text-sm font-semibold tracking-widest uppercase mb-1 sm:mb-2">
            Layers of Light
            <div className="w-12 sm:w-16 h-0.5 bg-yellow-400 mt-1"></div>
          </h3>
 
          {/* <button className=" sm:mt-0 bg-white text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center text-xs sm:text-sm">
            Explore More Collections
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button> */}
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
