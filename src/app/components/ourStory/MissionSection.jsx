'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext'

export default function MissionSection() {
  const missionRef = useRef(null);
  const videoRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { colors, theme } = useTheme();

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (videoPlaying) {
      // Save scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [videoPlaying]);

  // Handle keyboard controls for the video modal
  useEffect(() => {
    if (!videoPlaying) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          setVideoPlaying(false);
          break;
        case 'm':
          setIsMuted((prev) => !prev);
          break;
        case 'f':
          toggleFullscreen();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [videoPlaying, isMuted]);

  // Toggle fullscreen for the video
  const toggleFullscreen = () => {
    if (!videoRef.current) return;

    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Update fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section data-section="mission" className="max-w-4xl mx-auto text-center mb-24">
      <motion.div
        ref={missionRef}
        className="relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          className="inline-block mb-6"
          variants={itemVariants}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{
              backgroundColor: `${colors.primary}20`,
              color: colors.primary
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-6"
          variants={itemVariants}
          style={{ color: colors.text }}
        >
          Lighting That Adapts to You
        </motion.h2>

        <motion.p
          className="text-lg mb-6 leading-relaxed"
          variants={itemVariants}
          style={{ color: theme === 'light' ? '#4A4A4A' : '#CCCCCC' }}
        >
          LIMI was born from a vision of dynamic lighting that adapts to life itself — where you can shape your environment with light as easily as playing music.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8"
          variants={itemVariants}
        >
          {['Smart', 'Beautiful', 'Adaptive', 'Intuitive'].map((keyword, index) => (
            <motion.div
              key={keyword}
              className="px-4 py-2 rounded-full text-sm font-medium w-[45%] md:w-auto text-center"
              style={{
                backgroundColor: `${colors.primary}${theme === 'light' ? '15' : '25'}`,
                color: colors.primary,
                border: `1px solid ${colors.primary}40`
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: colors.primary,
                color: '#FFFFFF'
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              {keyword}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="relative inline-block group cursor-pointer"
          variants={itemVariants}
          onClick={() => setVideoPlaying(!videoPlaying)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <p
            className="text-xl md:text-2xl font-medium group-hover:text-white transition-colors duration-300"
            style={{ color: colors.primary }}
          >
            <span className="md:hidden">We're building the future<br />of light control</span>
            <span className="hidden md:inline">We're building the future of light control</span>
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
              {videoPlaying ? '◼' : '▶'}
            </span>
          </p>
          <div
            className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
            style={{ backgroundColor: colors.primary }}
          ></div>
        </motion.div>

        {/* Video modal */}
        <AnimatePresence>
          {videoPlaying && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center p-4"
              style={{
                backgroundColor: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                zIndex: 9999,
              }}
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.3 }}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setVideoPlaying(false);
                }
              }}
            >
              <motion.div
                className="relative w-full max-w-[95%] md:max-w-3xl bg-black rounded-xl overflow-hidden"
                style={{
                  boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px ${colors.primary}30`,
                  zIndex: 10000,
                }}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Control buttons */}
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  {/* Play/Pause button */}
                  <button
                    className="bg-black/50 text-white rounded-full p-2 hover:bg-white/20 transition-colors"
                    onClick={() => {
                      if (videoRef.current) {
                        if (videoRef.current.paused) {
                          videoRef.current.play();
                          setIsPaused(false);
                        } else {
                          videoRef.current.pause();
                          setIsPaused(true);
                        }
                      }
                    }}
                    aria-label={isPaused ? "Play video" : "Pause video"}
                    style={{ backgroundColor: isPaused ? 'rgba(0,0,0,0.5)' : `${colors.primary}40` }}
                  >
                    {isPaused ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>

                  {/* Mute/Unmute button */}
                  <button
                    className="bg-black/50 text-white rounded-full p-2 hover:bg-white/20 transition-colors"
                    onClick={() => setIsMuted((prev) => !prev)}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                    style={{ backgroundColor: isMuted ? 'rgba(0,0,0,0.5)' : `${colors.primary}40` }}
                  >
                    {isMuted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    )}
                  </button>

                  {/* Fullscreen button */}
                  <button
                    className="bg-black/50 text-white rounded-full p-2 hover:bg-white/20 transition-colors"
                    onClick={toggleFullscreen}
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                    style={{ backgroundColor: isFullscreen ? `${colors.primary}40` : 'rgba(0,0,0,0.5)' }}
                  >
                    {isFullscreen ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0l5 0m-5 0l0 5M9 15l-5 5m0 0l5 0m-5 0l0 -5M15 9l5 -5m0 0l-5 0m5 0l0 5M15 15l5 5m0 0l-5 0m5 0l0 -5" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    )}
                  </button>

                  {/* Close button */}
                  <button
                    className="bg-black/50 text-white rounded-full p-2 hover:bg-white/20 transition-colors"
                    onClick={() => setVideoPlaying(false)}
                    aria-label="Close video"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Video with controls */}
                <div className="aspect-video relative">
                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-white/20 border-t-emerald-500 rounded-full animate-spin"></div>
                        <p className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 text-white font-medium">Loading video...</p>
                      </div>
                    </div>
                  )}

                  {/* Large play button overlay */}
                  {isPaused && !isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
                      onClick={() => {
                        if (videoRef.current && videoRef.current.paused) {
                          videoRef.current.play();
                          setIsPaused(false);
                        }
                      }}
                    >
                      <motion.div
                        className="bg-black/30 text-white rounded-full p-6 backdrop-blur-sm"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1.1, backgroundColor: `${colors.primary}40` }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                      </motion.div>
                    </div>
                  )}

                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                    muted={isMuted}
                    ref={(el) => {
                      videoRef.current = el;
                      if (el) el.focus();
                    }}
                    onLoadStart={() => setIsLoading(true)}
                    onCanPlay={() => setIsLoading(false)}
                    onError={() => setIsLoading(false)}
                    onPlay={() => setIsPaused(false)}
                    onPause={() => setIsPaused(true)}
                    onClick={() => {
                      if (videoRef.current) {
                        if (videoRef.current.paused) {
                          videoRef.current.play();
                          setIsPaused(false);
                        } else {
                          videoRef.current.pause();
                          setIsPaused(true);
                        }
                      }
                    }}
                  >
                    <source src="/videos/customerprofile_anim.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Video title and keyboard shortcuts */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-20">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-end items-center gap-2 md:gap-0">
                    {/* Title: always one line, even on mobile */}
                    <p className="text-white text-lg font-medium whitespace-nowrap">
                      Customer Profile Animation
                    </p>
                    {/* Shortcuts: always visible, one line on mobile */}
                    <div className="md:flex  hidden  flex-wrap gap-x-3 gap-y-1 text-white/70 text-xs md:space-x-3 md:gap-y-0">
                      <span className="inline-flex items-center"><kbd className="px-2 py-1 bg-white/10 rounded mr-1">ESC</kbd> Close</span>
                      <span className="inline-flex items-center"><kbd className="px-2 py-1 bg-white/10 rounded mr-1">M</kbd> Mute</span>
                      <span className="inline-flex items-center"><kbd className="px-2 py-1 bg-white/10 rounded mr-1">F</kbd> Fullscreen</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}