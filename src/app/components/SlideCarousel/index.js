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
export default function SlideCarousel({ slides }) {
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



console.log("slides",slides);
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
  
  // Auto-play functionality
  useEffect(() => {
    if (!hasSlides) return;
  
    const startAutoPlay = () => {
      autoPlayTimerRef.current = setInterval(() => {
        if (currentIndex === safeSlides.length - 1) {
          goToSlide(0);
        } else {
          goToNextSlide();
        }
      }, 2000);
    };
    
    startAutoPlay();
    
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [currentIndex, hasSlides, safeSlides.length]);
  
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