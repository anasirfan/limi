'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const StorySection = ({ 
  id, 
  title, 
  subtitle, 
  description, 
  sectionIndex,
  isLast = false 
}) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;
    const descriptionEl = descriptionRef.current;

    if (!section) return;

    // Create GSAP timeline for text animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'center center',
        scrub: 1,
        // markers: true, // Uncomment for debugging
      }
    });

    // Animate title
    tl.fromTo(
      titleEl,
      {
        opacity: 0,
        y: 100,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
      }
    );

    // Animate subtitle (slightly delayed)
    tl.fromTo(
      subtitleEl,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.6' // Overlap with title animation
    );

    // Animate description
    tl.fromTo(
      descriptionEl,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.4' // Overlap with subtitle animation
    );

    // Fade out animation as section leaves
    const fadeOutTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'center center',
        end: 'bottom top',
        scrub: 1,
      }
    });

    fadeOutTl.to([titleEl, subtitleEl, descriptionEl], {
      opacity: 0,
      y: -50,
      duration: 0.5,
      ease: 'power2.in',
    });

    return () => {
      tl.kill();
      fadeOutTl.kill();
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative h-screen flex items-center justify-center ${
        isLast ? 'mb-0' : ''
      }`}
    >
      {/* Content Container */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        {/* Title */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 40px rgba(255, 255, 255, 0.3)',
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <h2
          ref={subtitleRef}
          className="text-2xl md:text-3xl lg:text-4xl font-light mb-8 text-blue-300"
          style={{
            textShadow: '0 0 20px rgba(74, 144, 226, 0.5)',
          }}
        >
          {subtitle}
        </h2>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto"
          style={{
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
          }}
        >
          {description}
        </p>

        {/* Decorative Line */}
        <div className="mt-12 flex justify-center">
          <div
            className="h-1 w-24 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, #4a90e2, transparent)',
              boxShadow: '0 0 20px rgba(74, 144, 226, 0.6)',
            }}
          />
        </div>

        {/* Section Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-xs text-gray-500 uppercase tracking-widest">
              {isLast ? 'End' : `Section ${sectionIndex + 1}`}
            </div>
            {!isLast && (
              <svg
                className="w-6 h-6 text-gray-400 animate-bounce"
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
            )}
          </div>
        </div>
      </div>

      {/* Gradient Vignette Effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',
        }}
      />
    </section>
  );
};

export default StorySection;
