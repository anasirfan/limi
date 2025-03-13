"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MotiveSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const designRef = useRef(null);
  const controlRef = useRef(null);
  const transformRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !designRef.current || !controlRef.current || !transformRef.current) return;

    let triggers = [];

    gsap.set([designRef.current, controlRef.current, transformRef.current], { 
      opacity: 0,
      y: 50
    });

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

    pinTl.to(designRef.current, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0)
      .to(designRef.current, { top: "30%", duration: 0.2 }, 0.3);

    pinTl.to(controlRef.current, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.4)
      .to(controlRef.current, { top: "50%", duration: 0.2 }, 0.7);

    pinTl.to(transformRef.current, { opacity: 1, y: 20, duration: 0.3, ease: "power2.out" }, 0.8)
      .to(transformRef.current, { top: "70%", duration: 0.2 }, 1.1);
    return () => {
      triggers.forEach(trigger => trigger?.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[200vh]  bg-[#292929] overflow-hidden"
    >
      {/* Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Design Word */}
        <div 
          ref={designRef}
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center gap-6"
        >
          <span className="text-[#54bb74] text-7xl sm:text-8xl md:text-9xl">🎨</span>
          <h2 className="max-sm:text-5xl text-[#54bb74] text-7xl sm:text-8xl md:text-9xl font-bold tracking-wider font-[Amenti]">
            Design
          </h2>
        </div>

        {/* Control Word */}
        <div 
          ref={controlRef}
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center gap-6"
        >
          <span className="text-[#93cfa2] text-7xl sm:text-8xl md:text-9xl">🎛️</span>
          <h2 className="max-sm:text-5xl text-[#93cfa2] text-7xl sm:text-8xl md:text-9xl font-bold tracking-wider font-[Amenti]">
            Control
          </h2>
        </div>

        {/* Transform Word */}
        <div 
          ref={transformRef}
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center gap-6"
        >
          <span className="text-[#f3ebe2] text-7xl sm:text-8xl md:text-9xl">✨</span>
          <h2 className="max-sm:text-5xl text-[#f3ebe2]/80 text-7xl sm:text-8xl md:text-9xl font-bold tracking-wider font-[Amenti]">
            Transform
          </h2>
        </div>

        {/* Background Gradient */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-[10%] left-[10%] w-40 h-40 rounded-full bg-[#54bb74] blur-xl"></div>
          <div className="absolute top-[40%] right-[15%] w-52 h-52 rounded-full bg-[#93cfa2] blur-xl"></div>
          <div className="absolute bottom-[20%] left-[30%] w-48 h-48 rounded-full bg-[#f3ebe2] blur-xl"></div>
        </div>
      </div>
    </section>
  );
};

export default MotiveSection;
