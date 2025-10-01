'use client';

import { useEffect, useRef } from 'react';
import ThreeScene from './components/ThreeScene';
import StorySection from './components/StorySection';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ThreeDWebsite() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();

    return () => {
      // Cleanup all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#1e2022bb]">
      {/* Fixed Three.js Canvas Background */}
      <ThreeScene />

      {/* Scrollable Story Sections */}
      <div className="relative z-10">
        {/* Section 1: Intro */}
        <StorySection
          id="intro"
          title="Welcome to Our AI Base"
          subtitle="The Future of Intelligent Computing"
          description="Experience the next generation of AI-powered hardware"
          sectionIndex={0}
        />

        {/* Section 2: Exploded View */}
        <StorySection
          id="exploded"
          title="Precision Engineering"
          subtitle="Every Component Matters"
          description="Our AI Base consists of meticulously designed parts working in perfect harmony"
          sectionIndex={1}
        />

        {/* Section 3: AI Core */}
        <StorySection
          id="ai-core"
          title="The AI Core"
          subtitle="Intelligence at the Heart"
          description="Powered by cutting-edge processors designed for real-time AI inference"
          sectionIndex={2}
        />

        {/* Section 4: Integration */}
        <StorySection
          id="integration"
          title="Seamless Integration"
          subtitle="Everything Comes Together"
          description="Watch as precision meets performance in perfect synchronization"
          sectionIndex={3}
        />

        {/* Section 5: Closing */}
        <StorySection
          id="closing"
          title="The Future of AI Starts Here"
          subtitle="Join the Revolution"
          description="Transform your space with intelligent, adaptive lighting"
          sectionIndex={4}
          isLast={true}
        />
      </div>
    </div>
  );
}
