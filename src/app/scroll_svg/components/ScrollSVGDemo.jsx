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
    { 
      title: "The complete<br />LIMI AI toolbox",
      description: "Break free from traditional lighting<br />and illuminate anything in your space<br />with intelligent AI control.",
      labels: ["adaptive", "intelligence", "smart", "lighting", "automation"]
    },
    { 
      title: "Smart foundation<br />architecture",
      description: "Built on robust hardware designed<br />for seamless integration with<br />any existing home setup.",
      labels: ["foundation", "hardware", "integration", "setup", "robust"]
    },
    { 
      title: "Intelligent core<br />processing",
      description: "Advanced AI algorithms learn<br />your preferences and adapt<br />lighting automatically.",
      labels: ["algorithms", "learning", "preferences", "adaptive", "processing"]
    },
    { 
      title: "Interactive display<br />interface",
      description: "Intuitive touch controls and<br />real-time feedback for<br />complete lighting management.",
      labels: ["interface", "controls", "feedback", "management", "interactive"]
    },
    { 
      title: "Advanced control<br />system",
      description: "Precision lighting control with<br />customizable scenes and<br />automated scheduling.",
      labels: ["precision", "scenes", "scheduling", "control", "customizable"]
    },
    { 
      title: "Complete lighting<br />ecosystem",
      description: "Everything unified in one<br />intelligent system that grows<br />with your needs.",
      labels: ["ecosystem", "unified", "intelligent", "scalable", "complete"]
    }
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
        
        // Calculate which step should be active for SVG and labels
        const stepProgress = progress * (steps.length - 1);
        const newStep = Math.floor(stepProgress);
        const targetStep = Math.min(newStep, steps.length - 1);
        
        // Update current step for SVG and labels
        if (targetStep !== currentStep) {
          setCurrentStep(targetStep);
        }

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
            {steps.map((step, index) => (
              <div 
                key={index}
                className="carousel-item"
                data-index={index}
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
            ))}
          </div>
        </div>

        {/* Center SVG */}
        <div className="svg-container">
          <svg
            ref={svgRef}
            width="600"
            height="400"
            viewBox="0 0 600 400"
            className="main-svg"
          >
            {/* Glow effect (invisible initially) */}
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Step 5: Glow Effect */}
            <g id="glow-effect" style={{ opacity: 0 }}>
              <circle cx="300" cy="200" r="180" fill="none" stroke="#54bb74" strokeWidth="2" filter="url(#glow)" />
            </g>

            {/* Step 1: Foundation */}
            <g id="foundation" style={{ opacity: 0, transformOrigin: '300px 200px' }}>
              <rect x="200" y="150" width="200" height="100" fill="#292929" stroke="#93cfa2" strokeWidth="2" rx="10" />
            </g>

            {/* Step 2: Core Body */}
            <g id="core-body" style={{ opacity: 0.3, transformOrigin: '300px 200px' }}>
              <rect x="220" y="120" width="160" height="160" fill="#f3ebe2" stroke="#292929" strokeWidth="3" rx="15" />
              <rect x="240" y="140" width="120" height="120" fill="#54bb74" opacity="0.3" rx="10" />
            </g>

            {/* Step 3: Screen Display */}
            <g id="screen" style={{ opacity: 0, transformOrigin: '300px 180px' }}>
              <rect x="250" y="160" width="100" height="60" fill="#292929" stroke="#93cfa2" strokeWidth="2" rx="5" />
              <rect x="260" y="170" width="80" height="40" fill="#54bb74" opacity="0.8" rx="3" />
              <text x="300" y="195" textAnchor="middle" fill="#f3ebe2" fontSize="12" fontFamily="Arial">LIMI</text>
            </g>

            {/* Step 4: Control Panel */}
            <g id="controls" style={{ opacity: 0, transformOrigin: '300px 260px' }}>
              <circle cx="270" cy="260" r="8" fill="#93cfa2" />
              <circle cx="300" cy="260" r="8" fill="#54bb74" />
              <circle cx="330" cy="260" r="8" fill="#f3ebe2" stroke="#292929" strokeWidth="1" />
              <rect x="280" y="280" width="40" height="15" fill="#292929" rx="7" />
            </g>
          </svg>
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
          min-height: 500vh;
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
          top: 50%;
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
          height: 400vh;
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
