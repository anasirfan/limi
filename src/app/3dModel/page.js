"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const PlayCanvasPage = () => {
  const iframeRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const lastSentStepRef = useRef(-1);
  const debounceTimeoutRef = useRef(null);

  // Debounced message sender to prevent spam
  const sendMessageToIframe = useCallback((step) => {
    // Clear any existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set a new timeout to debounce the message
    debounceTimeoutRef.current = setTimeout(() => {
      if (
        iframeRef.current && 
        isIframeLoaded && 
        step !== lastSentStepRef.current
      ) {
        try {
          const message = { step: step, timestamp: Date.now() };
          iframeRef.current.contentWindow.postMessage(message, '*');
          lastSentStepRef.current = step;
          
          // Enhanced console logging
          console.log('🚀 IFRAME MESSAGE FIRED:', {
            step: step,
            timestamp: new Date().toLocaleTimeString(),
            message: message
          });
          console.log(`📨 Step ${step} message sent to PlayCanvas iframe`);
          
        } catch (error) {
          console.error('❌ Error sending message to iframe:', error);
        }
      } else {
        // Log why message wasn't sent
        if (!iframeRef.current) {
          console.log('⚠️ Message not sent: iframe ref not available');
        } else if (!isIframeLoaded) {
          console.log('⚠️ Message not sent: iframe not loaded yet');
        } else if (step === lastSentStepRef.current) {
          console.log('⚠️ Message not sent: duplicate step', step);
        }
      }
    }, 150); // 150ms debounce delay
  }, [isIframeLoaded]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate which step we're on based on scroll position
      // Each step represents one viewport height of scrolling
      const step = Math.floor(scrollY / windowHeight);
      
      if (step !== currentStep) {
        console.log(`📜 SCROLL STEP CHANGED: ${currentStep} → ${step} (scrollY: ${scrollY}px)`);
        setCurrentStep(step);
        sendMessageToIframe(step);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [currentStep, sendMessageToIframe]);

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsIframeLoaded(true);
    console.log('PlayCanvas iframe loaded successfully');
    
    // Send initial message
    setTimeout(() => {
      sendMessageToIframe(0);
    }, 1000);
  };

  // Scroll sections data
  const scrollSections = [
    {
      id: 0,
      title: "Welcome to LIMI AI",
      subtitle: "Interactive 3D Experience",
      description: "Scroll down to explore our 3D model and see how each step reveals new details.",
      bgColor: "from-blue-900/20 to-purple-900/20"
    },
    {
      id: 1,
      title: "Step 1: Base Assembly",
      subtitle: "Foundation Components",
      description: "Watch as the base components come together in perfect harmony.",
      bgColor: "from-green-900/20 to-blue-900/20"
    },
    {
      id: 2,
      title: "Step 2: Core Integration",
      subtitle: "AI Processing Unit",
      description: "The intelligent core is integrated with advanced processing capabilities.",
      bgColor: "from-purple-900/20 to-pink-900/20"
    },
    {
      id: 3,
      title: "Step 3: Sensor Array",
      subtitle: "Smart Detection System",
      description: "Multiple sensors are added for comprehensive environmental awareness.",
      bgColor: "from-orange-900/20 to-red-900/20"
    },
    {
      id: 4,
      title: "Step 4: Final Assembly",
      subtitle: "Complete Integration",
      description: "All components work together as a unified intelligent system.",
      bgColor: "from-teal-900/20 to-green-900/20"
    },
    {
      id: 5,
      title: "Experience Complete",
      subtitle: "LIMI AI Ready",
      description: "Your journey through our 3D assembly process is complete.",
      bgColor: "from-indigo-900/20 to-blue-900/20"
    }
  ];

  return (
    <div className="relative">
      {/* Fixed Background Iframe */}
      <div className="fixed inset-0 w-full h-full z-0">
        <iframe
          ref={iframeRef}
          src="https://playcanv.as/e/p/Yb39pRZ8/"
          className="w-full h-full border-0"
          title="PlayCanvas 3D Experience"
          onLoad={handleIframeLoad}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        
        {/* Loading Overlay */}
        {!isIframeLoaded && (
          <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
            <div className="text-center text-white">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-xl font-semibold">Loading 3D Experience...</p>
              <p className="text-sm text-gray-400 mt-2">Please wait while we prepare your interactive journey</p>
            </div>
          </div>
        )}
      </div>

      {/* Scrollable Overlay Content */}
      <div className="relative z-20">
        {scrollSections.map((section, index) => (
          <motion.section
            key={section.id}
            className="min-h-screen flex items-center justify-start"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, margin: "-20%" }}
          >
            <div className="max-w-lg ml-8 px-6 text-left">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false }}
                className=""
              >
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-white/80 mb-4">
                    Step {section.id + 1} of {scrollSections.length}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
                  {section.title}
                </h1>
                
                <h2 className="text-2xl md:text-3xl font-semibold text-blue-300 mb-6">
                  {section.subtitle}
                </h2>
                
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                  {section.description}
                </p>

                {/* Current Step Indicator */}
                <div className="mt-8 flex items-center justify-center space-x-2">
                  {scrollSections.map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        i <= currentStep 
                          ? 'bg-blue-400 scale-110' 
                          : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>

                {/* Debug Info (remove in production) */}
                <div className="mt-6 text-sm text-white/50">
                  Current Step: {currentStep} | Last Sent: {lastSentStepRef.current}
                </div>

                {/* Scroll Hint */}
                {index < scrollSections.length - 1 && (
                  <motion.div
                    className="mt-8 text-white/60"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-sm mb-2">Scroll to continue</span>
                      <div className="w-px h-8 bg-white/30"></div>
                      <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* Fixed Step Counter */}
      <div className="fixed top-6 right-6 z-30 bg-black/50 backdrop-blur-md rounded-lg px-4 py-2 border border-white/10">
        <div className="text-white text-sm font-medium">
          Step {currentStep + 1} / {scrollSections.length}
        </div>
      </div>
    </div>
  );
};

export default PlayCanvasPage;
