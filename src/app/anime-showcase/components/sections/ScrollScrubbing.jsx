'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const ScrollScrubbing = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const handleScroll = () => {
      const rect = scrollRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
      
      anime.set('.scrub-circle', {
        scale: 0.5 + progress * 1.5,
        rotateZ: progress * 360,
        backgroundColor: `hsl(${progress * 360}, 70%, 50%)`
      });

      anime.set('.scrub-bar', {
        scaleX: progress
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={scrollRef} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-900 to-red-900">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-16">Scroll-Driven Animation</h2>
        <div className="scrub-circle w-32 h-32 bg-orange-500 rounded-full mx-auto mb-8"></div>
        <div className="w-64 h-4 bg-gray-700 rounded-full mx-auto overflow-hidden">
          <div className="scrub-bar h-full bg-gradient-to-r from-orange-400 to-red-500 origin-left"></div>
        </div>
        <p className="text-white mt-4">Scroll to control the animation</p>
      </div>
    </section>
  );
};

export default ScrollScrubbing;
