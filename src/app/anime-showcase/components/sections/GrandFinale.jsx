'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const GrandFinale = () => {
  const finaleRef = useRef(null);

  useEffect(() => {
    if (!finaleRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Background animation
          anime({
            targets: '.finale-bg',
            backgroundColor: ['#000', '#1a1a2e', '#16213e', '#0f3460'],
            duration: 2000,
            easing: 'easeOutExpo'
          });

          // Text animation
          anime({
            targets: '.finale-text .char',
            opacity: [0, 1],
            translateY: [100, 0],
            rotateZ: [180, 0],
            scale: [0, 1],
            duration: 800,
            delay: (el, i) => i * 30,
            easing: 'easeOutExpo'
          });

          // Circle animation
          anime({
            targets: '.finale-circle',
            scale: [0, 1],
            rotateZ: [0, 360],
            duration: 800,
            delay: (el, i) => i * 100 + 500,
            easing: 'easeOutExpo'
          });

          // Particle animation
          anime({
            targets: '.finale-particle',
            translateX: () => Math.random() * 1000 - 500,
            translateY: () => Math.random() * 1000 - 500,
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            duration: 2000,
            delay: (el, i) => i * 20 + 1000,
            easing: 'easeOutQuart'
          });

          // Title pulsing animation
          anime({
            targets: '.finale-title',
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1],
            duration: 2000,
            delay: 1500,
            loop: true,
            easing: 'easeInOutSine'
          });
        }
      });
    }, { threshold: 0.3 });

    observer.observe(finaleRef.current);
    return () => observer.disconnect();
  }, []);

  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
    ));
  };

  return (
    <section ref={finaleRef} className="finale-bg min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      <div className="text-center z-10">
        <h1 className="finale-title finale-text text-6xl md:text-8xl font-bold text-white mb-8">
          {splitText('FINALE')}
        </h1>
        <p className="text-2xl text-purple-300 mb-16">All techniques combined</p>
        
        {/* Animated circles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="finale-circle absolute w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            ></div>
          ))}
        </div>

        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className="finale-particle absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: '50%',
                top: '50%'
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrandFinale;
