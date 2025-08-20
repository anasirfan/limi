'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const LoadingScreen10 = ({ onComplete, listenForAppReady }) => {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);
  const circleRefs = useRef([]);
  const limiTextRef = useRef(null);
  const progressBarRef = useRef(null);
  const loadingTextRef = useRef(null);
  const footerTextRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Circles start filling
    circleRefs.current.forEach((circle, index) => {
      if (circle) {
        const circumference = 2 * Math.PI * 95; // radius = 95
        gsap.set(circle, {
          strokeDasharray: circumference,
          strokeDashoffset: circumference
        });
        
        tl.to(circle, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.out",
          delay: index * 0.3
        }, 0);
      }
    });

    // 2. LIMI text fades + scales in
    tl.fromTo(limiTextRef.current, {
      opacity: 0,
      scale: 0.8
    }, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "back.out(1.7)"
    }, 0.5);

    // Add glow effect to LIMI text
    tl.to(limiTextRef.current, {
      textShadow: "0 0 20px #d4af37, 0 0 40px #d4af37",
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
    }, 1.5);

    // 3. Pulsing dots animation (infinite loop)
    tl.fromTo(progressBarRef.current.children, {
      scale: 0.8,
      opacity: 0.5
    }, {
      scale: 1.2,
      opacity: 1,
      duration: 1.5,
      ease: "power2.inOut",
      stagger: 0.2,
      repeat: -1,
      yoyo: true
    }, 1);

    // 4. Loading text fades in
    tl.fromTo(loadingTextRef.current, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, 2);

    // 5. Footer text fades/slides in last
    tl.fromTo(footerTextRef.current, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, 3.5);

    // Listen for app:ready message instead of timer
    if (listenForAppReady) {
      const cleanup = listenForAppReady((data, event) => {
        console.log('Received app:ready message:', data);
        onComplete?.();
        setTimeout(() => setIsVisible(false), 100);
      });
      
      // Cleanup listener when component unmounts
      return () => {
        tl.kill();
        cleanup();
      };
    } else {
      // Fallback: Complete loading after 4 seconds if no message listener
      tl.call(() => {
        setTimeout(() => {
          onComplete?.();
          setTimeout(() => setIsVisible(false), 100);
        }, 500);
      }, [], 4);
    }

    return () => {
      tl.kill();
    };
  }, [onComplete, listenForAppReady]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{
            background: '#FAF4E9'
          }}
        >
          {/* Main logo container */}
          <div className="relative mb-16">
            {/* Multiple circular strokes */}
            <div className="w-48 h-48">
              <svg className="w-full h-full" viewBox="0 0 200 200">
                {/* Outer circle */}
                <circle
                  ref={el => circleRefs.current[0] = el}
                  cx="100"
                  cy="100"
                  r="95"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.8"
                />
                
                {/* Middle circle */}
                <circle
                  ref={el => circleRefs.current[1] = el}
                  cx="100"
                  cy="100"
                  r="75"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                
                {/* Inner circle */}
                <circle
                  ref={el => circleRefs.current[2] = el}
                  cx="100"
                  cy="100"
                  r="55"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="1"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </svg>
            </div>

            {/* LIMI text in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h1
                ref={limiTextRef}
                className="text-6xl font-light tracking-wider"
                style={{ 
                  color: '#d4af37',
                  fontFamily: 'serif',
                  opacity: 0
                }}
              >
                LIMI
              </h1>
            </div>
          </div>

          {/* Pulsing dots */}
          <div ref={progressBarRef} className="flex space-x-3 mb-8">
            <div className="w-3 h-3 bg-[#d4af37] rounded-full"></div>
            <div className="w-3 h-3 bg-[#d4af37] rounded-full"></div>
            <div className="w-3 h-3 bg-[#d4af37] rounded-full"></div>
            <div className="w-3 h-3 bg-[#d4af37] rounded-full"></div>
            <div className="w-3 h-3 bg-[#d4af37] rounded-full"></div>
          </div>

          {/* Loading text */}
          <p
            ref={loadingTextRef}
            className="text-lg font-light mb-8"
            style={{ 
              color: '#8b7355',
              opacity: 0
            }}
          >
            Waiting for application to load...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen10;
