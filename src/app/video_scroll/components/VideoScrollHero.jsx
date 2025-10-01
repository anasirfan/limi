'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const VideoScrollHero = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    // Handle video load
    const handleVideoLoad = () => {
      setIsVideoLoaded(true);
      setVideoDuration(video.duration);
      
      // Ensure video is paused and at start
      video.pause();
      video.currentTime = 0;
    };

    // Add event listeners
    video.addEventListener('loadedmetadata', handleVideoLoad);
    video.addEventListener('canplaythrough', handleVideoLoad);

    return () => {
      video.removeEventListener('loadedmetadata', handleVideoLoad);
      video.removeEventListener('canplaythrough', handleVideoLoad);
    };
  }, []);

  useEffect(() => {
    if (!isVideoLoaded || !videoDuration) return;

    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    // Initialize Lenis for ultra-smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Create scroll-triggered animation with ultra-smooth scrubbing
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.05, // Ultra-smooth scrubbing with minimal delay
      pin: true, // Pin the video while scrolling
      onUpdate: (self) => {
        // Calculate video time based on scroll progress
        const progress = self.progress;
        const targetTime = progress * videoDuration;
        
        // Use requestAnimationFrame for smooth video updates
        requestAnimationFrame(() => {
          if (Math.abs(video.currentTime - targetTime) > 0.05) {
            video.currentTime = targetTime;
          }
        });
      },
      onRefresh: () => {
        // Reset video to start when ScrollTrigger refreshes
        video.currentTime = 0;
      }
    });

    // Connect Lenis with GSAP ScrollTrigger
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Cleanup function
    return () => {
      scrollTrigger.kill();
      lenis.destroy();
    };
  }, [isVideoLoaded, videoDuration]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="metadata"
        style={{
          filter: 'brightness(0.8)', // Slight darkening for better text contrast
        }}
      >
        <source src="/limiai/base_animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
        <div className="text-center text-white z-10 px-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            <span className="block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Video Scroll
            </span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Experience ultra-smooth video synchronization with scroll
          </p>
          <div className="text-sm md:text-base opacity-75">
            Scroll down to control video playback
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg">Loading video...</p>
          </div>
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <div className="text-sm mb-2">Scroll</div>
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-20">
        <div 
          className="h-full bg-white transition-all duration-100 ease-out"
          style={{
            width: isVideoLoaded && videoDuration ? 
              `${(videoRef.current?.currentTime || 0) / videoDuration * 100}%` : '0%'
          }}
        />
      </div>
    </div>
  );
};

export default VideoScrollHero;
