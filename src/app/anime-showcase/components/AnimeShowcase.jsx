'use client';

import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import PhysicsEffects from './sections/PhysicsEffects';
import ScrollScrubbing from './sections/ScrollScrubbing';
import ParticleSystem from './sections/ParticleSystem';
import GrandFinale from './sections/GrandFinale';

const AnimeShowcase = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Section 1: Hero Intro
  const HeroIntro = () => {
    const heroRef = useRef(null);

    useEffect(() => {
      if (!heroRef.current) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Hero title animation
            anime({
              targets: '.hero-title .char',
              opacity: [0, 1],
              translateY: [100, 0],
              rotateZ: [180, 0],
              scale: [0.5, 1],
              duration: 800,
              delay: (el, i) => i * 50,
              easing: 'easeOutExpo'
            });

            // Hero subtitle animation
            anime({
              targets: '.hero-subtitle',
              opacity: [0, 1],
              translateY: [50, 0],
              duration: 1000,
              delay: 400,
              easing: 'easeOutExpo'
            });

            // Hero glow animation
            anime({
              targets: '.hero-glow',
              scale: [0, 1.5],
              opacity: [0, 0.8, 0],
              duration: 2000,
              delay: 500,
              loop: true,
              easing: 'easeInOutSine'
            });
          }
        });
      }, { threshold: 0.3 });

      if (heroRef.current) observer.observe(heroRef.current);
      return () => observer.disconnect();
    }, []);

    const splitText = (text) => {
      return text.split('').map((char, index) => (
        <span key={index} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
      ));
    };

    return (
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-900 via-black to-blue-900">
        <div className="hero-glow absolute inset-0 bg-gradient-radial from-purple-500/20 to-transparent"></div>
        <div className="text-center z-10">
          <h1 className="hero-title text-6xl md:text-8xl font-bold text-white mb-8">
            {splitText('ANIME.JS')}
          </h1>
          <p className="hero-subtitle text-2xl md:text-4xl text-purple-300 opacity-0">
            The Ultimate Animation Showcase
          </p>
        </div>
      </section>
    );
  };

  // Section 2: Timeline Showcase
  const TimelineShowcase = () => {
    const timelineRef = useRef(null);

    useEffect(() => {
      if (!timelineRef.current) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Use individual animations since timeline might not be available
            anime({
              targets: '.timeline-box-1',
              translateX: [-300, 0],
              opacity: [0, 1],
              rotateY: [90, 0],
              duration: 600,
              easing: 'easeOutExpo'
            });

            anime({
              targets: '.timeline-box-2',
              translateY: [-200, 0],
              opacity: [0, 1],
              scale: [0, 1],
              duration: 600,
              delay: 300,
              easing: 'easeOutExpo'
            });

            anime({
              targets: '.timeline-box-3',
              translateX: [300, 0],
              opacity: [0, 1],
              rotateZ: [180, 0],
              duration: 600,
              delay: 300,
              easing: 'easeOutExpo'
            });

            anime({
              targets: '.timeline-text',
              opacity: [0, 1],
              translateY: [50, 0],
              duration: 600,
              delay: (el, i) => i * 100 + 400,
              easing: 'easeOutExpo'
            });
          }
        });
      }, { threshold: 0.3 });

      if (timelineRef.current) observer.observe(timelineRef.current);
      return () => observer.disconnect();
    }, []);

    return (
      <section ref={timelineRef} className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h2 className="timeline-text text-4xl font-bold text-white mb-16 opacity-0">Timeline Perfection</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="timeline-box-1 w-32 h-32 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg opacity-0"></div>
            <div className="timeline-box-2 w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg opacity-0"></div>
            <div className="timeline-box-3 w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg opacity-0"></div>
          </div>
          <p className="timeline-text text-xl text-gray-300 mt-8 opacity-0">Perfect sequence control</p>
        </div>
      </section>
    );
  };

  // Section 3: SVG Path Drawing
  const SVGPathDrawing = () => {
    const svgRef = useRef(null);

    useEffect(() => {
      if (!svgRef.current) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Set up SVG path animation
            const paths = document.querySelectorAll('.svg-path');
            paths.forEach((path, i) => {
              const pathLength = path.getTotalLength();
              path.style.strokeDasharray = pathLength;
              path.style.strokeDashoffset = pathLength;
              
              anime({
                targets: path,
                strokeDashoffset: [pathLength, 0],
                easing: 'easeInOutSine',
                duration: 3000,
                delay: i * 200,
                direction: 'alternate',
                loop: true
              });
            });
          }
        });
      }, { threshold: 0.3 });

      if (svgRef.current) observer.observe(svgRef.current);
      return () => observer.disconnect();
    }, []);

    return (
      <section ref={svgRef} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-16">SVG Path Magic</h2>
          <svg width="400" height="400" viewBox="0 0 400 400" className="mx-auto">
            <path className="svg-path" d="M200,50 L350,200 L200,350 L50,200 Z" fill="none" stroke="url(#gradient1)" strokeWidth="4" />
            <path className="svg-path" d="M200,100 C300,100 300,300 200,300 C100,300 100,100 200,100" fill="none" stroke="url(#gradient2)" strokeWidth="3" />
            <path className="svg-path" d="M150,150 L250,150 L250,250 L150,250 Z" fill="none" stroke="url(#gradient3)" strokeWidth="2" />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b6b" />
                <stop offset="100%" stopColor="#4ecdc4" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#45b7d1" />
                <stop offset="100%" stopColor="#f39c12" />
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9b59b6" />
                <stop offset="100%" stopColor="#e74c3c" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    );
  };

  // Section 4: SVG Morphing
  const SVGMorphing = () => {
    const morphRef = useRef(null);

    useEffect(() => {
      if (!morphRef.current) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const shapes = [
              'M200,50 L350,200 L200,350 L50,200 Z',
              'M200,50 L250,150 L300,150 L250,200 L300,250 L250,250 L200,350 L150,250 L100,250 L150,200 L100,150 L150,150 Z',
              'M200,50 L300,100 L350,200 L300,300 L200,350 L100,300 L50,200 L100,100 Z',
              'M200,75 C275,75 325,125 325,200 C325,275 275,325 200,325 C125,325 75,275 75,200 C75,125 125,75 200,75 Z'
            ];

            anime({
              targets: '.morph-path',
              d: shapes,
              easing: 'easeInOutQuart',
              duration: 2000,
              delay: 500,
              direction: 'alternate',
              loop: true
            });
          }
        });
      }, { threshold: 0.3 });

      if (morphRef.current) observer.observe(morphRef.current);
      return () => observer.disconnect();
    }, []);

    return (
      <section ref={morphRef} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-16">Shape Morphing</h2>
          <svg width="400" height="400" viewBox="0 0 400 400" className="mx-auto">
            <path className="morph-path" d="M200,50 L350,200 L200,350 L50,200 Z" fill="url(#morphGradient)" stroke="#fff" strokeWidth="2" />
            <defs>
              <radialGradient id="morphGradient">
                <stop offset="0%" stopColor="#ff9a9e" />
                <stop offset="100%" stopColor="#fecfef" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </section>
    );
  };

  // Section 5: Staggered Grid
  const StaggeredGrid = () => {
    const gridRef = useRef(null);

    useEffect(() => {
      if (!gridRef.current) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: '.grid-item',
              scale: [0, 1],
              opacity: [0, 1],
              rotateZ: [180, 0],
              duration: 800,
              delay: (el, i) => {
                const row = Math.floor(i / 8);
                const col = i % 8;
                const centerRow = 3;
                const centerCol = 4;
                const distance = Math.sqrt(Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2));
                return distance * 50;
              },
              easing: 'easeOutExpo'
            });
          }
        });
      }, { threshold: 0.3 });

      if (gridRef.current) observer.observe(gridRef.current);
      return () => observer.disconnect();
    }, []);

    return (
      <section ref={gridRef} className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-16">Staggered Grid Animation</h2>
          <div className="grid grid-cols-8 gap-2 max-w-2xl mx-auto">
            {Array.from({ length: 48 }, (_, i) => (
              <div key={i} className="grid-item w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded opacity-0"></div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Additional sections for complete showcase
  const ThreeDTransforms = () => {
    const threeDRef = useRef(null);

    useEffect(() => {
      if (!threeDRef.current) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: '.cube-face',
              rotateX: [0, 360],
              rotateY: [0, 360],
              scale: [1, 1.5, 1],
              duration: 3000,
              delay: anime.stagger(200),
              easing: 'easeInOutSine',
              loop: true
            });
          }
        });
      }, { threshold: 0.3 });

      if (threeDRef.current) observer.observe(threeDRef.current);
      return () => observer.disconnect();
    }, []);

    return (
      <section ref={threeDRef} className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-16">3D Transformations</h2>
          <div className="flex justify-center space-x-8" style={{ perspective: '1000px' }}>
            <div className="cube-face w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
            <div className="cube-face w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg"></div>
            <div className="cube-face w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg"></div>
          </div>
        </div>
      </section>
    );
  };

  const ColorTransitions = () => {
    const colorRef = useRef(null);

    useEffect(() => {
      if (!colorRef.current) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: '.color-box',
              backgroundColor: [
                '#ff6b6b', '#4ecdc4', '#45b7d1', '#f39c12', '#9b59b6', '#e74c3c'
              ],
              duration: 2000,
              delay: anime.stagger(100),
              direction: 'alternate',
              loop: true,
              easing: 'easeInOutSine'
            });
          }
        });
      }, { threshold: 0.3 });

      if (colorRef.current) observer.observe(colorRef.current);
      return () => observer.disconnect();
    }, []);

    return (
      <section ref={colorRef} className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-16">Color Morphing</h2>
          <div className="grid grid-cols-3 gap-8">
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className="color-box w-24 h-24 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const InteractiveAnimations = () => {
    const interactiveRef = useRef(null);

    const handleHover = (e) => {
      anime({
        targets: e.target,
        scale: [1, 1.2],
        rotateZ: [0, 15],
        duration: 300,
        easing: 'easeOutElastic(1, .6)'
      });
    };

    const handleLeave = (e) => {
      anime({
        targets: e.target,
        scale: [1.2, 1],
        rotateZ: [15, 0],
        duration: 300,
        easing: 'easeOutElastic(1, .6)'
      });
    };

    const handleClick = (e) => {
      anime({
        targets: e.target,
        scale: [1, 0.8, 1.3, 1],
        duration: 600,
        easing: 'easeOutElastic(1, .8)'
      });
    };

    return (
      <section ref={interactiveRef} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-900 to-rose-900">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-16">Interactive Elements</h2>
          <div className="grid grid-cols-4 gap-8">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg cursor-pointer"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                onClick={handleClick}
              ></div>
            ))}
          </div>
          <p className="text-white mt-8">Hover and click the squares</p>
        </div>
      </section>
    );
  };

  const LoopedAnimations = () => {
    const loopRef = useRef(null);

    useEffect(() => {
      if (!loopRef.current) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: '.orbit-planet',
              rotateZ: 360,
              duration: 3000,
              easing: 'linear',
              loop: true
            });

            anime({
              targets: '.pulse-heart',
              scale: [1, 1.3, 1],
              duration: 1000,
              easing: 'easeInOutSine',
              loop: true
            });

            anime({
              targets: '.spin-gear',
              rotateZ: 360,
              duration: 2000,
              easing: 'linear',
              loop: true
            });
          }
        });
      }, { threshold: 0.3 });

      if (loopRef.current) observer.observe(loopRef.current);
      return () => observer.disconnect();
    }, []);

    return (
      <section ref={loopRef} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 to-teal-900">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-16">Infinite Loops</h2>
          <div className="flex justify-around items-center">
            <div className="relative">
              <div className="w-32 h-32 border-4 border-blue-500 rounded-full"></div>
              <div className="orbit-planet absolute top-0 left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2" style={{ transformOrigin: '50% 64px' }}></div>
            </div>
            <div className="pulse-heart w-16 h-16 bg-red-500 rounded-full"></div>
            <div className="spin-gear w-16 h-16 bg-yellow-500 rounded-lg"></div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="anime-showcase">
      <HeroIntro />
      <TimelineShowcase />
      <SVGPathDrawing />
      <SVGMorphing />
      <StaggeredGrid />
      <PhysicsEffects />
      <ScrollScrubbing />
      <ThreeDTransforms />
      <ParticleSystem />
      <ColorTransitions />
      <InteractiveAnimations />
      <LoopedAnimations />
      <GrandFinale />
      
      <style jsx global>{`
        .anime-showcase {
          scroll-behavior: smooth;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        .char {
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default AnimeShowcase;
