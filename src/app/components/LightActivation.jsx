'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

const LightActivation = () => {
  const sectionRef = useRef(null);
  const lightOnRef = useRef(null);
  const lightOffRef = useRef(null);
  const textRefs = useRef([]);

  // Add refs to text elements
  textRefs.current = [];
  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Make sure all refs are available
    if (!sectionRef.current || !lightOnRef.current || !lightOffRef.current) return;

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    // Set initial states
    gsap.set(lightOnRef.current, { opacity: 1 });
    gsap.set(lightOffRef.current, { opacity: 0 });
    
    // Hide all text elements initially and set their initial 3D properties
    textRefs.current.forEach(text => {
      gsap.set(text, { 
        opacity: 0,
        z: -100,
        scale: 0.5,
        transformPerspective: 1000
      });
    });

    // Create master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        markers: false,
      }
    });

    // Image transition
    tl.to(lightOnRef.current, { opacity: 0, duration: 3 }, 0)
      .to(lightOffRef.current, { opacity: 1, duration: 3 }, 0);

    // Text 1: "ILLUMINATE YOUR SPACE" - Zoom in from distance
    tl.fromTo(textRefs.current[0], 
      { opacity: 0, z: -200, scale: 0.7 },
      { opacity: 1, z: 0, scale: 1, duration: 1, ease: "power2.out" },
      0.5
    )
    .to(textRefs.current[0], { 
      opacity: 0, 
      z: 200,
      scale: 1.2,
      duration: 1,
      ease: "power2.in"
    }, 1.5);

    // Text 2: "INNOVATIVE LIGHTING SOLUTIONS" - Rotate in from side
    tl.fromTo(textRefs.current[1], 
      { opacity: 0, z: -150, rotationY: 45 },
      { opacity: 1, z: 0, rotationY: 0, duration: 1, ease: "back.out(1.7)" },
      2
    )
    .to(textRefs.current[1], { 
      opacity: 0, 
      z: 150,
      rotationY: -45,
      duration: 1,
      ease: "back.in(1.7)"
    }, 3);

    // Text 3: "TRANSFORM ANY ENVIRONMENT" - Flip in from top
    tl.fromTo(textRefs.current[2], 
      { opacity: 0, z: -180, rotationX: 90 },
      { opacity: 1, z: 0, rotationX: 0, duration: 1, ease: "power3.out" },
      3.5
    )
    .to(textRefs.current[2], { 
      opacity: 0, 
      z: 180,
      rotationX: -90,
      duration: 1,
      ease: "power3.in"
    }, 4.5);

    // Text 4: "EXPERIENCE LIMI 3D" - Final brand message
    tl.fromTo(textRefs.current[3], 
      { opacity: 0, z: -220, scale: 0.6 },
      { opacity: 1, z: 0, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.5)" },
      5
    )
    .to(textRefs.current[3], { 
      opacity: 0,
      z: 100,
      scale: 1.5,
      duration: 1,
      ease: "power2.in"
    }, 6.5);

    return () => {
      // Clean up
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[60vh] overflow-hidden bg-black"
    >
      {/* Background Images */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          ref={lightOnRef}
          src="/test.png" 
          alt="Light Off"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <img 
          ref={lightOffRef}
          src="/test1.png" 
          alt="Light On"
          className="absolute inset-0 object-cover w-full h-full"
        />
      </div>

      {/* Text Container with 3D perspective */}
      <div className="absolute inset-0 flex items-center justify-center z-10 perspective-[1000px]">
        <div className="text-center px-4 relative w-full h-full flex items-center justify-center">
          <h2 
            ref={addToRefs}
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold absolute tracking-wider"
          >
            ILLUMINATE YOUR SPACE
          </h2>
          <h2 
            ref={addToRefs}
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold absolute tracking-wider"
          >
            INNOVATIVE LIGHTING SOLUTIONS
          </h2>
          <h2 
            ref={addToRefs}
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold absolute tracking-wider"
          >
            TRANSFORM ANY ENVIRONMENT
          </h2>
          <h2 
            ref={addToRefs}
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold absolute tracking-wider"
          >
            EXPERIENCE LIMI 3D
          </h2>
        </div>
      </div>

      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 z-5"></div>
    </section>
  );
};

export default LightActivation;
