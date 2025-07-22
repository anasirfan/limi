'use client';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { selectSlides, selectActiveSlideIndex, setActiveSlideIndex, replaceAllSlides } from '../../redux/slices/slidesSlice';
import SlideRenderer from './SlideRenderer';

/**
 * SlideCarousel component for displaying customer presentation slides
 * Uses Redux for state management and supports multiple layout types
 */
export default function SlideCarousel({ slides, customerId }) {
  const dispatch = useDispatch();
  const activeIndex = useSelector(selectActiveSlideIndex);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  const autoPlayTimerRef = useRef(null);
  const safeSlides = slides || [];
  const hasSlides = safeSlides.length > 0;
  const currentIndex = hasSlides ? Math.min(activeIndex, safeSlides.length - 1) : 0;
  const currentSlide = hasSlides ? safeSlides[currentIndex] : null;

  // --- Time & Session Tracking ---
  const [slideTimes, setSlideTimes] = useState({}); // {slideId: seconds}
  const [sessionStart, setSessionStart] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [lastSlideStart, setLastSlideStart] = useState(null);
  const [lastSlideId, setLastSlideId] = useState(null);
  const [isIdle, setIsIdle] = useState(false);
  const [engagementEvents, setEngagementEvents] = useState([]);
  const idleTimerRef = useRef(null);
  const IDLE_TIME = 30000; // 30 seconds

  // Generate unique session ID
  const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Track engagement events
  const logEngagementEvent = (eventType, data = {}) => {
    const event = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: eventType,
      timestamp: Date.now(),
      slideId: currentSlide?.id,
      data
    };
    setEngagementEvents(prev => [...prev, event]);
  };

  // Reset idle timer
  const resetIdleTimer = () => {
    if (isIdle) {
      setIsIdle(false);
      // Resume timing if we were idle
      setLastSlideStart(Date.now());
      logEngagementEvent('activity_resumed');
    }
    
    clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true);
      logEngagementEvent('user_idle');
    }, IDLE_TIME);
  };

  // Start session on mount
  useEffect(() => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    setSessionStart(Date.now());
    setLastSlideStart(Date.now());
    setLastSlideId(currentSlide?.id);
    
    logEngagementEvent('session_start', { sessionId: newSessionId });
    
    return () => {
      // On unmount, save session and last slide time
      saveSlideTime();
      saveSession();
      clearTimeout(idleTimerRef.current);
    };
    // eslint-disable-next-line
  }, []);

  // Set up engagement tracking
  useEffect(() => {
    const handleClick = (e) => {
      resetIdleTimer();
      logEngagementEvent('click', {
        target: e.target.tagName,
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleScroll = () => {
      resetIdleTimer();
      logEngagementEvent('scroll', {
        scrollY: window.scrollY,
        scrollX: window.scrollX
      });
    };

    const handleKeyDown = (e) => {
      resetIdleTimer();
      logEngagementEvent('keypress', { key: e.key });
    };

    const handleMouseMove = () => {
      resetIdleTimer();
    };

    // Add event listeners
    document.addEventListener('click', handleClick);
    document.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousemove', handleMouseMove);
    
    // Start idle timer
    resetIdleTimer();

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(idleTimerRef.current);
    };
  }, [currentSlide?.id, isIdle]);

  // On slide change, save previous slide time and start timing new slide
  useEffect(() => {
    if (!currentSlide?.id) return;
    
    // Log slide change event
    if (lastSlideId !== currentSlide.id) {
      logEngagementEvent('slide_change', {
        fromSlideId: lastSlideId,
        toSlideId: currentSlide.id,
        slideIndex: currentIndex
      });
    }
    
    if (lastSlideId && lastSlideStart && !isIdle) {
      const delta = (Date.now() - lastSlideStart) / 1000;
      setSlideTimes(prev => {
        const prevTime = prev[lastSlideId] || 0;
        const updated = { ...prev, [lastSlideId]: prevTime + delta };
        saveSlideTimesToStorage(updated);
        return updated;
      });
    }
    setLastSlideStart(Date.now());
    setLastSlideId(currentSlide.id);
    // eslint-disable-next-line
  }, [currentSlide?.id, isIdle]);

  // Save slide times to localStorage
  const saveSlideTimesToStorage = (times) => {
    if (!customerId) return;
    // Save as array of {slideId, slideTitle, seconds}
    const arr = safeSlides.map(slide => ({
      slideId: slide.id,
      slideTitle: slide.text?.heading || slide.text?.title || `Slide ${slide.id}`,
      seconds: times[slide.id] || 0,
    }));
    localStorage.setItem(`slideTimes_${customerId}`, JSON.stringify(arr));
  };

  // Send session data to API
  const sendSessionToAPI = async (sessionData) => {
    try {
      const response = await fetch('/api/slide-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Session data sent successfully:', result);
      return result;
    } catch (error) {
      console.error('Failed to send session data to API:', error);
      // Fallback to localStorage if API fails
      return null;
    }
  };

  // Save session data to localStorage and API
  const saveSession = async () => {
    if (!customerId || !sessionStart || !sessionId) return;
    
    const sessionEnd = Date.now();
    const duration = (sessionEnd - sessionStart) / 1000;
    
    // Prepare slide data
    const slideData = safeSlides.map(slide => ({
      slideId: slide.id,
      slideTitle: slide.text?.heading || slide.text?.title || `Slide ${slide.id}`,
      seconds: slideTimes[slide.id] || 0,
    }));
    
    const sessionData = {
      sessionId,
      customerId,
      sessionStart,
      sessionEnd,
      durationSeconds: duration,
      slides: slideData,
      engagementEvents,
      deviceInfo: {
        userAgent: navigator.userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        isMobile
      }
    };
    
    // Try to send to API first
    const apiResult = await sendSessionToAPI(sessionData);
    
    // Always save to localStorage as backup
    const prevSessions = JSON.parse(localStorage.getItem(`slideSessions_${customerId}`) || '[]');
    prevSessions.push(sessionData);
    localStorage.setItem(`slideSessions_${customerId}`, JSON.stringify(prevSessions));
    
    // Also save engagement events separately
    localStorage.setItem(`engagementEvents_${customerId}`, JSON.stringify(engagementEvents));
    
    logEngagementEvent('session_end', { 
      sessionId, 
      duration, 
      apiSent: !!apiResult 
    });
  };

  // Save last slide time on unmount or tab close
  const saveSlideTime = () => {
    if (!lastSlideId || !lastSlideStart) return;
    const delta = (Date.now() - lastSlideStart) / 1000;
    setSlideTimes(prev => {
      const prevTime = prev[lastSlideId] || 0;
      const updated = { ...prev, [lastSlideId]: prevTime + delta };
      saveSlideTimesToStorage(updated);
      return updated;
    });
  };

  // Save on page/tab close
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveSlideTime();
      saveSession();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    // eslint-disable-next-line
  }, [lastSlideId, lastSlideStart, sessionStart]);



