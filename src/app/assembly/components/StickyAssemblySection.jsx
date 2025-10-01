'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollSVGDemoFixed from '../../scroll_svg/components/ScrollSVGDemoFixed';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const StickyAssemblySection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [assemblyProgress, setAssemblyProgress] = useState(0);
  const scrollTriggerRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const section = sectionRef.current;
    const content = contentRef.current;

    // Create a tall section that will capture scroll
    const totalSteps = 7; // Number of assembly steps
    const scrollDistance = window.innerHeight * totalSteps; // Each step takes full viewport height

    // Set the section height to accommodate the scroll distance
    gsap.set(section, {
      height: scrollDistance + window.innerHeight
    });

    // Create the scroll trigger that pins the content
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${scrollDistance}`,
      pin: content,
      pinSpacing: false,
      scrub: true,
      onUpdate: (self) => {
        // Update assembly progress (0 to 1)
        const progress = self.progress;
        setAssemblyProgress(progress);
        
        // Dispatch custom event for ScrollSVGDemoFixed to listen to
        window.dispatchEvent(new CustomEvent('assemblyProgress', {
          detail: { progress }
        }));
      },
      onEnter: () => {
        setIsSticky(true);
        document.body.style.overflow = 'hidden';
      },
      onLeave: () => {
        setIsSticky(false);
        document.body.style.overflow = '';
      },
      onEnterBack: () => {
        setIsSticky(true);
        document.body.style.overflow = 'hidden';
      },
      onLeaveBack: () => {
        setIsSticky(false);
        document.body.style.overflow = '';
      }
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      document.body.style.overflow = '';
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="sticky-assembly-section relative"
      style={{ 
        minHeight: '100vh',
        zIndex: 10
      }}
    >
      <div 
        ref={contentRef}
        className="sticky-content w-full h-screen relative"
        style={{
          position: 'relative',
          zIndex: 11
        }}
      >
        {/* Custom ScrollSVGDemoFixed that responds to our progress */}
        <ScrollSVGDemoFixedSticky progress={assemblyProgress} />
        
        {/* Optional: Progress indicator */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-black/80 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
            <div className="flex items-center space-x-4">
              <div className="text-white text-sm font-medium">
                Assembly Progress
              </div>
              <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#54bb74] to-[#93cfa2] transition-all duration-300 ease-out"
                  style={{ width: `${assemblyProgress * 100}%` }}
                />
              </div>
              <div className="text-white text-sm font-mono">
                {Math.round(assemblyProgress * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modified version of ScrollSVGDemoFixed that accepts external progress
const ScrollSVGDemoFixedSticky = ({ progress = 0 }) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Assembly steps data
  const steps = [
    { 
      title: "Top Plate", 
      description: "The topmost cover plate that protects the internal parts and completes the outer structure.", 
      labels: ["top", "plate", "cover"]
    },
    { 
      title: "Male Connector Plate", 
      description: "A connector plate that ensures proper alignment and secure attachment with other components.", 
      labels: ["male", "connector", "plate"]
    },
    { 
      title: "Ceiling Bracket Steel", 
      description: "A durable steel bracket designed to fix the system securely to the ceiling structure.", 
      labels: ["ceiling", "bracket", "steel"]
    },
    { 
      title: "Plate", 
      description: "A supporting plate that helps distribute weight and maintain stability in the assembly.", 
      labels: ["support", "plate", "stability"]
    },
    { 
      title: "Components", 
      description: "Various mechanical and electrical parts that work together to build the full system.", 
      labels: ["components", "parts", "assembly"]
    },
    { 
      title: "PCB Board", 
      description: "The printed circuit board that controls electronic functions and signal processing.", 
      labels: ["pcb", "board", "electronics"]
    },
    { 
      title: "Ceiling Hub", 
      description: "The central hub where all plates, components, and electronics integrate into one system.", 
      labels: ["ceiling", "hub", "integration"]
    }
  ];

  // Update current step based on progress
  useEffect(() => {
    let targetStep = 0;
    for (let i = 0; i < steps.length; i++) {
      const stepStart = i / (steps.length - 1);
      if (progress >= stepStart) {
        targetStep = i;
      }
    }
    setCurrentStep(targetStep);
  }, [progress, steps.length]);

  return (
    <div className="w-full h-full bg-[#111] text-[#f3ebe2] relative overflow-hidden">
      {/* Left Text Container */}
      <div className="absolute left-[5%] top-[15%] w-[400px] max-w-[35vw] z-30 bg-[rgba(17,17,17,0.8)] p-8 rounded-2xl border border-[rgba(147,207,162,0.2)] shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
        <h1 className="text-5xl font-bold text-[#f3ebe2] leading-tight mb-6 tracking-tight transition-all duration-300">
          {steps[currentStep]?.title}
        </h1>
        <p className="text-base leading-relaxed text-[#93cfa2] transition-all duration-300">
          {steps[currentStep]?.description}
        </p>
      </div>

      {/* Center PNG Reveal Animation */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] flex justify-center items-center z-20">
        {[
          '/base_renders/Parts.11.png',
          '/base_renders/Parts.12.png',
          '/base_renders/Parts.13.png',
          '/base_renders/Parts.14.png',
          '/base_renders/Parts.15.png',
          '/base_renders/Parts.16.png',
          '/base_renders/Parts.17.png',
        ].map((src, idx) => {
          const stepStart = idx / (steps.length - 1);
          const imageOpacity = progress >= stepStart ? 1 : 0;
          
          return (
            <img
              key={src}
              src={src}
              alt={`Assembly stage ${idx+1}`}
              className="absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out"
              style={{ opacity: imageOpacity }}
              draggable={false}
            />
          );
        })}
      </div>

      {/* Step Indicators */}
      <div className="absolute bottom-8 right-8 z-30">
        <div className="flex flex-col space-y-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                idx <= currentStep
                  ? 'bg-[#54bb74] border-[#54bb74] shadow-[0_0_8px_rgba(84,187,116,0.4)]'
                  : 'bg-transparent border-[rgba(147,207,162,0.3)]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StickyAssemblySection;
