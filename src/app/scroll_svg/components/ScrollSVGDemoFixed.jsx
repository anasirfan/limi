'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, createScope } from 'animejs';
import Lenis from '@studio-freight/lenis';

const ScrollSVGDemoFixed = () => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const scope = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollTop = useRef(0);
  const lenisRef = useRef(null);

  // Dynamic content for each step
  const steps = [
    { 
      title: "Top Plate", 
      description: "The topmost cover plate that protects the internal parts and completes the outer structure.", 
      labels: ["top", "plate", "cover"]
    },
    { 
      title: "Male Connector Plate", 
      description: "A connector plate that ensures proper alignment and secure attachment with other components.", 
      labels: ["male", "connector", "plate"]
    },
    { 
      title: "Ceiling Bracket Steel", 
      description: "A durable steel bracket designed to fix the system securely to the ceiling structure.", 
      labels: ["ceiling", "bracket", "steel"]
    },
    { 
      title: "Plate", 
      description: "A supporting plate that helps distribute weight and maintain stability in the assembly.", 
      labels: ["support", "plate", "stability"]
    },
    { 
      title: "Components", 
      description: "Various mechanical and electrical parts that work together to build the full system.", 
      labels: ["components", "parts", "assembly"]
    },
    { 
      title: "PCB Board", 
      description: "The printed circuit board that controls electronic functions and signal processing.", 
      labels: ["pcb", "board", "electronics"]
    },
    { 
      title: "Ceiling Hub", 
      description: "The central hub where all plates, components, and electronics integrate into one system.", 
      labels: ["ceiling", "hub", "integration"]
    }
  ];
  

  // Initialize scroll without Lenis for better scrollbar compatibility
  useEffect(() => {
    // Initialize with first step visible
    setCurrentStep(0);
    return () => {
      // Cleanup if needed
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    scope.current = createScope({ root: containerRef.current }).add(self => {
      // No carousel animation needed - we handle text updates in React state
      // The carousel content will be controlled by currentStep state
    });

    // Native scroll handler only
    let animationId = null;
    const handleScroll = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      animationId = requestAnimationFrame(() => {
        // Get scroll position from native scroll
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const windowHeight = window.innerHeight;
        const documentHeight = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        ) - windowHeight;
        
        // Detect scroll direction
        const direction = scrollTop > lastScrollTop.current ? 'down' : 'up';
        setScrollDirection(direction);
        lastScrollTop.current = scrollTop;
        
        // Calculate scroll progress (0 to 1)
        const progress = documentHeight > 0 ? Math.min(Math.max(scrollTop / documentHeight, 0), 1) : 0;
        setScrollProgress(progress);
        
        // Calculate current step based on same logic as images
        let targetStep = 0;
        for (let i = 0; i < steps.length; i++) {
          const stepStart = i / (steps.length - 1);
          if (progress >= stepStart) {
            targetStep = i;
          }
        }
        
        // Update current step - always set it to ensure sync
        setCurrentStep(targetStep);
      });
    };

    // Add native scroll listener only
    const setupScrollListeners = () => {
      // Native scroll listener
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      // Set initial state
      handleScroll();
    };
    
    // Setup immediately
    setupScrollListeners();

    // Cleanup
    return () => {
      if (lenisRef.current) {
        lenisRef.current.off('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
      if (scope.current) {
        scope.current.revert();
      }
    };
  }, [steps.length]);

  return (
    <div className="scroll-svg-container" ref={containerRef}>
      {/* Main viewport section */}
      <div className="viewport-section">
        {/* Left Fixed Text Container */}
        <div className="left-text-container">
          <h1 
            className="main-title"
            dangerouslySetInnerHTML={{ __html: steps[currentStep]?.title }}
          />
          <p 
            className="main-description"
            dangerouslySetInnerHTML={{ __html: steps[currentStep]?.description }}
          />
        </div>

        {/* Center PNG Reveal Animation */}
        <div className="svg-container">
          {[
            '/base_renders/Parts.11.png',
            '/base_renders/Parts.12.png',
            '/base_renders/Parts.13.png',
            '/base_renders/Parts.14.png',
            '/base_renders/Parts.15.png',
            '/base_renders/Parts.16.png',
            '/base_renders/Parts.17.png',
          ].map((src, idx) => {
            const stepStart = idx / (steps.length - 1);
            const imageOpacity = scrollProgress >= stepStart ? 1 : 0;
            
            return (
              <img
                key={src}
                src={src}
                alt={`Reveal stage ${idx+1}`}
                className="assembly-image"
                style={{
                  opacity: imageOpacity
                }}
                draggable={false}
              />
            );
          })}

        </div>

        {/* Scroll Progress Indicator */}
        <div className="scroll-progress-indicator">
          <div className="progress-track">
            {Array.from({ length: 50 }, (_, index) => (
              <div 
                key={index}
                className={`progress-segment ${index < (scrollProgress * 50) ? 'active' : ''}`}
              />
            ))}
          </div>
          <div className="progress-text">
            Step {currentStep + 1} of {steps.length} | {Math.round(scrollProgress * 100)}%
          </div>
        </div>
      </div>

      {/* Spacer for scroll */}
      <div className="scroll-spacer"></div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        body {
          overflow-x: hidden;
        }
      `}</style>
      
      <style jsx>{`
        .scroll-svg-container {
          background: #111;
          color: #f3ebe2;
          min-height: 700vh;
          font-family: 'Arial', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .viewport-section {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        .left-text-container {
          position: absolute;
          left: 5%;
          top: 15%;
          width: 400px;
          max-width: 35vw;
          z-index: 3;
          background: rgba(17, 17, 17, 0.8);
          padding: 30px;
          border-radius: 16px;
          border: 1px solid rgba(147, 207, 162, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .main-title {
          font-size: 48px;
          font-weight: 700;
          color: #f3ebe2;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
          transition: all 0.3s ease;
        }

        .main-description {
          font-size: 16px;
          line-height: 1.6;
          color: #93cfa2;
          margin: 0;
          opacity: 1;
          transition: all 0.3s ease;
        }

        .svg-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2;
        }

        .assembly-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: opacity 0.5s ease-in-out;
        
        }
          
        .scroll-progress-indicator {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          background: rgba(41, 41, 41, 0.8);
          border-radius: 20px;
          padding: 8px 16px;
          border: 1px solid rgba(147, 207, 162, 0.2);
          text-align: center;
        }

        .progress-track {
          display: flex;
          align-items: center;
          gap: 2px;
          width: 300px;
          height: 4px;
          margin-bottom: 8px;
        }

        .progress-segment {
          width: 6px;
          height: 4px;
          background: rgba(147, 207, 162, 0.2);
          border-radius: 2px;
          transition: all 0.2s ease;
        }

        .progress-segment.active {
          background: #54bb74;
          height: 6px;
          box-shadow: 0 0 4px rgba(84, 187, 116, 0.4);
        }

        .progress-text {
          font-size: 12px;
          color: #93cfa2;
          opacity: 0.8;
        }

        .scroll-spacer {
          height: 600vh;
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default ScrollSVGDemoFixed;
