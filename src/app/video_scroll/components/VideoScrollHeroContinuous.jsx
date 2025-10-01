'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const VideoScrollHeroContinuous = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Optimized video time update using throttling
  const updateVideoTime = useCallback((targetTime) => {
    const video = videoRef.current;
    if (!video) return;
    
    // Only update if difference is significant enough
    if (Math.abs(video.currentTime - targetTime) > 0.03) {
      video.currentTime = targetTime;
    }
  }, []);

  // Handle video load with better error handling
  const handleVideoLoad = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    
    console.log('Video loaded successfully, duration:', video.duration);
    setIsVideoLoaded(true);
    setVideoDuration(video.duration);
    
    // Ensure video is ready for scrubbing
    video.pause();
    video.currentTime = 0;
  }, []);

  const handleVideoError = useCallback((e) => {
    console.error('Video failed to load:', e);
    console.error('Video error details:', e.target.error);
    // Still set as loaded to show the interface
    setIsVideoLoaded(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    console.log('Setting up video event listeners');

    // Add multiple event listeners for better compatibility
    const events = ['loadedmetadata', 'canplaythrough', 'loadeddata'];
    events.forEach(event => {
      video.addEventListener(event, handleVideoLoad);
    });

    video.addEventListener('error', handleVideoError);

    // Force load the video
    video.load();

    // Fallback timeout - if video doesn't load in 5 seconds, show interface anyway
    const timeout = setTimeout(() => {
      if (!isVideoLoaded) {
        console.log('Video loading timeout, showing interface anyway');
        setIsVideoLoaded(true);
        setVideoDuration(10); // Default duration
      }
    }, 5000);

    return () => {
      events.forEach(event => {
        video.removeEventListener(event, handleVideoLoad);
      });
      video.removeEventListener('error', handleVideoError);
      clearTimeout(timeout);
    };
  }, [handleVideoLoad, handleVideoError, isVideoLoaded]);

  useEffect(() => {
    if (!isVideoLoaded || !videoDuration) return;

    const video = videoRef.current;
    const progressBar = progressBarRef.current;

    if (!video) return;

    // Simple scroll handler without conflicts
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      ) - window.innerHeight;
      
      // Ensure we have a valid document height
      if (documentHeight <= 0) return;
      
      const progress = Math.min(Math.max(scrollTop / documentHeight, 0), 1);
      const targetTime = progress * videoDuration;
      
      // Update progress state
      setScrollProgress(progress);
      
      // Update video time with smaller threshold for smoother updates
      if (Math.abs(video.currentTime - targetTime) > 0.05) {
        video.currentTime = targetTime;
      }

      // Update progress bar
      if (progressBar) {
        progressBar.style.transform = `scaleX(${progress})`;
      }
    };

    // Add scroll listener with throttling
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Initial call
    handleScroll();

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [isVideoLoaded, videoDuration]);


  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-screen overflow-hidden bg-black z-0"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        style={{
          filter: 'brightness(0.8) contrast(1.1)',
        }}
      >
        <source src="/limiai/base_animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white px-4 max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 tracking-tight leading-none">
            <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Video Scroll
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-light mt-4 opacity-90">
              Experience
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
            Scroll down to control video playback - each scroll moves the video forward
          </p>
          
          {/* Scroll Progress Indicator */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className="text-sm opacity-75">Video Progress:</span>
            <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-100 ease-out rounded-full"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
            <span className="text-sm opacity-75 font-mono">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
          
          <div className="text-sm md:text-base opacity-75 flex items-center justify-center space-x-2">
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span>Scroll to control video playback</span>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-20">
          <div className="text-white text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
              <div className="absolute inset-0 rounded-full h-16 w-16 border-r-2 border-l-2 border-white/30 mx-auto animate-pulse"></div>
            </div>
            <p className="text-lg font-medium">Loading video...</p>
            <p className="text-sm opacity-75 mt-2">Preparing smooth scroll experience</p>
          </div>
        </div>
      )}

      {/* Enhanced Progress Bar at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-10">
        <div 
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transform-gpu"
          style={{ transformOrigin: 'left center', scaleX: 0 }}
        />
      </div>

      {/* Corner Info */}
      <div className="absolute top-4 right-4 text-white text-xs opacity-50 z-10">
        <div>Video Scroll</div>
        <div>Continuous</div>
      </div>
    </div>
  );
};

export default VideoScrollHeroContinuous;
