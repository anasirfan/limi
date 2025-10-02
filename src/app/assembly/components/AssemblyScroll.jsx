'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiCube, HiOutlineWifi, HiLightningBolt, HiCog } from 'react-icons/hi';

const AssemblyScroll = () => {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const steps = [
    {
      id: 1,
      title: 'Install the Base in the Ceiling',
      description: 'Securely mount the foundation base onto the ceiling to prepare for the full assembly.',
      icon: HiCube,
      color: '#19b576',
      video: '/limiai/step1.mp4',
      size: 'large' // Takes 2 columns
    },
    {
      id: 2,
      title: 'Connect the Cables',
      description: 'Carefully connect the power and data cables to ensure proper communication and functionality.',
      icon: HiOutlineWifi,
      color: '#19b576',
      video: '/limiai/step2.mp4',
      size: 'medium' // Takes 1 column
    },
    {
      id: 3,
      title: 'Attach the Pendant',
      description: 'Mount and secure the pendant to the installed base for structural integration.',
      icon: HiLightningBolt,
      color: '#19b576',
      video: '/limi_ai_assets/assemblyStep3.mp4',
      size: 'medium' // Takes 1 column
    },
    {
      id: 4,
      title: 'Add Sensors',
      description: 'Integrate the sensors into the system for enhanced functionality and smart monitoring.',
      icon: HiCog,
      color: '#19b576',
      video: '/limiai/step4.m4v',
      size: 'large' // Takes 2 columns
    }
  ];
  

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section 
      ref={containerRef}
      className="relative pb-20 pt-24 bg-[#0E0E0D] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="relative inline-block">
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <span>Intelligence</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#54bb74] to-[#93cfa2]"> Assembly</span>
            </motion.h2>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -top-8 -left-8 w-16 h-16 border-4 border-[#54bb74]/30 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              animate={{ rotate: 360 }}
              transition={{ 
                opacity: { duration: 0.5, delay: 0.3, ease: "easeOut" },
                scale: { duration: 0.5, delay: 0.3, ease: "easeOut" },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
              viewport={{ once: true, margin: "-50px" }}
            />
            <motion.div
              className="absolute -top-4 -right-8 w-8 h-8 bg-[#93cfa2] rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                opacity: { duration: 0.5, delay: 0.4, ease: "easeOut" },
                scale: { duration: 2, repeat: Infinity }
              }}
              viewport={{ once: true, margin: "-50px" }}
            />
          </div>
          <motion.p 
            className="text-lg text-white max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            Deploy a complete AI ecosystem in four simple steps.
          </motion.p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="space-y-6">
          {/* First Row - Step 1 (wider) and Step 2 (narrower) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="md:col-span-2 relative rounded-2xl overflow-hidden transition-all duration-300 group cursor-pointer h-80"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              {/* Video Background */}
              <div className="absolute inset-0">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={steps[0].video} type="video/mp4" />
                </video>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                <div className="flex items-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm"
                    style={{ backgroundColor: `${steps[0].color}90` }}
                  >
                    <HiCube className="text-xl text-white" />
                  </div>
                  <span className="text-white/80 text-sm font-medium">
                    Step {steps[0].id}
                  </span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {steps[0].title}
                </h3>
                
                <p className="text-white/90 text-sm leading-relaxed">
                  {steps[0].description}
                </p>

                {/* Hover Indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M12 5v.01M12 19v.01M12 12h.01" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="md:col-span-1 relative rounded-2xl overflow-hidden transition-all duration-300 group cursor-pointer h-80"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              {/* Video Background */}
              <div className="absolute inset-0">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={steps[1].video} type="video/mp4" />
                </video>
               </div>

              {/* Content Overlay */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                <div className="flex items-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm"
                    style={{ backgroundColor: `${steps[1].color}90` }}
                  >
                    <HiOutlineWifi className="text-xl text-white" />
                  </div>
                  <span className="text-white/80 text-sm font-medium">
                    Step {steps[1].id}
                  </span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {steps[1].title}
                </h3>
                
                <p className="text-white/90 text-sm leading-relaxed">
                  {steps[1].description}
                </p>

                {/* Hover Indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M12 5v.01M12 19v.01M12 12h.01" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Second Row - Step 3 (narrower) and Step 4 (wider) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="md:col-span-1 relative rounded-2xl overflow-hidden transition-all duration-300 group cursor-pointer h-80"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              {/* Video Background */}
              <div className="absolute inset-0">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={steps[2].video} type="video/mp4" />
                </video>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                <div className="flex items-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-3 "
                    style={{ backgroundColor: `${steps[2].color}90` }}
                  >
                    <HiLightningBolt className="text-xl text-white" />
                  </div>
                  <span className="text-white/80 text-sm font-medium">
                    Step {steps[2].id}
                  </span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {steps[2].title}
                </h3>
                
                <p className="text-white/90 text-sm leading-relaxed">
                  {steps[2].description}
                </p>

                {/* Hover Indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M12 5v.01M12 19v.01M12 12h.01" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="md:col-span-2 relative rounded-2xl overflow-hidden transition-all duration-300 group cursor-pointer h-80"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              {/* Video Background */}
              <div className="absolute inset-0">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={steps[3].video} type="video/mp4" />
                </video>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                <div className="flex items-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm"
                    style={{ backgroundColor: `${steps[3].color}90` }}
                  >
                    <HiCog className="text-xl text-white" />
                  </div>
                  <span className="text-white/80 text-sm font-medium">
                    Step {steps[3].id}
                  </span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {steps[3].title}
                </h3>
                
                <p className="text-white/90 text-sm leading-relaxed">
                  {steps[3].description}
                </p>

                {/* Hover Indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M12 5v.01M12 19v.01M12 12h.01" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssemblyScroll;
