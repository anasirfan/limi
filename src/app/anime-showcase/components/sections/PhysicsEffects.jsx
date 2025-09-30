'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const PhysicsEffects = () => {
  const physicsRef = useRef(null);

  useEffect(() => {
    if (!physicsRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Bounce effect
          anime({
            targets: '.bounce-ball',
            translateY: [0, -200, 0],
            scale: [1, 0.8, 1],
            duration: 1000,
            easing: 'easeOutBounce',
            loop: true
          });

          // Spring effect
          anime({
            targets: '.spring-box',
            translateX: [0, 200, 0],
            rotateZ: [0, 360],
            duration: 2000,
            easing: 'spring(1, 80, 10, 0)',
            loop: true,
            direction: 'alternate'
          });

          // Gravity effect
          anime({
            targets: '.gravity-item',
            translateY: [0, 300],
            scale: [1, 0.5],
            duration: 1500,
            easing: 'easeInQuart',
            delay: anime.stagger(200),
            direction: 'alternate',
            loop: true
          });
        }
      });
    }, { threshold: 0.3 });

    observer.observe(physicsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={physicsRef} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 to-teal-900">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-16">Physics Simulation</h2>
        <div className="flex justify-around items-end h-64">
          <div className="bounce-ball w-16 h-16 bg-red-500 rounded-full"></div>
          <div className="spring-box w-16 h-16 bg-yellow-500 rounded-lg"></div>
          <div className="gravity-item w-12 h-12 bg-blue-500 rounded-full"></div>
          <div className="gravity-item w-12 h-12 bg-purple-500 rounded-full"></div>
          <div className="gravity-item w-12 h-12 bg-pink-500 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default PhysicsEffects;
