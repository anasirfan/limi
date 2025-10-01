'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollSVGPage() {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle video load
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoLoad = () => {
      if (video.duration && video.duration > 0) {
        console.log('Video loaded successfully, duration:', video.duration);
        setIsVideoLoaded(true);
        setVideoDuration(video.duration);
        video.pause();
        video.currentTime = 0;
      }
    };

    const handleError = (e) => {
      console.error('Video error:', e);
    };

    video.addEventListener('loadedmetadata', handleVideoLoad);
    video.addEventListener('loadeddata', handleVideoLoad);
    video.addEventListener('error', handleError);

    // Timeout fallback - force show after 3 seconds
    const timeout = setTimeout(() => {
      console.log('Forcing video load after timeout');
      const duration = video.duration || 30; // Use actual duration or default
      setIsVideoLoaded(true);
      setVideoDuration(duration);
      video.pause();
      video.currentTime = 0;
    }, 3000);

    return () => {
      video.removeEventListener('loadedmetadata', handleVideoLoad);
      video.removeEventListener('loadeddata', handleVideoLoad);
      video.removeEventListener('error', handleError);
      clearTimeout(timeout);
    };
  }, []);

  // Handle scroll synchronization with frame-perfect snapping
  useEffect(() => {
    if (!isVideoLoaded || !videoDuration) return;

    const video = videoRef.current;
    if (!video) return;

    // Video specs: Optimized for instant control
    const totalFrames = 530;
    const fps = 30;
    const frameDuration = 1 / fps;

    let rafId = null;
    let lastScrollTop = -1;
    let lastUpdateTime = 0;

    const updateVideo = () => {
      const now = performance.now();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Update every frame, no throttling
      if (scrollTop !== lastScrollTop || now - lastUpdateTime > 16) {
        lastScrollTop = scrollTop;
        lastUpdateTime = now;
        
        const documentHeight = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight
        ) - window.innerHeight;

        if (documentHeight > 0) {
          const progress = Math.min(Math.max(scrollTop / documentHeight, 0), 1);
          
          // Frame-perfect calculation
          const frameNumber = Math.round(progress * (totalFrames - 1));
          const snappedTime = frameNumber / fps;
          
          setScrollProgress(progress);

          // Instant video update - no conditions
          video.currentTime = snappedTime;
        }
      }

      rafId = requestAnimationFrame(updateVideo);
    };

    // Start the animation loop
    rafId = requestAnimationFrame(updateVideo);

    // Instant scroll response - multiple event listeners
    const handleScrollInstant = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      ) - window.innerHeight;

      if (documentHeight <= 0) return;

      const progress = Math.min(Math.max(scrollTop / documentHeight, 0), 1);
      const frameNumber = Math.round(progress * (totalFrames - 1));
      const snappedTime = frameNumber / fps;

      // Direct, instant update
      video.currentTime = snappedTime;
      setScrollProgress(progress);
    };

    // Multiple listeners for instant response
    window.addEventListener('scroll', handleScrollInstant, { passive: true });
    window.addEventListener('wheel', handleScrollInstant, { passive: false });
    window.addEventListener('touchmove', handleScrollInstant, { passive: true });
    document.addEventListener('scroll', handleScrollInstant, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScrollInstant);
      window.removeEventListener('wheel', handleScrollInstant);
      window.removeEventListener('touchmove', handleScrollInstant);
      document.removeEventListener('scroll', handleScrollInstant);
    };
  }, [isVideoLoaded, videoDuration]);

  return (
    <div className="relative">
      {/* Fixed video background */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden bg-black z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          style={{
            filter: 'brightness(0.85) contrast(1.1)',
          }}
        >
          <source src="/limiai/base_animation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>


        {/* Loading state */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-black flex items-center justify-center z-20">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-lg">Loading video...</p>
            </div>
          </div>
        )}

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 z-10">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-all duration-75 ease-linear"
            style={{ 
              width: `${scrollProgress * 100}%`
            }}
          />
        </div>
      </div>

      {/* Invisible scroll content - Optimized for instant control */}
      <div className="relative z-10 pointer-events-none">
        {/* 20 sections for smooth, controlled progression */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="h-screen"></div>
        ))}
      </div>
    </div>
  );
}