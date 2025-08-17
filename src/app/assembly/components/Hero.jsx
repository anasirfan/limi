'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { FaPlay, FaArrowDown, FaArrowRight } from 'react-icons/fa';
import { HiCube, HiLightBulb, HiWifi, HiCog, HiSparkles } from 'react-icons/hi';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import Link from 'next/link';

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const slides = [
    {
      title: 'Edge AI',
      subtitle: 'Infrastructure',
      description:
        'The central nervous system for intelligent environments. Ceiling-mounted hubs transform spaces into proactive, empathetic ecosystems that understand and anticipate.',
      ctaPrimary: { label: 'Experience Limi', href: '/configurator' },
      ctaSecondary: { label: 'Learn More', href: '/products' },
      background: 'from-[#f3ebe2] to-[#93cfa2]',
      features: [
        { icon: HiCube, title: 'Local Processing', desc: 'Edge Computing' },
        { icon: HiWifi, title: 'Modular Design', desc: 'Scalable Hubs' },
        { icon: HiCog, title: 'Privacy First', desc: 'Secure & Local' },
        { icon: HiSparkles, title: 'AI Processing', desc: 'Instant Response' },
      ],
      showcase: {
        title: 'SENSORS ACTIVE',
        description: 'Motion • Sound • Temperature',
        stats: [
          { number: 'Local', label: 'Processing', color: '#54bb74' },
          { number: 'Secure', label: 'Privacy', color: '#93cfa2' },
          { number: 'Instant', label: 'Response', color: '#54bb74' },
        ],
      },
    },
    {
      title: 'Modular',
      subtitle: 'Ecosystem',
      description:
        'Ceiling-mounted AI hubs that expand with your needs. Each module adds intelligence, creating a distributed network that grows smarter over time.',
      ctaPrimary: { label: 'Build System', href: '/configurator' },
      ctaSecondary: { label: 'View Modules', href: '/products' },
      background: 'from-[#f8f6f3] to-[#93cfa2]',
      features: [
        { icon: HiCube, title: 'Expandable', desc: 'Add Modules' },
        { icon: HiWifi, title: 'Connected', desc: 'Mesh Network' },
        { icon: HiCog, title: 'Adaptive', desc: 'Self-Learning' },
        { icon: HiSparkles, title: 'Scalable', desc: 'No Limits' },
      ],
      showcase: {
        title: 'AI PROCESSING',
        description: 'Local • Secure • Instant',
        stats: [
          { number: '∞', label: 'Modules', color: '#54bb74' },
          { number: 'Mesh', label: 'Network', color: '#93cfa2' },
          { number: 'Edge', label: 'Computing', color: '#54bb74' },
        ],
      },
    },
    {
      title: 'Intelligent',
      subtitle: 'Environments',
      description:
        'Transform any space into a responsive ecosystem. AI-powered hubs understand occupancy, preferences, and patterns to create truly intelligent environments.',
      ctaPrimary: { label: 'Get Started', href: '/configurator' },
      ctaSecondary: { label: 'Contact', href: '/contact' },
      background: 'from-[#faf9f7] to-[#54bb74]',
      features: [
        { icon: HiCube, title: 'Proactive', desc: 'Anticipates' },
        { icon: HiWifi, title: 'Empathetic', desc: 'Understands' },
        { icon: HiCog, title: 'Responsive', desc: 'Adapts' },
        { icon: HiSparkles, title: 'Seamless', desc: 'Invisible Tech' },
      ],
      showcase: {
        title: 'ECOSYSTEM ACTIVE',
        description: 'Proactive • Empathetic • Intelligent',
        stats: [
          { number: '24/7', label: 'Monitoring', color: '#54bb74' },
          { number: 'AI', label: 'Powered', color: '#93cfa2' },
          { number: 'Future', label: 'Ready', color: '#54bb74' },
        ],
      },
    },
  ];

  useEffect(() => {
    setMounted(true);

    // env checks
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const updateReduced = () => setPrefersReduced(mq.matches);
      updateReduced();
      mq.addEventListener?.('change', updateReduced);

      const onResize = () => setIsMobile(window.innerWidth < 768);
      onResize();
      window.addEventListener('resize', onResize);

      return () => {
        mq.removeEventListener?.('change', updateReduced);
        window.removeEventListener('resize', onResize);
      };
    }
  }, []);

  // Auto-slide carousel (paused offscreen or when reduced motion)
  useEffect(() => {
    console.log('Carousel useEffect triggered:', {
      prefersReduced,
      mounted,
      slidesLength: slides.length,
    });
    
    if (prefersReduced || !mounted || slides.length <= 1) return;
    
    console.log('Starting carousel interval');
    const interval = setInterval(() => {
      console.log('Carousel advancing from slide:', currentSlide);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [mounted, prefersReduced, slides.length]);

  // Entrance and floating animations (skip if reduced motion)
  useEffect(() => {
    if (prefersReduced) return;

    gsap.fromTo(
      '.hero-card',
      { y: 100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.7)', stagger: 0.2 }
    );

    gsap.to('.floating-element', {
      y: -20,
      duration: 3,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.5,
    });
  }, [prefersReduced]);

  // Keyboard navigation (only when in view)
  useEffect(() => {
    if (!mounted || prefersReduced || slides.length <= 1) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setCurrentSlide((p) => (p + 1) % slides.length);
      if (e.key === 'ArrowLeft') setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mounted, prefersReduced, slides.length]);

  // Touch swipe navigation
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStartX.current == null || slides.length <= 1) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;
    if (delta > threshold) setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
    if (delta < -threshold) setCurrentSlide((p) => (p + 1) % slides.length);
    touchStartX.current = null;
  };

  const initParticles = async (engine) => {
    await loadSlim(engine);
  };

  if (!mounted) return null;

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-white"
    >
      {/* Dynamic Background */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].background} transition-all duration-1000`}
        style={{ y, opacity }}
      />

      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/limiai/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Particles */}
      {!prefersReduced && mounted && (
        <Particles
          id="hero-particles"
          init={initParticles}
          className="absolute inset-0 z-0"
          options={{
            background: { color: { value: 'transparent' } },
            fpsLimit: 60,
            particles: {
              color: { value: ['#292929', '#54bb74'] },
              links: {
                color: '#54bb74',
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: { enable: true, speed: isMobile ? 0.4 : 0.6 },
              number: { value: isMobile ? 25 : 50 },
              opacity: { value: 0.3 },
              size: { value: { min: 1, max: 3 } },
            },
          }}
        />
      )}

      <div className="relative z-10 min-h-screen flex items-center" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="max-w-7xl mx-auto px-4 w-full">
          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content - 7 columns */}
            <div className="lg:col-span-7 space-y-8">
              {/* Hero Title Carousel */}
              <div className="relative h-[32rem] overflow-hidden">
                {slides.map((slide, index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0 flex flex-col justify-center"
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ 
                      x: index === currentSlide ? '0%' : '-100%',
                      opacity: index === currentSlide ? 1 : 0
                    }}
                    transition={{ duration: 0.8}}
                  >
                    <h1 className="text-6xl md:text-8xl font-black text-[#292929] leading-none mb-4">
                      {slide.title}
                      <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#54bb74] to-[#93cfa2]">
                        {slide.subtitle}
                      </span>
                    </h1>
                    <p className="text-xl text-[#292929]/70 mb-8 max-w-lg">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href={slide.ctaPrimary.href} className="group inline-flex items-center px-8 py-4 bg-[#292929] text-white rounded-full font-semibold text-lg hover:bg-[#54bb74] transition-all duration-300">
                        <span>{slide.ctaPrimary.label}</span>
                        <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link href={slide.ctaSecondary.href} className="inline-flex items-center px-8 py-4 border-2 border-[#54bb74] text-[#54bb74] rounded-full font-semibold text-lg hover:bg-[#54bb74] hover:text-white transition-all duration-300">
                        {slide.ctaSecondary.label}
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 3D Interactive Viewer (iframe) */}
              <div className="hero-card mb-20 -mt-16 relative w-[50%] max-w-2xl bg-[#f3ebe2] rounded-2xl overflow-hidden border border-[#54bb74]/20 shadow-lg">
                {/* Maintain a clean proportion below the heading */}
                <div className="aspect-[16/9] w-full">
                  {/* Change bg-[#f3ebe2] to any solid color to match the iframe scene background */}
                  <iframe
                    src="https://playcanv.as/e/p/LBV4KIS5/"
                    className="w-full h-full border-0"
                    title="LIMI 3D Interactive Viewer"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Slide Indicators */}
              {slides.length > 1 && (
                <div className="flex space-x-3">
                  {/* Debug button for manual testing */}
                 
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-12 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'bg-[#54bb74]' : 'bg-[#292929]/20'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Content - 5 columns */}
            <div className="lg:col-span-5">
              {/* Feature Cards Grid */}
              <div className="grid grid-cols-2 gap-4">
                {slides[currentSlide].features.map((feature, index) => (
                  <motion.div
                    key={`${currentSlide}-${index}`}
                    className="hero-card group p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-[#54bb74]/20 hover:bg-white/90 transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="text-xl text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-[#292929] mb-1">{feature.title}</h3>
                    <p className="text-sm text-[#292929]/60">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Large Feature Showcase */}
              <motion.div 
                key={`showcase-${currentSlide}`}
                className="hero-card mt-6 p-8 bg-gradient-to-br from-[#292929] to-[#1a1a1a] rounded-2xl text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-3">{slides[currentSlide].showcase.title}</h3>
                  <p className="text-white/80 mb-6">{slides[currentSlide].showcase.description}</p>
                  <div className="flex items-center space-x-4">
                    {slides[currentSlide].showcase.stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      >
                        <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.number}</div>
                        <div className="text-xs text-white/60">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="floating-element absolute top-4 right-4 w-8 h-8 bg-[#54bb74]/20 rounded-full"></div>
                <div className="floating-element absolute bottom-6 right-8 w-4 h-4 bg-[#93cfa2]/30 rounded-full"></div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex flex-col items-center text-[#292929]/60">
              <span className="text-sm font-medium mb-2">Scroll to explore</span>
              <FaArrowDown className="text-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
