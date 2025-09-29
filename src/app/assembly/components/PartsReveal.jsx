"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const PartsReveal = ({ onVisible }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Images data with different sizes and positions
  const images = [
    {
      src: "/assemblyImages/Parts.11.png",
      className: "w-48 h-64 left-[10%] top-[60%]",
      delay: 0
    },
    {
      src: "/assemblyImages/Parts.12.png", 
      className: "w-56 h-40 right-[15%] top-[70%]",
      delay: 0.1
    },
    {
      src: "/assemblyImages/Parts.13.png",
      className: "w-40 h-56 left-[25%] top-[50%]",
      delay: 0.2
    },
    {
      src: "/assemblyImages/Parts.14.png",
      className: "w-64 h-48 right-[25%] top-[55%]",
      delay: 0.3
    },
    {
      src: "/assemblyImages/Parts.15.png",
      className: "w-52 h-52 left-[40%] top-[65%]",
      delay: 0.4
    },
    {
      src: "/assemblyImages/Parts.16.png",
      className: "w-60 h-44 right-[35%] top-[45%]",
      delay: 0.5
    },
    {
      src: "/assemblyImages/Parts.17.png",
      className: "w-96 h-96 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2",
      delay: 0.6,
      isLast: true
    }
  ];
  
  // Individual image animations based on scroll progress
  const getImageTransforms = (index, isLast = false) => {
    const start = 0.1 + (index * 0.12); // Start earlier and spread out more
    const end = start + 0.15; // Animation duration
    
    if (isLast) {
      // Last image covers everything
      const y = useTransform(scrollYProgress, [start, end], [200, 0]);
      const scale = useTransform(scrollYProgress, [start, end, end + 0.2], [0.3, 1, 2.5]);
      const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
      
      return { y, scale, opacity };
    } else {
      const y = useTransform(scrollYProgress, [start, end], [150, 0]);
      const scale = useTransform(scrollYProgress, [start, end], [0.6, 1]);
      const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
      
      return { y, scale, opacity };
    }
  };

  return (
    <motion.section 
      ref={containerRef}
      className="relative h-[400vh] bg-black overflow-hidden"
      onViewportEnter={onVisible}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        
        {/* Images Container */}
        <div className="absolute inset-0 z-10">
          {images.map((image, index) => {
            const transforms = getImageTransforms(index, image.isLast);
            
            return (
              <motion.div
                key={index}
                style={{
                  y: transforms.y,
                  scale: transforms.scale,
                  opacity: transforms.opacity
                }}
                className={`absolute ${image.className} ${image.isLast ? 'z-30' : 'z-10'}`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={`LIMI AI Component ${index + 11}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Gradient Overlay for smooth transition */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.85, 1], [0, 0.5])
          }}
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-40"
        />
      </div>
    </motion.section>
  );
};

export default PartsReveal;
