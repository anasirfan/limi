'use client';

import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { trackSlideTransition, trackCarouselInteraction } from '../../utils/umamiTracking';

// Import slide components
import Slide1 from './slides/Slide1';
import Slide2 from './slides/Slide2';
import Slide3 from './slides/Slide3';
import Slide4 from './slides/Slide4';
import Slide5 from './slides/Slide5';
import Slide6 from './slides/Slide6';
import Slide7 from './slides/Slide7';
import Slide8 from './slides/Slide8';
import Slide9 from './slides/Slide9';
import Slide10 from './slides/Slide10';
import Slide11 from './slides/Slide11';
import Slide12 from './slides/Slide12';
import Slide13 from './slides/Slide13';
import Slide14 from './slides/Slide14';
import Slide15 from './slides/Slide15';

const LimiFutureCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Array of slide components (will expand to 15)
  const slides = [
    { component: Slide1, title: "The Future of Intelligent Spaces" },
    { component: Slide2, title: "Beyond Smart Homes: Ambient AI" },
    { component: Slide3, title: "The Technology Behind the Magic" },
    { component: Slide4, title: "Real-World Applications & Benefits" },
    { component: Slide5, title: "Market Validation & Early Success" },
    { component: Slide6, title: "Product Ecosystem & Roadmap" },
    { component: Slide7, title: "Multi-Layered Business Model" },
    { component: Slide8, title: "Market Opportunity: $400B+ TAM" },
    { component: Slide9, title: "Funding Roadmap & Strategy" },
    { component: Slide10, title: "Our Team: Building the Future" },
    { component: Slide11, title: "Execution Strategy & Timeline" },
    { component: Slide12, title: "Privacy & Security by Design" },
    { component: Slide13, title: "Future Vision & Global Expansion" },
    { component: Slide14, title: "Competitive Advantage & Moats" },
    { component: Slide15, title: "Join the Revolution" }
  ];

  const totalSlides = slides.length;

  // Handle slide navigation
  const goToSlide = (slideIndex, method = 'navigation') => {
    if (slideIndex === currentSlide || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Track slide transition
    trackSlideTransition(currentSlide + 1, slideIndex + 1, method);
    
    setCurrentSlide(slideIndex);
    
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % totalSlides;
    goToSlide(nextIndex, 'next_button');
  };

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(prevIndex, 'prev_button');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
        trackCarouselInteraction('keyboard_next', currentSlide + 1);
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
        trackCarouselInteraction('keyboard_prev', currentSlide + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  // Track carousel load
  useEffect(() => {
    trackCarouselInteraction('carousel_loaded', 1);
  }, []);

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <div className="relative w-full h-screen  bg-[#292929]">
      {/* Slide Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div 
          className={`w-full max-w-[1280px]   transition-all duration-500 ease-in-out ${
            isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <CurrentSlideComponent slideNumber={currentSlide + 1} />
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-4 flex items-center">
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="p-3 rounded-full bg-black/20 backdrop-blur-sm border border-[#54bb74]/30 text-[#54bb74] hover:bg-[#54bb74]/20 hover:border-[#54bb74] transition-all duration-300 disabled:opacity-50"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-4 flex items-center">
        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="p-3 rounded-full bg-black/20 backdrop-blur-sm border border-[#54bb74]/30 text-[#54bb74] hover:bg-[#54bb74]/20 hover:border-[#54bb74] transition-all duration-300 disabled:opacity-50"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index, 'indicator')}
            disabled={isTransitioning}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-[#54bb74] scale-125'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-[#54bb74]/30">
        <span className="text-[#93cfa2] font-medium">
          {currentSlide + 1} / {totalSlides}
        </span>
      </div>

      {/* Slide Title */}
      <div className="absolute top-8 left-8 bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-[#54bb74]/30 max-w-md">
        <h2 className="text-[#f3ebe2] font-[Amenti] text-lg font-bold">
          {slides[currentSlide].title}
        </h2>
      </div>
    </div>
  );
};

export default LimiFutureCarousel;
