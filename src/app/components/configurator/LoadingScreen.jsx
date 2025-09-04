"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LoadingScreen = ({ isVisible, onHide }) => {
  const loadingRef = useRef(null);
  const diamondRef = useRef(null);
  const bulbRef = useRef(null);
  const animationRefs = useRef({});

  useEffect(() => {
    console.log("🔄 LoadingScreen useEffect triggered, isVisible:", isVisible);
    
    if (!loadingRef.current || !diamondRef.current || !bulbRef.current) {
      console.log("❌ Missing refs:", {
        loadingRef: !!loadingRef.current,
        diamondRef: !!diamondRef.current,
        bulbRef: !!bulbRef.current
      });
      return;
    }

    const diamond = diamondRef.current;
    const bulb = bulbRef.current;
    const container = loadingRef.current;

    if (isVisible) {
      console.log("✅ Showing loading screen");
      // Show loading screen
      gsap.set(container, { display: "flex", opacity: 1 });
      
      // Reset diamond stroke
      const diamondPath = diamond.querySelector("path");
      const pathLength = diamondPath.getTotalLength();
      gsap.set(diamondPath, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Animate diamond drawing
      animationRefs.current.diamondAnimation = gsap.to(diamondPath, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
      });

      // Animate bulb pulsing (continuous loop)
      animationRefs.current.bulbAnimation = gsap.to(bulb, {
        scale: 1.3,
        opacity: 0.6,
        duration: 1,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Add glow effect to bulb
      animationRefs.current.bulbGlow = gsap.to(bulb, {
        filter: "drop-shadow(0 0 20px #50C878) drop-shadow(0 0 40px #50C878)",
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });
    } else {
      console.log("❌ Hiding loading screen");
      // Hide loading screen
      if (animationRefs.current.diamondAnimation) {
        animationRefs.current.diamondAnimation.kill();
      }
      if (animationRefs.current.bulbAnimation) {
        animationRefs.current.bulbAnimation.kill();
      }
      if (animationRefs.current.bulbGlow) {
        animationRefs.current.bulbGlow.kill();
      }

      // Fade out animation
      gsap.to(container, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(container, { display: "none" });
          if (onHide) onHide();
        },
      });
    }

    // Cleanup function
    return () => {
      Object.values(animationRefs.current).forEach(animation => {
        if (animation) animation.kill();
      });
    };
  }, [isVisible, onHide]);

  return (
    <div
      ref={loadingRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm"
      style={{ 
        display: isVisible ? "flex" : "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh"
      }}
    >
      <div className="relative">
        {/* Diamond outline (rotated square) */}
        <svg
          ref={diamondRef}
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="absolute inset-0"
        >
          <path
            d="M100 20 L180 100 L100 180 L20 100 Z"
            fill="none"
            stroke="#50C878"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Glowing bulb in center */}
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="relative z-10"
        >
          <circle
            ref={bulbRef}
            cx="100"
            cy="100"
            r="25"
            fill="#50C878"
            className="opacity-80"
          />
          {/* Inner bulb highlight */}
          <circle
            cx="100"
            cy="100"
            r="15"
            fill="#87CEAB"
            className="opacity-60"
          />
          {/* Bulb core */}
          <circle
            cx="100"
            cy="100"
            r="8"
            fill="#FFFFFF"
            className="opacity-90"
          />
        </svg>

        {/* Loading text */}
        <div className="absolute top-full mt-8 left-1/2 transform -translate-x-1/2">
          <p className="text-white text-lg font-medium tracking-wider">
            Loading Experience...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
