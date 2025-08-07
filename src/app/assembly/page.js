'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import components
import Hero from './components/Hero';
import AssemblyScroll from './components/AssemblyScroll';
import SensorModuleCard from './components/SensorModuleCard';
import InteractiveViewer from './components/InteractiveViewer';
import BenefitTimeline from './components/BenefitTimeline';
import CTA from './components/CTA';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AssemblyPage = () => {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Background color transition based on scroll
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      '#f3ebe2', // Soft Beige
      '#292929', // Charleston Green
      '#54bb74', // Emerald
      '#93cfa2', // Eton
      '#292929', // Charleston Green
      '#f3ebe2'  // Soft Beige
    ]
  );

  useEffect(() => {
    setMounted(true);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });

    // GSAP ScrollTrigger setup
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress;
        if (progress < 0.3) {
          setCurrentTheme('light');
        } else if (progress < 0.7) {
          setCurrentTheme('dark');
        } else {
          setCurrentTheme('light');
        }
      },
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      AOS.refresh();
    };
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#f3ebe2] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#54bb74]"></div>
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Hero Section */}
      <Hero />

      {/* Assembly Scroll Storytelling */}
      <AssemblyScroll />

      {/* Sensor Modules Grid */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Smart Sensor Integration
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Each module contains advanced sensors that transform your lighting into an intelligent ecosystem
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SensorModuleCard
              title="Radar Detection"
              description="Advanced motion sensing with precise occupancy detection"
              icon="radar"
              delay={0}
            />
            <SensorModuleCard
              title="Audio Processing"
              description="Voice commands and ambient sound analysis"
              icon="microphone"
              delay={0.2}
            />
            <SensorModuleCard
              title="Computer Vision"
              description="Visual recognition and gesture control"
              icon="camera"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Interactive 3D Viewer */}
      <InteractiveViewer />

      {/* Benefits Timeline */}
      <BenefitTimeline />

      {/* CTA Section */}
      <CTA />

      {/* Floating Theme Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <div className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 ${
          currentTheme === 'light' 
            ? 'bg-white/20 text-[#292929] backdrop-blur-md' 
            : 'bg-black/20 text-white backdrop-blur-md'
        }`}>
          {/* {currentTheme === 'light' ? '☀️ Light Mode' : '🌙 Dark Mode'} */}
        </div>
      </div>
    </motion.div>
  );
};

export default AssemblyPage;
