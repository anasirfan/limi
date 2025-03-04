"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ImageOpacity = () => {
  const containerRef = useRef(null);
  const textOverlayRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const subtextRef = useRef(null);
  
  // References for all room images - now we have 6 sections
  const imageRefs = {
    section1: useRef(null), // Participation
    section2: useRef(null), // Visualization
    section3: useRef(null), // Customization
    section4: useRef(null), // Realization
    section5: useRef(null), // Integration
    section6: useRef(null), // Evolution
  };

  // Text content for each section
  const sectionTexts = [
    {
      heading: "Participation",
      description: "Join tight-knit communities around your favorite creators, thoughtleaders, products, and experiences.",
      subtext: "Access, distribute and co-own what matters to you, while generating passive income through revenue sharing.",
      color: "#FF0066"
    },
    {
      heading: "Visualization",
      description: "Experience your space in stunning 3D detail before making any physical changes.",
      subtext: "Our advanced visualization tools help you make confident decisions about your space.",
      color: "#4CAF50"
    },
    {
      heading: "Customization",
      description: "Tailor every aspect of your space to match your unique style and needs.",
      subtext: "From colors to layouts, customize every detail to create your perfect environment.",
      color: "#2196F3"
    },
    {
      heading: "Realization",
      description: "Watch your vision come to life with our expert implementation support.",
      subtext: "We guide you through every step of turning your digital design into reality.",
      color: "#FFC107"
    },
    {
      heading: "Integration",
      description: "Seamlessly integrate your lighting solutions with existing smart home systems.",
      subtext: "Control your environment with voice commands, mobile apps, or automated schedules.",
      color: "#9C27B0"
    },
    {
      heading: "Evolution",
      description: "Your space evolves with you, adapting to changing needs and preferences over time.",
      subtext: "Our modular design approach ensures your lighting system can grow and change as you do.",
      color: "#FF5722"
    }
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const ctx = gsap.context(() => {
      // Set initial states - only first image visible
      Object.values(imageRefs).forEach((ref, index) => {
        gsap.set(ref.current, {
          opacity: index === 0 ? 1 : 0,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        });
      });

      // Set initial state for text overlay
      gsap.set(textOverlayRef.current, {
        opacity: 1
      });
      
      // Set initial text content
      gsap.set(headingRef.current, { 
        textContent: sectionTexts[0].heading,
        color: sectionTexts[0].color
      });
      gsap.set(descriptionRef.current, { textContent: sectionTexts[0].description });
      gsap.set(subtextRef.current, { textContent: sectionTexts[0].subtext });

      // Animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: `${6 * 400}vh top`, // Updated to account for 6 sections
          scrub: 1,
          markers: false,
        }
      });

      // Section transitions with text updates
      
      // Section 1 to 2: Participation to Visualization
      tl.to(imageRefs.section1.current, { opacity: 0, duration: 1 }, 1)
        .to(imageRefs.section2.current, { opacity: 1, duration: 1 }, 1)
        .to(headingRef.current, { 
          textContent: sectionTexts[1].heading, 
          color: sectionTexts[1].color,
          duration: 0.5 
        }, 1)
        .to(descriptionRef.current, { textContent: sectionTexts[1].description, duration: 0.5 }, 1)
        .to(subtextRef.current, { textContent: sectionTexts[1].subtext, duration: 0.5 }, 1);
      
      // Section 2 to 3: Visualization to Customization
      tl.to(imageRefs.section2.current, { opacity: 0, duration: 1 }, 2)
        .to(imageRefs.section3.current, { opacity: 1, duration: 1 }, 2)
        .to(headingRef.current, { 
          textContent: sectionTexts[2].heading, 
          color: sectionTexts[2].color,
          duration: 0.5 
        }, 2)
        .to(descriptionRef.current, { textContent: sectionTexts[2].description, duration: 0.5 }, 2)
        .to(subtextRef.current, { textContent: sectionTexts[2].subtext, duration: 0.5 }, 2);
      
      // Section 3 to 4: Customization to Realization
      tl.to(imageRefs.section3.current, { opacity: 0, duration: 1 }, 3)
        .to(imageRefs.section4.current, { opacity: 1, duration: 1 }, 3)
        .to(headingRef.current, { 
          textContent: sectionTexts[3].heading, 
          color: sectionTexts[3].color,
          duration: 0.5 
        }, 3)
        .to(descriptionRef.current, { textContent: sectionTexts[3].description, duration: 0.5 }, 3)
        .to(subtextRef.current, { textContent: sectionTexts[3].subtext, duration: 0.5 }, 3);
        
      // Section 4 to 5: Realization to Integration
      tl.to(imageRefs.section4.current, { opacity: 0, duration: 1 }, 4)
        .to(imageRefs.section5.current, { opacity: 1, duration: 1 }, 4)
        .to(headingRef.current, { 
          textContent: sectionTexts[4].heading, 
          color: sectionTexts[4].color,
          duration: 0.5 
        }, 4)
        .to(descriptionRef.current, { textContent: sectionTexts[4].description, duration: 0.5 }, 4)
        .to(subtextRef.current, { textContent: sectionTexts[4].subtext, duration: 0.5 }, 4);
        
      // Section 5 to 6: Integration to Evolution
      tl.to(imageRefs.section5.current, { opacity: 0, duration: 1 }, 5)
        .to(imageRefs.section6.current, { opacity: 1, duration: 1 }, 5)
        .to(headingRef.current, { 
          textContent: sectionTexts[5].heading, 
          color: sectionTexts[5].color,
          duration: 0.5 
        }, 5)
        .to(descriptionRef.current, { textContent: sectionTexts[5].description, duration: 0.5 }, 5)
        .to(subtextRef.current, { textContent: sectionTexts[5].subtext, duration: 0.5 }, 5);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full"
      id="pendant-animation-container"
    >
      {/* Room transformation images - one for each section */}
      <img 
        ref={imageRefs.section1}
        src="/images/rooms/1.png" 
        alt="Participation - Room Stage 1"
        className="object-cover rounded-xl"
      />
      <img 
        ref={imageRefs.section2}
        src="/images/rooms/2.png" 
        alt="Visualization - Room Stage 2"
        className="object-cover rounded-xl"
      />
      <img 
        ref={imageRefs.section3}
        src="/images/rooms/3.png" 
        alt="Customization - Room Stage 3"
        className="object-cover rounded-xl"
      />
      <img 
        ref={imageRefs.section4}
        src="/images/rooms/4.png" 
        alt="Realization - Room Stage 4"
        className="object-cover rounded-xl"
      />
      <img 
        ref={imageRefs.section5}
        src="/images/rooms/5.png" 
        alt="Integration - Room Stage 5"
        className="object-cover rounded-xl"
      />
      <img 
        ref={imageRefs.section6}
        src="/images/rooms/6.png" 
        alt="Evolution - Room Stage 6"
        className="object-cover rounded-xl"
      />
      
      {/* Text overlay that updates with each section */}
      <div 
        ref={textOverlayRef}
        className="absolute bottom-8 left-8 right-8 bg-black/70 text-white p-4 rounded-lg backdrop-blur-sm hidden lg2:block"
      >
        <h3 
          ref={headingRef}
          className="text-xl font-semibold mb-2"
          style={{ color: "#FF0066" }}
        >
          Participation
        </h3>
        <p 
          ref={descriptionRef}
          className="text-sm md:text-base mb-2"
        >
          Join tight-knit communities around your favorite creators, thoughtleaders, products, and experiences.
        </p>
        <p 
          ref={subtextRef}
          className="text-sm md:text-base opacity-80"
        >
          Access, distribute and co-own what matters to you, while generating passive income through revenue sharing.
        </p>
      </div>
    </div>
  );
};

export default ImageOpacity;
