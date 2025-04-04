"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ImageOpacity = () => {
  const containerRef = useRef(null);

  const timelineRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

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
      description:
        "Join tight-knit communities around your favorite creators, thoughtleaders, products, and experiences.",
      subtext:
        "Access, distribute and co-own what matters to you, while generating passive income through revenue sharing.",
      color: "#FF0066",
    },
    {
      heading: "Visualization",
      description:
        "Experience your space in stunning 3D detail before making any physical changes.",
      subtext:
        "Our advanced visualization tools help you make confident decisions about your space.",
      color: "#4CAF50",
    },
    {
      heading: "Customization",
      description:
        "Tailor every aspect of your space to match your unique style and needs.",
      subtext:
        "From colors to layouts, customize every detail to create your perfect environment.",
      color: "#2196F3",
    },
    {
      heading: "Realization",
      description:
        "Watch your vision come to life with our expert implementation support.",
      subtext:
        "We guide you through every step of turning your digital design into reality.",
      color: "#FFC107",
    },
    {
      heading: "Integration",
      description:
        "Seamlessly integrate your lighting solutions with existing smart home systems.",
      subtext:
        "Control your environment with voice commands, mobile apps, or automated schedules.",
      color: "#9C27B0",
    },
    {
      heading: "Evolution",
      description:
        "Your space evolves with you, adapting to changing needs and preferences over time.",
      subtext:
        "Our modular design approach ensures your lighting system can grow and change as you do.",
      color: "#FF5722",
    },
  ];

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Kill any existing timeline to prevent memory leaks
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const ctx = gsap.context(() => {
      // Set initial states - only first image visible
      Object.values(imageRefs).forEach((ref, index) => {
        if (ref.current) {
          gsap.set(ref.current, {
            opacity: index === 0 ? 1 : 0,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          });
        }
      });

      // Animation timeline with optimized settings for mobile
      timelineRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: `${6 * 400}vh top`, // Shorter scroll distance on mobile
          scrub: isMobile ? 0.5 : 1, // Faster scrub on mobile
          markers: false,
          // onEnter: () => {
          //   // Optimize by only showing images when in view
          //   if (containerRef.current) {
          //     containerRef.current.style.visibility = "visible";
          //   }
          // },
          // onLeave: () => {
          //   // Hide when scrolled past to save resources
          //   if (containerRef.current) {
          //     containerRef.current.style.visibility = "hidden";
          //   }
          // },
          // onEnterBack: () => {
          //   if (containerRef.current) {
          //     containerRef.current.style.visibility = "visible";
          //   }
          // },
          // onLeaveBack: () => {
          //   if (containerRef.current) {
          //     containerRef.current.style.visibility = "hidden";
          //   }
          // },
        },
      });

      // Optimize animation by reducing the number of tweens
      // Section 1 to 2: Participation to Visualization
      timelineRef.current
        .to(imageRefs.section1.current, { opacity: 0, duration: 1 }, 1)
        .to(imageRefs.section2.current, { opacity: 1, duration: 1 }, 1);

      // Section 2 to 3: Visualization to Customization
      timelineRef.current
        .to(imageRefs.section2.current, { opacity: 0, duration: 1 }, 2)
        .to(imageRefs.section3.current, { opacity: 1, duration: 1 }, 2);

      // Section 3 to 4: Customization to Realization
      timelineRef.current
        .to(imageRefs.section3.current, { opacity: 0, duration: 1 }, 3)
        .to(imageRefs.section4.current, { opacity: 1, duration: 1 }, 3);

      // Section 4 to 5: Realization to Integration
      timelineRef.current
        .to(imageRefs.section4.current, { opacity: 0, duration: 1 }, 4)
        .to(imageRefs.section5.current, { opacity: 1, duration: 1 }, 4);

      // Section 5 to 6: Integration to Evolution
      timelineRef.current
        .to(imageRefs.section5.current, { opacity: 0, duration: 1 }, 5)
        .to(imageRefs.section6.current, { opacity: 1, duration: 1 }, 5);
    });

    return () => {
      // Clean up GSAP animations
      ctx.revert();
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }

      // Kill any orphaned ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [isMobile]); // Re-run when mobile status changes

  // Use lazy loading for images
  const getImageProps = (src, alt) => ({
    src,
    alt,
    className: "object-cover rounded-xl",
    loading: "lazy", // Add native lazy loading
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      id="pendant-animation-container"
      // style={{ visibility: "visible" }}
    >
      {/* Room transformation images - one for each section */}
      <Image
        ref={imageRefs.section1}
        height={640}
        width={600}
        {...getImageProps(
          "/images/rooms/1.png",
          "Participation - Room Stage 1"
        )}
      />
      <Image
        height={640}
        width={600}
        ref={imageRefs.section2}
        {...getImageProps(
          "/images/rooms/2.png",
          "Visualization - Room Stage 2"
        )}
      />
      <Image
        height={640}
        width={600}
        ref={imageRefs.section3}
        {...getImageProps(
          "/images/rooms/3.png",
          "Customization - Room Stage 3"
        )}
      />
      <Image
        height={640}
        width={600}
        ref={imageRefs.section4}
        {...getImageProps("/images/rooms/4.png", "Realization - Room Stage 4")}
      />
      <Image
        height={640}
        width={600}
        ref={imageRefs.section5}
        {...getImageProps("/images/rooms/5.png", "Integration - Room Stage 5")}
      />
      <Image
        height={640}
        width={600}
        ref={imageRefs.section6}
        {...getImageProps("/images/rooms/6.png", "Evolution - Room Stage 6")}
      />
    </div>
  );
};

export default ImageOpacity;
