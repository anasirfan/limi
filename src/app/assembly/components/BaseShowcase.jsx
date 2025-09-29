"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const BaseShowcase = ({ onVisible }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Four images that will appear one by one
  const images = [
    {
      src: "/assemblyImages/Parts.11.png",
      zIndex: 10
    },
    {
      src: "/assemblyImages/Parts.12.png",
      zIndex: 11
    },
    {
      src: "/assemblyImages/Parts.13.png",
      zIndex: 12
    },
    {
      src: "/assemblyImages/Parts.14.png",
      zIndex: 13
    }
  ];

  // Image animations - each appears at different scroll points
  const getImageTransforms = (index) => {
    const start = 0.2 + (index * 0.2); // Each image starts 20% apart
    const end = start + 0.15; // Animation duration
    
    const y = useTransform(scrollYProgress, [start, end], [100, 0]);
    const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
    const scale = useTransform(scrollYProgress, [start, end], [0.8, 1]);
    
    return { y, opacity, scale };
  };

  return (
    <motion.section 
      ref={containerRef}
      className="relative h-[200vh] bg-black"
      onViewportEnter={onVisible}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* LIMI AI Text - Always visible and centered */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20"
        >
          <h1 className="text-8xl md:text-9xl font-black text-white tracking-wider">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              LIMI AI
            </span>
          </h1>
        </motion.div>

        {/* Images stacking on top of text */}
        <div className="absolute inset-0">
          {images.map((image, index) => {
            const transforms = getImageTransforms(index);
            
            return (
              <motion.div
                key={index}
                style={{
                  y: transforms.y,
                  opacity: transforms.opacity,
                  scale: transforms.scale,
                  zIndex: image.zIndex
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-80 h-80 md:w-96 md:h-96">
                  <Image
                    src={image.src}
                    alt={`LIMI AI Component ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default BaseShowcase;
