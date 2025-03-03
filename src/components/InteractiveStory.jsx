'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const TRIANGLE_CONFIG = {
  HUB: { x: -173.2, y: -100 }, // 200px from center at 120 degrees
  BASE: { x: 173.2, y: -100 }, // 200px from center at 60 degrees
  APP: { x: 0, y: 200 }, // 200px from center at 270 degrees
};

const InteractiveStory = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const hubRef = useRef(null);
  const baseRef = useRef(null);
  const appRef = useRef(null);
  const svgRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=600%', // Increased for more scrolling
          pin: true,
          scrub: 1,
        },
      });

      // Initial heading animation
      timeline
        .from(headingRef.current, {
          scale: 2,
          duration: 1,
          ease: 'power2.out',
        })
        .to(headingRef.current, {
          y: 20,
          scale: 0.8,
          position: 'fixed',
          top: '2rem',
          duration: 1,
        });

      // Move divs into triangle formation with names
      timeline
        .from([hubRef.current, baseRef.current, appRef.current], {
          opacity: 0,
          scale: 0.5,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
        })
        .to(hubRef.current, {
          x: TRIANGLE_CONFIG.HUB.x,
          y: TRIANGLE_CONFIG.HUB.y,
          duration: 1,
        }, 'triangle')
        .to(baseRef.current, {
          x: TRIANGLE_CONFIG.BASE.x,
          y: TRIANGLE_CONFIG.BASE.y,
          duration: 1,
        }, 'triangle')
        .to(appRef.current, {
          x: TRIANGLE_CONFIG.APP.x,
          y: TRIANGLE_CONFIG.APP.y,
          duration: 1,
        }, 'triangle')

        // Fade in images after names
        .to('.div-name', {
          opacity: 0,
          duration: 0.3,
        })
        .to('.div-image', {
          opacity: 1,
          duration: 0.5,
          stagger: 0.2,
        })

        // Animate main triangle SVG lines
        .from('.main-triangle-line', {
          strokeDashoffset: 300,
          strokeDasharray: 300,
          duration: 1,
          stagger: 0.2,
        })

        // Animate individual triangles
        .from('.individual-triangle', {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          stagger: 0.2,
        })

        // Animate description lines
        .from('.description-line', {
          scaleX: 0,
          duration: 0.5,
          stagger: 0.1,
          transformOrigin: 'left center',
        })
        .from('.description-dot', {
          scale: 0,
          duration: 0.3,
          stagger: 0.1,
        })
        .to('.description-text', {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.1,
        })

        // Scale up triangle
        .to('.triangle-container', {
          scale: 1.5,
          duration: 1,
        })
        // Transition to room
        .to('.room-background', {
          opacity: 1,
          duration: 1,
        })
        // Add more room texture scrolling effects
        .to('.room-texture', {
          scale: 1.2,
          duration: 2,
        })
        .to('.room-gradient', {
          opacity: 0.7,
          duration: 1,
        });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Heading */}
      <h1
        ref={headingRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-white"
      >
        Interactive Story
      </h1>

      {/* Triangle Container */}
      <div className="triangle-container relative h-full w-full">
        {/* Main Triangle SVG */}
        <svg className="absolute inset-0 pointer-events-none z-10" ref={svgRef}>
          <line 
            className="main-triangle-line"
            x1={TRIANGLE_CONFIG.HUB.x + 400}
            y1={TRIANGLE_CONFIG.HUB.y + 300}
            x2={TRIANGLE_CONFIG.BASE.x + 400}
            y2={TRIANGLE_CONFIG.BASE.y + 300}
            stroke="white"
            strokeWidth="2"
            strokeDasharray="300"
            strokeDashoffset="0"
          />
          <line 
            className="main-triangle-line"
            x1={TRIANGLE_CONFIG.BASE.x + 400}
            y1={TRIANGLE_CONFIG.BASE.y + 300}
            x2={TRIANGLE_CONFIG.APP.x + 400}
            y2={TRIANGLE_CONFIG.APP.y + 300}
            stroke="white"
            strokeWidth="2"
            strokeDasharray="300"
            strokeDashoffset="0"
          />
          <line 
            className="main-triangle-line"
            x1={TRIANGLE_CONFIG.APP.x + 400}
            y1={TRIANGLE_CONFIG.APP.y + 300}
            x2={TRIANGLE_CONFIG.HUB.x + 400}
            y2={TRIANGLE_CONFIG.HUB.y + 300}
            stroke="white"
            strokeWidth="2"
            strokeDasharray="300"
            strokeDashoffset="0"
          />
        </svg>

        {/* Hub Div */}
        <div
          ref={hubRef}
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-blue-500 p-4 z-20"
        >
          <div className="div-name text-2xl font-bold text-white text-center mb-2">Hub</div>
          <div className="div-image opacity-0">
            <Image src="/images/hub.png" alt="Hub" width={160} height={160} />
          </div>
          {/* Hub Individual Triangle */}
          <svg className="individual-triangle absolute -right-12 top-1/2 w-24 h-24 opacity-0" viewBox="0 0 100 100">
            <path d="M10,10 L90,10 L50,90 Z" fill="none" stroke="white" strokeWidth="2"/>
          </svg>
          {/* Hub Description Line */}
          <svg className="absolute right-0 top-1/2 -translate-y-1/2" width="300" height="150" viewBox="0 0 600 600">
            <ellipse className="description-dot" rx="12.1" ry="12.1" transform="translate(435.8 106.0)" fill="#d2dbed"/>
            <line className="description-line" x1="46.3" y1="-44.1" x2="-46.3" y2="44.1" transform="translate(382.3 156.7)" stroke="#3f5787" strokeWidth="3"/>
            <g className="description-line" paint-order="fill markers stroke">
              <line x1="80.9" y1="0" x2="-80.9" y2="0" transform="translate(255.0 200.8)" stroke="#3f5787" strokeWidth="3"/>
            </g>
          </svg>
          <div className="description-text absolute right-48 top-1/2 -translate-y-1/2 w-40 text-white opacity-0">Hub Description</div>
        </div>

        {/* Base Div */}
        <div
          ref={baseRef}
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-green-500 p-4 z-20"
        >
          <div className="div-name text-2xl font-bold text-white text-center mb-2">Base</div>
          <div className="div-image opacity-0">
            <Image src="/images/base.jpg" alt="Base" width={160} height={160} />
          </div>
          {/* Base Individual Triangle */}
          <svg className="individual-triangle absolute -left-12 top-1/2 w-24 h-24 opacity-0" viewBox="0 0 100 100">
            <path d="M10,10 L90,10 L50,90 Z" fill="none" stroke="white" strokeWidth="2"/>
          </svg>
          {/* Base Description Line - Reversed */}
          <svg className="absolute left-0 top-1/2 -translate-y-1/2 scale-x-[-1]" width="300" height="150" viewBox="0 0 600 600">
            <ellipse className="description-dot" rx="12.1" ry="12.1" transform="translate(435.8 106.0)" fill="#d2dbed"/>
            <line className="description-line" x1="46.3" y1="-44.1" x2="-46.3" y2="44.1" transform="translate(382.3 156.7)" stroke="#3f5787" strokeWidth="3"/>
            <g className="description-line" paint-order="fill markers stroke">
              <line x1="80.9" y1="0" x2="-80.9" y2="0" transform="translate(255.0 200.8)" stroke="#3f5787" strokeWidth="3"/>
            </g>
          </svg>
          <div className="description-text absolute left-48 top-1/2 -translate-y-1/2 w-40 text-white opacity-0">Base Description</div>
        </div>

        {/* App Div */}
        <div
          ref={appRef}
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-purple-500 p-4 z-20"
        >
          <div className="div-name text-2xl font-bold text-white text-center mb-2">App</div>
          <div className="div-image opacity-0">
            <Image src="/images/mobile-app.jpg" alt="App" width={160} height={160} />
          </div>
          {/* App Individual Triangle */}
          <svg className="individual-triangle absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 w-24 h-24 opacity-0" viewBox="0 0 100 100">
            <path d="M10,10 L90,10 L50,90 Z" fill="none" stroke="white" strokeWidth="2"/>
          </svg>
          {/* App Description Line */}
          <svg className="absolute top-0 left-1/2 -translate-x-1/2" width="300" height="150" viewBox="0 0 600 600">
            <ellipse className="description-dot" rx="12.1" ry="12.1" transform="translate(435.8 106.0)" fill="#d2dbed"/>
            <line className="description-line" x1="46.3" y1="-44.1" x2="-46.3" y2="44.1" transform="translate(382.3 156.7)" stroke="#3f5787" strokeWidth="3"/>
            <g className="description-line" paint-order="fill markers stroke">
              <line x1="80.9" y1="0" x2="-80.9" y2="0" transform="translate(255.0 200.8)" stroke="#3f5787" strokeWidth="3"/>
            </g>
          </svg>
          <div className="description-text absolute top-0 left-1/2 -translate-x-1/2 -translate-y-24 w-40 text-white opacity-0">App Description</div>
        </div>
      </div>

      {/* Room Background */}
      <div className="room-background absolute inset-0 opacity-0">
        <div className="room-gradient absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-700"></div>
        <div className="room-texture absolute inset-0 bg-[url('/images/room-texture.png')] opacity-20 mix-blend-overlay"></div>
      </div>
    </div>
  );
};

export default InteractiveStory;
