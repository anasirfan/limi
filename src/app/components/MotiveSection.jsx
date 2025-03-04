'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const MotiveSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const designRef = useRef(null);
  const controlRef = useRef(null);
  const transformRef = useRef(null);

  useEffect(() => {
    // Make sure all refs are available
    if (!sectionRef.current || !containerRef.current || !designRef.current || !controlRef.current || !transformRef.current) return;

    // Clear any existing ScrollTriggers for this section
    let triggers = [];
    
    // Set initial states - all items start invisible
    gsap.set([designRef.current, controlRef.current, transformRef.current], { 
      opacity: 0,
      y: 50
    });

    // Main pin timeline - pins the container
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: containerRef.current,
        pinSpacing: true,
        markers: false,
        id: "pin-trigger"
      }
    });
    
    triggers.push(ScrollTrigger.getById("pin-trigger"));

    // Design word animation
    pinTl.to(designRef.current, { 
      opacity: 1, 
      y: 0,
      duration: 0.3,
      ease: "power2.out" 
    }, 0)
    .to(designRef.current, {
      top: "20%",
      duration: 0.2
    }, 0.3);

    // Control word animation
    pinTl.to(controlRef.current, { 
      opacity: 1, 
      y: 0,
      duration: 0.3,
      ease: "power2.out" 
    }, 0.4)
    .to(controlRef.current, {
      top: "40%",
      duration: 0.2
    }, 0.7);

    // Transform word animation
    pinTl.to(transformRef.current, { 
      opacity: 1, 
      y: 0,
      duration: 0.3,
      ease: "power2.out" 
    }, 0.8)
    .to(transformRef.current, {
      top: "60%",
      duration: 0.2
    }, 1.1);

    return () => {
      // Clean up only the triggers we created
      triggers.forEach(trigger => {
        if (trigger) trigger.kill();
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[200vh] bg-gradient-to-b from-gray-900 to-black overflow-hidden"
    >
      {/* Container for pinned content */}
      <div 
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Design Word */}
        <div 
          ref={designRef}
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center gap-6"
        >
          <span className="text-[#FF6B6B] text-7xl sm:text-8xl md:text-9xl">🎨</span>
          <h2 className="text-[#FF6B6B] text-7xl sm:text-8xl md:text-9xl font-bold tracking-wider">
            Design
          </h2>
        </div>

        {/* Control Word */}
        <div 
          ref={controlRef}
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center gap-6"
        >
          <span className="text-[#4ECDC4] text-7xl sm:text-8xl md:text-9xl">🎛️</span>
          <h2 className="text-[#4ECDC4] text-7xl sm:text-8xl md:text-9xl font-bold tracking-wider">
            Control
          </h2>
        </div>

        {/* Transform Word */}
        <div 
          ref={transformRef}
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center gap-6"
        >
          <span className="text-[#FFD166] text-7xl sm:text-8xl md:text-9xl">✨</span>
          <h2 className="text-[#FFD166] text-7xl sm:text-8xl md:text-9xl font-bold tracking-wider">
            Transform
          </h2>
        </div>

        {/* Background elements for visual interest */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-[10%] left-[10%] w-40 h-40 rounded-full bg-[#FF6B6B] blur-xl"></div>
          <div className="absolute top-[40%] right-[15%] w-52 h-52 rounded-full bg-[#4ECDC4] blur-xl"></div>
          <div className="absolute bottom-[20%] left-[30%] w-48 h-48 rounded-full bg-[#FFD166] blur-xl"></div>
        </div>
      </div>
    </section>
  );
};

export default MotiveSection;
