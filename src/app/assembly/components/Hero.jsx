'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { FaPlay, FaArrowDown, FaArrowRight } from 'react-icons/fa';
import { HiCube, HiLightBulb, HiWifi, HiCog, HiSparkles } from 'react-icons/hi';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const slides = [
    {
      title: "MODULAR",
      subtitle: "ASSEMBLY",
      description: "Revolutionary plug-and-play lighting system",
      cta: "Watch Assembly",
      background: "from-[#f3ebe2] to-[#93cfa2]",
      features: [
        { icon: HiCube, title: "Modular", desc: "Mix & Match" },
        { icon: HiLightBulb, title: "Smart", desc: "AI Powered" },
        { icon: HiCog, title: "Easy", desc: "Plug & Play" },
        { icon: HiSparkles, title: "Premium", desc: "Quality Built" }
      ],
      showcase: {
        title: "Experience the Future",
        description: "Revolutionary modular lighting that adapts to your needs",
        stats: [
          { number: "5min", label: "Setup", color: "#54bb74" },
          { number: "100+", label: "Configs", color: "#93cfa2" },
          { number: "24/7", label: "Smart", color: "#54bb74" }
        ]
      }
    },
    {
      title: "SMART",
      subtitle: "INTEGRATION",
      description: "AI-powered sensors and intelligent automation",
      cta: "Explore Intelligence",
      background: "from-[#93cfa2] to-[#54bb74]",
      features: [
        { icon: HiWifi, title: "Sensors", desc: "AI Detection" },
        { icon: HiLightBulb, title: "Adaptive", desc: "Auto Adjust" },
        { icon: HiCog, title: "Learning", desc: "Smart AI" },
        { icon: HiSparkles, title: "Responsive", desc: "Real-time" }
      ],
      showcase: {
        title: "Intelligent Automation",
        description: "Advanced AI that learns and adapts to your lifestyle",
        stats: [
          { number: "3", label: "Sensors", color: "#54bb74" },
          { number: "AI", label: "Powered", color: "#93cfa2" },
          { number: "∞", label: "Learning", color: "#54bb74" }
        ]
      }
    },
    {
      title: "INFINITE",
      subtitle: "POSSIBILITIES",
      description: "Endless combinations for every space",
      cta: "Discover Options",
      background: "from-[#54bb74] to-[#f3ebe2]",
      features: [
        { icon: HiCube, title: "Expand", desc: "Add More" },
        { icon: HiLightBulb, title: "Customize", desc: "Your Way" },
        { icon: HiCog, title: "Upgrade", desc: "Future Ready" },
        { icon: HiSparkles, title: "Scale", desc: "No Limits" }
      ],
      showcase: {
        title: "Limitless Expansion",
        description: "Scale your lighting system as your needs grow",
        stats: [
          { number: "∞", label: "Combos", color: "#54bb74" },
          { number: "Easy", label: "Expand", color: "#93cfa2" },
          { number: "Future", label: "Ready", color: "#54bb74" }
        ]
      }
    }
  ];

  useEffect(() => {
    setMounted(true);

    // Auto-slide carousel
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    // GSAP animations
    gsap.fromTo('.hero-card', 
      { y: 100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.7)', stagger: 0.2 }
    );

    gsap.to('.floating-element', {
      y: -20,
      duration: 3,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.5
    });

    return () => clearInterval(interval);
  }, []);

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

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
          {[...Array(96)].map((_, i) => (
            <motion.div
              key={i}
              className="border border-[#292929]/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                duration: 2,
                delay: i * 0.02,
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
          ))}
        </div>
      </div>

      {/* Particles */}
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
            move: {
              enable: true,
              speed: 0.5,
            },
            number: { value: 50 },
            opacity: { value: 0.3 },
            size: { value: { min: 1, max: 3 } },
          },
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content - 7 columns */}
            <div className="lg:col-span-7 space-y-8">
              {/* Hero Title Carousel */}
              <div className="relative h-64 overflow-hidden">
                {slides.map((slide, index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0 flex flex-col justify-center"
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ 
                      x: index === currentSlide ? '0%' : '-100%',
                      opacity: index === currentSlide ? 1 : 0
                    }}
                    transition={{ duration: 0.8, ease: 'power3.out' }}
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
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group inline-flex items-center px-8 py-4 bg-[#292929] text-white rounded-full font-semibold text-lg hover:bg-[#54bb74] transition-all duration-300"
                    >
                      <span>{slide.cta}</span>
                      <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              {/* Slide Indicators */}
              <div className="flex space-x-3">
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
