"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SparklesCore from "./SparklesCore";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * LightingStyleCompare component shows different lighting modes with a comparison slider
 * that changes based on scroll position or user interaction.
 */
const LightingStyleCompare = () => {
  // State for tracking current mode and slider position
  const [currentMode, setCurrentMode] = useState("relax");
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Refs for animation and interaction
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const compareContainerRef = useRef(null);
  const sliderRef = useRef(null);
  const handleRef = useRef(null);
  const modeTextRef = useRef(null);

  // Lighting modes data
  const lightingModes = [
    {
      id: "relax",
      name: "Relax",
      description: "Warm, soft lighting for a cozy atmosphere",
      image: "/images/presets/relax.jpg",
      mobileImage: "/images/presets/relax_mob.jpg",
      color: "#4ade80" // Light salmon color
    },
    {
      id: "party",
      name: "Party",
      description: "Vibrant, dynamic lighting to energize any space",
      image: "/images/presets/party.jpg",
      mobileImage: "/images/presets/party_mob.jpg",
      color: "#4ade80" // Orchid color
    },
    {
      id: "ambient",
      name: "Ambient",
      description: "Balanced, natural lighting for everyday comfort",
      image: "/images/presets/ambient.jpg",
      mobileImage: "/images/presets/ambient_mob.jpg",
      color: "#4ade80" // Emerald green
    }
  ];

  // Find current and next mode
  const currentModeData = lightingModes.find(mode => mode.id === currentMode);
  const nextModeIndex = (lightingModes.findIndex(mode => mode.id === currentMode) + 1) % lightingModes.length;
  const nextModeData = lightingModes[nextModeIndex];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Set up scroll-based animations
  useEffect(() => {
    if (!sectionRef.current) return;

    // Create scroll trigger for the section
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top -10%",
      end: "bottom 80%",
      pin: compareContainerRef.current,
      pinSpacing: true,
      onUpdate: self => {
        // Change mode based on scroll progress
        const progress = self.progress;
        if (progress < 0.33) {
          setCurrentMode("relax");
        } else if (progress < 0.66) {
          setCurrentMode("party");
        } else {
          setCurrentMode("ambient");
        }
        
        // Update slider position based on scroll within each section
        const sectionProgress = progress % 0.33 * 3;
        const newPosition = Math.min(100, Math.max(0, sectionProgress * 100));
        if (!isDragging) {
          setSliderPosition(newPosition);
        }
      }
    });

    // Animate heading and subheading
    gsap.fromTo(
      [headingRef.current, subheadingRef.current],
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      scrollTrigger.kill();
    };
  }, [isDragging]);

  // Handle mouse/touch events for slider
  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateSliderPosition(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      updateSliderPosition(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateSliderPosition = (e) => {
    if (!compareContainerRef.current) return;
    
    const rect = compareContainerRef.current.getBoundingClientRect();
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const position = ((x - rect.left) / rect.width) * 100;
    
    // Constrain position between 0 and 100
    const constrainedPosition = Math.min(100, Math.max(0, position));
    setSliderPosition(constrainedPosition);
  };

  // Handle mode text animation
  useEffect(() => {
    if (modeTextRef.current) {
      gsap.fromTo(
        modeTextRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [currentMode]);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-[#232323] text-white overflow-hidden"
      id="lighting-style"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2 
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Choose your <span className="text-[#4ade80] drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]">Lighting Style</span>.
          </h2>
          <p 
            ref={subheadingRef}
            className="text-xl md:text-2xl text-gray-300"
          >
            Relax. Party. Ambient.
          </p>
        </div>
        
        <div 
          ref={compareContainerRef}
          className="relative mx-auto max-w-6xl aspect-[16/9] md:aspect-video rounded-xl overflow-hidden shadow-2xl"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          {/* First image (current mode) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={isMobile ? currentModeData.mobileImage : currentModeData.image}
              alt={`${currentModeData.name} lighting mode`}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Second image (next mode) with clip-path */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ 
              clipPath: `inset(0 0 0 ${sliderPosition}%)` 
            }}
          >
            <Image
              src={isMobile ? nextModeData.mobileImage : nextModeData.image}
              alt={`${nextModeData.name} lighting mode`}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Simple divider */}
          <div 
            ref={handleRef}
            className="absolute top-0 bottom-0 w-0.5 bg-[#4ade80] cursor-ew-resize z-10"
            style={{ 
              left: `${sliderPosition}%`,
              transform: 'translateX(-50%)',
              height: '100%',
              boxShadow: '0 0 8px rgba(74, 222, 128, 0.8)'
            }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center z-20 bg-[#4ade80] shadow-[0_0_10px_rgba(74,222,128,0.8)]">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#232323" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              >
                <path d="M18 8L22 12L18 16"></path>
                <path d="M6 8L2 12L6 16"></path>
                <line x1="2" y1="12" x2="22" y2="12"></line>
              </svg>
            </div>
          </div>
          
          {/* Mode indicator */}
          <div 
            ref={modeTextRef}
            className="absolute bottom-6 left-6 bg-black/70 px-4 py-2 rounded-lg"
            key={currentMode} // Force re-render for animation
          >
            <span 
              className="text-lg font-bold text-[#4ade80]"
            >
              {currentModeData.name} Mode
            </span>
            <p className="text-sm text-gray-300">{currentModeData.description}</p>
          </div>
          
          {/* Instructions */}
          <div className="absolute top-6 right-6 bg-black/70 px-3 py-1 rounded-lg text-xs text-gray-300">
            Drag or scroll to compare
          </div>
        </div>
        
        {/* Mode selector buttons */}
        <div className="flex justify-center mt-8 gap-4">
          {lightingModes.map((mode) => (
            <button
              key={mode.id}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                currentMode === mode.id 
                  ? 'bg-[#4ade80] text-[#232323] font-bold scale-105' 
                  : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#2a2a2a]'
              }`}
              onClick={() => setCurrentMode(mode.id)}
              style={currentMode === mode.id ? { boxShadow: '0 0 15px rgba(74, 222, 128, 0.6)' } : {}}
            >
              {mode.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Spacer for pinned content */}
      <div className="h-screen md:h-[180vh]"></div>
    </section>
  );
};

export default LightingStyleCompare;
