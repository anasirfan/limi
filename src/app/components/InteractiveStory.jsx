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
          y: 120,
          scale: 0.8,
          position: 'fixed',
          top: '2rem',
          duration: 1,
        })
        .to(svgRef.current.querySelectorAll('.main-triangle-line'), {
          opacity: 1,
          duration: 1,
        }) ;

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
        .to('.main-triangle-line', {
          opacity: 1,
          duration: 1,
        })
        .to('.individual-triangle', {
          opacity: 1,
          duration: 0.5,
        })
        .to('.description-line', {
          opacity: 1,
          duration: 0.5,
        })
        .to('.description-text', {
          opacity: 1,
          duration: 0.5,
        })
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#292929]">
      {/* Heading */}
      <h1
        ref={headingRef}
        className="absolute text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-6xl sm:text-4xl font-bold text-emerald-400 px-4"
      >
        How Our <br/> EcoSystem Works
      </h1>

      {/* Triangle Container */}
      <div className="triangle-container relative h-full w-full">
        {/* Main Triangle SVG */}
        <svg 
          className="absolute inset-0 pointer-events-none z-10" 
          ref={svgRef} 
          viewBox="-400 -300 800 600"
          width="100%" 
          height="100%"
          preserveAspectRatio="xMidYMid meet"
        >
          <line 
            className="main-triangle-line opacity-0"
            x1={TRIANGLE_CONFIG.HUB.x}
            y1={TRIANGLE_CONFIG.HUB.y}
            x2={TRIANGLE_CONFIG.BASE.x}
            y2={TRIANGLE_CONFIG.BASE.y}
            stroke="white"
            strokeWidth="2"
            strokeDasharray="300"
            strokeDashoffset="0"
          />
          <line 
            className="main-triangle-line opacity-0"
            x1={TRIANGLE_CONFIG.BASE.x}
            y1={TRIANGLE_CONFIG.BASE.y}
            x2={TRIANGLE_CONFIG.APP.x}
            y2={TRIANGLE_CONFIG.APP.y}
            stroke="white"
            strokeWidth="2"
            strokeDasharray="300"
            strokeDashoffset="0"
          />
          <line 
            className="main-triangle-line opacity-0"
            x1={TRIANGLE_CONFIG.APP.x}
            y1={TRIANGLE_CONFIG.APP.y}
            x2={TRIANGLE_CONFIG.HUB.x}
            y2={TRIANGLE_CONFIG.HUB.y}
            stroke="white"
            strokeWidth="2"
            strokeDasharray="300"
            strokeDashoffset="0"
          />
        </svg>

        {/* Hub Div */}
        <div
          ref={hubRef}
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-[#0077FF] p-4 z-20 md:h-40 md:w-40 sm:h-32 sm:w-32"
        >
          <div className="div-name text-2xl font-bold text-white text-center mb-2">Hub</div>
          <div className="div-image opacity-0 absolute inset-0">
            <Image src="/images/hub-new.jpg" alt="Hub" className="rounded-xl" fill style={{ objectFit: 'cover' }} />
          </div>
    
          {/* Hub Description Line */}
          <svg 
            id="e7pqTGlYxEy1" 
            className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 description-line hidden md:block" 
            viewBox="0 0 600 600" 
            width="400" 
            height="400" 
            style={{
              right: "40px",
              top: "80%",
              transform: "translateY(-50%)"
            }}
            shapeRendering="geometricPrecision" 
            textRendering="geometricPrecision"
          >
            <ellipse rx="10" ry="10" transform="translate(453.190382 190.872063)" fill="#d2dbed" strokeWidth="0"/>
            <line x1="31.760273" y1="-49.563969" x2="-31.760272" y2="49.563968" transform="translate(416.430109 248.436032)" fill="none" stroke="#96c8a2" strokeWidth="3" strokeLinejoin="round"/>
            <line x1="90.878326" y1="0" x2="-90.878325" y2="0" transform="translate(294.791511 298)" fill="none" stroke="#96c8a2" strokeWidth="3"/>
          </svg>

          <div className="description-text absolute right-48 top-1/2 -translate-y-1/2 w-96 text-white opacity-0 hidden md:block">
         
          <h1> Hub – The Brain of the System</h1>
          <p className='italic text-sm'>Seamlessly Connects Everything</p>
          <p className='text-sm'>The Hub acts as the core processor, managing smart integrations and connecting all lighting modules for real-time adjustments.</p>
          </div>
        </div>

        {/* Base Div */}
        <div
          ref={baseRef}
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-[#00C2A8] p-4 z-20 md:h-40 md:w-40 sm:h-32 sm:w-32"
        >
          <div className="div-name text-2xl font-bold text-white text-center mb-2">Base</div>
          <div className="div-image opacity-0 absolute inset-0">
            <Image src="/images/base-new.png" alt="Base" className="rounded-xl" fill style={{ objectFit: 'cover' }} />
          </div>
       
          {/* Base Description Line - Reversed */}
          <svg 
            id="ebGvKdsWm4j1" 
            className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 description-line hidden md:block" 
            viewBox="0 0 600 600" 
            width="400" 
            height="400" 
            style={{
              left: "10px",
              top: "90%",
              transform: "translateY(-50%)"
            }}
            shapeRendering="geometricPrecision" 
            textRendering="geometricPrecision"
          >
            <ellipse rx="10" ry="10" transform="translate(196.260283 195.987281)" fill="#d2dbed" strokeWidth="0"/>
            <line x1="31.760273" y1="-49.563969" x2="-31.760272" y2="49.563968" transform="matrix(0 1-1 0 251.436031 235.747553)" fill="none" stroke="#96c8a2" strokeWidth="3" strokeLinejoin="round"/>
            <line x1="90.878326" y1="0" x2="-90.878325" y2="0" transform="translate(390.15277 267)" fill="none" stroke="#96c8a2" strokeWidth="3"/>
          </svg>

          <div className="description-text absolute left-64 top-1/3 -translate-y-1/2 w-96 text-white opacity-0 hidden md:block">
          <h1> Base – The Power & Stability</h1>
          <p className='italic text-sm'>Reliable Infrastructure</p>
          <p className='text-sm'>The Base serves as the backbone, providing secure data storage, intelligent power distribution, and seamless automation.</p>
         
          </div>
        </div>

        {/* App Div */}
        <div
          ref={appRef}
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-[#7D00FF] p-4 z-20 md:h-40 md:w-40 sm:h-32 sm:w-32"
        >
          <div className="div-name text-2xl font-bold text-white text-center mb-2">App</div>
          <div className="div-image opacity-0 absolute inset-0">
            <Image src="/images/mobile-app-new.png" className="rounded-xl" alt="App" fill style={{ objectFit: 'cover' }} />
          </div>
       
          {/* App Description Line */}
          <svg 
            id="appDescSvg" 
            className="absolute top-0 left-1/2 -translate-x-1/2 opacity-0 description-line hidden md:block" 
            viewBox="0 0 600 600" 
            width="400" 
            height="400" 
            style={{
              top: "-0px",
              left: "0%",
              transform: "translateX(-50%)"
            }}
            shapeRendering="geometricPrecision" 
            textRendering="geometricPrecision"
          >
            <ellipse rx="10" ry="10" transform="translate(453.190382 190.872063)" fill="#d2dbed" strokeWidth="0"/>
            <line x1="31.760273" y1="-49.563969" x2="-31.760272" y2="49.563968" transform="translate(416.430109 248.436032)" fill="none" stroke="#96c8a2" strokeWidth="3" strokeLinejoin="round"/>
            <line x1="90.878326" y1="0" x2="-90.878325" y2="0" transform="translate(294.791511 298)" fill="none" stroke="#96c8a2" strokeWidth="3"/>
          </svg>

          <div className="description-text absolute top-[130%] -left-[90%] -translate-x-1/2 -translate-y-24 w-96 text-white opacity-0 hidden md:block">
          <h1>  App – Your Control Center</h1>
          <p className='italic text-sm'>Effortless User Control</p>
          <p className='text-sm'>With the App, you can customize lighting effects, set schedules, and create the perfect ambiance with just a tap.</p>
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveStory;
