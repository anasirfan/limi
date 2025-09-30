'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, createScope } from 'animejs';
import Lenis from '@studio-freight/lenis';

const ScrollSVGDemoResponsive = () => {
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
        
        // Update current step
        setCurrentStep(targetStep);
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

        {/* Center PNG Reveal Animation */}
        <div className="svg-container">
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

        .left-text-carousel {
          position: absolute;
          left: 5%;
          top: 15%;
          width: clamp(280px, 35vw, 400px);
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

        .main-title {
          font-size: clamp(24px, 5vw, 48px);
          font-weight: 700;
          color: #f3ebe2;
          line-height: 1.1;
          margin-bottom: clamp(12px, 2vw, 24px);
          letter-spacing: -0.02em;
        }

        .main-description {
          font-size: clamp(14px, 1.5vw, 16px);
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
          width: clamp(300px, 50vw, 600px);
          height: clamp(200px, 40vh, 400px);
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
          filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
        }

        .scroll-progress-indicator {
          position: fixed;
          bottom: clamp(20px, 3vh, 30px);
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          background: rgba(41, 41, 41, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: clamp(6px, 1vw, 8px) clamp(12px, 2vw, 16px);
          border: 1px solid rgba(147, 207, 162, 0.2);
        }

        .progress-track {
          display: flex;
          align-items: center;
          gap: 2px;
          width: clamp(150px, 30vw, 300px);
          height: 4px;
        }

        .progress-segment {
          width: clamp(3px, 0.8vw, 6px);
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

        /* Tablet Styles */
        @media (max-width: 1024px) and (min-width: 769px) {
          .left-text-carousel {
            left: 3%;
            width: clamp(300px, 40vw, 350px);
            top: 10%;
            height: 75vh;
          }

          .main-title {
            font-size: clamp(28px, 4.5vw, 40px);
          }

          .svg-container {
            width: clamp(350px, 45vw, 500px);
            height: clamp(250px, 35vh, 350px);
          }
        }

        /* Mobile Landscape */
        @media (max-width: 768px) and (orientation: landscape) {
          .viewport-section {
            flex-direction: row;
          }

          .left-text-carousel {
            left: 2%;
            top: 5%;
            width: 45%;
            height: 90vh;
          }

          .svg-container {
            right: 2%;
            left: auto;
            transform: translateY(-50%);
            width: 45%;
            height: 60vh;
          }

          .main-title {
            font-size: clamp(20px, 3vw, 28px);
            margin-bottom: 8px;
          }

          .main-description {
            font-size: clamp(12px, 1.2vw, 14px);
          }
        }

        /* Mobile Portrait */
        @media (max-width: 768px) and (orientation: portrait) {
          .viewport-section {
            flex-direction: column;
            padding: clamp(20px, 5vw, 40px);
          }

          .left-text-carousel {
            position: relative;
            left: 0;
            top: 0;
            width: 100%;
            height: 40vh;
            text-align: center;
            order: 1;
          }

          .svg-container {
            position: relative;
            top: 0;
            left: 0;
            transform: none;
            width: 100%;
            height: 50vh;
            order: 2;
            margin-top: 20px;
          }

          .carousel-item {
            top: 0;
            height: 40vh;
            justify-content: flex-start;
            padding-top: 20px;
          }

          .main-title {
            font-size: clamp(24px, 6vw, 32px);
            margin-bottom: clamp(8px, 2vw, 16px);
            text-align: center;
          }

          .main-description {
            font-size: clamp(14px, 3vw, 16px);
            text-align: center;
            max-width: 90%;
            margin: 0 auto;
          }

          .scroll-progress-indicator {
            bottom: 10px;
            padding: 4px 8px;
          }

          .progress-track {
            width: clamp(120px, 25vw, 200px);
          }
        }

        /* Small Mobile */
        @media (max-width: 480px) {
          .left-text-carousel {
            height: 35vh;
          }

          .svg-container {
            height: 45vh;
          }

          .main-title {
            font-size: clamp(20px, 5.5vw, 28px);
            line-height: 1.2;
          }

          .main-description {
            font-size: clamp(12px, 2.8vw, 14px);
          }

          .scroll-progress-indicator {
            bottom: 5px;
            padding: 3px 6px;
          }

          .progress-track {
            width: clamp(100px, 20vw, 150px);
          }

          .progress-segment {
            width: clamp(2px, 0.6vw, 4px);
            height: 3px;
          }

          .progress-segment.active {
            height: 4px;
          }
        }

        /* Ultra-wide screens */
        @media (min-width: 1920px) {
          .left-text-carousel {
            width: 450px;
          }

          .svg-container {
            width: 700px;
            height: 500px;
          }

          .main-title {
            font-size: 56px;
          }

          .main-description {
            font-size: 18px;
          }
        }

        /* High DPI displays */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .assembly-image {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollSVGDemoResponsive;
