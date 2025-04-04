"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * WhatsNew component showcases the latest features and products
 * with animated feature blocks that appear when scrolled into view.
 */
const WhatsNew = () => {
  // Refs for animation targets
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const featureRefs = useRef([]);

  // Feature data
  const features = [
    {
      id: 1,
      title: "AR/VR Preview",
      description: "Experience your lighting setup in virtual reality before installation",
      image: "/images/ar-vr-preview.jpg",
      alt: "AR/VR Preview feature",
      animation: "from-left"
    },
    {
      id: 2,
      title: "New Collection",
      description: "Discover our latest pendant designs with enhanced customization",
      image: "/images/new-collection.jpg",
      alt: "New lighting collection",
      animation: "from-bottom"
    },
    {
      id: 3,
      title: "Smart Control",
      description: "Control your lighting with voice commands and smart home integration",
      image: "/images/smart-control.jpg",
      alt: "Smart control feature",
      animation: "from-right"
    }
  ];

  // Set up animations
  useEffect(() => {
    // Create a timeline for the section animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate the main heading
    tl.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Animate each feature with its own animation
    featureRefs.current.forEach((feature, index) => {
      const delay = 0.2 + index * 0.2;
      const animation = features[index].animation;
      
      let fromVars = { opacity: 0, scale: 0.9 };
      
      // Add different directional animations based on feature position
      if (animation === "from-left") {
        fromVars.x = -50;
      } else if (animation === "from-right") {
        fromVars.x = 50;
      } else if (animation === "from-bottom") {
        fromVars.y = 50;
      }
      
      tl.fromTo(
        feature,
        fromVars,
        { 
          opacity: 1, 
          x: 0, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          ease: "power3.out" 
        },
        delay
      );
    });

    // Cleanup
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-[#232323] text-white"
      id="whats-new"
    >
      <div className="container mx-auto px-4 md:px-8">
        <h2 
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          What&apos;s <span className="text-[#4ade80]">New</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              ref={(el) => (featureRefs.current[index] = el)}
              className="bg-[#1a1a1a] rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] group"
            >
              <div className="relative h-48 md:h-56 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-[#4ade80] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base">
                  {feature.description}
                </p>
                <div className="mt-4">
                  <button className="text-[#4ade80] font-semibold text-sm flex items-center group-hover:underline">
                    Learn more
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsNew;
