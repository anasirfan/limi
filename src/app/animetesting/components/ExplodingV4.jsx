'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, createScope } from 'animejs';
import Image from 'next/image';

const ExplodingV4 = () => {
  const containerRef = useRef(null);
  const scopeRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [animeLoaded, setAnimeLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [imageErrors, setImageErrors] = useState([]);

  // Product parts configuration using PNG images
  const demoComponents = [
    {
      id: 'part-11',
      src: '/base_renders/Parts.11.png',
      alt: 'Base Component',
      label: 'Premium Base Frame',
      position: { x: -180, y: 120 },
      explosion: { x: -150, y: 100, rotate: -25 }
    },
    {
      id: 'part-12',
      src: '/base_renders/Parts.12.png',
      alt: 'Display Module',
      label: 'High-Resolution Display',
      position: { x: 200, y: -80 },
      explosion: { x: 180, y: -80, rotate: 15 }
    },
    {
      id: 'part-13',
      src: '/base_renders/Parts.13.png',
      alt: 'Control Interface',
      label: 'Tactile Control System',
      position: { x: -150, y: -120 },
      explosion: { x: -120, y: -100, rotate: -30 }
    },
    {
      id: 'part-14',
      src: '/base_renders/Parts.14.png',
      alt: 'Sensor Array',
      label: 'Advanced Sensor Array',
      position: { x: 160, y: 140 },
      explosion: { x: 140, y: 120, rotate: 20 }
    },
    {
      id: 'part-15',
      src: '/base_renders/Parts.15.png',
      alt: 'Processing Unit',
      label: 'AI Processing Core',
      position: { x: -120, y: 180 },
      explosion: { x: -100, y: 150, rotate: -15 }
    },
    {
      id: 'part-16',
      src: '/base_renders/Parts.16.png',
      alt: 'Connectivity Module',
      label: 'Wireless Connectivity',
      position: { x: 120, y: -140 },
      explosion: { x: 100, y: -120, rotate: 25 }
    },
    {
      id: 'part-17',
      src: '/base_renders/Parts.17.png',
      alt: 'Power System',
      label: 'Advanced Power Management',
      position: { x: 0, y: 200 },
      explosion: { x: 0, y: 180, rotate: 10 }
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
    if (!containerRef.current) return;

    try {
      const mobileScale = isMobile ? 0.6 : 1;

      // Create anime.js v4 scope
      scopeRef.current = createScope({ root: containerRef.current }).add(self => {
        
        // Store animations for later control
        const animations = [];
        const labelAnimations = [];
        
        // Create explosion animations for each component
        demoComponents.forEach((comp, index) => {
          // Component explosion animation
          const componentAnimation = animate(`#${comp.id}`, {
            translateX: comp.explosion.x * mobileScale,
            translateY: comp.explosion.y * mobileScale,
            rotate: comp.explosion.rotate,
            scale: isMobile ? 0.8 : 1.0, // Keep scale at 1 or smaller
            opacity: 1, // Keep fully visible
            ease: 'out(3)',
            duration: 1200 + (index * 50),
            autoplay: false
          });

          // Label animation
          const labelAnimation = animate(`#label-${comp.id}`, {
            opacity: 1,
            translateY: 0,
            scale: 1,
            ease: 'out(2)',
            duration: 800,
            autoplay: false
          });

          animations.push(componentAnimation);
          labelAnimations.push(labelAnimation);
        });

        // Master control method
        self.add('explodeAll', (progress = 1) => {
          console.log('explodeAll called with progress:', progress);
          demoComponents.forEach((comp, index) => {
            const threshold = index / demoComponents.length;
            const shouldExplode = progress > threshold;
            console.log(`Component ${comp.id}: shouldExplode=${shouldExplode}, progress=${progress}, threshold=${threshold}`);
            
            if (shouldExplode) {
              // Calculate how far through this component's animation we should be
              const componentProgress = Math.min(1, (progress - threshold) / (1 / demoComponents.length));
              
              // Seek to the right position in the animation instead of just playing
              animations[index].seek(componentProgress * animations[index].duration);
              labelAnimations[index].seek(componentProgress * labelAnimations[index].duration);
              
              console.log(`Seeking ${comp.id} to progress: ${componentProgress}`);
            } else {
              // Reset to beginning
              animations[index].seek(0);
              labelAnimations[index].seek(0);
            }
          });
        });

      });

      // Animation progress state
      let animationProgress = 0;
      const maxProgress = 1;
      const progressStep = 0.05;

      // Wheel event handler for scroll-based animation control
      const handleWheel = (event) => {
        if (!scopeRef.current) return;

        event.preventDefault();
        
        // Determine scroll direction
        const delta = event.deltaY > 0 ? progressStep : -progressStep;
        
        // Update progress
        const oldProgress = animationProgress;
        animationProgress = Math.max(0, Math.min(maxProgress, animationProgress + delta));
        
        console.log(`Wheel event: deltaY=${event.deltaY}, oldProgress=${oldProgress}, newProgress=${animationProgress}`);
        
        // Apply easing to the progress for smoother animation
        const easedProgress = animationProgress * animationProgress * (3 - 2 * animationProgress);

        // Control animations based on scroll progress
        scopeRef.current.methods.explodeAll(easedProgress);
      };

      // Touch event handlers for mobile
      let touchStartY = 0;
      let touchStartProgress = 0;

      const handleTouchStart = (event) => {
        touchStartY = event.touches[0].clientY;
        touchStartProgress = animationProgress;
      };

      const handleTouchMove = (event) => {
        if (!scopeRef.current) return;
        
        event.preventDefault();
        const touchCurrentY = event.touches[0].clientY;
        const touchDelta = (touchStartY - touchCurrentY) / 200; // Sensitivity adjustment
        
        animationProgress = Math.max(0, Math.min(maxProgress, touchStartProgress + touchDelta));
        
        const easedProgress = animationProgress * animationProgress * (3 - 2 * animationProgress);
        scopeRef.current.methods.explodeAll(easedProgress);
      };

      // Add event listeners to window instead of container for better capture
      window.addEventListener('wheel', handleWheel, { passive: false });
      containerRef.current.addEventListener('touchstart', handleTouchStart, { passive: false });
      containerRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
      
      console.log('Event listeners added - wheel events should now work');
      
      setAnimeLoaded(true);

      return () => {
        window.removeEventListener('wheel', handleWheel);
        if (containerRef.current) {
          containerRef.current.removeEventListener('touchstart', handleTouchStart);
          containerRef.current.removeEventListener('touchmove', handleTouchMove);
        }
        if (scopeRef.current) {
          scopeRef.current.revert();
        }
      };

    } catch (error) {
      console.error('Failed to initialize anime.js v4:', error);
    }
  }, [isMobile]);

  return (
    <div 
      ref={containerRef}
      className="relative h-screen bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Main Container */}
      <div className="h-full flex items-center justify-center">
        <div className="relative">
          {/* Base product image as reference */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <Image
              src="/base_renders/render1.png"
              alt="Base Product"
              width={isMobile ? 300 : 500}
              height={isMobile ? 300 : 500}
              className="object-contain"
              priority
              onLoad={() => console.log('Base image loaded: /base_renders/render1.png')}
              onError={() => console.error('Failed to load base image: /base_renders/render1.png')}
            />
          </div>

          {/* Exploding product parts */}
          {demoComponents.map((comp, index) => (
            <div key={comp.id} className="absolute inset-0 flex items-center justify-center">
              <div
                id={comp.id}
                className="relative"
                style={{ 
                  transformOrigin: 'center center',
                  zIndex: 10 + index,
                  // Start with slight offset so you can see all images
                  transform: `translate(${index * 10 - 30}px, ${index * 8 - 24}px) rotate(${index * 2 - 6}deg) scale(1)`
                }}
              >
                {/* Try to load image first */}
                <Image
                  id={`${comp.id}-image`}
                  src={comp.src}
                  alt={comp.alt}
                  width={isMobile ? 300 : 500}
                  height={isMobile ? 300 : 500}
                  className="object-contain drop-shadow-2xl"
                  style={{ minWidth: isMobile ? '300px' : '500px', minHeight: isMobile ? '300px' : '500px' }}
                  priority={index < 3}
                  onLoad={(e) => {
                    setImagesLoaded(prev => prev + 1);
                    console.log(`Loaded: ${comp.src}`, {
                      naturalWidth: e.target.naturalWidth,
                      naturalHeight: e.target.naturalHeight,
                      displayWidth: e.target.width,
                      displayHeight: e.target.height
                    });
                  }}
                  onError={(e) => {
                    console.error(`Failed to load: ${comp.src}`);
                    setImageErrors(prev => [...prev, comp.src]);
                    // Hide the broken image
                    e.target.style.display = 'none';
                  }}
                />
                
                {/* Fallback colored box if image fails */}
                {imageErrors.includes(comp.src) && (
                  <div 
                    className={`${isMobile ? 'w-16 h-16' : 'w-24 h-24'} rounded-lg shadow-2xl flex items-center justify-center`}
                    style={{ 
                      background: `linear-gradient(135deg, #4f46e5, #7c3aed)`,
                      border: `2px solid #4f46e544`
                    }}
                  >
                    <span className="text-white text-xs font-bold">
                      {comp.id.split('-')[1]}
                    </span>
                  </div>
                )}
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
                  transform: 'translate(-50%, -50%) translateY(30px) scale(0.8)'
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

        {/* Interaction Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-center">
          <div className="animate-bounce">
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <p className="text-sm">Scroll wheel or swipe to explode components</p>
        </div>

        {/* Status indicator */}
        <div className="absolute top-8 left-8 text-white/40">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${animeLoaded ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'}`}></div>
              <p className="text-sm">Anime.js v4 Ready</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${imagesLoaded > 0 ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <p className="text-sm">Images: {imagesLoaded}/{demoComponents.length + 1}</p>
            </div>
            {imageErrors.length > 0 && (
              <div className="text-red-400 text-xs">
                <p>Failed: {imageErrors.length} images</p>
              </div>
            )}
            {/* Test buttons */}
            <div className="flex space-x-2 mt-4">
              <button 
                onClick={() => scopeRef.current?.methods.explodeAll(0)}
                className="px-2 py-1 bg-blue-500 text-white text-xs rounded"
              >
                Reset
              </button>
              <button 
                onClick={() => scopeRef.current?.methods.explodeAll(1)}
                className="px-2 py-1 bg-red-500 text-white text-xs rounded"
              >
                Explode
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplodingV4;
