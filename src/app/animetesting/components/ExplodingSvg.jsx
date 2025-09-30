'use client';

import { useEffect, useRef, useState } from 'react';
import * as anime from 'animejs';

const ExplodingSvg = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const timelineRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Feature labels data
  const featureLabels = [
    { id: 'base', text: 'Premium Base Frame', position: { x: -200, y: 100 } },
    { id: 'screen', text: 'High-Resolution Display', position: { x: 200, y: -50 } },
    { id: 'buttons', text: 'Tactile Controls', position: { x: -150, y: -100 } },
    { id: 'camera', text: 'Advanced Camera System', position: { x: 150, y: 150 } },
    { id: 'speaker', text: 'Premium Audio', position: { x: -100, y: 200 } },
    { id: 'charging', text: 'Fast Charging Port', position: { x: 100, y: -150 } }
  ];

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!svgRef.current || !anime || typeof anime.timeline !== 'function') return;

    // Create the main timeline
    const tl = anime.timeline({
      autoplay: false,
      easing: 'easeOutExpo',
      duration: 1000
    });

    // Define explosion animations for each component
    const explosionDistance = isMobile ? 80 : 150;
    const rotationAmount = isMobile ? 15 : 45;

    // Base frame explosion
    tl.add({
      targets: '#base',
      translateX: isMobile ? -40 : -120,
      translateY: isMobile ? 60 : 80,
      rotate: -rotationAmount,
      scale: [1, 1.1],
      opacity: [1, 0.9],
      duration: 1200,
      easing: 'easeOutExpo'
    }, 0);

    // Screen explosion
    tl.add({
      targets: '#screen',
      translateX: isMobile ? 50 : 180,
      translateY: isMobile ? -30 : -60,
      rotate: rotationAmount * 0.5,
      scale: [1, 1.15],
      duration: 1000,
      easing: 'easeOutExpo'
    }, 100);

    // Buttons explosion
    tl.add({
      targets: '#buttons',
      translateX: isMobile ? -35 : -100,
      translateY: isMobile ? -40 : -80,
      rotate: -rotationAmount * 0.7,
      scale: [1, 1.2],
      duration: 800,
      easing: 'easeOutExpo'
    }, 200);

    // Camera explosion
    tl.add({
      targets: '#camera',
      translateX: isMobile ? 40 : 120,
      translateY: isMobile ? 50 : 100,
      rotate: rotationAmount * 0.8,
      scale: [1, 1.3],
      duration: 900,
      easing: 'easeOutExpo'
    }, 150);

    // Speaker explosion
    tl.add({
      targets: '#speaker',
      translateX: isMobile ? -30 : -80,
      translateY: isMobile ? 70 : 140,
      rotate: -rotationAmount * 0.6,
      scale: [1, 1.1],
      duration: 1100,
      easing: 'easeOutExpo'
    }, 250);

    // Charging port explosion
    tl.add({
      targets: '#charging',
      translateX: isMobile ? 35 : 90,
      translateY: isMobile ? -50 : -120,
      rotate: rotationAmount * 0.9,
      scale: [1, 1.25],
      duration: 950,
      easing: 'easeOutExpo'
    }, 300);

    // Feature labels animation
    featureLabels.forEach((label, index) => {
      tl.add({
        targets: `#label-${label.id}`,
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.8, 1],
        duration: 600,
        easing: 'easeOutQuart'
      }, 400 + (index * 50));
    });

    timelineRef.current = tl;

    // Scroll event handler
    const handleScroll = () => {
      if (!timelineRef.current || !containerRef.current) return;

      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;

      // Calculate scroll progress within the container
      const scrollStart = containerTop - windowHeight;
      const scrollEnd = containerTop + containerHeight;
      const scrollRange = scrollEnd - scrollStart;
      
      let progress = (scrollTop - scrollStart) / scrollRange;
      progress = Math.max(0, Math.min(1, progress));

      // Seek to the appropriate position in the timeline
      const timelineProgress = progress * timelineRef.current.duration;
      timelineRef.current.seek(timelineProgress);
    };

    // Throttled scroll handler for better performance
    let ticking = false;
    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScrollHandler);

    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      if (timelineRef.current) {
        timelineRef.current.pause();
      }
    };
  }, [isMobile]);

  return (
    <div 
      ref={containerRef}
      className="relative h-[200vh] bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Main SVG Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative">
          {/* Sample Phone SVG */}
          <svg
            ref={svgRef}
            width={isMobile ? "200" : "300"}
            height={isMobile ? "400" : "600"}
            viewBox="0 0 300 600"
            className="drop-shadow-2xl"
          >
            {/* Base Frame */}
            <g id="base" style={{ transformOrigin: '150px 300px' }}>
              <rect
                x="50"
                y="50"
                width="200"
                height="500"
                rx="40"
                ry="40"
                fill="#1a1a1a"
                stroke="#333"
                strokeWidth="2"
              />
              <rect
                x="55"
                y="55"
                width="190"
                height="490"
                rx="35"
                ry="35"
                fill="#2a2a2a"
              />
            </g>

            {/* Screen */}
            <g id="screen" style={{ transformOrigin: '150px 300px' }}>
              <rect
                x="70"
                y="120"
                width="160"
                height="280"
                rx="20"
                ry="20"
                fill="#000"
                stroke="#444"
                strokeWidth="1"
              />
              <rect
                x="75"
                y="125"
                width="150"
                height="270"
                rx="15"
                ry="15"
                fill="url(#screenGradient)"
              />
            </g>

            {/* Buttons */}
            <g id="buttons" style={{ transformOrigin: '150px 300px' }}>
              <rect x="45" y="200" width="8" height="40" rx="4" fill="#666" />
              <rect x="45" y="250" width="8" height="60" rx="4" fill="#666" />
              <rect x="247" y="180" width="8" height="50" rx="4" fill="#666" />
            </g>

            {/* Camera */}
            <g id="camera" style={{ transformOrigin: '150px 300px' }}>
              <circle cx="150" cy="90" r="15" fill="#333" />
              <circle cx="150" cy="90" r="10" fill="#000" />
              <circle cx="150" cy="90" r="6" fill="#1a1a2e" />
              <circle cx="120" cy="90" r="8" fill="#333" />
              <circle cx="180" cy="90" r="5" fill="#333" />
            </g>

            {/* Speaker */}
            <g id="speaker" style={{ transformOrigin: '150px 300px' }}>
              <rect x="120" y="480" width="60" height="8" rx="4" fill="#444" />
              <rect x="125" y="482" width="50" height="4" rx="2" fill="#666" />
            </g>

            {/* Charging Port */}
            <g id="charging" style={{ transformOrigin: '150px 300px' }}>
              <rect x="140" y="540" width="20" height="8" rx="4" fill="#333" />
              <rect x="142" y="542" width="16" height="4" rx="2" fill="#555" />
            </g>

            {/* Gradients */}
            <defs>
              <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="50%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>

          {/* Feature Labels */}
          {featureLabels.map((label) => (
            <div
              key={label.id}
              id={`label-${label.id}`}
              className={`absolute opacity-0 pointer-events-none ${
                isMobile ? 'text-xs' : 'text-sm'
              }`}
              style={{
                left: `calc(50% + ${isMobile ? label.position.x * 0.6 : label.position.x}px)`,
                top: `calc(50% + ${isMobile ? label.position.y * 0.6 : label.position.y}px)`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 border border-white/20">
                <p className="text-white font-medium whitespace-nowrap">
                  {label.text}
                </p>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/10 rotate-45 border-r border-b border-white/20"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-center">
          <div className="animate-bounce">
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <p className="text-sm">Scroll to explore</p>
        </div>
      </div>
    </div>
  );
};

export default ExplodingSvg;
