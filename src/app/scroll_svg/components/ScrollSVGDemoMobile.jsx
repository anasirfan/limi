'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, createScope } from 'animejs';
import Lenis from '@studio-freight/lenis';

const ScrollSVGDemoMobile = () => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const scope = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollTop = useRef(0);
  const lenisRef = useRef(null);

  // Dynamic content for each step
  const steps = [
    { title: "Foundation Base", description: "The core circular base of the system, ready to reveal its inner technology.", labels: ["foundation", "base", "start"] },
    { title: "First Layer Revealed", description: "The first layer opens, showing the initial components inside.", labels: ["layer1", "opening", "components"] },
    { title: "Second Layer Revealed", description: "A deeper look as the second layer is revealed.", labels: ["layer2", "deeper", "mechanism"] },
    { title: "Third Layer Revealed", description: "The third layer exposes more advanced elements.", labels: ["layer3", "advanced", "structure"] },
    { title: "Fourth Layer Revealed", description: "The fourth layer opens up, showing the system's complexity.", labels: ["layer4", "complexity", "details"] },
    { title: "Fifth Layer Revealed", description: "Almost fully exploded, the fifth layer is visible.", labels: ["layer5", "exploded", "almost"] },
    { title: "Fully Exploded View", description: "All layers are revealed, showing the complete inner workings.", labels: ["exploded", "final", "complete"] },
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize scroll without Lenis for better scrollbar compatibility
  useEffect(() => {
    // Disable Lenis for now to fix scrollbar issues
    // We'll use native scroll detection instead
    return () => {
      // Cleanup if needed
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    scope.current = createScope({ root: containerRef.current }).add(self => {
      // No carousel animation needed for mobile - we handle text updates in React state
      // The content will be controlled by currentStep state
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
        
        // Calculate smooth progress for each step
        const stepProgress = progress * (steps.length - 1);
        const currentStepFloat = Math.max(0, Math.min(stepProgress, steps.length - 1));
        let targetStep = Math.floor(currentStepFloat);
        
        // Ensure we reach the last step at 100% scroll
        if (progress >= 0.95) {
          targetStep = steps.length - 1;
        }
        
        // Update current step
        if (targetStep !== currentStep) {
          console.log('Mobile - Step changed:', currentStep, '->', targetStep, 'Progress:', Math.round(progress * 100) + '%');
          setCurrentStep(targetStep);
        }
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
      window.removeEventListener('scroll', handleScroll);
      if (scope.current) {
        scope.current.revert();
      }
    };
  }, [steps.length, currentStep, isMobile]);

  return (
    <div className="scroll-svg-container" ref={containerRef}>
      {/* Main viewport section */}
      <div className="viewport-section">
        {/* Desktop: Left Text Carousel */}
        {!isMobile && (
          <div className="left-text-carousel">
            <div className="carousel-container" id="carousel-container">
              {steps.map((step, index) => {
                // Show only the current step based on scroll progress
                const stepStart = index / (steps.length - 1);
                const isCurrentStep = index === currentStep;
                
                return (
                  <div 
                    key={index}
                    className="carousel-item"
                    style={{
                      opacity: isCurrentStep ? 1 : 0,
                      transform: 'translateY(0px)',
                      transition: 'opacity 0.3s ease'
                    }}
                  >
                    <h1 
                      className="main-title"
                      dangerouslySetInnerHTML={{ __html: step.title }}
                    />
                    <p 
                      className="main-description"
                      dangerouslySetInnerHTML={{ __html: step.description }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Mobile: Fixed Text on Top Left */}
        {isMobile && (
          <div className="mobile-text-container">
            <h1 
              className="mobile-title"
              dangerouslySetInnerHTML={{ __html: steps[currentStep]?.title }}
            />
            <p 
              className="mobile-description"
              dangerouslySetInnerHTML={{ __html: steps[currentStep]?.description }}
            />
          </div>
        )}

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
            
            // For mobile: show images stacked/layered as you scroll
            // For desktop: show one image at a time
            let imageOpacity = 0;
            let imageTransform = '';
            
            if (isMobile) {
              // Mobile: Stack images with slight offset and show all up to current step
              if (idx <= currentStep) {
                imageOpacity = 1;
                const offset = idx * 10; // 10px offset for each layer
                imageTransform = `translateY(-${offset}px) scale(${1 - idx * 0.02})`; // Slight scale reduction
              }
            } else {
              // Desktop: Show one image at a time
              imageOpacity = scrollProgress >= stepStart ? 1 : 0;
            }
            
            return (
              <img
                key={src}
                src={src}
                alt={`Reveal stage ${idx+1}`}
                className="assembly-image"
                style={{
                  opacity: imageOpacity,
                  transform: imageTransform,
                  zIndex: steps.length - idx, // Higher z-index for earlier images
                }}
                draggable={false}
              />
            );
          })}
        </div>

        {/* Scroll Progress Indicator */}
        <div className="scroll-progress-indicator">
          <div className="progress-track">
            {Array.from({ length: isMobile ? 20 : 50 }, (_, index) => (
              <div 
                key={index}
                className={`progress-segment ${index < (scrollProgress * (isMobile ? 20 : 50)) ? 'active' : ''}`}
              />
            ))}
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

        /* Desktop Styles */
        .left-text-carousel {
          position: absolute;
          left: 5%;
          top: 15%;
          width: 400px;
          height: 70vh;
          z-index: 3;
          overflow: hidden;
        }

        .carousel-container {
          position: relative;
          width: 100%;
          height: 100%;
          will-change: transform;
        }

        .carousel-item {
          position: absolute;
          top: 40%;
          left: 0;
          width: 100%;
          height: 100vh;
          transform: translateY(-50%);
          opacity: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* Mobile Fixed Text Container */
        .mobile-text-container {
          position: absolute;
          top: 10%;

          left: 5%;
          width: 90%;
          max-width: 350px;
          z-index: 3;
          background: rgba(17, 17, 17, 0.8);
          backdrop-filter: blur(10px);
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(147, 207, 162, 0.2);
        }

        .mobile-title {
          font-size: clamp(20px, 5vw, 28px);
          font-weight: 700;
          color: #f3ebe2;
          line-height: 1.2;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .mobile-description {
          font-size: clamp(12px, 3vw, 14px);
          line-height: 1.5;
          color: #93cfa2;
          margin: 0;
          opacity: 1;
        }

        /* Desktop Text Styles */
        .main-title {
          font-size: 48px;
          font-weight: 700;
          color: #f3ebe2;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .main-description {
          font-size: 16px;
          line-height: 1.6;
          color: #93cfa2;
          margin: 0;
          opacity: 1;
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
          transition: all 0.5s ease-in-out;
          filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
        }

        .scroll-progress-indicator {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          background: rgba(41, 41, 41, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 8px 16px;
          border: 1px solid rgba(147, 207, 162, 0.2);
        }

        .progress-track {
          display: flex;
          align-items: center;
          gap: 2px;
          width: 300px;
          height: 4px;
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

        .scroll-spacer {
          height: 600vh;
          position: relative;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .left-text-carousel {
            left: 3%;
            width: 350px;
          }

          .main-title {
            font-size: 40px;
          }

          .progress-track {
            width: 250px;
          }
        }

        @media (max-width: 768px) {
          .svg-container {
            width: 90vw;
            height: 60vh;
            top: 60%;
          }

          .mobile-text-container {
            top: 3%;
            left: 3%;
            width: 94%;
            padding: 15px;
          }

          .progress-track {
            width: 200px;
          }

          .progress-segment {
            width: 4px;
          }
        }

        @media (max-width: 480px) {
          .svg-container {
            width: 95vw;
            height: 55vh;
            top: 65%;
          }

          .mobile-text-container {
            padding: 12px;
          }

          .mobile-title {
            font-size: clamp(18px, 4.5vw, 24px);
            margin-bottom: 8px;
          }

          .mobile-description {
            font-size: clamp(11px, 2.8vw, 13px);
          }

          .progress-track {
            width: 150px;
          }

          .progress-segment {
            width: 3px;
            height: 3px;
          }

          .progress-segment.active {
            height: 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollSVGDemoMobile;
