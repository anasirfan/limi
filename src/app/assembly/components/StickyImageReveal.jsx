"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const StickyImageReveal = ({ onVisible }) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);

  // Image data with different sizes and positions
  const images = [
    { 
      src: "/assemblyImages/Parts.11.png", 
      alt: "Assembly Part 11",
      size: "large",
      position: "center",
      width: 600,
      height: 400
    },
    { 
      src: "/assemblyImages/Parts.12.png", 
      alt: "Assembly Part 12",
      size: "medium",
      position: "left",
      width: 400,
      height: 300
    },
    { 
      src: "/assemblyImages/Parts.13.png", 
      alt: "Assembly Part 13",
      size: "small",
      position: "right",
      width: 300,
      height: 200
    },
    { 
      src: "/assemblyImages/Parts.14.png", 
      alt: "Assembly Part 14",
      size: "large",
      position: "center",
      width: 700,
      height: 450
    },
    { 
      src: "/assemblyImages/Parts.15.png", 
      alt: "Assembly Part 15",
      size: "medium",
      position: "right",
      width: 450,
      height: 350
    },
    { 
      src: "/assemblyImages/Parts.16.png", 
      alt: "Assembly Part 16",
      size: "small",
      position: "left",
      width: 350,
      height: 250
    },
    { 
      src: "/assemblyImages/Parts.17.png", 
      alt: "Assembly Part 17",
      size: "large",
      position: "center",
      width: 650,
      height: 500
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const imageElements = imagesRef.current;

    if (!section || !container || imageElements.length === 0) return;

    // Set initial positions - all images start below viewport
    gsap.set(imageElements, {
      y: "100vh",
      opacity: 0,
    });

    // Create smooth scroll-driven animation for all images
    const mainTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: container,
      pinSpacing: false,
      scrub: 0.5, // Smooth scrubbing
      onUpdate: (self) => {
        const progress = self.progress;
        const totalImages = images.length;
        
        imageElements.forEach((img, index) => {
          const isLast = index === totalImages - 1;
          
          // Calculate timing for each image
          const imageStart = index / totalImages;
          const imageMiddle = (index + 0.5) / totalImages;
          const imageEnd = (index + 1) / totalImages;
          
          let yPos = 100; // Start below viewport
          let opacity = 0;
          
          if (progress < imageStart) {
            // Image hasn't started yet - stay below
            yPos = 100;
            opacity = 0;
          } else if (progress >= imageStart && progress < imageMiddle) {
            // Image entering from bottom
            const enterProgress = (progress - imageStart) / (imageMiddle - imageStart);
            yPos = gsap.utils.interpolate(100, 0, enterProgress);
            opacity = gsap.utils.interpolate(0, 1, enterProgress);
          } else if (progress >= imageMiddle && progress < imageEnd && !isLast) {
            // Image exiting to top (except last image)
            const exitProgress = (progress - imageMiddle) / (imageEnd - imageMiddle);
            yPos = gsap.utils.interpolate(0, -100, exitProgress);
            opacity = gsap.utils.interpolate(1, 0, exitProgress);
          } else if (isLast && progress >= imageMiddle) {
            // Last image stays visible and centered
            yPos = 0;
            opacity = 1;
          } else if (!isLast && progress >= imageEnd) {
            // Image has exited - stay above
            yPos = -100;
            opacity = 0;
          } else {
            // Image is fully visible
            yPos = 0;
            opacity = 1;
          }
          
          gsap.set(img, {
            y: yPos + "vh",
            opacity: opacity,
          });
        });
        
        // When we reach 90% progress, start releasing the pin
        if (progress > 0.9) {
          // Gradually release the sticky behavior
          const releaseProgress = (progress - 0.9) / 0.1;
          gsap.set(container, {
            y: gsap.utils.interpolate(0, -50, releaseProgress) + "vh",
          });
        }
      },
    });

    // Trigger onVisible callback when section comes into view
    const visibilityTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      once: true,
      onEnter: () => {
        if (onVisible) onVisible();
      },
    });

    // Cleanup function
    return () => {
      mainTrigger.kill();
      visibilityTrigger.kill();
    };
  }, [onVisible, images.length]);

  return (
    <section 
      ref={sectionRef}
      className="relative h-[500vh] bg-gradient-to-b from-black via-gray-900 to-black"
    >
      {/* Sticky Container */}
      <div 
        ref={containerRef}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-4xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#54bb74] to-[#93cfa2]">
              ASSEMBLY PROCESS
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
              Watch as each component comes together to create the perfect LIMI AI system
            </p>
          </div>
        </div>

        {/* Images Container */}
        <div className="relative w-full h-full overflow-hidden">
          {images.map((image, index) => {
            // Position classes based on image position
            const getPositionClasses = (position) => {
              switch (position) {
                case 'left':
                  return 'justify-start pl-8 md:pl-16';
                case 'right':
                  return 'justify-end pr-8 md:pr-16';
                case 'center':
                default:
                  return 'justify-center';
              }
            };

            return (
              <div
                key={index}
                ref={(el) => (imagesRef.current[index] = el)}
                className={`absolute inset-0 flex items-center ${getPositionClasses(image.position)}`}
                style={{ zIndex: index + 1 }}
              >
                <div className="relative">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="object-contain drop-shadow-2xl"
                    style={{
                      maxWidth: '90vw',
                      maxHeight: '80vh',
                      width: 'auto',
                      height: 'auto'
                    }}
                    priority={index < 2} // Prioritize first 2 images
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-white/30 transition-all duration-300"
                style={{
                  backgroundColor: `rgba(84, 187, 116, ${index < 3 ? '1' : '0.3'})`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 text-white/60 text-sm animate-bounce">
          <div className="flex flex-col items-center">
            <span>Scroll to reveal</span>
            <div className="w-px h-8 bg-white/30 mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StickyImageReveal;
