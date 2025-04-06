"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaPlay, FaPause, FaRedo, FaRedoAlt } from "react-icons/fa";
import Image from "next/image";

// Brand colors from the existing components
const brandColors = {
  charlestonGreen: "#292929",
  etonBlue: "#93CFA2",
  emerald: "#54BB74",
  white: "#FFFFFF",
  black: "#000000",
};

/**
 * VideoHighlightsCarousel component that displays a carousel of video highlights
 * similar to Apple's "Get the highlights" section
 */
const VideoHighlightsCarousel = () => {
  // State variables
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFullVideo, setShowFullVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(10); // Default duration in seconds
  const [showReplayButton, setShowReplayButton] = useState(false);
  
  // Refs
  const carouselRef = useRef(null);
  const videoRef = useRef(null);
  const fullVideoRef = useRef(null);
  const progressIntervalRef = useRef(null);
  
  // Calculate slide times based on provided timecodes
  // Timecodes: 0:00:00:00, 0:00:06:27, 0:00:16:02, 0:00:23:10
  // Converting to seconds: 0, 6.9, 16.02, 23.1, 26.57
  const slideTimesRef = useRef([0, 6.9, 16.02, 23.1, 26.57]); // Start times for each slide in seconds
  const slideDurationsRef = useRef([6.9, 9.12, 7.08, 3.47, 3.43]); // Duration of each slide in seconds
  
  // Slide content with actual content relevant to LIMI Lighting - now with 5 slides
  const slides = [
    {
      id: 0,
      title: "Smart Lighting Revolution",
      description: "Experience the future of lighting with LIMI's intelligent solutions.",
      thumbnailSrc: "/images/slides/1.png",
    },
    {
      id: 1,
      title: "Seamless Control",
      description: "Adjust your lighting with intuitive controls and smart integrations.",
      thumbnailSrc: "/images/slides/2.png",
    },
    {
      id: 2,
      title: "Perfect Ambiance",
      description: "Create the perfect mood for any occasion with customizable settings.",
      thumbnailSrc: "/images/slides/3.png",
    },
    {
      id: 3,
      title: "Energy Efficiency",
      description: "Save energy while enjoying premium lighting experiences.",
      thumbnailSrc: "/images/slides/4.png",
    },
    {
      id: 4,
      title: "Smart Home Integration",
      description: "Connect your lighting system with other smart home devices for a unified experience.",
      thumbnailSrc: "/images/slides/5.png",
    },
  ];

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Initialize video and event listeners
  useEffect(() => {
    const initVideo = () => {
      if (!videoRef.current) return;
      
      // Add event listeners to video
      videoRef.current.addEventListener("loadeddata", handleVideoLoaded);
      videoRef.current.addEventListener("loadedmetadata", handleMetadataLoaded);
      videoRef.current.addEventListener("ended", handleVideoEnded);
      videoRef.current.addEventListener("timeupdate", handleTimeUpdate);

      // Set initial time to first slide
      videoRef.current.currentTime = slideTimesRef.current[0];
      
      // Try to preload the video
      videoRef.current.load();
    };
    
    // Delay initialization to ensure DOM is ready
    const timer = setTimeout(() => {
      initVideo();
    }, 500);

    return () => {
      clearTimeout(timer);
      if (videoRef.current) {
        videoRef.current.removeEventListener("loadeddata", handleVideoLoaded);
        videoRef.current.removeEventListener("loadedmetadata", handleMetadataLoaded);
        videoRef.current.removeEventListener("ended", handleVideoEnded);
        videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
      clearInterval(progressIntervalRef.current);
    };
  }, []);
  
  // Handle video metadata loaded - update duration
  const handleMetadataLoaded = () => {
    if (!videoRef.current) return;
    
    const duration = videoRef.current.duration;
    setVideoDuration(duration);
    
    // We're using fixed slide times based on the provided timecodes
    // so we don't need to recalculate them here
  };
  
  // Handle video loaded event
  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    // Auto-play the video when loaded
    playVideo();
  };
  
  // Handle video ended event
  const handleVideoEnded = () => {
    setIsPlaying(false);
    setCurrentSlide(0);
    setShowReplayButton(true);
    if (videoRef.current) {
      videoRef.current.currentTime = slideTimesRef.current[0];
    }
  };
  
  // Play video with error handling
  const playVideo = () => {
    if (!videoRef.current) return;
    
    videoRef.current.play().catch(error => {
      console.error("Video playback failed:", error);
      // If autoplay is prevented, show a play button or message
      setIsPlaying(false);
    });
    setIsPlaying(true);
    setShowReplayButton(false);
  };

  // Handle video time updates
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const currentTime = videoRef.current.currentTime;
    const totalDuration = videoRef.current.duration || videoDuration; // Use measured duration or fallback
    
    // Calculate overall video progress
    setVideoProgress((currentTime / totalDuration) * 100);

    // Determine current slide based on time
    for (let i = slideTimesRef.current.length - 1; i >= 0; i--) {
      if (currentTime >= slideTimesRef.current[i]) {
        // Only update if different from current slide
        if (i !== currentSlide) {
          setCurrentSlide(i);
        }
        
        // Calculate progress within current slide
        const slideStartTime = slideTimesRef.current[i];
        const slideDuration = slideDurationsRef.current[i];
        const slideElapsedTime = currentTime - slideStartTime;
        const slideProgressValue = Math.min((slideElapsedTime / slideDuration) * 100, 100);
        setSlideProgress(slideProgressValue);
        
        break;
      }
    }

    // Check if we've reached the end of the last slide
    const lastSlideIndex = slideTimesRef.current.length - 1;
    const lastSlideEndTime = slideTimesRef.current[lastSlideIndex] + slideDurationsRef.current[lastSlideIndex];
    
    if (currentTime >= lastSlideEndTime - 0.1) {
      setIsPlaying(false);
      setShowReplayButton(true);
    }
  };

  // Restart the carousel from the beginning
  const handleReplay = () => {
    if (!videoRef.current) return;
    
    videoRef.current.currentTime = slideTimesRef.current[0];
    setCurrentSlide(0);
    setSlideProgress(0);
    playVideo();
    setShowReplayButton(false);
  };

  // Play/pause the video
  const togglePlayPause = () => {
    if (!videoRef.current) return;

    // If we're at the end, restart from beginning
    if (currentSlide === slides.length - 1 && slideProgress >= 99.9) {
      handleReplay();
      return;
    }

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      playVideo();
    }
  };

  // Navigate to a specific slide
  const goToSlide = (index) => {
    if (!videoRef.current || index < 0 || index >= slides.length) return;
    
    videoRef.current.currentTime = slideTimesRef.current[index];
    setCurrentSlide(index);
    setShowReplayButton(false);
    
    // If video was not playing, start playing when navigating to a slide
    if (!isPlaying) {
      setTimeout(() => {
        playVideo();
      }, 50);
    }
  };

  // Open full video modal
  const openFullVideo = () => {
    setShowFullVideo(true);
    if (fullVideoRef.current) {
      fullVideoRef.current.currentTime = 0;
      fullVideoRef.current.play().catch(error => {
        console.error("Full video playback failed:", error);
      });
    }
    
    // Pause the carousel video
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Close full video modal
  const closeFullVideo = () => {
    setShowFullVideo(false);
    if (fullVideoRef.current) {
      fullVideoRef.current.pause();
    }
  };

  return (
    <section 
      className="relative py-24 bg-black text-white overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, #000000 20%, #000000 80%, rgba(0,0,0,0.95) 100%)"
      }}
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Header with title and "Watch the film" link */}
        <div className="flex justify-between items-center mb-8 px-2">
          <h2 className="text-3xl md:text-4xl font-bold font-[Amenti]">Get the highlights.</h2>
          <button 
            onClick={openFullVideo}
            className="flex items-center text-[#54BB74] hover:text-[#93CFA2] transition-colors"
          >
            Watch the film <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full border border-[#54BB74]">○</span>
          </button>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div 
            ref={carouselRef}
            className="relative overflow-hidden bg-black shadow-2xl"
            style={{ 
              aspectRatio: isMobile ? "9/16" : "16/9",
              borderRadius: "24px",
              boxShadow: "0 20px 50px -12px rgba(0,0,0,0.5), 0 0 30px rgba(0,0,0,0.3) inset"
            }}
          >
   
            <video
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full object-cover"
              playsInline
              muted
              preload="auto"
            >
              {isMobile ? (
                <source src="/videos/mobileview_slider.m4v" type="video/mp4" />
              ) : (
                <source src="/videos/webview_slider.m4v" type="video/mp4" />
              )}
            </video>

            {!videoLoaded && (
              <div className="absolute top-0 left-0 w-full h-full">
                <Image
                  src={slides[currentSlide].thumbnailSrc}
                  alt={slides[currentSlide].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none"></div>

            {/* Slide content overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-10 max-sm:w-[80%]">
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                {slides[currentSlide].title}
              </h3>
              <p className="text-sm md:text-base opacity-80">
                {slides[currentSlide].description}
              </p>
            </div>

            {/* Play/Pause/Replay button */}
            <button
              onClick={togglePlayPause}
              className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-12 h-12 rounded-full bg-[#292929] text-[#54BB74] border border-[#54BB74] flex items-center justify-center transition-all hover:bg-[#54BB74] hover:text-white z-10"
              aria-label={isPlaying ? "Pause" : (currentSlide === slides.length - 1 && slideProgress >= 99.9) ? "Replay" : "Play"}
              style={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
              }}
            >
              {isPlaying ? (
                <FaPause />
              ) : (currentSlide === slides.length - 1 && slideProgress >= 99.9) ? (
                <FaRedo />
              ) : (
                <FaPlay className="ml-1" />
              )}
            </button>

            {/* Replay button (appears when all slides have ended) */}
            {showReplayButton && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-20">
                <button
                  onClick={handleReplay}
                  className="flex flex-col items-center justify-center text-[#54BB74] transition-transform hover:scale-110"
                  aria-label="Replay highlights"
                >
                  <FaRedoAlt className="text-4xl mb-2" />
                  <span className="text-lg font-medium">Replay Highlights</span>
                </button>
              </div>
            )}
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center items-center mt-10 space-x-3">
            {slides.map((slide, index) => (
              <button 
                key={slide.id} 
                className="group focus:outline-none"
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentSlide ? (
                  // Active slide - expanding indicator with progress
                  <div className="relative w-10 h-[5px] bg-[#292929] rounded-full overflow-hidden transition-all duration-300">
                    <div 
                      className="h-full bg-[#54BB74] transition-all duration-100 ease-linear"
                      style={{ width: `${slideProgress}%` }}
                    />
                  </div>
                ) : index < currentSlide ? (
                  // Past slide - filled dot
                  <div className="w-[7px] h-[7px] rounded-full bg-[#54BB74] transition-all duration-300"></div>
                ) : (
                  // Future slide - empty dot
                  <div className="w-[7px] h-[7px] rounded-full bg-[#292929] border border-[#54BB74] transition-all duration-300"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Full video modal */}
      {showFullVideo && (
        <div className="fixed inset-0 z-[99] bg-black flex items-center justify-center">
          <button
            onClick={closeFullVideo}
            className="absolute top-24 right-16 z-10 text-white text-2xl"
            aria-label="Close"
          >
            ✕
          </button>
          <video
            ref={fullVideoRef}
            className="w-full h-full object-contain"
            controls
            autoPlay
            playsInline
          >
            {isMobile ? (
              <source src="/videos/mobileview_slider.m4v" type="video/mp4" />
            ) : (
              <source src="/videos/webview_slider.m4v" type="video/mp4" />
            )}
          </video>
        </div>
      )}
    </section>
  );
};

export default VideoHighlightsCarousel;
