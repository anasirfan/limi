'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const VideoScrollHeroOptimized = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

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
    
    setIsVideoLoaded(true);
    setVideoDuration(video.duration);
    
    // Ensure video is ready for scrubbing
    video.pause();
    video.currentTime = 0;
    
    // Preload video for smoother playback
    video.preload = 'auto';
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Add multiple event listeners for better compatibility
    const events = ['loadedmetadata', 'canplaythrough', 'loadeddata'];
    events.forEach(event => {
      video.addEventListener(event, handleVideoLoad);
    });

    // Handle video errors
    const handleError = () => {
      console.error('Video failed to load');
    };
    video.addEventListener('error', handleError);

    return () => {
      events.forEach(event => {
        video.removeEventListener(event, handleVideoLoad);
      });
      video.removeEventListener('error', handleError);
    };
  }, [handleVideoLoad]);

  useEffect(() => {
    if (!isVideoLoaded || !videoDuration) return;

    const video = videoRef.current;
    const container = containerRef.current;
    const progressBar = progressBarRef.current;

    if (!video || !container) return;

    // Initialize Lenis with optimized settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // Create scroll-triggered animation with ultra-smooth scrubbing
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.03, // Ultra-smooth scrubbing
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const targetTime = progress * videoDuration;
        
        // Update progress state
        setScrollProgress(progress);
        
        // Update video time with throttling
        requestAnimationFrame(() => {
          updateVideoTime(targetTime);
        });

        // Update progress bar
        if (progressBar) {
          gsap.set(progressBar, {
            scaleX: progress,
            transformOrigin: 'left center'
          });
        }
      },
      onRefresh: () => {
        video.currentTime = 0;
        setScrollProgress(0);
      }
    });

    // Optimized RAF loop
    function raf(time) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Cleanup function
    return () => {
      scrollTrigger.kill();
      lenis.destroy();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isVideoLoaded, videoDuration, updateVideoTime]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="metadata"
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
            Ultra-smooth video synchronization with scroll progress using GSAP and Lenis
          </p>
          
          {/* Scroll Progress Indicator */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className="text-sm opacity-75">Progress:</span>
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
        <div>GSAP + Lenis</div>
        <div>Smooth Scroll</div>
      </div>
    </div>
  );
};

export default VideoScrollHeroOptimized;