// Minimum swipe distance (in px)
const minSwipeDistance = 50;

// Check if device is mobile
useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle navigation
  const goToSlide = (index) => {
    // Ensure index is within bounds
    const newIndex = Math.max(0, Math.min(slides?.length - 1, index));
    dispatch(setActiveSlideIndex(newIndex));
  };
  
  const goToNextSlide = () => {
    goToSlide(activeIndex + 1);
  };
  
  const goToPrevSlide = () => {
    goToSlide(activeIndex - 1);
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, slides?.length]);
  
  // Handle touch events for mobile swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      goToNextSlide();
    } else if (isRightSwipe) {
      goToPrevSlide();
    }
  };
  
  // Variants for slide animations
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };
  
  return (
    <div className="relative w-full overflow-hidden bg-[#1F1F1F] rounded-lg shadow-xl">
      {/* Main carousel container */}
      <div 
        ref={carouselRef}
        className="relative w-full h-[500px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Slide content */}
        <AnimatePresence initial={false} custom={currentIndex}>
          {currentSlide ? (
            <motion.div
              key={currentSlide.id || 'empty'}
              custom={currentIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0 w-full h-full"
            >
              <SlideRenderer slide={currentSlide} />
            </motion.div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              No slides available
              
            </div>
          )}
        </AnimatePresence>
        
        {/* Navigation arrows - only show on desktop */}
        {!isMobile && slides?.length > 1 && (
          <>
            <button
              onClick={goToPrevSlide}
              disabled={activeIndex === 0}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white ${
                activeIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-70 hover:opacity-100'
              } transition-opacity duration-300`}
              aria-label="Previous slide"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={goToNextSlide}
              disabled={activeIndex === slides?.length - 1}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white ${
                activeIndex === slides?.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-70 hover:opacity-100'
              } transition-opacity duration-300`}
              aria-label="Next slide"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
      
      {/* Pagination dots */}
      {safeSlides.length > 1 && (
        <div className="flex justify-center items-center space-x-2 pt-4 pb-4">
          {safeSlides.map((slide, index) => (
            <button
              key={`slide-dot-${slide?.id || index}`}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-[#50C878] scale-110'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}