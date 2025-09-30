'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, createScope } from 'animejs';
import Lenis from '@studio-freight/lenis';

const ScrollSVGDemo = () => {
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
    { title: "Foundation Base", description: "The core circular base of the system, ready to reveal its inner technology.", labels: ["foundation", "base", "start"] },
    { title: "First Layer Revealed", description: "The first layer opens, showing the initial components inside.", labels: ["layer1", "opening", "components"] },
    { title: "Second Layer Revealed", description: "A deeper look as the second layer is revealed.", labels: ["layer2", "deeper", "mechanism"] },
    { title: "Third Layer Revealed", description: "The third layer exposes more advanced elements.", labels: ["layer3", "advanced", "structure"] },
    { title: "Fourth Layer Revealed", description: "The fourth layer opens up, showing the system's complexity.", labels: ["layer4", "complexity", "details"] },
    { title: "Fifth Layer Revealed", description: "Almost fully exploded, the fifth layer is visible.", labels: ["layer5", "exploded", "almost"] },
    { title: "Fully Exploded View", description: "All layers are revealed, showing the complete inner workings.", labels: ["exploded", "final", "complete"] },
  ];

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Lenis animation frame
    function raf(time) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    scope.current = createScope({ root: containerRef.current }).add(self => {
      // Step 1: Foundation animation
      self.add('animateFoundation', () => {
        animate('#foundation', {
          scale: [0.5, 1],
          opacity: [0, 1],
          rotateY: [90, 0],
          duration: 800,
          ease: 'out(3)'
        });
      });

      // Step 2: Core Body animation  
      self.add('animateCoreBody', () => {
        animate('#core-body', {
          scale: [0.8, 1],
          opacity: [0.3, 1],
          translateY: [50, 0],
          duration: 800,
          ease: 'out(3)'
        });
      });

      // Step 3: Screen Display animation
      self.add('animateScreen', () => {
        animate('#screen', {
          scale: [0, 1],
          opacity: [0, 1],
          rotateX: [180, 0],
          duration: 800,
          ease: 'out(3)'
        });
      });

      // Step 4: Control Panel animation
      self.add('animateControls', () => {
        animate('#controls', {
          scale: [0.5, 1],
          opacity: [0, 1],
          translateX: [-100, 0],
          rotate: [45, 0],
          duration: 800,
          ease: 'out(3)'
        });
      });

      // Step 5: Glow Effect animation
      self.add('animateGlow', () => {
        animate('#glow-effect', {
          scale: [0, 1.2, 1],
          opacity: [0, 0.8, 0.6],
          duration: 1000,
          ease: 'out(3)'
        });
      });

      // Reset all animations
      self.add('resetAll', () => {
        animate(['#foundation', '#core-body', '#screen', '#controls', '#glow-effect'], {
          scale: [null, 0.5],
          opacity: [null, 0],
          translateY: 0,
          translateX: 0,
          rotate: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0
        });
      });

      // Scroll-controlled carousel animation
      self.add('animateCarousel', (scrollProgress) => {
        const totalSteps = steps.length;
        const containerHeight = window.innerHeight;
        
        // Calculate the total translation needed
        const totalTranslation = (totalSteps - 1) * containerHeight;
        const currentTranslation = scrollProgress * totalTranslation;
        
        animate('.carousel-container', {
          translateY: -currentTranslation,
          duration: 0, // Instant response to scroll
          ease: 'linear'
        });
      });

    });

    // Initialize with reset state
    scope.current.methods.resetAll();

    // Throttled Lenis scroll handler to prevent excessive animation calls
    let animationId = null;
    const handleLenisScroll = (lenis) => {
      if (!scope.current) return;

      // Cancel previous animation frame if it exists
      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      // Throttle to animation frame
      animationId = requestAnimationFrame(() => {
        const scrollTop = lenis.scroll;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        
        // Detect scroll direction
        const direction = scrollTop > lastScrollTop.current ? 'down' : 'up';
        setScrollDirection(direction);
        lastScrollTop.current = scrollTop;
        
        // Calculate scroll progress (0 to 1)
        const progress = Math.min(scrollTop / documentHeight, 1);
        setScrollProgress(progress);
        
        // Animate carousel based on scroll progress
        if (scope.current?.methods?.animateCarousel) {
          scope.current.methods.animateCarousel(progress);
        }
        
        // Calculate smooth progress for each step
        const stepProgress = progress * (steps.length - 1);
        const currentStepFloat = Math.max(0, Math.min(stepProgress, steps.length - 1));
        let targetStep = Math.floor(currentStepFloat);
        
        // Ensure we reach the last step at 100% scroll
        if (progress >= 0.95) {
          targetStep = steps.length - 1;
        }
        
        console.log('Scroll Progress:', progress, 'Target Step:', targetStep, 'Step Progress:', stepProgress);
        
        // Update current step
        setCurrentStep(targetStep);

        // Only animate SVG when step actually changes to prevent flickering
        if (targetStep !== currentStep) {
          scope.current.methods.resetAll();
          
          if (targetStep >= 0) scope.current.methods.animateFoundation();
          if (targetStep >= 1) scope.current.methods.animateCoreBody();
          if (targetStep >= 2) scope.current.methods.animateScreen();
          if (targetStep >= 3) scope.current.methods.animateControls();
          if (targetStep >= 4) scope.current.methods.animateGlow();
        }
      });
    };

    // Add Lenis scroll listener with delay to ensure Lenis is ready
    const setupLenisListener = () => {
      if (lenisRef.current) {
        lenisRef.current.on('scroll', handleLenisScroll);
        // Set initial state
        handleLenisScroll({ scroll: 0 });
      } else {
        // Retry if Lenis isn't ready yet
        setTimeout(setupLenisListener, 100);
      }
    };
    
    setupLenisListener();

    // Cleanup
    return () => {
      if (lenisRef.current) {
        lenisRef.current.off('scroll', handleLenisScroll);
      }
      if (scope.current) {
        scope.current.revert();
      }
    };
  }, [steps.length, currentStep]);

  return (
    <div className="scroll-svg-container" ref={containerRef}>
      {/* Main viewport section */}
      <div className="viewport-section">
        {/* Left Text Carousel */}
        <div className="left-text-carousel">
          <div className="carousel-container" id="carousel-container">
            {steps.map((step, index) => {
              const stepStart = index / (steps.length - 1);
              const stepEnd = (index + 1) / (steps.length - 1);
              const stepMid = (stepStart + stepEnd) / 2;
              
              let stepOpacity = 0;
              let translateY = 0;
              
              if (index === steps.length - 1) {
                // Last step: show when we're at or past its start point
                stepOpacity = scrollProgress >= stepStart ? 1 : 0;
              } else {
                // Show current step and next step during transition
                const progressInStep = (scrollProgress - stepStart) / (stepEnd - stepStart);
                
                if (scrollProgress >= stepStart && scrollProgress < stepEnd) {
                  // Current step - fade out as we progress
                  stepOpacity = Math.max(0.3, 1 - progressInStep);
                  translateY = -progressInStep * 20; // Slide up slightly
                } else if (index > 0 && scrollProgress >= (index - 1) / (steps.length - 1) && scrollProgress < stepStart) {
                  // Next step preview - fade in as we approach
                  const prevStepEnd = index / (steps.length - 1);
                  const previewProgress = (scrollProgress - (index - 1) / (steps.length - 1)) / (stepStart - (index - 1) / (steps.length - 1));
                  stepOpacity = Math.min(0.7, previewProgress);
                  translateY = 20 - previewProgress * 20; // Slide up from below
                }
              }
              
              return (
                <div 
                  key={index}
                  className="carousel-item"
                  style={{
                    opacity: stepOpacity,
                    transform: `translateY(${translateY}px)`,
                    transition: 'none' // Remove fade transitions for immediate response
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

        {/* Center PNG Reveal Animation */}
        <div className="svg-container" style={{ position: 'relative', width: 600, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {[
            '/base_renders/Parts.11.png',
            '/base_renders/Parts.12.png',
            '/base_renders/Parts.13.png',
            '/base_renders/Parts.14.png',
            '/base_renders/Parts.17.png',
            '/base_renders/Parts.15.png',
            '/base_renders/Parts.16.png',
          ].map((src, idx) => {
            const stepStart = idx / (steps.length - 1);
            const imageOpacity = scrollProgress >= stepStart ? 1 : 0;
            
            return (
              <img
                key={src}
                src={src}
                alt={`Reveal stage ${idx+1}`}
                style={{
                  position: 'absolute',
                  left: '-55%',
                  top: '-40%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  opacity: imageOpacity,
                  transition: 'opacity 0.5s ease-in-out'
                }}
                draggable={false}
              />
            );
          })}
        </div>

        {/* Right Technical Labels */}
        <div className="right-labels">
          {steps[currentStep]?.labels.map((label, index) => (
            <div 
              key={`${currentStep}-${index}`}
              className="label-item" 
              style={{ 
                top: `${15 + index * 12.5}%`, 
                right: `${5 + (index % 3) * 3}%`,
                animationDelay: `${index * 0.1}s`
              }}
            >
              <span className="label-text">{label}</span>
              <div className="label-line"></div>
            </div>
          ))}
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
        </div>
      </div>

      {/* Spacer for scroll */}
      <div className="scroll-spacer"></div>

      <style jsx global>{`
        html.lenis {
          height: auto;
        }

        .lenis.lenis-smooth {
          scroll-behavior: auto;
        }

        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }

        .lenis.lenis-stopped {
          overflow: hidden;
        }

        .lenis.lenis-scrolling iframe {
          pointer-events: none;
        }
      `}</style>
      
      <style jsx>{`
        .scroll-svg-container {
          background: #111;
          color: #f3ebe2;
          min-height: 700vh;
          font-family: 'Arial', sans-serif;
          position: relative;
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

        .left-text-carousel {
          position: absolute;
          left: 5%;
          top: 0;
          width: 400px;
          height: 100vh;
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

        .carousel-item:nth-child(1) { top: 50%; }
        .carousel-item:nth-child(2) { top: calc(50% + 100vh); }
        .carousel-item:nth-child(3) { top: calc(50% + 200vh); }
        .carousel-item:nth-child(4) { top: calc(50% + 300vh); }
        .carousel-item:nth-child(5) { top: calc(50% + 400vh); }
        .carousel-item:nth-child(6) { top: calc(50% + 500vh); }

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
          opacity: 0.9;
        }

        .svg-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2;
        }

        .main-svg {
          max-width: 500px;
          width: 100%;
          height: auto;
          display: block;
        }

        .right-labels {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          z-index: 3;
        }

        .label-item {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0;
          transform: translateX(20px);
          animation: slideInLabel 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes slideInLabel {
          0% {
            opacity: 0;
            transform: translateX(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .label-text {
          font-size: 14px;
          color: #93cfa2;
          font-weight: 500;
          text-transform: lowercase;
          letter-spacing: 0.5px;
          transition: color 0.3s ease;
        }

        .label-text:hover {
          color: #54bb74;
        }

        .label-line {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, #54bb74, transparent);
          opacity: 0.6;
          transition: all 0.3s ease;
        }

        .label-item:hover .label-line {
          width: 80px;
          opacity: 1;
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

          .right-labels {
            display: none;
          }

          .progress-track {
            width: 250px;
          }
        }

        @media (max-width: 768px) {
          .left-text-carousel {
            left: 50%;
            top: 10%;
            width: 90%;
            height: 30vh;
            transform: translateX(-50%);
          }

          .carousel-item {
            text-align: center;
            height: 30vh;
          }

          .carousel-item:nth-child(1) { top: 50%; }
          .carousel-item:nth-child(2) { top: calc(50% + 30vh); }
          .carousel-item:nth-child(3) { top: calc(50% + 60vh); }
          .carousel-item:nth-child(4) { top: calc(50% + 90vh); }
          .carousel-item:nth-child(5) { top: calc(50% + 120vh); }
          .carousel-item:nth-child(6) { top: calc(50% + 150vh); }

          .main-title {
            font-size: 32px;
            margin-bottom: 16px;
          }

          .main-description {
            font-size: 14px;
          }

          .svg-container {
            top: 55%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .main-svg {
            max-width: 400px;
          }

          .progress-track {
            width: 200px;
          }

          .progress-segment {
            width: 4px;
          }
        }

        @media (max-width: 480px) {
          .left-text-carousel {
            width: 95%;
            height: 25vh;
          }

          .carousel-item {
            height: 25vh;
          }

          .carousel-item:nth-child(1) { top: 50%; }
          .carousel-item:nth-child(2) { top: calc(50% + 25vh); }
          .carousel-item:nth-child(3) { top: calc(50% + 50vh); }
          .carousel-item:nth-child(4) { top: calc(50% + 75vh); }
          .carousel-item:nth-child(5) { top: calc(50% + 100vh); }
          .carousel-item:nth-child(6) { top: calc(50% + 125vh); }

          .main-title {
            font-size: 28px;
            line-height: 1.2;
          }

          .main-description {
            font-size: 13px;
          }

          .svg-container {
            top: 50%;
          }

          .main-svg {
            max-width: 320px;
          }

          .progress-track {
            width: 150px;
          }

          .progress-segment {
            width: 3px;
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollSVGDemo;
