'use client';

import { useEffect, useRef, useState } from 'react';

const ExplodingDemo = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [animeLoaded, setAnimeLoaded] = useState(false);

  // Demo components - using CSS shapes instead of images
  const demoComponents = [
    {
      id: 'comp-1',
      label: 'Core Module',
      position: { x: -180, y: 120 },
      explosion: { x: -200, y: 150, rotate: -25 },
      color: '#4f46e5'
    },
    {
      id: 'comp-2',
      label: 'Display Unit',
      position: { x: 200, y: -80 },
      explosion: { x: 250, y: -100, rotate: 15 },
      color: '#7c3aed'
    },
    {
      id: 'comp-3',
      label: 'Control Panel',
      position: { x: -150, y: -120 },
      explosion: { x: -180, y: -150, rotate: -30 },
      color: '#ec4899'
    },
    {
      id: 'comp-4',
      label: 'Sensor Array',
      position: { x: 160, y: 140 },
      explosion: { x: 200, y: 180, rotate: 20 },
      color: '#06b6d4'
    },
    {
      id: 'comp-5',
      label: 'Power Core',
      position: { x: -120, y: 180 },
      explosion: { x: -150, y: 220, rotate: -15 },
      color: '#10b981'
    },
    {
      id: 'comp-6',
      label: 'Interface Hub',
      position: { x: 120, y: -140 },
      explosion: { x: 150, y: -180, rotate: 25 },
      color: '#f59e0b'
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const loadAnime = async () => {
      try {
        const animeModule = await import('animejs');
        const anime = animeModule.default || animeModule;
        
        if (!anime || typeof anime.timeline !== 'function') {
          console.error('Anime.js not loaded properly');
          return;
        }

        // Create the main timeline
        const tl = anime.timeline({
          autoplay: false,
          easing: 'easeOutExpo',
          duration: 1000
        });

        const mobileScale = isMobile ? 0.6 : 1;

        // Animate each component
        demoComponents.forEach((comp, index) => {
          // Component explosion animation
          tl.add({
            targets: `#${comp.id}`,
            translateX: comp.explosion.x * mobileScale,
            translateY: comp.explosion.y * mobileScale,
            rotate: comp.explosion.rotate,
            scale: [1, isMobile ? 1.1 : 1.2],
            opacity: [1, 0.95],
            duration: 1200 + (index * 50),
            easing: 'easeOutExpo'
          }, index * 80);

          // Label animation
          tl.add({
            targets: `#label-${comp.id}`,
            opacity: [0, 1],
            translateY: [30, 0],
            scale: [0.8, 1],
            duration: 800,
            easing: 'easeOutQuart'
          }, 600 + (index * 60));
        });

        timelineRef.current = tl;

        const handleScroll = () => {
          if (!timelineRef.current || !containerRef.current) return;

          const scrollTop = window.pageYOffset;
          const windowHeight = window.innerHeight;
          const containerTop = containerRef.current.offsetTop;
          const containerHeight = containerRef.current.offsetHeight;

          const scrollStart = containerTop - windowHeight * 0.5;
          const scrollEnd = containerTop + containerHeight - windowHeight * 0.5;
          const scrollRange = scrollEnd - scrollStart;
          
          let progress = (scrollTop - scrollStart) / scrollRange;
          progress = Math.max(0, Math.min(1, progress));

          const easedProgress = progress * progress * (3 - 2 * progress);
          const timelineProgress = easedProgress * timelineRef.current.duration;
          timelineRef.current.seek(timelineProgress);
        };

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

        window.addEventListener('scroll', throttledScrollHandler, { passive: true });
        setAnimeLoaded(true);
        handleScroll();

        return () => {
          window.removeEventListener('scroll', throttledScrollHandler);
          if (timelineRef.current) {
            timelineRef.current.pause();
          }
        };
      } catch (error) {
        console.error('Failed to load anime.js:', error);
      }
    };

    loadAnime();
  }, [isMobile]);

  return (
    <div 
      ref={containerRef}
      className="relative h-[250vh] bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Main Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative">
          {/* Base shape */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className={`${isMobile ? 'w-48 h-48' : 'w-80 h-80'} rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 border border-gray-600`}></div>
          </div>

          {/* Exploding components */}
          {demoComponents.map((comp, index) => (
            <div key={comp.id} className="absolute inset-0 flex items-center justify-center">
              <div
                id={comp.id}
                className="relative"
                style={{ 
                  transformOrigin: 'center center',
                  zIndex: 10 + index
                }}
              >
                <div 
                  className={`${isMobile ? 'w-16 h-16' : 'w-24 h-24'} rounded-lg shadow-2xl`}
                  style={{ 
                    background: `linear-gradient(135deg, ${comp.color}, ${comp.color}88)`,
                    border: `2px solid ${comp.color}44`
                  }}
                ></div>
              </div>

              {/* Feature label */}
              <div
                id={`label-${comp.id}`}
                className={`absolute opacity-0 pointer-events-none z-50 ${
                  isMobile ? 'text-xs' : 'text-sm'
                }`}
                style={{
                  left: `calc(50% + ${comp.position.x * (isMobile ? 0.6 : 1)}px)`,
                  top: `calc(50% + ${comp.position.y * (isMobile ? 0.6 : 1)}px)`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20 shadow-2xl">
                  <p className="text-white font-medium whitespace-nowrap">
                    {comp.label}
                  </p>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/10 rotate-45 border-r border-b border-white/20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        {!animeLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-lg">Loading Animation System...</p>
            </div>
          </div>
        )}

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-center">
          <div className="animate-bounce">
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <p className="text-sm">Scroll to explode components</p>
        </div>

        {/* Status indicator */}
        <div className="absolute top-8 left-8 text-white/40">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${animeLoaded ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'}`}></div>
            <p className="text-sm">Demo Animation Ready</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplodingDemo;
