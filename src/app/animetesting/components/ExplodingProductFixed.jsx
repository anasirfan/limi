'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const ExplodingProductFixed = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [animeLoaded, setAnimeLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  // Product parts configuration
  const productParts = [
    {
      id: 'part-11',
      src: '/base_renders/Parts.11.png',
      alt: 'Base Component',
      label: 'Premium Base Frame',
      position: { x: -180, y: 120 },
      explosion: { x: -200, y: 150, rotate: -25 }
    },
    {
      id: 'part-12',
      src: '/base_renders/Parts.12.png',
      alt: 'Display Module',
      label: 'High-Resolution Display',
      position: { x: 200, y: -80 },
      explosion: { x: 250, y: -100, rotate: 15 }
    },
    {
      id: 'part-13',
      src: '/base_renders/Parts.13.png',
      alt: 'Control Interface',
      label: 'Tactile Control System',
      position: { x: -150, y: -120 },
      explosion: { x: -180, y: -150, rotate: -30 }
    },
    {
      id: 'part-14',
      src: '/base_renders/Parts.14.png',
      alt: 'Sensor Array',
      label: 'Advanced Sensor Array',
      position: { x: 160, y: 140 },
      explosion: { x: 200, y: 180, rotate: 20 }
    },
    {
      id: 'part-15',
      src: '/base_renders/Parts.15.png',
      alt: 'Processing Unit',
      label: 'AI Processing Core',
      position: { x: -120, y: 180 },
      explosion: { x: -150, y: 220, rotate: -15 }
    },
    {
      id: 'part-16',
      src: '/base_renders/Parts.16.png',
      alt: 'Connectivity Module',
      label: 'Wireless Connectivity',
      position: { x: 120, y: -140 },
      explosion: { x: 150, y: -180, rotate: 25 }
    },
    {
      id: 'part-17',
      src: '/base_renders/Parts.17.png',
      alt: 'Power System',
      label: 'Advanced Power Management',
      position: { x: 0, y: 200 },
      explosion: { x: 0, y: 250, rotate: 10 }
    }
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
    if (!imagesLoaded) return;

    // Dynamic import of anime.js for client-side only
    const loadAnime = async () => {
      try {
        const animeModule = await import('animejs');
        const anime = animeModule.default || animeModule;
        
        if (!anime || typeof anime.timeline !== 'function') return;

        // Create the main timeline
        const tl = anime.timeline({
          autoplay: false,
          easing: 'easeOutExpo',
          duration: 1000
        });

        // Mobile scaling factor
        const mobileScale = isMobile ? 0.6 : 1;

        // Animate each product part
        productParts.forEach((part, index) => {
          // Part explosion animation
          tl.add({
            targets: `#${part.id}`,
            translateX: part.explosion.x * mobileScale,
            translateY: part.explosion.y * mobileScale,
            rotate: part.explosion.rotate,
            scale: [1, isMobile ? 1.1 : 1.2],
            opacity: [1, 0.95],
            duration: 1200 + (index * 50),
            easing: 'easeOutExpo'
          }, index * 80);

          // Label animation
          tl.add({
            targets: `#label-${part.id}`,
            opacity: [0, 1],
            translateY: [30, 0],
            scale: [0.8, 1],
            duration: 800,
            easing: 'easeOutQuart'
          }, 600 + (index * 60));
        });

        // Background fade animation
        tl.add({
          targets: '#background-overlay',
          opacity: [0, 0.3],
          duration: 1500,
          easing: 'easeOutQuart'
        }, 0);

        timelineRef.current = tl;

        // Scroll event handler with improved performance
        const handleScroll = () => {
          if (!timelineRef.current || !containerRef.current) return;

          const scrollTop = window.pageYOffset;
          const windowHeight = window.innerHeight;
          const containerTop = containerRef.current.offsetTop;
          const containerHeight = containerRef.current.offsetHeight;

          // Calculate scroll progress within the container
          const scrollStart = containerTop - windowHeight * 0.5;
          const scrollEnd = containerTop + containerHeight - windowHeight * 0.5;
          const scrollRange = scrollEnd - scrollStart;
          
          let progress = (scrollTop - scrollStart) / scrollRange;
          progress = Math.max(0, Math.min(1, progress));

          // Apply easing to the progress for smoother animation
          const easedProgress = progress * progress * (3 - 2 * progress); // smoothstep

          // Seek to the appropriate position in the timeline
          const timelineProgress = easedProgress * timelineRef.current.duration;
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

        window.addEventListener('scroll', throttledScrollHandler, { passive: true });
        setAnimeLoaded(true);

        // Initial call to set correct position
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
  }, [imagesLoaded, isMobile]);

  // Handle image loading
  const handleImageLoad = () => {
    setLoadedCount(prev => {
      const newCount = prev + 1;
      if (newCount >= productParts.length) {
        setImagesLoaded(true);
      }
      return newCount;
    });
  };

  // Auto-set images loaded after timeout as fallback
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!imagesLoaded) {
        console.log('Images taking too long, proceeding anyway...');
        setImagesLoaded(true);
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeout);
  }, [imagesLoaded]);

  return (
    <div 
      ref={containerRef}
      className="relative h-[250vh] bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Background overlay for depth */}
      <div 
        id="background-overlay"
        className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-black/40 opacity-0"
      />

      {/* Main Product Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
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
            />
          </div>

          {/* Exploding product parts */}
          {productParts.map((part, index) => (
            <div key={part.id} className="absolute inset-0 flex items-center justify-center">
              <div
                id={part.id}
                className="product-part relative"
                style={{ 
                  transformOrigin: 'center center',
                  zIndex: 10 + index
                }}
              >
                <Image
                  src={part.src}
                  alt={part.alt}
                  width={isMobile ? 200 : 350}
                  height={isMobile ? 200 : 350}
                  className="object-contain drop-shadow-2xl"
                  onLoad={handleImageLoad}
                  onError={() => {
                    console.warn(`Failed to load image: ${part.src}`);
                    handleImageLoad(); // Still count as loaded to prevent infinite loading
                  }}
                  priority={index < 3}
                />
              </div>

              {/* Feature label */}
              <div
                id={`label-${part.id}`}
                className={`absolute opacity-0 pointer-events-none z-50 ${
                  isMobile ? 'text-xs' : 'text-sm'
                }`}
                style={{
                  left: `calc(50% + ${part.position.x * (isMobile ? 0.6 : 1)}px)`,
                  top: `calc(50% + ${part.position.y * (isMobile ? 0.6 : 1)}px)`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20 shadow-2xl">
                  <p className="text-white font-medium whitespace-nowrap">
                    {part.label}
                  </p>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/10 rotate-45 border-r border-b border-white/20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        {(!imagesLoaded || !animeLoaded) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-lg">
                {!imagesLoaded ? `Loading Product Components... (${loadedCount}/${productParts.length})` : 'Loading Animation System...'}
              </p>
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

        {/* Progress indicator */}
        <div className="absolute top-8 left-8 text-white/40">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
            <p className="text-sm">Interactive Product Exploration</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplodingProductFixed;
